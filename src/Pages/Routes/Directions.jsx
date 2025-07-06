import { useState, useEffect } from "react";
import { FaTrain, FaMapMarkerAlt, FaClock, FaRoute, FaTimes, FaPlay, FaPause, FaInfoCircle, FaWifi, FaParking, FaShoppingCart, FaHospital, FaUniversity, FaBuilding, FaStore } from "react-icons/fa";
import { IoLocation, IoTime, IoSpeedometer, IoNavigate } from "react-icons/io5";
import { MdAccessTime, MdLocationOn, MdTrain, MdDirectionsTransit, MdLocalActivity } from "react-icons/md";
import { RiLiveLine } from "react-icons/ri";

const stations = [
  { 
    id: 1,
    name: "উত্তরা উত্তর", 
    englishName: "Uttara North",
    code: "UN", 
    time: "০ মিনিট", 
    timeInMinutes: 0,
    landmark: "উত্তরা সেক্টর-১", 
    color: "#10b981",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🚗", name: "পার্কিং" },
      { icon: "🏧", name: "এটিএম" }
    ],
    x: 20,
    y: 8,
    category: "residential",
    description: "উত্তরা এলাকার প্রধান স্টেশন"
  },
  { 
    id: 2,
    name: "উত্তরা সেন্টার", 
    englishName: "Uttara Center",
    code: "UC", 
    time: "২ মিনিট", 
    timeInMinutes: 2,
    landmark: "উত্তরা সেক্টর-৩", 
    color: "#059669",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🏥", name: "হাসপাতাল" },
      { icon: "🍽️", name: "খাবার" }
    ],
    x: 22,
    y: 15,
    category: "commercial",
    description: "উত্তরার কেন্দ্রীয় বাণিজ্যিক এলাকা"
  },
  { 
    id: 3,
    name: "উত্তরা দক্ষিণ", 
    englishName: "Uttara South",
    code: "US", 
    time: "৪ মিনিট", 
    timeInMinutes: 4,
    landmark: "উত্তরা সেক্টর-৭", 
    color: "#047857",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🏪", name: "দোকান" }
    ],
    x: 25,
    y: 22,
    category: "mixed",
    description: "আবাসিক ও বাণিজ্যিক মিশ্র এলাকা"
  },
  { 
    id: 4,
    name: "পল্লবী", 
    englishName: "Pallabi",
    code: "PL", 
    time: "৬ মিনিট", 
    timeInMinutes: 6,
    landmark: "পল্লবী বাজার", 
    color: "#065f46",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🏪", name: "বাজার" },
      { icon: "🚌", name: "বাস স্ট্যান্ড" }
    ],
    x: 28,
    y: 30,
    category: "commercial",
    description: "স্থানীয় বাজার ও বাণিজ্যিক কেন্দ্র"
  },
  { 
    id: 5,
    name: "মিরপুর-১১", 
    englishName: "Mirpur-11",
    code: "M11", 
    time: "৮ মিনিট", 
    timeInMinutes: 8,
    landmark: "মিরপুর-১১ সার্কেল", 
    color: "#0891b2",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🏫", name: "স্কুল" },
      { icon: "🏥", name: "ক্লিনিক" }
    ],
    x: 32,
    y: 38,
    category: "residential",
    description: "মিরপুর-১১ এর প্রাণকেন্দ্র"
  },
  { 
    id: 6,
    name: "মিরপুর-১০", 
    englishName: "Mirpur-10",
    code: "M10", 
    time: "১০ মিনিট", 
    timeInMinutes: 10,
    landmark: "মিরপুর-১০ গোল চত্বর", 
    color: "#0e7490",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং সেন্টার" },
      { icon: "🏥", name: "হাসপাতাল" },
      { icon: "🏦", name: "ব্যাংক" },
      { icon: "🍽️", name: "রেস্তোরাঁ" }
    ],
    x: 35,
    y: 45,
    category: "major",
    description: "মিরপুরের প্রধান কেন্দ্রস্থল"
  },
  { 
    id: 7,
    name: "কাজীপাড়া", 
    englishName: "Kazipara",
    code: "KZ", 
    time: "১২ মিনিট", 
    timeInMinutes: 12,
    landmark: "কাজীপাড়া বাস স্ট্যান্ড", 
    color: "#155e75",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🚌", name: "বাস টার্মিনাল" }
    ],
    x: 38,
    y: 52,
    category: "transport",
    description: "গুরুত্বপূর্ণ পরিবহন কেন্দ্র"
  },
  { 
    id: 8,
    name: "শেওড়াপাড়া", 
    englishName: "Shewrapara",
    code: "SP", 
    time: "১৪ মিনিট", 
    timeInMinutes: 14,
    landmark: "শেওড়াপাড়া মোড়", 
    color: "#164e63",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🏪", name: "দোকান" },
      { icon: "🏥", name: "ক্লিনিক" }
    ],
    x: 42,
    y: 58,
    category: "residential",
    description: "আবাসিক এলাকার কেন্দ্রবিন্দু"
  },
  { 
    id: 9,
    name: "আগারগাঁও", 
    englishName: "Agargaon",
    code: "AG", 
    time: "১৬ মিনিট", 
    timeInMinutes: 16,
    landmark: "আগারগাঁও প্রশাসনিক এলাকা", 
    color: "#1e40af",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🏢", name: "অফিস" },
      { icon: "🏛️", name: "সরকারি অফিস" }
    ],
    x: 48,
    y: 62,
    category: "administrative",
    description: "সরকারি প্রশাসনিক এলাকা"
  },
  { 
    id: 10,
    name: "বিজয় সরণি", 
    englishName: "Bijoy Sarani",
    code: "BS", 
    time: "১৮ মিনিট", 
    timeInMinutes: 18,
    landmark: "বিজয় সরণি মোড়", 
    color: "#1d4ed8",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🏥", name: "হাসপাতাল" },
      { icon: "🏪", name: "দোকান" }
    ],
    x: 52,
    y: 68,
    category: "commercial",
    description: "বাণিজ্যিক ও চিকিৎসা কেন্দ্র"
  },
  { 
    id: 11,
    name: "ফার্মগেট", 
    englishName: "Farmgate",
    code: "FG", 
    time: "২০ মিনিট", 
    timeInMinutes: 20,
    landmark: "ফার্মগেট মোড়", 
    color: "#7c3aed",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং সেন্টার" },
      { icon: "🏢", name: "অফিস" },
      { icon: "🏦", name: "ব্যাংক" },
      { icon: "🍽️", name: "রেস্তোরাঁ" }
    ],
    x: 58,
    y: 72,
    category: "major",
    description: "ঢাকার প্রধান বাণিজ্যিক কেন্দ্র"
  },
  { 
    id: 12,
    name: "কারওয়ান বাজার", 
    englishName: "Karwan Bazar",
    code: "KB", 
    time: "২২ মিনিট", 
    timeInMinutes: 22,
    landmark: "কারওয়ান বাজার বাণিজ্যিক এলাকা", 
    color: "#8b5cf6",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "পাইকারি বাজার" },
      { icon: "🏢", name: "অফিস" },
      { icon: "🏪", name: "দোকান" },
      { icon: "📺", name: "মিডিয়া" }
    ],
    x: 65,
    y: 78,
    category: "commercial",
    description: "পাইকারি ও মিডিয়া কেন্দ্র"
  },
  { 
    id: 13,
    name: "শাহবাগ", 
    englishName: "Shahbagh",
    code: "SB", 
    time: "২৪ মিনিট", 
    timeInMinutes: 24,
    landmark: "শাহবাগ মোড়", 
    color: "#a855f7",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🏛️", name: "জাদুঘর" },
      { icon: "🌳", name: "উদ্যান" }
    ],
    x: 70,
    y: 82,
    category: "cultural",
    description: "সাংস্কৃতিক ও ঐতিহাসিক এলাকা"
  },
  { 
    id: 14,
    name: "ঢাকা বিশ্ববিদ্যালয়", 
    englishName: "Dhaka University",
    code: "DU", 
    time: "২৬ মিনিট", 
    timeInMinutes: 26,
    landmark: "ঢাকা বিশ্ববিদ্যালয়", 
    color: "#c084fc",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🏫", name: "বিশ্ববিদ্যালয়" },
      { icon: "📚", name: "লাইব্রেরি" },
      { icon: "🍽️", name: "ক্যাফেটেরিয়া" }
    ],
    x: 75,
    y: 88,
    category: "educational",
    description: "দেশের প্রধান শিক্ষা প্রতিষ্ঠান"
  },
  { 
    id: 15,
    name: "বাংলাদেশ সচিবালয়", 
    englishName: "Bangladesh Secretariat",
    code: "BDS", 
    time: "২৮ মিনিট", 
    timeInMinutes: 28,
    landmark: "সরকারি সচিবালয়", 
    color: "#dc2626",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং" },
      { icon: "🏢", name: "সরকারি অফিস" },
      { icon: "🏛️", name: "সচিবালয়" }
    ],
    x: 80,
    y: 92,
    category: "government",
    description: "সরকারের প্রধান কার্যালয়"
  },
  { 
    id: 16,
    name: "মতিঝিল", 
    englishName: "Motijheel",
    code: "MJ", 
    time: "৩০ মিনিট", 
    timeInMinutes: 30,
    landmark: "মতিঝিল বাণিজ্যিক এলাকা", 
    color: "#ef4444",
    facilities: [
      { icon: "🚻", name: "রেস্ট রুম" },
      { icon: "🛒", name: "শপিং সেন্টার" },
      { icon: "🏢", name: "অফিস" },
      { icon: "🏦", name: "ব্যাংক" },
      { icon: "🏨", name: "হোটেল" }
    ],
    x: 85,
    y: 95,
    category: "financial",
    description: "ঢাকার আর্থিক কেন্দ্র"
  }
];

const ticketPrices = [
  { distance: "১-৫ কিমি", price: "২০ টাকা" },
  { distance: "৫-১০ কিমি", price: "৩০ টাকা" },
  { distance: "১০-১৫ কিমি", price: "৪০ টাকা" },
  { distance: "১৫-২০ কিমি", price: "৬০ টাকা" },
  { distance: "২০+ কিমি", price: "১০০ টাকা" }
];

export default function DhakaMetroMap() {
  const [selectedStation, setSelectedStation] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedTrain, setAnimatedTrain] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [hoveredStation, setHoveredStation] = useState(null);
  const [showTicketInfo, setShowTicketInfo] = useState(false);
  const [routeFrom, setRouteFrom] = useState(null);
  const [routeTo, setRouteTo] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    let trainTimer;
    if (isPlaying) {
      trainTimer = setInterval(() => {
        setAnimatedTrain((prev) => (prev + 1) % stations.length);
      }, 1500);
    }

    return () => {
      clearInterval(timer);
      if (trainTimer) clearInterval(trainTimer);
    };
  }, [isPlaying]);

  const createPath = () => {
    const pathData = stations.map((station, index) => {
      const command = index === 0 ? 'M' : 'L';
      return `${command} ${station.x} ${station.y}`;
    }).join(' ');
    return pathData;
  };

  const calculateTravelTime = (from, to) => {
    if (!from || !to) return null;
    const timeDiff = Math.abs(to.timeInMinutes - from.timeInMinutes);
    const price = timeDiff <= 5 ? 20 : timeDiff <= 10 ? 30 : timeDiff <= 15 ? 40 : timeDiff <= 20 ? 60 : 100;
    return { time: timeDiff, price };
  };

  const travelInfo = calculateTravelTime(routeFrom, routeTo);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500 rounded-full opacity-10 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-500 rounded-full opacity-5 animate-ping"></div>
      </div> */}

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 pt-6 pb-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 mb-3 drop-shadow-lg">
              🚇 ঢাকা মেট্রো রেল
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              MRT-6 ইন্টারেক্টিভ যাত্রা গাইড
            </p>
            <p className="text-sm text-gray-400 mb-6">
              স্টেশনে ক্লিক করুন • রুট পরিকল্পনা করুন • রিয়েল টাইম তথ্য পান
            </p>
            
            {/* Live Info Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <RiLiveLine className="text-red-400 w-5 h-5 animate-pulse" />
                  <span className="text-sm font-semibold text-white">লাইভ সময়</span>
                </div>
                <div className="text-lg font-bold text-cyan-400">
                  {currentTime.toLocaleTimeString('bn-BD')}
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <MdTrain className="text-green-400 w-5 h-5" />
                  <span className="text-sm font-semibold text-white">স্টেশন</span>
                </div>
                <div className="text-lg font-bold text-green-400">১৬টি</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <IoTime className="text-blue-400 w-5 h-5" />
                  <span className="text-sm font-semibold text-white">সময়</span>
                </div>
                <div className="text-lg font-bold text-blue-400">৩০ মিনিট</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <IoSpeedometer className="text-purple-400 w-5 h-5" />
                  <span className="text-sm font-semibold text-white">গতি</span>
                </div>
                <div className="text-lg font-bold text-purple-400">৮০ কিমি/ঘ</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Sidebar - Controls */}
          <div className="lg:col-span-1 space-y-4">
            {/* Animation Control */}
            {/* <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <MdDirectionsTransit className="text-cyan-400" />
                ট্রেন নিয়ন্ত্রণ
              </h3>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all ${
                  isPlaying 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isPlaying ? <FaPause /> : <FaPlay />}
                {isPlaying ? 'বিরতি' : 'চালু'}
              </button>
            </div> */}

            {/* Route Planner */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <IoNavigate className="text-blue-400" />
                রুট পরিকল্পনা
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">শুরু</label>
                  <select 
                    value={routeFrom?.id || ''} 
                    onChange={(e) => setRouteFrom(stations.find(s => s.id === parseInt(e.target.value)))}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="">স্টেশন নির্বাচন করুন</option>
                    {stations.map(station => (
                      <option key={station.id} value={station.id} className="text-black">
                        {station.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">গন্তব্য</label>
                  <select 
                    value={routeTo?.id || ''} 
                    onChange={(e) => setRouteTo(stations.find(s => s.id === parseInt(e.target.value)))}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white text-sm"
                  >
                    <option value="">স্টেশন নির্বাচন করুন</option>
                    {stations.map(station => (
                      <option key={station.id} value={station.id} className="text-black">
                        {station.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                {travelInfo && (
                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-3 border border-cyan-400/30">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">সময়:</span>
                      <span className="font-bold text-cyan-400">{travelInfo.time} মিনিট</span>
                    </div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-sm text-gray-300">ভাড়া:</span>
                      <span className="font-bold text-green-400">{travelInfo.price} টাকা</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Current Train Location */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FaTrain className="text-yellow-400" />
                ষ্টেশন সমূহ
              </h3>
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-white font-bold">{stations[animatedTrain].code}</span>
                </div>
                <p className="text-white font-semibold">{stations[animatedTrain].name}</p>
                <p className="text-gray-300 text-sm">{stations[animatedTrain].landmark}</p>
              </div>
            </div>

            {/* Ticket Prices */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <FaInfoCircle className="text-green-400" />
                ভাড়ার তালিকা
              </h3>
              <div className="space-y-2">
                                {ticketPrices.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-1 border-b border-white/10">
                    <span className="text-sm text-gray-300">{item.distance}</span>
                    <span className="text-sm font-semibold text-green-400">{item.price}</span>
                  </div>
                ))}
                <button 
                  onClick={() => setShowTicketInfo(!showTicketInfo)}
                  className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                >
                  <FaInfoCircle /> {showTicketInfo ? 'কম দেখান' : 'আরও তথ্য'}
                </button>
                {showTicketInfo && (
                  <div className="mt-2 p-2 bg-black/20 rounded-lg text-xs text-gray-300">
                    <p>• শিশু (৩-১০ বছর): ৫০% ছাড়</p>
                    <p>• প্রতিবন্ধী: ৭৫% ছাড়</p>
                    <p>• সিনিয়র সিটিজেন: ৫০% ছাড়</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Map Area */}
          <div className="lg:col-span-3">
            <div className="relative bg-white/5 backdrop-blur-md border-2 border-white/20 rounded-2xl overflow-hidden p-4 h-[600px]">
              {/* Metro Line Path */}
              <svg 
                viewBox="0 0 100 100" 
                preserveAspectRatio="xMidYMid meet" 
                className="w-full h-full"
              >
                {/* Metro Line */}
                <path
                  d={createPath()}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="0.5,0.5"
                  className="text-gray-500"
                />

                {/* Station Circles */}
                {stations.map((station, index) => (
                  <g key={station.id}>
                    {/* Connection lines for hover effect */}
                    {hoveredStation === station.id && (
                      <line
                        x1={station.x}
                        y1={station.y}
                        x2={50}
                        y2={50}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="0.3"
                        strokeDasharray="0.2,0.2"
                      />
                    )}

                    {/* Station circle */}
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r={selectedStation?.id === station.id ? 1.8 : hoveredStation === station.id ? 1.5 : 1.2}
                      fill={station.color}
                      stroke="white"
                      strokeWidth="0.1"
                      onClick={() => setSelectedStation(station)}
                      onMouseEnter={() => setHoveredStation(station.id)}
                      onMouseLeave={() => setHoveredStation(null)}
                      className="cursor-pointer transition-all duration-200 hover:opacity-90"
                    />

                    {/* Station code label */}
                    <text
                      x={station.x}
                      y={station.y + 0.3}
                      textAnchor="middle"
                      fontSize="1.5"
                      fill="white"
                      className="pointer-events-none font-bold"
                    >
                      {station.code}
                    </text>

                    {/* Animated train */}
                    {animatedTrain === index && (
                      <circle
                        cx={station.x}
                        cy={station.y}
                        r="1"
                        fill="white"
                        className="animate-ping opacity-75"
                      />
                    )}
                  </g>
                ))}

                {/* Animated train icon */}
                {stations[animatedTrain] && (
                  <g transform={`translate(${stations[animatedTrain].x},${stations[animatedTrain].y})`}>
                    <FaTrain 
                      className="text-yellow-400" 
                      fontSize="2" 
                      x="-1" 
                      y="-1"
                    />
                  </g>
                )}
              </svg>

              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-2 text-xs">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-white">উত্তরা লাইন</span>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                  <span className="text-white">মিরপুর লাইন</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-white">সিটি লাইন</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Station Details */}
        {selectedStation && (
          <div className="mt-6 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 backdrop-blur-md rounded-2xl border border-white/20 overflow-hidden">
            <div className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full" style={{ backgroundColor: selectedStation.color }}></span>
                    {selectedStation.name}
                    <span className="text-sm font-normal text-gray-300">({selectedStation.englishName})</span>
                  </h2>
                  <p className="text-gray-300">{selectedStation.landmark}</p>
                </div>
                <button 
                  onClick={() => setSelectedStation(null)}
                  className="text-gray-400 hover:text-white"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-white/10 rounded-lg p-3">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1">
                    <FaClock /> সময় তথ্য
                  </h3>
                  <div className="space-y-1">
                    <p className="flex justify-between">
                      <span className="text-gray-400">স্টেশন কোড:</span>
                      <span className="font-medium text-white">{selectedStation.code}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-400">মোট সময়:</span>
                      <span className="font-medium text-white">{selectedStation.time}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-gray-400">স্টেশন ধরন:</span>
                      <span className="font-medium text-white capitalize">
                        {selectedStation.category === 'major' ? 'প্রধান স্টেশন' : 
                         selectedStation.category === 'commercial' ? 'বাণিজ্যিক' :
                         selectedStation.category === 'residential' ? 'আবাসিক' :
                         selectedStation.category === 'government' ? 'সরকারি' :
                         selectedStation.category === 'educational' ? 'শিক্ষা' : 
                         selectedStation.category}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1">
                    <FaMapMarkerAlt /> ল্যান্ডমার্ক
                  </h3>
                  <p className="text-white mb-3">{selectedStation.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedStation.facilities.map((facility, index) => (
                      <span 
                        key={index} 
                        className="text-xs bg-white/10 rounded-full px-2 py-1 flex items-center gap-1"
                      >
                        {facility.icon} {facility.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white/10 rounded-lg p-3">
                  <h3 className="text-sm font-semibold text-gray-300 mb-2 flex items-center gap-1">
                    <FaRoute /> সংযোগ
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">
                        B
                      </div>
                      <span className="text-white">বাস স্ট্যান্ড (200m)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                        R
                      </div>
                      <span className="text-white">রিকশা স্ট্যান্ড (100m)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-yellow-500 flex items-center justify-center text-white text-xs">
                        T
                      </div>
                      <span className="text-white">ট্যাক্সি স্ট্যান্ড (300m)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 py-6 text-center text-gray-400 text-sm">
        <p>© 2023 ঢাকা ম্যাস ট্রানজিট কোম্পানি লিমিটেড (ডিএমটিসিএল)</p>
        <p className="mt-1">সমস্ত অধিকার সংরক্ষিত | সংস্করণ 1.0.0</p>
      </div>

      {/* Animation styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}