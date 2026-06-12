import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Footprints, Backpack, Camera, X, Crosshair, Navigation, Map as MapIcon, ShieldCheck, AlertCircle, CheckCircle, Gift } from 'lucide-react';
const clickSound = new Audio('/sounds/click.mp3');
const successSound = new Audio('/sounds/success.mp3');
const errorSound = new Audio('/sounds/error.mp3');

// --- 1. DATA: Points of Interest (1 Artifact per Location) ---
const POIS = [
  {
    id: 'medan_bandar',
    name: 'Medan Bandar',
    lat: 6.1191,
    lng: 100.3658,
    image: '/Medan Bandar.jpg',
    mainIcon: '🏛️',
    color: 'bg-blue-500',
    desc: 'Padang bersejarah yang dahulunya dikenali sebagai Padang Court.',
    artifacts: [
      {
        id: 'mb_1',
        name: 'Tugu Bandar',
        icon: '🏛️',
        question: 'Apakah nama asal Medan Bandar?',
        options: ['Padang Court', 'Padang Sultan'],
        answer: 'Padang Court'
      }
    ]
  },

  {
    id: 'balai_seni',
    name: 'Balai Seni Negeri Kedah',
    lat: 6.1187,
    lng: 100.3655,
    image: '/Balai Seni.jpg',
    mainIcon: '🎨',
    color: 'bg-pink-500',
    desc: 'Bangunan Mahkamah Besar lama yang kini menjadi galeri seni.',
    artifacts: [
      {
        id: 'bs_1',
        name: 'Lukisan Warisan',
        icon: '🎨',
        question: 'Balai Seni pada asalnya dibina sebagai?',
        options: ['Sekolah Melayu', 'Mahkamah Besar'],
        answer: 'Mahkamah Besar'
      }
    ]
  },

  {
    id: 'monumen_alor_setar',
    name: 'Monumen Alor Setar',
    lat: 6.1183,
    lng: 100.3654,
    image: '/Monumen Alor Setar.jpg',
    mainIcon: '🏙️',
    color: 'bg-cyan-500',
    desc: 'Monumen memperingati ulang tahun ke-250 bandar Alor Setar.',
    artifacts: [
      {
        id: 'ma_1',
        name: 'Mini Monumen',
        icon: '🏙️',
        question: 'Monumen ini dibina untuk memperingati ulang tahun ke berapa Alor Setar?',
        options: ['200', '250'],
        answer: '250'
      }
    ]
  },

  {
    id: 'muzium_diraja',
    name: 'Muzium Diraja',
    lat: 6.1195,
    lng: 100.3667,
    image: '/Muzium Diraja.jpg',
    mainIcon: '👑',
    color: 'bg-red-500',
    desc: 'Istana kayu yang pernah menjadi kediaman keluarga diraja Kedah.',
    artifacts: [
      {
        id: 'md_1',
        name: 'Mahkota Diraja',
        icon: '👑',
        question: 'Apakah nama asal Muzium Diraja ini?',
        options: ['Istana Anak Bukit', 'Istana Kota Setar'],
        answer: 'Istana Kota Setar'
      }
    ]
  },

  {
    id: 'balai_besar',
    name: 'Balai Besar',
    lat: 6.1197,
    lng: 100.3666,
    image: '/Balai Besar.jpg',
    mainIcon: '📜',
    color: 'bg-purple-600',
    desc: 'Bangunan rasmi negeri yang dipengaruhi seni bina Thailand.',
    artifacts: [
      {
        id: 'bb_1',
        name: 'Dokumen Diraja',
        icon: '📜',
        question: 'Apakah fungsi utama Balai Besar pada masa dahulu?',
        options: ['Balai Polis', 'Balai Penghadapan'],
        answer: 'Balai Penghadapan'
      }
    ]
  },

  {
    id: 'balai_nobat',
    name: 'Balai Nobat',
    lat: 6.1209,
    lng: 100.3665,
    image: '/Balai Nobat.jpg',
    mainIcon: '🎺',
    color: 'bg-green-500',
    desc: 'Tempat penyimpanan alat muzik nobat diraja Kedah.',
    artifacts: [
      {
        id: 'bn_1',
        name: 'Serunai Diraja',
        icon: '🎺',
        question: 'Apakah yang disimpan di Balai Nobat?',
        options: ['Alat Muzik Diraja', 'Senjata Diraja'],
        answer: 'Alat Muzik Diraja'
      }
    ]
  },

  {
    id: 'pintu_gerbang',
    name: 'Pintu Gerbang Kota Tengah',
    lat: 6.1207,
    lng: 100.3664,
    image: '/Pintu Gerbang Kota Tengah.jpg',
    mainIcon: '🚪',
    color: 'bg-indigo-500',
    desc: 'Pintu gerbang bersejarah yang dibina semula selepas pembinaan Wisma Negeri.',
    artifacts: [
      {
        id: 'pg_1',
        name: 'Gerbang Kota',
        icon: '🚪',
        question: 'Pintu gerbang ini pada asalnya terletak di hadapan?',
        options: ['Istana Kota Tengah', 'Balai Besar'],
        answer: 'Istana Kota Tengah'
      }
    ]
  },

  {
    id: 'galeri_sultan',
    name: 'Galeri Sultan Abdul Halim',
    lat: 6.1213,
    lng: 100.3665,
    image: '/Galeri SAHMS.jpg',
    mainIcon: '📸',
    color: 'bg-amber-500',
    desc: 'Galeri yang mempamerkan koleksi peribadi Sultan Abdul Halim.',
    artifacts: [
      {
        id: 'gs_1',
        name: 'Koleksi Diraja',
        icon: '📸',
        question: 'Bangunan ini pada asalnya digunakan sebagai?',
        options: ['Mahkamah Negeri', 'Mahkamah Tinggi'],
        answer: 'Mahkamah Tinggi'
      }
    ]
  },

  {
    id: 'menara_jam',
    name: 'Menara Jam',
    lat: 6.1209,
    lng: 100.3659,
    image: '/Menara Jam.jpg',
    mainIcon: '🕰️',
    color: 'bg-rose-500',
    desc: 'Menara jam bersejarah yang dibina pada tahun 1912.',
    artifacts: [
      {
        id: 'mj_1',
        name: 'Jam Antik',
        icon: '🕰️',
        question: 'Pada zaman dahulu, Menara Jam berbunyi ketika?',
        options: ['Waktu Solat', 'Waktu Pasar Dibuka'],
        answer: 'Waktu Solat'
      }
    ]
  }
];

// --- 2. UTILITY (Calculate Distance) ---
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius in meters
  const φ1 = lat1 * Math.PI/180;
  const φ2 = lat2 * Math.PI/180;
  const Δφ = (lat2-lat1) * Math.PI/180;
  const Δλ = (lon2-lon1) * Math.PI/180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c; // Distance in meters
};

const getUncaughtArtifacts = (poi, inventory) => {
  return poi.artifacts.filter(art => !inventory.includes(art.id));
};

// --- 3. MAP SCREEN ---
const MapScreen = ({ playerLoc, setPlayerLoc, onEnterAR, inventory, isRealGPS, setIsRealGPS, showNotification }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const playerMarkerRef = useRef(null);
  const accuracyCircleRef = useRef(null);
  const routeLineRef = useRef(null);
  const [leafletReady, setLeafletReady] = useState(false);
  const [nearbyPOI, setNearbyPOI] = useState(null);
  const [nextMission, setNextMission] = useState(null); 
  const [routePoints, setRoutePoints] = useState(null); 

  useEffect(() => {
    if (!window.L) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(link);

      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setLeafletReady(true);
      document.head.appendChild(script);
    } else {
      setLeafletReady(true);
    }
  }, []);

  useEffect(() => {
    if (!leafletReady || !mapRef.current) return;

    if (!mapInstanceRef.current) {
      const map = window.L.map(mapRef.current, {
        zoomControl: false,
        attributionControl: false
      }).setView([playerLoc.lat, playerLoc.lng], 16);

      window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 20
      }).addTo(map);

      POIS.forEach(poi => {
        const uncaughtCount = getUncaughtArtifacts(poi, inventory).length;
        const isCollected = uncaughtCount === 0; 
        
        const iconHtml = `
  <div class="relative">
    <div style="
      width:50px;
      height:50px;
      border-radius:50%;
      overflow:hidden;
      border:3px solid white;
      box-shadow:0 4px 12px rgba(0,0,0,0.35);
      background:white;
    ">
      <img
        src="${poi.image}"
        style="
          width:100%;
          height:100%;
          object-fit:cover;
          ${isCollected ? 'filter: grayscale(100%); opacity:0.6;' : ''}
        "
      />
    </div>

    ${
      isCollected
      ? `
      <div style="
        position:absolute;
        top:-4px;
        right:-4px;
        width:18px;
        height:18px;
        background:#22c55e;
        border-radius:50%;
        border:2px solid white;
        color:white;
        font-size:10px;
        display:flex;
        align-items:center;
        justify-content:center;
      ">
        ✓
      </div>
      `
      : ''
    }
  </div>
`;
        const customIcon = window.L.divIcon({ html: iconHtml, className: '', iconSize: [40, 40], iconAnchor: [20, 20] });
        
        window.L.marker([poi.lat, poi.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div class="text-center p-1">
              <h3 class="font-bold text-gray-800">${poi.name}</h3>
              <p class="text-xs text-gray-500 mb-2">${poi.desc}</p>
              <span class="text-[10px] px-2 py-1 bg-gray-100 rounded-full">${isCollected ? '✅ Ditemui' : `📍 Artifak Belum Ditemui`}</span>
            </div>
          `);
      });

      const playerIcon = window.L.divIcon({
  html: `
    <div class="relative flex items-center justify-center w-12 h-12">
      <div class="absolute w-10 h-10 bg-amber-600 rounded-full opacity-40 animate-ping"></div>

      <div class="absolute w-10 h-10 bg-white rounded-full border-[3px] border-amber-700 shadow-xl flex items-center justify-center overflow-hidden z-10">
         <span class="text-xl">👩</span>
      </div>

      <div class="absolute -bottom-1.5 w-4 h-4 bg-amber-700 rotate-45 rounded-sm z-0"></div>
    </div>
  `,
  className: '',
  iconSize: [48, 48],
  iconAnchor: [24, 24]
});

      playerMarkerRef.current = window.L.marker([playerLoc.lat, playerLoc.lng], { icon: playerIcon, zIndexOffset: 1000 }).addTo(map);
      accuracyCircleRef.current = window.L.circle([playerLoc.lat, playerLoc.lng], { radius: 30, color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.1, weight: 1 }).addTo(map);
 
      // Simulation Click Logic
      map.on('click', (e) => {
        if (!isRealGPS) {
          setPlayerLoc({ lat: e.latlng.lat, lng: e.latlng.lng, accuracy: 20 });
        }
      });

      mapInstanceRef.current = map;
    } else {
      playerMarkerRef.current.setLatLng([playerLoc.lat, playerLoc.lng]);
      accuracyCircleRef.current.setLatLng([playerLoc.lat, playerLoc.lng]);
      accuracyCircleRef.current.setRadius(playerLoc.accuracy || 30);
    }

    let closest = null;
    let minDistance = Infinity;
    let closestUnvisited = null;
    let minUnvisitedDist = Infinity;

    POIS.forEach(poi => {
      const dist = getDistance(playerLoc.lat, playerLoc.lng, poi.lat, poi.lng);
      const uncaughtArtifacts = getUncaughtArtifacts(poi, inventory);
      
      if (dist < minDistance && uncaughtArtifacts.length > 0) {
        minDistance = dist;
        closest = { ...poi, distance: dist };
      }
      if (uncaughtArtifacts.length > 0 && dist < minUnvisitedDist) {
        minUnvisitedDist = dist;
        closestUnvisited = { ...poi, distance: dist };
      }
    });

    if (closest && closest.distance <= 60) setNearbyPOI(closest);
    else setNearbyPOI(null);

    setNextMission(closestUnvisited);

  }, [leafletReady, playerLoc, inventory]);

  // Route Logic
  useEffect(() => {
    if (!nextMission) {
      setRoutePoints(null);
      return;
    }
    const fetchRoute = async () => {
      try {
        const res = await fetch(`https://router.project-osrm.org/route/v1/foot/${playerLoc.lng},${playerLoc.lat};${nextMission.lng},${nextMission.lat}?overview=full&geometries=geojson`);
        const data = await res.json();
        if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates.map(c => [c[1], c[0]]);
          setRoutePoints(coords);
        } else {
          setRoutePoints([[playerLoc.lat, playerLoc.lng], [nextMission.lat, nextMission.lng]]);
        }
      } catch (error) {
        setRoutePoints([[playerLoc.lat, playerLoc.lng], [nextMission.lat, nextMission.lng]]);
      }
    };
    const timeoutId = setTimeout(() => fetchRoute(), 800);
    return () => clearTimeout(timeoutId);
  }, [playerLoc.lat, playerLoc.lng, nextMission?.id]);

  useEffect(() => {
    if (!mapInstanceRef.current) return;
    if (routeLineRef.current) mapInstanceRef.current.removeLayer(routeLineRef.current);
    if (routePoints && routePoints.length > 0) {
      routeLineRef.current = window.L.polyline(routePoints, { 
        color: '#10b981', dashArray: '12, 12', weight: 6, opacity: 0.9, lineCap: 'round', className: 'animated-route'
      }).addTo(mapInstanceRef.current);
    }
  }, [routePoints]);

  // Real GPS Logic
  useEffect(() => {
    let watchId;
    if (isRealGPS) {
      if ('geolocation' in navigator) {
        watchId = navigator.geolocation.watchPosition(
          (pos) => setPlayerLoc({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy }),
          (err) => {
            showNotification("Location access denied. Switching to Simulation Mode.", "error");
            setIsRealGPS(false);
          },
          { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
        );
      } else {
        showNotification("GPS not supported on this device.", "error");
        setIsRealGPS(false);
      }
    }
    return () => { if (watchId) navigator.geolocation.clearWatch(watchId); };
  }, [isRealGPS, setPlayerLoc, setIsRealGPS, showNotification]);

  const centerMap = () => { if (mapInstanceRef.current) mapInstanceRef.current.flyTo([playerLoc.lat, playerLoc.lng], 17, { duration: 1 }); };
  const focusNextMission = () => { if (mapInstanceRef.current && nextMission) mapInstanceRef.current.flyTo([nextMission.lat, nextMission.lng], 18, { duration: 1 }); };

  const teleportToAlorSetar = () => {
    setIsRealGPS(false);
    const alorSetarLoc = { lat: 6.1194, lng: 100.3660 };
    setPlayerLoc(alorSetarLoc);
    if (mapInstanceRef.current) mapInstanceRef.current.flyTo([alorSetarLoc.lat, alorSetarLoc.lng], 16);
  };

  const handleStartAR = () => {
    if (nearbyPOI) {
      const uncaught = getUncaughtArtifacts(nearbyPOI, inventory);
      if (uncaught.length > 0) onEnterAR(nearbyPOI, uncaught[0]);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-100">
      <style>{`@keyframes flowRoute { to { stroke-dashoffset: -24; } } .animated-route { animation: flowRoute 1s linear infinite; }`}</style>
      <div ref={mapRef} className="flex-grow w-full z-0"></div>
      
      <div className="absolute top-4 left-4 right-4 z-[400] flex justify-between items-start pointer-events-none">
        <div className="flex flex-col gap-2 pointer-events-auto">
          <div className="bg-white/90 p-3 rounded-2xl shadow-xl backdrop-blur-md border border-white/50">
            <h1 className="font-extrabold text-gray-800 text-lg leading-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-700 to-amber-500">
              Jejak Diraja
            </h1>
            <p className="text-xs text-gray-500 font-medium flex items-center gap-1 mt-1">
              <MapPin size={12} /> Alor Setar, Kedah
            </p>
          </div>

          {nextMission && (
            <div onClick={focusNextMission} className="bg-white/95 p-2.5 rounded-xl shadow-lg backdrop-blur-md border-l-4 border-amber-600 cursor-pointer hover:bg-amber-100 transition-colors pointer-events-auto">
              <p className="text-[10px] font-bold text-amber-600 uppercase tracking-wider mb-0.5">📍 Misi Seterusnya:</p>
              <div className="flex items-center gap-2">
                <span className="text-lg">{nextMission.mainIcon}</span>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-800 text-xs">{nextMission.name}</span>
                  <span className="text-[10px] text-gray-500">{Math.round(nextMission.distance)}m lagi</span>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2 pointer-events-auto">
          <button onClick={() => setIsRealGPS(!isRealGPS)} className={`p-3 rounded-full shadow-lg border-2 transition-all flex items-center justify-center ${isRealGPS ? 'bg-amber-700 text-white border-amber-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`} title="Tukar GPS / Simulasi">
            {isRealGPS ? <Navigation size={20} /> : <MapIcon size={20} />}
          </button>
          <button onClick={centerMap} className="p-3 bg-white text-blue-600 rounded-full shadow-lg border-2 border-gray-200 hover:bg-blue-50 transition-all flex items-center justify-center" title="Tengah Peta">
            <Crosshair size={20} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-24 w-full px-4 z-[400]">
        {!isRealGPS && (
           <div className="bg-amber-100/95 border border-amber-300 text-amber-800 px-4 py-3 rounded-xl text-xs flex items-center gap-3 mb-4 shadow-lg backdrop-blur-sm mx-auto max-w-sm">
             <AlertCircle size={18} className="text-amber-600 flex-shrink-0 animate-pulse" />
             <div className="flex-grow">Mod Simulasi. Klik peta untuk bergerak.</div>
             <button onClick={teleportToAlorSetar} className="bg-amber-200 px-3 py-1.5 rounded-lg font-bold whitespace-nowrap hover:bg-amber-300 text-amber-900 transition">Ke Bandar</button>
           </div>
        )}

        {nearbyPOI && getUncaughtArtifacts(nearbyPOI, inventory).length > 0 && (
          <div className="mx-auto max-w-sm bg-gradient-to-r from-amber-700 to-amber-600 p-4 rounded-2xl shadow-[0_10px_25px_rgba(146,64,14,0.4)] text-white flex items-center justify-between border border-amber-600 animate-[bounce_2s_infinite]">
            <div className="flex items-center gap-3">
              <span className="text-4xl drop-shadow-md">{getUncaughtArtifacts(nearbyPOI, inventory)[0].icon}</span>
              <div>
                <p className="font-bold text-lg leading-tight">{nearbyPOI.name}</p>
                <p className="text-xs text-amber-100 font-medium tracking-wide">Artifak Ditemui!</p>
              </div>
            </div>
            <button
  onClick={() => {
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
    handleStartAR();
  }}
  className="bg-white text-amber-600 px-5 py-2.5 rounded-full font-bold shadow-lg flex items-center gap-2 hover:scale-105 active:scale-95 transition-all whitespace-nowrap"
>
  <Camera size={18} />
  Tangkap
</button>
          </div>
        )}
      </div>
    </div>
  );
};

// --- 4. AR SCREEN ---
const ARScreen = ({ poi, artifact, onCatch, onCancel }) => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [hasCameraError, setHasCameraError] = useState(false);
  const [artifactPos, setArtifactPos] = useState({ x: 50, y: 50 });
  const [captured, setCaptured] = useState(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(s => { setStream(s); if (videoRef.current) videoRef.current.srcObject = s; })
      .catch(err => setHasCameraError(true));

    const interval = setInterval(() => {
      if (!captured) setArtifactPos({ x: Math.random() * 70 + 15, y: Math.random() * 60 + 20 });
    }, 1500);

    return () => { clearInterval(interval); if (stream) stream.getTracks().forEach(track => track.stop()); };
  }, [captured]);

  const handleCapture = () => {
  clickSound.currentTime = 0;
  clickSound.play().catch(() => {});

  setCaptured(true);
  setTimeout(() => onCatch(), 1200);
};

  return (
    <div className="relative w-full h-full bg-slate-900 overflow-hidden font-sans">
      {hasCameraError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900">
          <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] pointer-events-none"></div>
          <div className="z-10 flex flex-col items-center text-center p-6 bg-black/40 rounded-3xl backdrop-blur-md border border-blue-500/30 m-4 shadow-[0_0_30px_rgba(59,130,246,0.2)]">
            <ShieldCheck size={48} className="mb-2 text-blue-400" />
            <p className="font-bold text-xl text-blue-300 tracking-wider">HOLO-SPACE</p>
            <p className="text-xs text-blue-200 mt-2">Camera blocked.<br/>Digital mode activated.</p>
          </div>
        </div>
      ) : (
        <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
      )}

      <div className="absolute top-0 left-0 w-full p-6 pt-10 flex justify-between items-center z-20 bg-gradient-to-b from-black/80 to-transparent">
        <button onClick={onCancel} className="bg-white/20 p-3 rounded-full backdrop-blur-md text-white hover:bg-white/30 transition shadow-lg"><X size={24} /></button>
        <div className="bg-black/60 px-5 py-2.5 rounded-full backdrop-blur-md text-white font-bold text-sm border border-white/20 shadow-lg flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          Tangkap {artifact.name}!
        </div>
      </div>

      {!captured ? (
        <div className="absolute z-10 transition-all duration-[1200ms] ease-out cursor-pointer hover:scale-110 active:scale-95" style={{ left: `${artifactPos.x}%`, top: `${artifactPos.y}%`, transform: 'translate(-50%, -50%)' }} onClick={handleCapture}>
          <div className="relative flex flex-col items-center group">
            <div className="absolute -inset-6 border-2 border-dashed border-white/70 rounded-full animate-[spin_4s_linear_infinite] opacity-50 group-hover:border-green-400 group-hover:scale-110 group-hover:opacity-100 transition-all"></div>
            <div className="absolute -inset-3 bg-white/10 rounded-full animate-ping group-hover:bg-green-400/20"></div>
            <span className="text-7xl md:text-8xl drop-shadow-[0_0_25px_rgba(255,255,255,0.9)] z-10 transition-transform">{artifact.icon}</span>
            <div className="mt-6 bg-black/80 text-white text-[10px] font-bold px-4 py-2 rounded-full whitespace-nowrap border border-white/30 animate-bounce tracking-widest uppercase">Tap di sini</div>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-white/20 backdrop-blur-sm transition-all duration-300">
          <div className="animate-[scaleIn_0.6s_cubic-bezier(0.175,0.885,0.32,1.275)_forwards] text-center flex flex-col items-center">
            <div className="relative">
               <div className="absolute inset-0 bg-amber-500 blur-3xl opacity-50 rounded-full"></div>
               <span className="text-9xl relative z-10">{artifact.icon}</span>
            </div>
            <h2 className="text-white text-4xl font-black mt-6 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] tracking-wide">BERJAYA!</h2>
          </div>
        </div>
      )}

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-30 z-0 mix-blend-overlay"><Crosshair size={100} className="text-white" strokeWidth={0.5} /></div>
      <style>{`@keyframes scaleIn { 0% { transform: scale(0); opacity: 0; } 60% { transform: scale(1.2); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }`}</style>
    </div>
  );
};

// --- 5. TRIVIA SCREEN ---
const TriviaScreen = ({ artifact, onSuccess, onFail }) => {
  const [selected, setSelected] = useState(null);

  const handleAnswer = (opt) => {
  setSelected(opt);

  setTimeout(() => {
    if (opt === artifact.answer) {
      onSuccess(artifact.id);} 
    else {
       onFail();
    }
  }, 2000);
};

  return (
    <div className="w-full h-full bg-gradient-to-br from-amber-50 to-amber-100 flex flex-col items-center p-6 pt-20 relative overflow-y-auto font-sans">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-50"></div>
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-amber-200 rounded-full blur-3xl opacity-50"></div>

      <div className="z-10 flex flex-col items-center w-full max-w-md pb-32">
        <div className="relative mb-6">
          <div className="w-28 h-28 bg-white rounded-[2rem] shadow-2xl flex items-center justify-center text-6xl animate-[bounce_3s_infinite] border-4 border-amber-50 relative z-10">
            {artifact.icon}
          </div>
          <div className="absolute -bottom-3 -right-3 bg-yellow-400 text-yellow-900 text-xs font-black px-3 py-1.5 rounded-xl border-2 border-white shadow-lg transform rotate-12 z-20 uppercase tracking-wider">
            Tahniah!
          </div>
        </div>

        <h2 className="text-2xl font-black text-gray-800 text-center mb-2">Artifak Ditemui!</h2>
        <p className="text-sm text-amber-800 text-center mb-8 bg-white/60 px-5 py-2.5 rounded-2xl backdrop-blur-sm inline-block font-medium shadow-sm">
          Jawab dengan betul untuk mendapatkan <br/><span className="font-bold text-amber-900">{artifact.name}</span>.
        </p>

        <div className="bg-white/90 p-7 rounded-[2rem] shadow-[0_15px_40px_rgb(0,0,0,0.08)] w-full backdrop-blur-md border border-white">
          <p className="font-bold text-lg text-gray-800 mb-8 text-center leading-snug">{artifact.question}</p>
          
          <div className="space-y-4">
            {artifact.options.map((opt, i) => {
              let btnClass = "bg-gray-50 border-2 border-gray-100 text-gray-700 hover:border-amber-400 hover:bg-amber-50";
              let icon = null;

              if (selected) {
                if (opt === artifact.answer) {
                  btnClass = "bg-amber-500 text-white border-amber-600 shadow-[0_10px_20px_rgba(146,64,14,0.3)] scale-[1.02] transform transition-all";
                  icon = <CheckCircle size={22} className="text-white" />;
                } else if (opt === selected) {
                  btnClass = "bg-red-500 text-white border-red-600 opacity-90";
                  icon = <X size={22} className="text-white" />;
                } else {
                  btnClass = "opacity-30 border-gray-100 bg-gray-50";
                }
              }

              return (
                <button key={i} disabled={!!selected} onClick={() => handleAnswer(opt)} className={`w-full p-4 rounded-2xl font-bold transition-all duration-300 flex items-center justify-between text-left ${btnClass}`}>
                  <span className="flex-grow pr-2">{opt}</span>
                  {icon}
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 6. INVENTORY & REWARD SCREEN ---
const InventoryScreen = ({ inventory }) => {
  const totalArtifacts = POIS.reduce((sum, poi) => sum + poi.artifacts.length, 0);
  const progress = Math.round((inventory.length / totalArtifacts) * 100);

  return (
    <div className="w-full h-full bg-slate-50 flex flex-col font-sans">
      <div className="bg-gradient-to-br from-amber-700 to-amber-600 pt-14 pb-10 px-8 text-white shadow-xl rounded-b-[2.5rem] relative overflow-hidden flex-shrink-0">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-1 tracking-tight">Inventori</h2>
          <p className="text-amber-100 text-sm font-medium">Jelajah Alor Setar </p>
          <div className="mt-6">
            <div className="flex justify-between text-sm font-bold mb-3">
              <span className="uppercase tracking-wider text-[10px] text-amber-100">Artifak Ditemui</span>
              <span className="bg-black/20 px-3 py-1 rounded-full text-xs">{inventory.length} / {totalArtifacts}</span>
            </div>
            <div className="w-full bg-black/20 rounded-full h-2.5 backdrop-blur-sm border border-white/10 overflow-hidden">
              <div className="bg-yellow-400 h-full rounded-full transition-all duration-1000 ease-out relative" style={{ width: `${progress}%` }}>
                 <div className="absolute top-0 left-0 w-full h-full bg-white/30 animate-[pulse_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-grow p-6 overflow-y-auto pb-32 space-y-5">
        {progress === 100 && (
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 p-6 rounded-[2rem] text-white text-center shadow-xl mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
               <Gift size={32} className="text-white animate-bounce" />
            </div>
            <h3 className="font-black text-2xl mb-1">Ganjaran Anda!</h3>
            <p className="text-xs font-medium text-orange-50 mb-5">Anda telah berjaya menemui semua artifak.</p>
            
            <div className="bg-white text-gray-800 p-5 rounded-2xl border-dashed border-2 border-orange-200">
               <p className="font-bold text-sm mb-1 text-orange-600">HADIAH MENARIK MENANTI ANDA</p>
               <p className="text-xs text-gray-500 mb-3">Tunjukkan voucher ini di:</p>
               <p className="font-black text-md text-amber-700 leading-tight">Pejabat Pusat Pelancongan<br/>Alor Setar</p>
               <div className="mt-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                 <p className="font-mono font-black text-2xl tracking-widest text-gray-800">SL-M27S</p>
               </div>
            </div>
          </div>
        )}

        {POIS.map(poi => {
          const caughtInPoi = poi.artifacts.filter(a => inventory.includes(a.id));
          const isPoiComplete = caughtInPoi.length === poi.artifacts.length;

          return (
            <div key={poi.id} className={`bg-white rounded-[2rem] p-4 flex items-center justify-between border-2 shadow-sm ${isPoiComplete ? 'border-amber-100 shadow-amber-50' : 'border-gray-100'}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${isPoiComplete ? 'bg-amber-100' : 'bg-gray-100 grayscale opacity-60'}`}>
                  {poi.mainIcon}
                </div>
                <div>
                   <h3 className="font-bold text-gray-800 text-sm leading-tight">{poi.name}</h3>
                   <p className="text-[10px] text-gray-400 mt-0.5">{isPoiComplete ? 'Artifak Berjaya Ditangkap' : 'Artifak Tidak Ditemui'}</p>
                </div>
              </div>
              <div className="flex items-center">
                {isPoiComplete ? <CheckCircle size={24} className="text-amber-500 mr-2" /> : <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs font-bold mr-2">🔒</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// --- 7. MAIN APP COMPONENT ---
export default function App() {
  const [view, setView] = useState('map'); 
  const [activeMission, setActiveMission] = useState({ poi: null, artifact: null });
  const [inventory, setInventory] = useState([]);
  const [isRealGPS, setIsRealGPS] = useState(false); 
  
  const [toastMsg, setToastMsg] = useState({ text: null, type: 'info' });
  const [showSplash, setShowSplash] = useState(true);
  const [fadeSplash, setFadeSplash] = useState(false);
  const [playerLoc, setPlayerLoc] = useState({ lat: 6.1194, lng: 100.3660, accuracy: 50 }); // Starting at Alor Setar

  const playClick = () => {
  clickSound.currentTime = 0;
  clickSound.play();
};

const playSuccess = () => {
  successSound.currentTime = 0;
  successSound.play();
};

const playError = () => {
  errorSound.currentTime = 0;
  errorSound.play();
};

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setFadeSplash(true); 
      const timer2 = setTimeout(() => setShowSplash(false), 500); 
      return () => clearTimeout(timer2);
    }, 3500); 
    return () => clearTimeout(timer1);
  }, []);

  const showNotification = (msg, type = 'info') => {
    setToastMsg({ text: msg, type });
    setTimeout(() => setToastMsg({ text: null, type: 'info' }), 4000);
  };

  const handleEnterAR = (poi, artifact) => {
    setActiveMission({ poi, artifact });
    setView('ar');
  };

  const handleCatch = () => setView('trivia');

  const handleTriviaSuccess = (artifactId) => {
    if (!inventory.includes(artifactId)) setInventory([...inventory, artifactId]);
    playSuccess();
    setView('map');
    showNotification("Tahniah, Artifact ini milik anda!.", "berjaya");
  };

  const handleTriviaFail = () => {
    playError();
    setView('map');
    setTimeout(() => showNotification("Oops! Jawapan tidak betul. Artifact itu telah melarikan diri!", "error"), 300);
  };

  return (
    <div className="w-full h-screen bg-gray-900 flex justify-center items-center font-sans overflow-hidden relative">
      {toastMsg.text && (
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-[2000] w-[90%] max-w-[350px] animate-[bounce_0.5s_ease-out]">
          <div className={`${toastMsg.type === 'error' ? 'bg-red-500' : 'bg-amber-500'} text-white px-5 py-3 rounded-2xl shadow-2xl text-center text-sm font-bold border-2 border-white flex items-center justify-center gap-2`}>
            {toastMsg.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
            <span>{toastMsg.text}</span>
          </div>
        </div>
      )}

      <div className="w-full max-w-[400px] h-full sm:h-[850px] sm:max-h-[90vh] bg-white relative flex flex-col shadow-[0_0_50px_rgba(0,0,0,0.3)] sm:rounded-[2.5rem] overflow-hidden sm:border-[12px] sm:border-gray-800">
        <div className="hidden sm:block absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[24px] bg-gray-800 rounded-b-3xl z-[1000]"></div>

        {showSplash && (
        <div className={`absolute inset-0 z-[9999] bg-gradient-to-br from-[#5C4033] to-[#8B5E3C] flex flex-col items-center justify-center text-white transition-opacity duration-500 ${fadeSplash ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
```
<div
  className="absolute inset-0 opacity-10"
  style={{
    backgroundImage:
      'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.4) 1px, transparent 0)',
    backgroundSize: '24px 24px'
  }}
></div>

<div className="relative z-10 flex flex-col items-center mt-[-40px]">
  
  <div className="relative mb-4">
    <div className="w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(0,0,0,0.4)] animate-[bounce_2s_infinite] border-4 border-white relative z-10">
      
      <div className="relative flex flex-col items-center text-[#B68D40] drop-shadow-md">
        <Footprints size={56} strokeWidth={2.5} />
      </div>

    </div>

    <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-black/30 rounded-full blur-md animate-pulse"></div>
  </div>

  <h1 className="text-[2.6rem] font-black mt-6 drop-shadow-lg text-center leading-[1.1] text-white tracking-tight">
    JEJAK DIRAJA
    <br />
    ALOR SETAR
  </h1>

  <div className="mt-4 bg-[#B68D40] text-white uppercase tracking-[0.25em] text-[10px] font-black px-4 py-1.5 rounded-full shadow-lg border-2 border-white">
    Warisan Kedah
  </div>
</div>

<div className="absolute bottom-8 w-full flex justify-center z-10">
  <p className="text-[#F5E6CC] text-sm font-medium tracking-wide">
    Terokai Warisan Kedah Melalui AR
  </p>
</div>
```

  </div>
)}


        <div className="flex-grow relative h-full w-full">
          {view === 'map' && <MapScreen playerLoc={playerLoc} setPlayerLoc={setPlayerLoc} onEnterAR={handleEnterAR} inventory={inventory} isRealGPS={isRealGPS} setIsRealGPS={setIsRealGPS} showNotification={showNotification} />}
          {view === 'ar' && activeMission.artifact && <ARScreen poi={activeMission.poi} artifact={activeMission.artifact} onCatch={handleCatch} onCancel={() => setView('map')} />}
          {view === 'trivia' && activeMission.artifact && <TriviaScreen artifact={activeMission.artifact} onSuccess={handleTriviaSuccess} onFail={handleTriviaFail} />}
          {view === 'inventory' && <InventoryScreen inventory={inventory} />}
        </div>

        {(view === 'map' || view === 'inventory') && (
          <div className="absolute bottom-0 w-full h-[85px] bg-white/95 backdrop-blur-xl border-t border-gray-100 flex justify-around items-center px-8 z-[500] pb-4 rounded-b-[2.5rem]">
            <button onClick={() => {
             playClick();
             setView('map');
             }} className={`flex flex-col items-center p-2 w-16 transition-all duration-300 ${view === 'map' ? 'text-amber-600 -translate-y-2' : 'text-gray-400 hover:text-gray-600'}`}>
              <div className={`p-2 rounded-2xl ${view === 'map' ? 'bg-amber-50' : ''}`}><MapPin size={26} strokeWidth={view === 'map' ? 2.5 : 2} /></div>
              <span className={`text-[10px] mt-1 ${view === 'map' ? 'font-black' : 'font-medium'}`}>Jelajah</span>
            </button>
            <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-amber-400 rounded-full flex items-center justify-center shadow-lg -mt-8 border-4 border-white transform hover:scale-105 transition-transform cursor-pointer">
               <Camera size={24} className="text-white" />
            </div>
            <button onClick={() => {
             playClick();
             setView('inventory');
             }} className={`flex flex-col items-center p-2 w-16 transition-all duration-300 relative ${view === 'inventory' ? 'text-amber-600 -translate-y-2' : 'text-gray-400 hover:text-gray-600'}`}>
              <div className={`p-2 rounded-2xl ${view === 'inventory' ? 'bg-amber-50' : ''}`}><Backpack size={26} strokeWidth={view === 'inventory' ? 2.5 : 2} /></div>
              <span className={`text-[10px] mt-1 ${view === 'inventory' ? 'font-black' : 'font-medium'}`}>Inventori</span>
              {inventory.length > 0 && (
                <span className="absolute top-1 right-2 bg-red-500 text-white text-[9px] font-black w-[18px] h-[18px] rounded-full flex items-center justify-center border-2 border-white shadow-sm z-10">{inventory.length}</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}