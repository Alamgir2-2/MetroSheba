import { useState, useEffect } from "react";
import { FaTrain, FaMapMarkerAlt, FaClock, FaStar, FaMoneyBillAlt, FaRoute, FaArrowRight, FaTicketAlt, FaCheck, FaQrcode, FaDownload } from "react-icons/fa";
import { QRCode } from 'react-qr-code';

const stations = [
  "Uttara North",
  "Uttara Center", 
  "Uttara South",
  "Pallabi",
  "Mirpur-11",
  "Mirpur-10",
  "Kazipara",
  "Shewrapara",
  "Agargaon",
  "Bijoy Sarani",
  "Farmgate",
  "Karwan Bazar",
  "Shahbagh",
  "Dhaka University",
  "Bangladesh Secretariat",
  "Motijheel",
];

const fareMatrix = {
  "Uttara North-Uttara Center": 20,
  "Uttara North-Uttara South": 20,
  "Uttara North-Pallabi": 30,
  "Uttara North-Mirpur-11": 30,
  "Uttara North-Mirpur-10": 40,
  "Uttara North-Kazipara": 40,
  "Uttara North-Shewrapara": 50,
  "Uttara North-Agargaon": 60,
  "Uttara North-Bijoy Sarani": 60,
  "Uttara North-Farmgate": 70,
  "Uttara North-Karwan Bazar": 80,
  "Uttara North-Shahbagh": 80,
  "Uttara North-Dhaka University": 90,
  "Uttara North-Bangladesh Secretariat": 90,
  "Uttara North-Motijheel": 100,
  
  "Uttara Center-Uttara South": 20,
  "Uttara Center-Pallabi": 20,
  "Uttara Center-Mirpur-11": 30,
  "Uttara Center-Mirpur-10": 30,
  "Uttara Center-Kazipara": 40,
  "Uttara Center-Shewrapara": 40,
  "Uttara Center-Agargaon": 50,
  "Uttara Center-Bijoy Sarani": 50,
  "Uttara Center-Farmgate": 60,
  "Uttara Center-Karwan Bazar": 70,
  "Uttara Center-Shahbagh": 70,
  "Uttara Center-Dhaka University": 80,
  "Uttara Center-Bangladesh Secretariat": 80,
  "Uttara Center-Motijheel": 90,
  
  "Uttara South-Pallabi": 20,
  "Uttara South-Mirpur-11": 20,
  "Uttara South-Mirpur-10": 30,
  "Uttara South-Kazipara": 30,
  "Uttara South-Shewrapara": 40,
  "Uttara South-Agargaon": 40,
  "Uttara South-Bijoy Sarani": 50,
  "Uttara South-Farmgate": 50,
  "Uttara South-Karwan Bazar": 60,
  "Uttara South-Shahbagh": 60,
  "Uttara South-Dhaka University": 70,
  "Uttara South-Bangladesh Secretariat": 70,
  "Uttara South-Motijheel": 80,
  
  "Pallabi-Mirpur-11": 20,
  "Pallabi-Mirpur-10": 20,
  "Pallabi-Kazipara": 30,
  "Pallabi-Shewrapara": 30,
  "Pallabi-Agargaon": 40,
  "Pallabi-Bijoy Sarani": 40,
  "Pallabi-Farmgate": 50,
  "Pallabi-Karwan Bazar": 50,
  "Pallabi-Shahbagh": 60,
  "Pallabi-Dhaka University": 60,
  "Pallabi-Bangladesh Secretariat": 70,
  "Pallabi-Motijheel": 70,
  
  "Mirpur-11-Mirpur-10": 20,
  "Mirpur-11-Kazipara": 20,
  "Mirpur-11-Shewrapara": 30,
  "Mirpur-11-Agargaon": 30,
  "Mirpur-11-Bijoy Sarani": 40,
  "Mirpur-11-Farmgate": 40,
  "Mirpur-11-Karwan Bazar": 50,
  "Mirpur-11-Shahbagh": 50,
  "Mirpur-11-Dhaka University": 60,
  "Mirpur-11-Bangladesh Secretariat": 60,
  "Mirpur-11-Motijheel": 70,
  
  "Mirpur-10-Kazipara": 20,
  "Mirpur-10-Shewrapara": 20,
  "Mirpur-10-Agargaon": 30,
  "Mirpur-10-Bijoy Sarani": 30,
  "Mirpur-10-Farmgate": 40,
  "Mirpur-10-Karwan Bazar": 40,
  "Mirpur-10-Shahbagh": 50,
  "Mirpur-10-Dhaka University": 50,
  "Mirpur-10-Bangladesh Secretariat": 60,
  "Mirpur-10-Motijheel": 60,
  
  "Kazipara-Shewrapara": 20,
  "Kazipara-Agargaon": 20,
  "Kazipara-Bijoy Sarani": 30,
  "Kazipara-Farmgate": 30,
  "Kazipara-Karwan Bazar": 40,
  "Kazipara-Shahbagh": 40,
  "Kazipara-Dhaka University": 50,
  "Kazipara-Bangladesh Secretariat": 50,
  "Kazipara-Motijheel": 60,
  
  "Shewrapara-Agargaon": 20,
  "Shewrapara-Bijoy Sarani": 20,
  "Shewrapara-Farmgate": 30,
  "Shewrapara-Karwan Bazar": 30,
  "Shewrapara-Shahbagh": 40,
  "Shewrapara-Dhaka University": 40,
  "Shewrapara-Bangladesh Secretariat": 50,
  "Shewrapara-Motijheel": 50,
  
  "Agargaon-Bijoy Sarani": 20,
  "Agargaon-Farmgate": 20,
  "Agargaon-Karwan Bazar": 30,
  "Agargaon-Shahbagh": 30,
  "Agargaon-Dhaka University": 40,
  "Agargaon-Bangladesh Secretariat": 40,
  "Agargaon-Motijheel": 50,
  
  "Bijoy Sarani-Farmgate": 20,
  "Bijoy Sarani-Karwan Bazar": 20,
  "Bijoy Sarani-Shahbagh": 30,
  "Bijoy Sarani-Dhaka University": 30,
  "Bijoy Sarani-Bangladesh Secretariat": 40,
  "Bijoy Sarani-Motijheel": 40,
  
  "Farmgate-Karwan Bazar": 20,
  "Farmgate-Shahbagh": 20,
  "Farmgate-Dhaka University": 30,
  "Farmgate-Bangladesh Secretariat": 30,
  "Farmgate-Motijheel": 40,
  
  "Karwan Bazar-Shahbagh": 20,
  "Karwan Bazar-Dhaka University": 20,
  "Karwan Bazar-Bangladesh Secretariat": 30,
  "Karwan Bazar-Motijheel": 30,
  
  "Shahbagh-Dhaka University": 20,
  "Shahbagh-Bangladesh Secretariat": 20,
  "Shahbagh-Motijheel": 30,
  
  "Dhaka University-Bangladesh Secretariat": 20,
  "Dhaka University-Motijheel": 20,
  
  "Bangladesh Secretariat-Motijheel": 20,
};

const paymentMethods = [
  { name: "bKash", color: "bg-pink-500 hover:bg-pink-600", icon: "💳" },
  { name: "Nagad", color: "bg-orange-500 hover:bg-orange-600", icon: "📱" },
  { name: "Rocket", color: "bg-purple-500 hover:bg-purple-600", icon: "🚀" },
  { name: "Credit/Debit", color: "bg-blue-500 hover:bg-blue-600", icon: "💰" },
];

export default function MetroRoutePage() {
  const [from, setFrom] = useState("Uttara North");
  const [to, setTo] = useState("Motijheel");
  const [fare, setFare] = useState(null);
  const [currentPage, setCurrentPage] = useState("booking");
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [travelTime, setTravelTime] = useState(null);
  const [ticketId, setTicketId] = useState(null);

  useEffect(() => {
    if (from && to && from !== to) {
      const key = `${from}-${to}`;
      const reverseKey = `${to}-${from}`;
      const calculatedFare = fareMatrix[key] || fareMatrix[reverseKey] || 
        Math.max(20, Math.abs(stations.indexOf(from) - stations.indexOf(to)) * 10);
      setFare(calculatedFare);
      
      const timeMins = Math.abs(stations.indexOf(from) - stations.indexOf(to)) * 2;
      setTravelTime(timeMins);
    } else {
      setFare(null);
      setTravelTime(null);
    }
  }, [from, to]);

  const generateTicketId = () => {
    const datePart = new Date().getTime().toString(36);
    const randomPart = Math.random().toString(36).substr(2, 5);
    return `MRT6-${datePart}-${randomPart}`.toUpperCase();
  };

  const handlePayment = async (method) => {
    setSelectedPayment(method);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      setTicketId(generateTicketId());
      setCurrentPage("success");
    }, 3000);
  };

  const resetBooking = () => {
    setCurrentPage("booking");
    setSelectedPayment(null);
    setIsProcessing(false);
    setTicketId(null);
  };

  const proceedToPayment = () => {
    setCurrentPage("payment");
  };

const downloadQRCode = () => {
  const svg = document.getElementById("ticketQRCode");
  const svgData = new XMLSerializer().serializeToString(svg);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const img = new Image();

  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);
    const pngFile = canvas.toDataURL("image/png");
    
    const downloadLink = document.createElement("a");
    downloadLink.href = pngFile;
    downloadLink.download = `MRT6-Ticket-${ticketId}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
};

  if (currentPage === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 py-12 px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center">
              <FaCheck className="text-white text-3xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">টিকিট বুকিং সম্পূর্ণ!</h2>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border-2 border-dashed border-green-300">
              <div className="flex justify-center mb-4">
                <QRCode
                  id="ticketQRCode"
                  value={`MRT6 Ticket\nFrom: ${from}\nTo: ${to}\nFare: ৳${fare}\nTime: ${travelTime} mins\nTicket ID: ${ticketId}\nDate: ${new Date().toLocaleString()}`}
                  size={200}
                  level="H"
                  //  marginSize={10} 
                  includeMargin={true}
                  // renderAs="svg"
                />
              </div>
              <p className="text-sm text-gray-600 mb-2">টিকেট আইডি: {ticketId}</p>
              <button
                onClick={downloadQRCode}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center mx-auto"
              >
                <FaDownload className="mr-2" />
                QR কোড ডাউনলোড
              </button>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">যাত্রা পথ</p>
              <p className="font-semibold text-lg">{from} → {to}</p>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div>
                  <p className="text-sm text-gray-600">ভাড়া</p>
                  <p className="font-medium">৳{fare}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">সময়</p>
                  <p className="font-medium">{travelTime} মিনিট</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">তারিখ</p>
                  <p className="font-medium">{new Date().toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">স্টেশন</p>
                  <p className="font-medium">
                    {Math.abs(stations.indexOf(from) - stations.indexOf(to))}
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={resetBooking}
              className="bg-teal-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
            >
              নতুন বুকিং
            </button>
            
            <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-800">
                <strong>দ্রষ্টব্য:</strong> এই QR কোডটি MRT-6 স্টেশনে স্ক্যান করে টিকেট ভেরিফাই করতে হবে।
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === "payment") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              💳 পেমেন্ট করুন
            </h1>
            <p className="text-gray-600">নিরাপদ এবং দ্রুত পেমেন্ট সিস্টেম</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-blue-200">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 flex items-center">
              <FaTicketAlt className="mr-3 text-blue-600" />
              যাত্রার বিবরণ
            </h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-green-500 mr-2" />
                  <span className="font-semibold">{from}</span>
                </div>
                <FaArrowRight className="text-blue-500" />
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-red-500 mr-2" />
                  <span className="font-semibold">{to}</span>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">ভাড়া</p>
                  <p className="text-xl font-bold text-green-600">৳{fare}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">সময়</p>
                  <p className="text-xl font-bold text-blue-600">{travelTime} মিনিট</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">স্টেশন</p>
                  <p className="text-xl font-bold text-purple-600">
                    {Math.abs(stations.indexOf(from) - stations.indexOf(to))}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!isProcessing && (
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-blue-200">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center">
                <FaMoneyBillAlt className="mr-3 text-green-600" />
                পেমেন্ট মেথড নির্বাচন করুন
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {paymentMethods.map((method) => (
                  <button
                    key={method.name}
                    onClick={() => handlePayment(method)}
                    className={`${method.color} text-white p-6 rounded-xl font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <div className="text-3xl mb-3">{method.icon}</div>
                    <div className="text-lg">{method.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center border border-blue-200">
              <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-blue-600 mx-auto mb-6"></div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                পেমেন্ট প্রক্রিয়াধীন...
              </h2>
              <p className="text-gray-600">
                {selectedPayment.name} দিয়ে পেমেন্ট প্রক্রিয়া চলছে
              </p>
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>দয়া করে অপেক্ষা করুন...</strong> আপনার পেমেন্ট নিরাপদভাবে প্রক্রিয়া করা হচ্ছে।
                </p>
              </div>
            </div>
          )}

          {!isProcessing && (
            <div className="text-center">
              <button
                onClick={() => setCurrentPage("booking")}
                className="bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
              >
                ← ফিরে যান
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4">
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-4">
          🚇 MRT-6 বুকিং সিস্টেম
        </h1>
        <p className="text-gray-600 text-lg">দ্রুত, সহজ এবং নিরাপদ যাত্রা - ১৬টি স্টেশন</p>
        <div className="mt-4 bg-yellow-100 border border-yellow-400 rounded-lg p-3 max-w-md mx-auto">
          <p className="text-sm text-yellow-800">
            <strong>বিশেষ নোটিশ:</strong> বর্তমানে ট্রেন শুধুমাত্র মতিঝিল পর্যন্ত চলাচল করে। কমলাপুর স্টেশন এখনও চালু হয়নি।
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <FaMapMarkerAlt className="text-green-500 mr-2" />
                কোথা থেকে
              </label>
              <select
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors bg-white shadow-sm"
              >
                {stations.map((station) => (
                  <option key={station} value={station}>{station}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 p-4 rounded-full">
                <FaArrowRight className="text-white text-xl" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-3">
                <FaMapMarkerAlt className="text-red-500 mr-2" />
                কোথায় যাবেন
              </label>
              <select
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors bg-white shadow-sm"
              >
                {stations.map((station) => (
                  <option key={station} value={station}>{station}</option>
                ))}
              </select>
            </div>
          </div>

          {fare && (
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 mb-6 border border-teal-200">
              <div className="grid md:grid-cols-3 gap-4 text-center">
                <div className="flex items-center justify-center space-x-2">
                  <FaMoneyBillAlt className="text-green-600 text-2xl" />
                  <div>
                    <p className="text-sm text-gray-600">ভাড়া</p>
                    <p className="text-2xl font-bold text-green-600">৳{fare}</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <FaClock className="text-blue-600 text-2xl" />
                  <div>
                    <p className="text-sm text-gray-600">সময়</p>
                    <p className="text-2xl font-bold text-blue-600">{travelTime} মিনিট</p>
                  </div>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <FaRoute className="text-purple-600 text-2xl" />
                  <div>
                    <p className="text-sm text-gray-600">স্টেশন</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {Math.abs(stations.indexOf(from) - stations.indexOf(to))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {fare && (
            <div className="text-center">
              <button
                onClick={proceedToPayment}
                className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-teal-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
              >
                <FaTicketAlt className="inline mr-2" />
                পেমেন্ট করুন
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          🛤️ MRT-6 রুট ম্যাপ
        </h2>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full"></div>
          
          {stations.map((station, index) => {
            const isFromStation = station === from;
            const isToStation = station === to;
            const isOnRoute = fare && (
              (stations.indexOf(from) <= index && index <= stations.indexOf(to)) ||
              (stations.indexOf(to) <= index && index <= stations.indexOf(from))
            );
            
            return (
              <div key={station} className="relative mb-6">
                <div
                  className={`absolute left-6 top-6 w-4 h-4 rounded-full border-4 ${
                    isFromStation ? 'bg-green-500 border-green-300 animate-pulse' :
                    isToStation ? 'bg-red-500 border-red-300 animate-pulse' :
                    isOnRoute ? 'bg-blue-500 border-blue-300' :
                    'bg-gray-300 border-gray-200'
                  }`}
                ></div>

                <div className={`ml-16 p-4 rounded-2xl transition-all duration-300 ${
                  isFromStation || isToStation 
                    ? 'bg-white shadow-xl border-2 border-teal-200 transform scale-105' 
                    : isOnRoute 
                      ? 'bg-blue-50 shadow-md border border-blue-200'
                      : 'bg-gray-50 shadow-sm border border-gray-200'
                }`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-lg font-semibold ${
                        isFromStation || isToStation ? 'text-teal-700' : 'text-gray-700'
                      }`}>
                        {station}
                      </h3>
                      <p className="text-sm text-gray-500">
                        MRT-6 স্টেশন {station === 'Motijheel' ? '(বর্তমান শেষ স্টেশন)' : ''}
                      </p>
                    </div>
                    {isFromStation && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        শুরু
                      </span>
                    )}
                    {isToStation && (
                      <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                        গন্তব্য
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          
          <div className="relative mb-6">
            <div className="absolute left-6 top-6 w-4 h-4 rounded-full border-4 bg-gray-400 border-gray-300 opacity-50"></div>
            <div className="ml-16 p-4 rounded-2xl bg-gray-100 border border-gray-300 opacity-50">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-500">Kamalapur</h3>
                  <p className="text-sm text-gray-400">শীঘ্রই আসছে...</p>
                </div>
                <span className="bg-gray-200 text-gray-600 px-3 py-1 rounded-full text-sm font-semibold">
                  নির্মাণাধীন
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}