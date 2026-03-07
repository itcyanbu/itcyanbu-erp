import { useState, useEffect, useRef, Suspense } from 'react';
import type { ReactElement } from 'react';
import { MapPin, Box, ArrowLeft, RefreshCw, Users, LayoutGrid, Globe, Droplet, Archive } from 'lucide-react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const InteriorSphere = ({ imgUrl }: { imgUrl: string }) => {
    const texture = useTexture(imgUrl);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = false;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 16;
    texture.needsUpdate = true;

    const img = texture.image as any;
    const res = img?.width ? new THREE.Vector2(img.width, img.height) : new THREE.Vector2(1024, 512);

    const material = new THREE.ShaderMaterial({
        uniforms: {
            tDiffuse: { value: texture },
            resolution: { value: res },
            sharpness: { value: 0.9 },
        },
        vertexShader: `
            varying vec2 vUv;
            void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }
        `,
        fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform vec2 resolution;
            uniform float sharpness;
            varying vec2 vUv;
            void main() {
                vec2 px = 1.0 / resolution;
                vec3 c  = texture2D(tDiffuse, vUv).rgb;
                vec3 t  = texture2D(tDiffuse, vUv + vec2(0, px.y)).rgb;
                vec3 b  = texture2D(tDiffuse, vUv - vec2(0, px.y)).rgb;
                vec3 l  = texture2D(tDiffuse, vUv - vec2(px.x, 0)).rgb;
                vec3 r  = texture2D(tDiffuse, vUv + vec2(px.x, 0)).rgb;
                vec3 sharp = clamp(c + (4.0*c - t - b - l - r) * sharpness, 0.0, 1.0);
                gl_FragColor = vec4(sharp, 1.0);
            }
        `,
        side: THREE.BackSide,
    });

    return (
        <Sphere args={[500, 64, 64]} scale={[-1, 1, 1]}>
            <primitive object={material} attach="material" />
        </Sphere>
    );
};

// Flat 2D viewer for non-panoramic photos (e.g. portrait bathroom shots)
const FlatViewer = ({ imgUrl }: { imgUrl: string }) => (
    <div style={{ position: 'absolute', inset: 0, background: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src={imgUrl} alt="Room view" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '12px', boxShadow: '0 0 80px rgba(0,0,0,0.8)' }} />
    </div>
);

// key prop on Canvas forces a full Three.js remount every room change
const InteriorViewer = ({ imgUrl, fov, roomKey, isPanorama }: { imgUrl: string; fov: number; roomKey: string; isPanorama: boolean }) => (
    isPanorama
        ? <Canvas key={roomKey} dpr={Math.min(window.devicePixelRatio, 2)} gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}>
            <PerspectiveCamera makeDefault position={[0, 0, 0]} fov={fov} />
            <Suspense fallback={null}>
                <InteriorSphere imgUrl={imgUrl} />
            </Suspense>
            <OrbitControls enableZoom={false} enablePan={false} target={[0, 0, -0.01]} rotateSpeed={-0.4} />
        </Canvas>
        : <FlatViewer imgUrl={imgUrl} />
);

const SimpleMap = ({ onMarkerClick }: { onMarkerClick: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>();
    const center = { lat: 21.493, lng: 39.245 };
    useEffect(() => {
        if (ref.current && !map) {
            const m = new (window as any).google.maps.Map(ref.current, { center, zoom: 17, mapTypeId: 'satellite', tilt: 45, heading: 90 });
            const mk = new (window as any).google.maps.Marker({ position: center, map: m, animation: (window as any).google.maps.Animation.DROP });
            mk.addListener('click', () => { m.setZoom(20); setTimeout(onMarkerClick, 1000); });
            setMap(m);
        }
    }, [ref, map, onMarkerClick]);
    return <div ref={ref} id="map" className="w-full h-full" />;
};

const MapStatus = (s: Status): ReactElement => {
    if (s === Status.LOADING) return <div className="flex items-center justify-center h-full text-white bg-slate-900">Loading Maps…</div>;
    if (s === Status.FAILURE) return <div className="flex items-center justify-center h-full text-red-500 bg-slate-900">Maps error.</div>;
    return <></>;
};

const ROOMS = [
    { id: 'hall', name: 'Big Hall', img: '/hall.png', icon: Box, defaultFov: 75, isPanorama: true },
    { id: 'master', name: 'Main Bedroom', img: '/master_bedroom.png', icon: MapPin, defaultFov: 75, isPanorama: true },
    { id: 'kids', name: 'Kids Bedroom', img: '/kids_room.png', icon: Users, defaultFov: 75, isPanorama: true },
    { id: 'kitchen', name: 'Kitchen', img: '/kitchen.png', icon: LayoutGrid, defaultFov: 75, isPanorama: true },
    { id: 'balcony', name: 'Balcony', img: '/balcony.png', icon: Globe, defaultFov: 75, isPanorama: true },
    // Bath rooms: real equirectangular 360° panorama (Greg Zaal / Poly Haven, CC0)
    { id: 'bath1', name: 'Main Bath', img: '/bath_panorama.jpg', icon: Droplet, defaultFov: 75, isPanorama: true },
    { id: 'bath2', name: 'Common Bath', img: '/bath_panorama.jpg', icon: Droplet, defaultFov: 75, isPanorama: true },
    { id: 'store', name: 'Store Room', img: '/store_pro.png', icon: Archive, defaultFov: 90, isPanorama: true },
];

export const PropertyTourPage = () => {
    const [view, setView] = useState<'map' | 'interior'>('map');
    const [roomId, setRoomId] = useState('hall');
    const [fov, setFov] = useState(75);

    const room = ROOMS.find(r => r.id === roomId) ?? ROOMS[0];
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

    const switchRoom = (id: string) => {
        const r = ROOMS.find(x => x.id === id) ?? ROOMS[0];
        setRoomId(id);
        setFov(r.defaultFov); // reset FOV to each room's natural default
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 relative overflow-hidden font-sans">

            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-6 flex justify-between items-start pointer-events-none">
                <div className="text-white">
                    <h1 className="text-3xl font-bold tracking-tight">Camp 7 Flat Tour</h1>
                    {view === 'interior' && <p className="text-sm text-white/60 mt-1">{room.name}</p>}
                </div>
                <div className="flex gap-3 pointer-events-auto">
                    {view === 'interior' && (
                        <button onClick={() => setView('map')} className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                            <ArrowLeft size={18} /> Back to Map
                        </button>
                    )}
                    <button onClick={() => setView(v => v === 'map' ? 'interior' : 'map')} className="bg-blue-600 hover:bg-blue-700 shadow-lg text-white px-5 py-2 rounded-lg font-semibold flex items-center gap-2">
                        {view === 'map' ? <><Box size={18} /> Enter 3D Interior</> : <><MapPin size={18} /> View Location</>}
                    </button>
                </div>
            </div>

            <div className="flex-1 relative bg-slate-900 w-full h-full text-white">

                <div className={`absolute inset-0 transition-opacity duration-700 ${view === 'map' ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
                    {apiKey
                        ? <Wrapper apiKey={apiKey} render={MapStatus}><SimpleMap onMarkerClick={() => setView('interior')} /></Wrapper>
                        : (
                            <div className="flex flex-col items-center justify-center h-full gap-4">
                                <p className="text-xl">Add VITE_GOOGLE_MAPS_API_KEY to .env</p>
                                <div className="bg-slate-700 rounded-xl flex items-center justify-center w-96 h-48 cursor-pointer group" onClick={() => setView('interior')}>
                                    <div className="bg-blue-600 px-6 py-3 rounded-full group-hover:scale-110 transition-transform flex items-center gap-2 font-bold">
                                        <MapPin size={20} /> Click to Enter
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>

                <div
                    className={`absolute inset-0 transition-opacity duration-700 ${view === 'interior' ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}
                    onWheel={e => { if (view === 'interior') setFov(p => Math.max(30, Math.min(120, p + (e.deltaY > 0 ? 5 : -5)))); }}
                >
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 p-2 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                        <button onClick={() => setFov(p => Math.max(30, p - 10))} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white text-xl font-bold">+</button>
                        <button onClick={() => setFov(room.defaultFov)} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white"><RefreshCw size={18} /></button>
                        <button onClick={() => setFov(p => Math.min(120, p + 10))} className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg text-white text-xl font-bold">−</button>
                    </div>

                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/10 overflow-x-auto max-w-[90vw] no-scrollbar">
                        {ROOMS.map(r => (
                            <button key={r.id} onClick={() => switchRoom(r.id)}
                                className={`flex flex-col items-center min-w-[80px] p-2 rounded-xl transition-all ${roomId === r.id ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}>
                                <r.icon size={18} />
                                <span className="text-[10px] font-bold mt-1 uppercase whitespace-nowrap">{r.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full text-xs text-white/80 border border-white/10 pointer-events-none">
                        Drag to look around • Use buttons to zoom
                    </div>

                    <div style={{ position: 'absolute', inset: 0 }}>
                        <InteriorViewer imgUrl={room.img} fov={fov} roomKey={roomId} isPanorama={room.isPanorama} />
                    </div>
                </div>
            </div>
        </div>
    );
};
