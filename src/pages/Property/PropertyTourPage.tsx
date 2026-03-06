import { useState, useEffect, useRef, Suspense } from 'react';
import type { ReactElement } from 'react';
import { MapPin, Box, ArrowLeft, RefreshCw, Users, LayoutGrid, Globe } from 'lucide-react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useTexture, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Optional: A simple 3D viewer component using react-three-fiber to make the generated interior look like a 360-viewer or 3D object
const InteriorSphere = ({ imgUrl }: { imgUrl: string }) => {
    const texture = useTexture(imgUrl);
    return (
        <Sphere args={[500, 60, 40]} scale={[-1, 1, 1]}>
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </Sphere>
    );
};

// Optional: A simple 3D viewer component using react-three-fiber to make the generated interior look like a 360-viewer or 3D object
const InteriorViewer = ({ imgUrl }: { imgUrl: string }) => {
    return (
        <Canvas camera={{ position: [0, 0, 0.1], fov: 75 }}>
            <ambientLight intensity={1.5} />
            {/* Mapping our generated 2D image onto the inside of a sphere to fake a 360 tour for demonstration */}
            <Suspense fallback={null}>
                <InteriorSphere imgUrl={imgUrl} />
            </Suspense>
            <OrbitControls
                enableZoom={true}
                enablePan={false}
                target={[0, 0, 0]}
                rotateSpeed={-0.5}
                minDistance={0.01}
                maxDistance={100}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI - Math.PI / 6}
            />
        </Canvas>
    );
};

// Map component
const SimpleMap = ({ onMarkerClick }: { onMarkerClick: () => void }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<any>();

    // Use the coordinates for the requested location: Camp 7, King Abdulaziz University, Jeddah
    const center = { lat: 21.4930, lng: 39.2450 };

    useEffect(() => {
        if (ref.current && !map) {
            const newMap = new (window as any).google.maps.Map(ref.current, {
                center,
                zoom: 17,
                mapTypeId: 'satellite',
                tilt: 45, // Try to force 3D tilt
                heading: 90,
                disableDefaultUI: false,
            });

            const marker = new (window as any).google.maps.Marker({
                position: center,
                map: newMap,
                title: "Camp 7 Virtual Tour",
                animation: (window as any).google.maps.Animation.DROP,
            });

            marker.addListener('click', () => {
                // Simple zoom-in animation
                newMap.setZoom(20);
                setTimeout(() => {
                    onMarkerClick();
                }, 1000);
            });

            setMap(newMap);
        }
    }, [ref, map, onMarkerClick]);

    return <div ref={ref} id="map" className="w-full h-full" />;
};

const MapRenderStatus = (status: Status): ReactElement => {
    if (status === Status.LOADING) return <div className="flex justify-center items-center h-full text-white bg-slate-900">Loading Maps...</div>;
    if (status === Status.FAILURE) return <div className="flex justify-center items-center h-full text-red-500 bg-slate-900">Error loading maps. Ensure you have a valid API Key.</div>;
    return <></>;
};

export const PropertyTourPage = () => {
    const [viewState, setViewState] = useState<'map' | 'interior'>('map');
    const [currentRoom, setCurrentRoom] = useState('hall');

    const rooms = [
        { id: 'hall', name: 'Big Hall', img: '/hall.png', icon: Box },
        { id: 'master', name: 'Main Bedroom', img: '/master_bedroom.png', icon: MapPin },
        { id: 'kids', name: 'Kids Bedroom', img: '/kids_room.png', icon: Users },
        { id: 'kitchen', name: 'Kitchen', img: '/kitchen.png', icon: LayoutGrid },
        { id: 'balcony', name: 'Balcony', img: '/balcony.png', icon: Globe },
    ];

    const currentRoomData = rooms.find(r => r.id === currentRoom) || rooms[0];

    // NOTE: Replace this with your actual Google Maps API key
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

    return (
        <div className="flex flex-col h-screen bg-slate-50 relative overflow-hidden font-sans">

            {/* Header Overlay */}
            <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 to-transparent p-6 flex justify-between items-start pointer-events-none">
                <div className="text-white">
                    <h1 className="text-3xl font-bold tracking-tight shadow-sm">Camp 7 Flat Tour</h1>
                    <p className="opacity-90 flex items-center gap-2 mt-1">
                        <MapPin size={16} /> King Abdulaziz University, Jeddah
                    </p>
                </div>

                <div className="flex gap-3 pointer-events-auto">
                    {viewState === 'interior' && (
                        <button
                            onClick={() => setViewState('map')}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2"
                        >
                            <ArrowLeft size={18} /> Back to Map
                        </button>
                    )}
                    <button
                        onClick={() => setViewState(viewState === 'map' ? 'interior' : 'map')}
                        className="bg-blue-600 hover:bg-blue-700 shadow-lg text-white px-5 py-2 rounded-lg font-semibold transition-all flex items-center gap-2"
                    >
                        {viewState === 'map' ? <Box size={18} /> : <MapPin size={18} />}
                        {viewState === 'map' ? 'Enter 3D Interior' : 'View Location'}
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 relative bg-slate-900 w-full h-full text-white">

                {/* State 1: Maps View */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${viewState === 'map' ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
                    {apiKey ? (
                        <Wrapper apiKey={apiKey} render={MapRenderStatus}>
                            <SimpleMap onMarkerClick={() => setViewState('interior')} />
                        </Wrapper>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                            <RefreshCw className="w-12 h-12 text-slate-500 animate-spin" />
                            <p className="text-xl font-medium">Please add VITE_GOOGLE_MAPS_API_KEY to your .env</p>
                            <p className="text-slate-400">Showing demo mode fallback...</p>
                            <div
                                className="w-full max-w-4xl h-96 bg-cover bg-center rounded-xl border-4 border-slate-700 cursor-pointer flex items-center justify-center group"
                                style={{ backgroundImage: `url('https://maps.googleapis.com/maps/api/staticmap?center=21.4930,39.2450&zoom=17&size=800x400&maptype=satellite&key=NO_KEY')` }}
                                onClick={() => setViewState('interior')}
                            >
                                <div className="bg-blue-600 px-6 py-3 rounded-full shadow-2xl group-hover:scale-110 transition-transform flex items-center gap-2 font-bold pointer-events-auto">
                                    <MapPin size={20} /> Click to Enter Building
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* State 2: 3D Interior View */}
                <div className={`absolute inset-0 transition-opacity duration-1000 ${viewState === 'interior' ? 'opacity-100 z-0' : 'opacity-0 -z-10'}`}>
                    {/* Room Selector UI */}
                    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/40 backdrop-blur-xl p-2 rounded-2xl border border-white/10 overflow-x-auto max-w-[90vw] no-scrollbar">
                        {rooms.map(room => (
                            <button
                                key={room.id}
                                onClick={() => setCurrentRoom(room.id)}
                                className={`flex flex-col items-center min-w-[80px] p-2 rounded-xl transition-all ${currentRoom === room.id ? 'bg-blue-600 text-white shadow-lg scale-105' : 'text-slate-400 hover:text-white hover:bg-white/10'}`}
                            >
                                <room.icon size={18} />
                                <span className="text-[10px] font-bold mt-1 uppercase whitespace-nowrap">{room.name}</span>
                            </button>
                        ))}
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full text-xs text-white/80 border border-white/10 pointer-events-none">
                        Drag to look around • Scroll to zoom
                    </div>

                    {/* Rendering the generated concept image as a panoramic environment */}
                    <Suspense fallback={<div className="flex items-center justify-center h-full text-white bg-slate-900">Loading {currentRoomData.name}...</div>}>
                        <InteriorViewer imgUrl={currentRoomData.img} />
                    </Suspense>
                </div>

            </div>
        </div>
    );
};
