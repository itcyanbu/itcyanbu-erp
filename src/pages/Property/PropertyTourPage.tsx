import { useState, useEffect, Suspense } from 'react';
import { MapPin, Box, ArrowLeft, RefreshCw, Users, LayoutGrid, Globe, Droplet, Archive, Map as MapIcon, Castle, DoorOpen, Compass } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Sphere, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

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

// Flat 2D viewer for non-panoramic photos
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

const MapAnimationController = ({ step }: { step: number }) => {
    const map = useMap();
    useEffect(() => {
        if (step === 0) {
            // Start wide (Saudi Arabia)
            map.setView([23.8859, 45.0792], 5);
        } else if (step === 1) {
            // General region flight
            map.flyTo([22.5, 40.5], 7, { duration: 1.5 });
        } else if (step === 2) {
            // Camp 7 area
            map.flyTo([21.493, 39.245], 14, { duration: 1.8 });
        } else if (step >= 3) {
            // Camp 7 Flat Tour exact building
            map.flyTo([21.493, 39.245], 18, { duration: 2.0 });
        }
    }, [step, map]);
    return null;
};

const LeafletMap = ({ step }: { step: number }) => {
    return (
        <MapContainer center={[23.8859, 45.0792]} zoom={5} style={{ height: '100%', width: '100%' }} zoomControl={false} attributionControl={false}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <MapAnimationController step={step} />
            {step >= 3 && (
                <Marker position={[21.493, 39.245]}>
                    <Popup>Camp 7 Flat</Popup>
                </Marker>
            )}
        </MapContainer>
    );
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
    // Sequence state: 0=Start, 1=Regional Map, 2=Area Map, 3=Flat Tour, 4=Interior
    const [step, setStep] = useState(0);
    const [roomId, setRoomId] = useState('hall');
    const [fov, setFov] = useState(75);

    const room = ROOMS.find(r => r.id === roomId) ?? ROOMS[0];
    const isInterior = step === 4;

    const switchRoom = (id: string) => {
        const r = ROOMS.find(x => x.id === id) ?? ROOMS[0];
        setRoomId(id);
        setFov(r.defaultFov); // reset FOV to each room's natural default
    };

    const getButtonConfig = () => {
        switch (step) {
            case 0: return { label: 'OpenStreetMap', icon: MapIcon, color: 'bg-blue-600 hover:bg-blue-700' };
            case 1: return { label: 'camp 7 area', icon: Compass, color: 'bg-emerald-600 hover:bg-emerald-700' };
            case 2: return { label: 'Camp 7 Flat Tour', icon: Castle, color: 'bg-indigo-600 hover:bg-indigo-700' };
            case 3: return { label: 'Enter 3D Interior', icon: DoorOpen, color: 'bg-orange-600 hover:bg-orange-700 hover:scale-105 transition-transform' };
            default: return { label: 'Inside', icon: Box, color: 'bg-blue-600' };
        }
    };

    const activeBtn = getButtonConfig();

    return (
        <div className="flex flex-col h-screen bg-slate-50 relative overflow-hidden font-sans">

            <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/70 to-transparent p-6 flex justify-between items-start pointer-events-none">
                <div className="text-white">
                    <h1 className="text-3xl font-bold tracking-tight">Camp 7 Flat Tour</h1>
                    {isInterior && <p className="text-sm text-white/60 mt-1">{room.name}</p>}
                </div>
                <div className="flex gap-3 pointer-events-auto">
                    {isInterior && (
                        <button onClick={() => setStep(3)} className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                            <ArrowLeft size={18} /> Back to Map
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 relative bg-slate-900 w-full h-full text-white">

                {/* Map Layer (Visible until step 4) */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${isInterior ? 'opacity-0 -z-10' : 'opacity-100 z-0'}`}>
                    <LeafletMap step={step} />

                    {/* Centered Action Button Overlay */}
                    {!isInterior && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[9999]">
                            <button
                                onClick={() => setStep(s => Math.min(4, s + 1))}
                                className={`pointer-events-auto shadow-2xl text-white px-8 py-4 rounded-2xl font-bold text-xl flex items-center gap-3 transition-colors ${activeBtn.color}`}
                            >
                                <activeBtn.icon size={28} /> {activeBtn.label}
                            </button>
                        </div>
                    )}
                </div>

                {/* 3D Interior Layer (Visible only on step 4) */}
                <div
                    className={`absolute inset-0 transition-opacity duration-1000 ${isInterior ? 'opacity-100 z-10' : 'opacity-0 -z-10 pointer-events-none'}`}
                    onWheel={e => { if (isInterior) setFov(p => Math.max(30, Math.min(120, p + (e.deltaY > 0 ? 5 : -5)))); }}
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
