// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaArrowRight, FaMapMarkerAlt, FaClock, FaStar, FaBolt, FaTicketAlt, FaCreditCard } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import image from "../../assets/image.png"

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStat, setCurrentStat] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: <FaMapMarkerAlt className="w-5 h-5" />, value: "16", label: "Stations" },
    { icon: <FaClock className="w-5 h-5" />, value: "2min", label: "Avg Wait" },
    { icon: <FaStar className="w-5 h-5" />, value: "4.9", label: "Rating" }
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-20 left-20 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full bg-grid-pattern"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-20 flex flex-col lg:flex-row items-center gap-16">
        
        {/* Text Section */}
        <div className={`flex-1 text-center lg:text-left transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-6 hover:bg-green-200 transition-colors">
            <FaBolt className="w-4 h-4" />
            <span>Smart Metro Experience</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl lg:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-teal-600 to-blue-600 leading-tight mb-6">
            MRT-6
            <br />
            <span className="text-gray-800">MetroSheba</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl lg:text-2xl text-gray-600 max-w-2xl mb-8 leading-relaxed">
            Experience the future of urban transportation in Dhaka. 
            <span className="text-green-600 font-semibold"> Book instantly</span>, 
            <span className="text-teal-600 font-semibold"> travel smartly</span>, 
            <span className="text-blue-600 font-semibold"> arrive on time</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
            <a
              href="/book"
              className="group relative px-8 py-4 bg-gradient-to-r from-green-600 to-teal-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <FaTicketAlt className="w-5 h-5" /> Book Your Journey
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            <a
              href="/smart-card"
              className="group px-8 py-4 border-2 border-green-600 text-green-600 font-bold rounded-2xl hover:bg-green-600 hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                <FaCreditCard className="w-5 h-5" /> Smart Card
                <FaArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className={`flex items-center gap-2 transition-all duration-500 ${
                  currentStat === index ? 'scale-110 text-green-600' : 'text-gray-500'
                }`}
              >
                {stat.icon}
                <span className="font-bold text-2xl">{stat.value}</span>
                <span className="text-sm">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Image Section */}
        <div className={`flex-1 relative transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
          
          {/* Main Image Container */}
          <div className="relative">
            {/* Glowing Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-3xl blur-2xl opacity-20 animate-pulse"></div>
            
            {/* Image */}
            <div className="relative bg-white rounded-3xl shadow-2xl p-8 hover:shadow-3xl transition-shadow duration-500">
              <img
                src={image}
                alt="Metro Rail Illustration"
                className="w-max-5xl h-auto rounded-2xl transform hover:scale-105 transition-transform duration-700"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg p-4 animate-bounce">
              <div className="flex items-center gap-2 text-green-600">
                <FaClock className="w-5 h-5" />
                <span className="font-semibold">On Time</span>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg p-4 animate-bounce animation-delay-1000">
              <div className="flex items-center gap-2 text-teal-600">
                <IoSparkles className="w-5 h-5" />
                <span className="font-semibold">Fast & Safe</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            d="M0,0 C480,60 960,60 1440,0 L1440,120 L0,120 Z"
            fill="white"
            opacity="0.1"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </section>
  );
}