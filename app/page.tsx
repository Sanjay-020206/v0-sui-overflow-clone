"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function SuiOverflowPage() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [showWinners, setShowWinners] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const eventEndDate = new Date("2025-06-30T23:59:59")

    const updateCountdown = () => {
      const now = new Date()
      const difference = eventEndDate.getTime() - now.getTime()

      if (difference > 0) {
        setCountdown({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }

    updateCountdown()
    const timer = setInterval(updateCountdown, 1000)
    return () => clearInterval(timer)
  }, [])

  const triggerAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 2000)
  }

  const keyboardKeys = [
    {
      letter: "O",
      color: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
      position: "translate3d(-200px, -150px, 0px)",
      rotation: "rotateZ(12deg)",
    },
    {
      letter: "V",
      color: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)",
      position: "translate3d(-120px, -50px, 20px)",
      rotation: "rotateZ(-8deg)",
    },
    {
      letter: "E",
      color: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
      position: "translate3d(-40px, 20px, 40px)",
      rotation: "rotateZ(5deg)",
    },
    {
      letter: "R",
      color: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
      position: "translate3d(40px, -80px, 60px)",
      rotation: "rotateZ(-12deg)",
    },
    {
      letter: "F",
      color: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      position: "translate3d(-80px, 100px, 80px)",
      rotation: "rotateZ(18deg)",
    },
    {
      letter: "L",
      color: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
      position: "translate3d(0px, 180px, 100px)",
      rotation: "rotateZ(-5deg)",
    },
    {
      letter: "O",
      color: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
      position: "translate3d(80px, 120px, 120px)",
      rotation: "rotateZ(25deg)",
    },
    {
      letter: "W",
      color: "linear-gradient(135deg, #c084fc 0%, #a855f7 100%)",
      position: "translate3d(160px, 60px, 140px)",
      rotation: "rotateZ(-20deg)",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-30 transition-all duration-1000"
        style={{
          backgroundImage: `
            linear-gradient(to right, #3b82f6 1px, transparent 1px),
            linear-gradient(to bottom, #3b82f6 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: isAnimating ? "scale(1.05) rotate(1deg)" : "scale(1)",
        }}
      />

      <div className="relative z-10 flex min-h-screen">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 max-w-2xl">
          <div className="space-y-8">
            <div className={`transition-all duration-1000 ${isAnimating ? "scale-105" : ""}`}>
              <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 leading-none">Sui</h1>
              <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 leading-none">Overflow</h1>
              <h1 className="text-6xl lg:text-8xl font-bold text-gray-900 leading-none">2025</h1>
            </div>

            <p className="text-xl text-gray-700 font-medium">February-June, 2025</p>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Event Countdown</h3>
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{countdown.days}</div>
                  <div className="text-sm text-gray-600">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{countdown.hours}</div>
                  <div className="text-sm text-gray-600">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{countdown.minutes}</div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{countdown.seconds}</div>
                  <div className="text-sm text-gray-600">Seconds</div>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={() => setShowWinners(!showWinners)}
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-lg font-medium rounded-lg flex items-center gap-3 w-fit transition-all duration-300 hover:scale-105"
              >
                {showWinners ? "Hide Winners" : "See Winners"}
                <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Button>

              <Button
                onClick={triggerAnimation}
                variant="outline"
                className="px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Animate Keys
              </Button>
            </div>

            {showWinners && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl p-6 shadow-lg animate-in slide-in-from-bottom duration-500">
                <h3 className="text-xl font-bold text-gray-900 mb-4">🏆 Previous Winners</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <div className="font-semibold">DeFi Protocol Builder</div>
                      <div className="text-sm text-gray-600">$50,000 Prize</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <div className="font-semibold">NFT Marketplace</div>
                      <div className="text-sm text-gray-600">$30,000 Prize</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
                    <div className="w-8 h-8 bg-orange-400 rounded-full flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <div className="font-semibold">Gaming Platform</div>
                      <div className="text-sm text-gray-600">$20,000 Prize</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right 3D Keyboard Keys */}
        <div className="flex-1 flex items-center justify-center relative">
          <div className="relative w-full h-full flex items-center justify-center">
            {keyboardKeys.map((key, index) => (
              <div
                key={`${key.letter}-${index}`}
                className={`absolute w-20 h-20 rounded-xl shadow-2xl cursor-pointer transition-all duration-500 ${
                  hoveredKey === `${key.letter}-${index}` ? "scale-110" : ""
                } ${isAnimating ? "animate-bounce" : ""}`}
                style={{
                  background: key.color,
                  transform: `rotateX(45deg) rotateY(-15deg) ${key.rotation} ${key.position} ${
                    hoveredKey === `${key.letter}-${index}` ? "translateZ(20px)" : ""
                  }`,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.3), inset 0 -8px 0 rgba(0,0,0,0.2)",
                  animationDelay: `${index * 0.1}s`,
                }}
                onMouseEnter={() => setHoveredKey(`${key.letter}-${index}`)}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() => {
                  console.log(`[v0] Clicked key: ${key.letter}`)
                  triggerAnimation()
                }}
              >
                <div
                  className={`w-full h-full flex items-center justify-center text-2xl font-bold ${
                    key.letter === "E" || key.letter === "R" || key.letter === "F" ? "text-white" : "text-gray-900"
                  }`}
                >
                  {key.letter}
                </div>
              </div>
            ))}

            {/* Star shapes with hover effects */}
            <div
              className="absolute w-16 h-16 rounded-xl shadow-xl cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                transform: "rotateX(45deg) rotateY(-15deg) rotateZ(45deg) translate3d(-250px, -50px, -20px)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.2), inset 0 -6px 0 rgba(0,0,0,0.1)",
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
              onClick={() => console.log("[v0] Star clicked!")}
            />

            <div
              className="absolute w-12 h-12 rounded-xl shadow-xl cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                transform: "rotateX(45deg) rotateY(-15deg) rotateZ(-30deg) translate3d(-150px, -200px, 10px)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.2), inset 0 -6px 0 rgba(0,0,0,0.1)",
                clipPath:
                  "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
              }}
              onClick={() => console.log("[v0] Small star clicked!")}
            />

            {/* Interactive browser window */}
            <div
              className="absolute w-32 h-20 rounded-xl shadow-xl bg-white cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                transform: "rotateX(45deg) rotateY(-15deg) rotateZ(8deg) translate3d(200px, -100px, 30px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3), inset 0 -8px 0 rgba(0,0,0,0.1)",
              }}
              onClick={() => console.log("[v0] Browser window clicked!")}
            >
              <div className="w-full h-6 bg-gray-200 rounded-t-xl flex items-center px-3 gap-1">
                <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <div className="p-3 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <div className="text-lg">{"</>"}</div>
                </div>
              </div>
            </div>

            {/* Number 1 key */}
            <div
              className="absolute w-16 h-16 rounded-xl shadow-xl cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)",
                transform: "rotateX(45deg) rotateY(-15deg) rotateZ(-15deg) translate3d(250px, -200px, 50px)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.2), inset 0 -6px 0 rgba(0,0,0,0.1)",
              }}
              onClick={() => console.log("[v0] Number 1 key clicked!")}
            >
              <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-900">1</div>
            </div>

            {/* Chat bubble */}
            <div
              className="absolute w-24 h-16 rounded-xl shadow-xl bg-white cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                transform: "rotateX(45deg) rotateY(-15deg) rotateZ(12deg) translate3d(-50px, 250px, 160px)",
                boxShadow: "0 20px 40px rgba(0,0,0,0.3), inset 0 -8px 0 rgba(0,0,0,0.1)",
              }}
              onClick={() => console.log("[v0] Chat bubble clicked!")}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Pencil */}
            <div
              className="absolute w-4 h-24 rounded-full shadow-xl cursor-pointer transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(180deg, #f3f4f6 0%, #f3f4f6 70%, #fbbf24 70%, #f59e0b 100%)",
                transform: "rotateX(45deg) rotateY(-15deg) rotateZ(35deg) translate3d(180px, 200px, 180px)",
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
              }}
              onClick={() => console.log("[v0] Pencil clicked!")}
            />
          </div>
        </div>
      </div>

      {hoveredKey && (
        <div className="fixed top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-in slide-in-from-top duration-200">
          <div className="text-sm font-medium text-gray-900">Key: {hoveredKey.split("-")[0]}</div>
        </div>
      )}
    </div>
  )
}
