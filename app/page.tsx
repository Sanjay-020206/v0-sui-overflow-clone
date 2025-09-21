"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"

export default function NutpamPage() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [hoveredKey, setHoveredKey] = useState<string | null>(null)
  const [showWinners, setShowWinners] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isDarkMode, setIsDarkMode] = useState(true) // Default to dark mode for NUTPAM
  const [showRegistration, setShowRegistration] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")
  const [language, setLanguage] = useState<"en" | "ta">("en") // Added Tamil language support

  const [registrationStep, setRegistrationStep] = useState(1)
  const [registrationData, setRegistrationData] = useState({
    teamName: "",
    teamLeader: "",
    teamLeaderEmail: "",
    problemStatement: "",
    teamMembers: [
      { name: "", email: "", role: "Member" },
      { name: "", email: "", role: "Member" },
    ],
    college: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const problemStatements = {
    en: [
      "AI-Powered Healthcare Solutions",
      "Sustainable Smart City Infrastructure",
      "Educational Technology for Rural Areas",
      "Blockchain-based Supply Chain Management",
      "IoT Solutions for Agriculture",
      "Cybersecurity for Small Businesses",
      "Mental Health Support Platform",
      "Climate Change Monitoring System",
    ],
    ta: [
      "AI-சக்தி வாய்ந்த சுகாதார தீர்வுகள்",
      "நிலையான ஸ்மார்ட் நகர உள்கட்டமைப்பு",
      "கிராமப்புற பகுதிகளுக்கான கல்வி தொழில்நுட்பம்",
      "பிளாக்செயின் அடிப்படையிலான விநியோக சங்கிலி மேலாண்மை",
      "விவசாயத்திற்கான IoT தீர்வுகள்",
      "சிறு வணிகங்களுக்கான சைபர் பாதுகாப்பு",
      "மனநல ஆதரவு தளம்",
      "காலநிலை மாற்ற கண்காணிப்பு அமைப்பு",
    ],
  }

  useEffect(() => {
    const eventDate = new Date("2025-09-22T09:00:00")

    const updateCountdown = () => {
      const now = new Date()
      const difference = eventDate.getTime() - now.getTime()

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

  useEffect(() => {
    const savedTheme = localStorage.getItem("nutpam-theme")
    if (savedTheme === "light") {
      setIsDarkMode(false)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDarkMode
    setIsDarkMode(newTheme)
    localStorage.setItem("nutpam-theme", newTheme ? "dark" : "light")
  }

  const triggerAnimation = () => {
    setIsAnimating(true)
    setTimeout(() => setIsAnimating(false), 2000)
  }

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Validate required fields
      if (
        !registrationData.teamName ||
        !registrationData.teamLeader ||
        !registrationData.teamLeaderEmail ||
        !registrationData.problemStatement ||
        !registrationData.college ||
        !registrationData.phone ||
        registrationData.teamMembers.some((member) => !member.name || !member.email)
      ) {
        throw new Error("All fields are required")
      }

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store registration data in localStorage for persistence
      const registrations = JSON.parse(localStorage.getItem("nutpam-registrations") || "[]")
      registrations.push({
        ...registrationData,
        id: Date.now(),
        timestamp: new Date().toISOString(),
      })
      localStorage.setItem("nutpam-registrations", JSON.stringify(registrations))

      setIsSubmitting(false)
      setSubmitSuccess(true)

      setTimeout(() => {
        setSubmitSuccess(false)
        setShowRegistration(false)
        setRegistrationStep(1)
        setRegistrationData({
          teamName: "",
          teamLeader: "",
          teamLeaderEmail: "",
          problemStatement: "",
          teamMembers: [
            { name: "", email: "", role: "Member" },
            { name: "", email: "", role: "Member" },
          ],
          college: "",
          phone: "",
        })
      }, 3000)
    } catch (error) {
      console.error("Registration error:", error)
      setIsSubmitting(false)
    }
  }

  const addTeamMember = () => {
    if (registrationData.teamMembers.length < 3) {
      setRegistrationData({
        ...registrationData,
        teamMembers: [...registrationData.teamMembers, { name: "", email: "", role: "Member" }],
      })
    }
  }

  const removeTeamMember = (index: number) => {
    if (registrationData.teamMembers.length > 2) {
      const newMembers = registrationData.teamMembers.filter((_, i) => i !== index)
      setRegistrationData({ ...registrationData, teamMembers: newMembers })
    }
  }

  const updateTeamMember = (index: number, field: string, value: string) => {
    const newMembers = [...registrationData.teamMembers]
    newMembers[index] = { ...newMembers[index], [field]: value }
    setRegistrationData({ ...registrationData, teamMembers: newMembers })
  }

  const nextStep = () => {
    if (registrationStep < 3) {
      setRegistrationStep(registrationStep + 1)
    }
  }

  const prevStep = () => {
    if (registrationStep > 1) {
      setRegistrationStep(registrationStep - 1)
    }
  }

  const keyboardKeys = [
    {
      letter: "N",
      tamil: "நு",
      color: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 50%, #6d28d9 100%)",
      position: "translate3d(-80px, -60px, 0px)", // Top left
      rotation: "rotateZ(-15deg)",
    },
    {
      letter: "U",
      tamil: "ட்",
      color: "linear-gradient(135deg, #ec4899 0%, #db2777 50%, #be185d 100%)",
      position: "translate3d(-20px, 20px, 20px)", // Left center
      rotation: "rotateZ(8deg)",
    },
    {
      letter: "T",
      tamil: "ப",
      color: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
      position: "translate3d(60px, -20px, 40px)", // Center
      rotation: "rotateZ(-5deg)",
    },
    {
      letter: "P",
      tamil: "ம்",
      color: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)",
      position: "translate3d(140px, 40px, 60px)", // Right center
      rotation: "rotateZ(12deg)",
    },
    {
      letter: "A",
      tamil: "அ",
      color: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)",
      position: "translate3d(200px, -40px, 80px)", // Top right
      rotation: "rotateZ(-18deg)",
    },
    {
      letter: "M",
      tamil: "ம்",
      color: "linear-gradient(135deg, #06b6d4 0%, #0891b2 50%, #0e7490 100%)",
      position: "translate3d(260px, 20px, 100px)", // Far right
      rotation: "rotateZ(6deg)",
    },
  ]

  const navigationSections = [
    { id: "overview", label: language === "en" ? "Overview" : "மேலோட்டம்" },
    { id: "timeline", label: language === "en" ? "Timeline" : "கால அட்டவணை" },
    { id: "register", label: language === "en" ? "Register" : "பதிவு செய்க" },
    { id: "contact", label: language === "en" ? "Contact" : "தொடர்பு" },
  ]

  const eventTimeline = [
    { time: "9:00 AM", event: language === "en" ? "NoCodeML Workshop" : "NoCodeML பட்டறை", completed: false },
    {
      time: "11:00 AM",
      event: language === "en" ? "Problem Statements Disclosure" : "பிரச்சனை அறிக்கை வெளியீடு",
      completed: false,
    },
    { time: "12:00 PM", event: language === "en" ? "Hackathon Begins" : "ஹேக்கத்தான் தொடக்கம்", completed: false },
    { time: "2:00 PM", event: language === "en" ? "Level 1 Review" : "நிலை 1 மதிப்பீடு", completed: false },
    { time: "4:00 PM", event: language === "en" ? "Final Review" : "இறுதி மதிப்பீடு", completed: false },
    { time: "5:30 PM", event: language === "en" ? "Winners Announcement" : "வெற்றியாளர் அறிவிப்பு", completed: false },
  ]

  const content = {
    en: {
      title: "NUTPAM 2025",
      subtitle: "September 22, 2025",
      description: "National University of Technology Programming and Machine Learning Hackathon",
      registerBtn: "Register Now",
      seeTimeline: "View Timeline",
      countdown: "Event Countdown",
      overview: "Overview",
      about:
        "Join us for an exciting 8-hour hackathon featuring NoCodeML workshops, innovative problem-solving, and amazing prizes!",
      location: "National University of Technology",
      duration: "8 Hours of Innovation",
      participants: "Teams of 2-4 members",
    },
    ta: {
      title: "நுட்பம் 2025",
      subtitle: "செப்டம்பர் 22, 2025",
      description: "தேசிய தொழில்நுட்ப பல்கலைக்கழகம் நிரலாக்க மற்றும் இயந்திர கற்றல் ஹேக்கத்தான்",
      registerBtn: "இப்போது பதிவு செய்க",
      seeTimeline: "கால அட்டவணையைப் பார்க்க",
      countdown: "நிகழ்வு கவுண்ட்டவுன்",
      overview: "மேலோட்டம்",
      about: "NoCodeML பட்டறைகள், புதுமையான பிரச்சனை தீர்வு மற்றும் அற்புதமான பரிசுகளுடன் 8 மணி நேர ஹேக்கத்தானில் எங்களுடன் சேருங்கள்!",
      location: "தேசிய தொழில்நுட்ப பல்கலைக்கழகம்",
      duration: "8 மணி நேர புதுமை",
      participants: "2-4 உறுப்பினர்களின் குழுக்கள்",
    },
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        isDarkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900"
          : "bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50"
      } relative overflow-hidden`}
    >
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${
          isDarkMode ? "bg-gray-900/80" : "bg-white/80"
        } backdrop-blur-sm border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
      >
        <div className="flex items-center justify-between px-8 py-4">
          <h1 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {language === "en" ? "NUTPAM '25" : "நுட்பம் '25"}
          </h1>
          <div className="flex items-center gap-4">
            <span className={`text-sm ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
              &lt;date&gt; {content[language].subtitle} &lt;/date&gt;
            </span>
            <div className="flex gap-2">
              <Button
                onClick={() => setLanguage("en")}
                variant={language === "en" ? "default" : "outline"}
                size="sm"
                className={`text-xs ${
                  language === "en"
                    ? "bg-purple-600 text-white"
                    : isDarkMode
                      ? "border-gray-600 text-white hover:bg-gray-700"
                      : "border-gray-300 text-gray-900 hover:bg-gray-50"
                }`}
              >
                EN
              </Button>
              <Button
                onClick={() => setLanguage("ta")}
                variant={language === "ta" ? "default" : "outline"}
                size="sm"
                className={`text-xs ${
                  language === "ta"
                    ? "bg-purple-600 text-white"
                    : isDarkMode
                      ? "border-gray-600 text-white hover:bg-gray-700"
                      : "border-gray-300 text-gray-900 hover:bg-gray-50"
                }`}
              >
                தமிழ்
              </Button>
            </div>
            <Button
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className={`${
                isDarkMode
                  ? "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  : "bg-white border-gray-300 text-gray-900 hover:bg-gray-50"
              }`}
            >
              {isDarkMode ? "☀️" : "🌙"}
            </Button>
          </div>
        </div>
      </header>

      <div
        className={`absolute inset-0 opacity-20 transition-all duration-1000`}
        style={{
          backgroundImage: `
            linear-gradient(to right, ${isDarkMode ? "#8b5cf6" : "#6366f1"} 1px, transparent 1px),
            linear-gradient(to bottom, ${isDarkMode ? "#8b5cf6" : "#6366f1"} 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          transform: isAnimating ? "scale(1.05) rotate(1deg)" : "scale(1)",
        }}
      />

      <div className="relative z-10 flex min-h-screen pt-20">
        {/* Left Content */}
        <div className="flex-1 flex flex-col justify-center px-8 lg:px-16 max-w-2xl">
          <div className="space-y-8">
            <div className={`transition-all duration-1000 ${isAnimating ? "scale-105" : ""}`}>
              <h1
                className={`text-6xl lg:text-8xl font-bold leading-none ${isDarkMode ? "text-white" : "text-gray-900"}`}
              >
                {content[language].title}
              </h1>
            </div>

            <div className="space-y-2">
              <p className={`text-xl font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                {content[language].subtitle}
              </p>
            </div>

            <div className="space-y-3">
              <p className={`text-lg ${isDarkMode ? "text-purple-300" : "text-purple-700"}`}>
                {content[language].description}
              </p>
            </div>

            {activeSection === "overview" && (
              <div
                className={`${
                  isDarkMode ? "bg-gray-800/90" : "bg-white/90"
                } backdrop-blur-sm rounded-xl p-6 shadow-lg border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {content[language].overview}
                    </h3>
                    <p className={`mb-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      {content[language].about}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <div className={`font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"} mb-1`}>
                      {content[language].location}
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <div className={`font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"} mb-1`}>
                      {content[language].duration}
                    </div>
                  </div>
                  <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                    <div className={`font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"} mb-1`}>
                      {content[language].participants}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSection === "timeline" && (
              <div
                className={`${
                  isDarkMode ? "bg-gray-800/90" : "bg-white/90"
                } backdrop-blur-sm rounded-xl p-6 shadow-lg border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <div className="mb-6">
                  <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                    {language === "en" ? "Event Timeline - September 22, 2025" : "நிகழ்வு கால அட்டவணை - செப்டம்பர் 22, 2025"}
                  </h3>
                </div>

                <div className="space-y-4">
                  {eventTimeline.map((item, index) => (
                    <div
                      key={index}
                      className={`flex items-start gap-4 p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}
                    >
                      <div
                        className={`w-3 h-3 rounded-full mt-2 ${index === eventTimeline.length - 1 ? "bg-green-500" : isDarkMode ? "bg-purple-400" : "bg-purple-600"}`}
                      />
                      <div className="flex-1">
                        <div className={`font-mono text-sm ${isDarkMode ? "text-purple-400" : "text-purple-600"} mb-1`}>
                          {item.time}
                        </div>
                        <div className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>{item.event}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "contact" && (
              <div
                className={`${
                  isDarkMode ? "bg-gray-800/90" : "bg-white/90"
                } backdrop-blur-sm rounded-xl p-6 shadow-lg border ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className={`text-xl font-bold mb-4 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {language === "en" ? "Contact Information" : "தொடர்பு தகவல்"}
                    </h3>
                    <div className="space-y-4">
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                        <div className={`font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"} mb-1`}>
                          {language === "en" ? "Email" : "மின்னஞ்சல்"}
                        </div>
                        <div className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          nutpam2025@university.edu
                        </div>
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                        <div className={`font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"} mb-1`}>
                          {language === "en" ? "Phone" : "தொலைபேசி"}
                        </div>
                        <div className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>+91 98765 43210</div>
                      </div>
                      <div className={`p-4 rounded-lg ${isDarkMode ? "bg-gray-700/50" : "bg-gray-50"}`}>
                        <div className={`font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"} mb-1`}>
                          {language === "en" ? "Location" : "இடம்"}
                        </div>
                        <div className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                          {language === "en"
                            ? "National University of Technology, Main Campus"
                            : "தேசிய தொழில்நுட்ப பல்கலைக்கழகம், முக்கிய வளாகம்"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={() => setShowRegistration(true)}
                className={`${
                  isDarkMode ? "bg-purple-600 hover:bg-purple-700" : "bg-purple-600 hover:bg-purple-700"
                } text-white px-8 py-6 text-lg font-medium rounded-lg transition-all duration-300 hover:scale-105`}
              >
                {content[language].registerBtn}
              </Button>

              <Button
                onClick={() => setActiveSection(activeSection === "timeline" ? "overview" : "timeline")}
                variant="outline"
                className={`${
                  isDarkMode ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"
                } text-white px-8 py-6 text-lg font-medium rounded-lg flex items-center gap-3 w-fit transition-all duration-300 hover:scale-105`}
              >
                {content[language].seeTimeline}
                <div
                  className={`w-6 h-6 ${
                    isDarkMode ? "bg-blue-400" : "bg-blue-500"
                  } rounded flex items-center justify-center`}
                >
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Button>
            </div>
          </div>
        </div>

        {/* Right 3D Keyboard Keys - Enhanced Design */}
        <div className="flex-1 flex items-center justify-center relative min-h-screen">
          <div
            className="absolute inset-0 opacity-90"
            style={{
              background: isDarkMode
                ? "linear-gradient(135deg, #581c87 0%, #7c3aed 50%, #3730a3 100%)"
                : "linear-gradient(135deg, #ddd6fe 0%, #c4b5fd 50%, #a78bfa 100%)",
            }}
          />

          <div className="relative w-full h-full flex items-center justify-center perspective-1000">
            {keyboardKeys.map((key, index) => (
              <div
                key={`${key.letter}-${index}`}
                className={`absolute w-28 h-28 rounded-2xl cursor-pointer transition-all duration-500 ${
                  hoveredKey === `${key.letter}-${index}` ? "scale-110" : ""
                } ${isAnimating ? "animate-bounce" : ""}`}
                style={{
                  background: key.color,
                  transform: `perspective(1000px) rotateX(15deg) rotateY(-10deg) ${key.rotation} ${key.position} ${
                    hoveredKey === `${key.letter}-${index}` ? "translateZ(30px)" : ""
                  }`,
                  boxShadow: `
                    0 25px 50px rgba(0,0,0,0.4),
                    0 15px 30px rgba(0,0,0,0.2),
                    inset 0 -8px 0 rgba(0,0,0,0.15),
                    inset 0 2px 0 rgba(255,255,255,0.2)
                  `,
                  animationDelay: `${index * 0.15}s`,
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={() => setHoveredKey(`${key.letter}-${index}`)}
                onMouseLeave={() => setHoveredKey(null)}
                onClick={() => {
                  console.log(`[v0] Clicked key: ${key.letter}`)
                  setLanguage(language === "en" ? "ta" : "en")
                  triggerAnimation()
                }}
              >
                <div className="w-full h-full flex flex-col items-center justify-center relative">
                  <div
                    className="text-2xl font-bold text-white drop-shadow-lg"
                    style={{
                      textShadow: "0 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.1)",
                    }}
                  >
                    {language === "en" ? key.letter : key.tamil}
                  </div>
                  <div
                    className="absolute inset-0 rounded-2xl opacity-20"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)",
                    }}
                  />
                </div>
              </div>
            ))}

            <div
              className="absolute w-20 h-20 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 50%, #d1d5db 100%)",
                transform:
                  "perspective(1000px) rotateX(15deg) rotateY(-10deg) rotateZ(25deg) translate3d(-200px, -100px, -20px)",
                boxShadow: `
                  0 20px 40px rgba(0,0,0,0.3),
                  0 10px 20px rgba(0,0,0,0.2),
                  inset 0 -6px 0 rgba(0,0,0,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.2)
                `,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onClick={() => console.log("[v0] Decorative element clicked!")}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-2xl font-bold text-gray-600 drop-shadow-sm">⌘</div>
              </div>
            </div>

            <div
              className="absolute w-16 h-16 rounded-xl cursor-pointer transition-all duration-300 hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%)",
                transform:
                  "perspective(1000px) rotateX(15deg) rotateY(-10deg) rotateZ(-20deg) translate3d(-150px, 120px, 10px)",
                boxShadow: `
                  0 15px 30px rgba(0,0,0,0.3),
                  0 8px 16px rgba(0,0,0,0.2),
                  inset 0 -4px 0 rgba(0,0,0,0.1),
                  inset 0 1px 0 rgba(255,255,255,0.2)
                `,
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onClick={() => console.log("[v0] Green element clicked!")}
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-xl font-bold text-white drop-shadow-sm">✓</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav
        className={`fixed bottom-0 left-0 right-0 ${
          isDarkMode ? "bg-gray-900/90" : "bg-white/90"
        } backdrop-blur-sm border-t ${isDarkMode ? "border-gray-700" : "border-gray-200"} z-40`}
      >
        <div className="flex items-center justify-center">
          {navigationSections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`px-6 py-4 text-sm font-medium transition-all duration-200 border-b-2 ${
                activeSection === section.id
                  ? isDarkMode
                    ? "border-purple-400 text-purple-400"
                    : "border-purple-600 text-purple-600"
                  : isDarkMode
                    ? "border-transparent text-gray-400 hover:text-white"
                    : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {showRegistration && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className={`${isDarkMode ? "bg-gray-900/95" : "bg-white/95"} backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full shadow-2xl border ${
              isDarkMode ? "border-purple-500/20" : "border-purple-200"
            } relative overflow-hidden max-h-[90vh] overflow-y-auto`}
          >
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `
                  linear-gradient(to right, ${isDarkMode ? "#8b5cf6" : "#6366f1"} 1px, transparent 1px),
                  linear-gradient(to bottom, ${isDarkMode ? "#8b5cf6" : "#6366f1"} 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px",
              }}
            />

            {submitSuccess ? (
              <div className="text-center relative z-10">
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <h3 className={`text-2xl font-bold mb-3 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                  {language === "en" ? "Registration Successful!" : "பதிவு வெற்றிகரமாக முடிந்தது!"}
                </h3>
                <p className={`text-lg ${isDarkMode ? "text-purple-300" : "text-purple-600"}`}>
                  {language === "en" ? "Welcome to NUTPAM 2025!" : "நுட்பம் 2025 க்கு வரவேற்கிறோம்!"}
                </p>
                <div
                  className={`mt-4 p-4 rounded-lg ${isDarkMode ? "bg-purple-900/30" : "bg-purple-50"} border ${isDarkMode ? "border-purple-500/20" : "border-purple-200"}`}
                >
                  <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                    {language === "en"
                      ? "Check your email for confirmation details"
                      : "உறுதிப்படுத்தல் விவரங்களுக்கு உங்கள் மின்னஞ்சலைச் சரிபார்க்கவும்"}
                  </p>
                </div>
              </div>
            ) : (
              <div className="relative z-10">
                {/* Stepper Header */}
                <div className="text-center mb-8">
                  <h3
                    className={`text-3xl font-bold mb-2 bg-gradient-to-r ${isDarkMode ? "from-purple-400 to-pink-400" : "from-purple-600 to-pink-600"} bg-clip-text text-transparent`}
                  >
                    {language === "en" ? "Team Registration" : "குழு பதிவு"}
                  </h3>

                  {/* Stepper */}
                  <div className="flex items-center justify-center mt-6 mb-8">
                    {[1, 2, 3].map((step) => (
                      <div key={step} className="flex items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            step <= registrationStep
                              ? "bg-purple-600 text-white"
                              : isDarkMode
                                ? "bg-gray-700 text-gray-400"
                                : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          {step < registrationStep ? "✓" : step}
                        </div>
                        {step < 3 && (
                          <div
                            className={`w-16 h-1 mx-2 transition-all duration-300 ${
                              step < registrationStep ? "bg-purple-600" : isDarkMode ? "bg-gray-700" : "bg-gray-200"
                            }`}
                          />
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-8 text-sm">
                    <span
                      className={`${registrationStep === 1 ? (isDarkMode ? "text-purple-400" : "text-purple-600") : isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {language === "en" ? "Team Info" : "குழு தகவல்"}
                    </span>
                    <span
                      className={`${registrationStep === 2 ? (isDarkMode ? "text-purple-400" : "text-purple-600") : isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {language === "en" ? "Problem & Members" : "பிரச்சனை & உறுப்பினர்கள்"}
                    </span>
                    <span
                      className={`${registrationStep === 3 ? (isDarkMode ? "text-purple-400" : "text-purple-600") : isDarkMode ? "text-gray-400" : "text-gray-500"}`}
                    >
                      {language === "en" ? "Review" : "மதிப்பீடு"}
                    </span>
                  </div>
                </div>

                <form onSubmit={handleRegistration} className="space-y-6">
                  {/* Step 1: Team Information */}
                  {registrationStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <label
                          className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-purple-300" : "text-purple-700"}`}
                        >
                          {language === "en" ? "Team Name" : "குழு பெயர்"} *
                        </label>
                        <input
                          type="text"
                          required
                          value={registrationData.teamName}
                          onChange={(e) => setRegistrationData({ ...registrationData, teamName: e.target.value })}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                            isDarkMode
                              ? "bg-gray-800/50 border-gray-600 text-white focus:border-purple-400 focus:bg-gray-800"
                              : "bg-white/80 border-gray-300 text-gray-900 focus:border-purple-500 focus:bg-white"
                          } focus:ring-2 focus:ring-purple-500/20 focus:outline-none backdrop-blur-sm`}
                          placeholder={language === "en" ? "Enter team name" : "குழு பெயரை உள்ளிடவும்"}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-purple-300" : "text-purple-700"}`}
                          >
                            {language === "en" ? "Team Leader Name" : "குழு தலைவர் பெயர்"} *
                          </label>
                          <input
                            type="text"
                            required
                            value={registrationData.teamLeader}
                            onChange={(e) => setRegistrationData({ ...registrationData, teamLeader: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                              isDarkMode
                                ? "bg-gray-800/50 border-gray-600 text-white focus:border-purple-400 focus:bg-gray-800"
                                : "bg-white/80 border-gray-300 text-gray-900 focus:border-purple-500 focus:bg-white"
                            } focus:ring-2 focus:ring-purple-500/20 focus:outline-none backdrop-blur-sm`}
                            placeholder={language === "en" ? "Leader's full name" : "தலைவரின் முழு பெயர்"}
                          />
                        </div>
                        <div>
                          <label
                            className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-purple-300" : "text-purple-700"}`}
                          >
                            {language === "en" ? "Leader's Email" : "தலைவரின் மின்னஞ்சல்"} *
                          </label>
                          <input
                            type="email"
                            required
                            value={registrationData.teamLeaderEmail}
                            onChange={(e) =>
                              setRegistrationData({ ...registrationData, teamLeaderEmail: e.target.value })
                            }
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                              isDarkMode
                                ? "bg-gray-800/50 border-gray-600 text-white focus:border-purple-400 focus:bg-gray-800"
                                : "bg-white/80 border-gray-300 text-gray-900 focus:border-purple-500 focus:bg-white"
                            } focus:ring-2 focus:ring-purple-500/20 focus:outline-none backdrop-blur-sm`}
                            placeholder="leader@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label
                            className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-purple-300" : "text-purple-700"}`}
                          >
                            {language === "en" ? "College/University" : "கல்லூரி/பல்கலைக்கழகம்"} *
                          </label>
                          <input
                            type="text"
                            required
                            value={registrationData.college}
                            onChange={(e) => setRegistrationData({ ...registrationData, college: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                              isDarkMode
                                ? "bg-gray-800/50 border-gray-600 text-white focus:border-purple-400 focus:bg-gray-800"
                                : "bg-white/80 border-gray-300 text-gray-900 focus:border-purple-500 focus:bg-white"
                            } focus:ring-2 focus:ring-purple-500/20 focus:outline-none backdrop-blur-sm`}
                            placeholder={language === "en" ? "Your institution name" : "உங்கள் நிறுவன பெயர்"}
                          />
                        </div>
                        <div>
                          <label
                            className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-purple-300" : "text-purple-700"}`}
                          >
                            {language === "en" ? "Phone Number" : "தொலைபேசி எண்"} *
                          </label>
                          <input
                            type="tel"
                            required
                            value={registrationData.phone}
                            onChange={(e) => setRegistrationData({ ...registrationData, phone: e.target.value })}
                            className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                              isDarkMode
                                ? "bg-gray-800/50 border-gray-600 text-white focus:border-purple-400 focus:bg-gray-800"
                                : "bg-white/80 border-gray-300 text-gray-900 focus:border-purple-500 focus:bg-white"
                            } focus:ring-2 focus:ring-purple-500/20 focus:outline-none backdrop-blur-sm`}
                            placeholder="+91 98765 43210"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Problem Statement & Team Members */}
                  {registrationStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <label
                          className={`block text-sm font-semibold mb-2 ${isDarkMode ? "text-purple-300" : "text-purple-700"}`}
                        >
                          {language === "en" ? "Problem Statement" : "பிரச்சனை அறிக்கை"} *
                        </label>
                        <select
                          required
                          value={registrationData.problemStatement}
                          onChange={(e) =>
                            setRegistrationData({ ...registrationData, problemStatement: e.target.value })
                          }
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                            isDarkMode
                              ? "bg-gray-800/50 border-gray-600 text-white focus:border-purple-400 focus:bg-gray-800"
                              : "bg-white/80 border-gray-300 text-gray-900 focus:border-purple-500 focus:bg-white"
                          } focus:ring-2 focus:ring-purple-500/20 focus:outline-none backdrop-blur-sm`}
                        >
                          <option value="">
                            {language === "en" ? "Select a problem statement" : "பிரச்சனை அறிக்கையைத் தேர்ந்தெடுக்கவும்"}
                          </option>
                          {problemStatements[language].map((statement, index) => (
                            <option key={index} value={statement}>
                              {statement}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <label
                            className={`block text-sm font-semibold ${isDarkMode ? "text-purple-300" : "text-purple-700"}`}
                          >
                            {language === "en" ? "Team Members (2-3 members)" : "குழு உறுப்பினர்கள் (2-3 உறுப்பினர்கள்)"} *
                          </label>
                          {registrationData.teamMembers.length < 3 && (
                            <Button
                              type="button"
                              onClick={addTeamMember}
                              variant="outline"
                              size="sm"
                              className={`${
                                isDarkMode
                                  ? "border-purple-500 text-purple-400 hover:bg-purple-900/20"
                                  : "border-purple-500 text-purple-600 hover:bg-purple-50"
                              }`}
                            >
                              + {language === "en" ? "Add Member" : "உறுப்பினர் சேர்க்க"}
                            </Button>
                          )}
                        </div>

                        <div className="space-y-4">
                          {registrationData.teamMembers.map((member, index) => (
                            <div
                              key={index}
                              className={`p-4 rounded-lg border ${isDarkMode ? "border-gray-600 bg-gray-800/30" : "border-gray-300 bg-gray-50"}`}
                            >
                              <div className="flex items-center justify-between mb-3">
                                <h4 className={`font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                                  {language === "en" ? `Member ${index + 1}` : `உறுப்பினர் ${index + 1}`}
                                </h4>
                                {registrationData.teamMembers.length > 2 && (
                                  <Button
                                    type="button"
                                    onClick={() => removeTeamMember(index)}
                                    variant="outline"
                                    size="sm"
                                    className="text-red-500 border-red-500 hover:bg-red-50"
                                  >
                                    {language === "en" ? "Remove" : "நீக்கு"}
                                  </Button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                <input
                                  type="text"
                                  required
                                  value={member.name}
                                  onChange={(e) => updateTeamMember(index, "name", e.target.value)}
                                  className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                                    isDarkMode
                                      ? "bg-gray-700/50 border-gray-600 text-white focus:border-purple-400"
                                      : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                                  } focus:ring-1 focus:ring-purple-500/20 focus:outline-none`}
                                  placeholder={language === "en" ? "Full name" : "முழு பெயர்"}
                                />
                                <input
                                  type="email"
                                  required
                                  value={member.email}
                                  onChange={(e) => updateTeamMember(index, "email", e.target.value)}
                                  className={`px-3 py-2 rounded-lg border transition-all duration-200 ${
                                    isDarkMode
                                      ? "bg-gray-700/50 border-gray-600 text-white focus:border-purple-400"
                                      : "bg-white border-gray-300 text-gray-900 focus:border-purple-500"
                                  } focus:ring-1 focus:ring-purple-500/20 focus:outline-none`}
                                  placeholder={language === "en" ? "Email address" : "மின்னஞ்சல் முகவரி"}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review */}
                  {registrationStep === 3 && (
                    <div className="space-y-6">
                      <h4 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                        {language === "en" ? "Review Your Registration" : "உங்கள் பதிவை மதிப்பீடு செய்யுங்கள்"}
                      </h4>

                      <div className={`p-6 rounded-lg ${isDarkMode ? "bg-gray-800/50" : "bg-gray-50"} space-y-4`}>
                        <div>
                          <span className={`font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                            {language === "en" ? "Team Name:" : "குழு பெயர்:"}
                          </span>
                          <span className={`ml-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {registrationData.teamName}
                          </span>
                        </div>
                        <div>
                          <span className={`font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                            {language === "en" ? "Team Leader:" : "குழு தலைவர்:"}
                          </span>
                          <span className={`ml-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {registrationData.teamLeader} ({registrationData.teamLeaderEmail})
                          </span>
                        </div>
                        <div>
                          <span className={`font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                            {language === "en" ? "College:" : "கல்லூரி:"}
                          </span>
                          <span className={`ml-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {registrationData.college}
                          </span>
                        </div>
                        <div>
                          <span className={`font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                            {language === "en" ? "Problem Statement:" : "பிரச்சனை அறிக்கை:"}
                          </span>
                          <span className={`ml-2 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                            {registrationData.problemStatement}
                          </span>
                        </div>
                        <div>
                          <span className={`font-semibold ${isDarkMode ? "text-purple-400" : "text-purple-600"}`}>
                            {language === "en" ? "Team Members:" : "குழு உறுப்பினர்கள்:"}
                          </span>
                          <div className="mt-2 space-y-1">
                            {registrationData.teamMembers.map((member, index) => (
                              <div key={index} className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                                {index + 1}. {member.name} ({member.email})
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 pt-6">
                    {registrationStep > 1 && (
                      <Button
                        type="button"
                        onClick={prevStep}
                        variant="outline"
                        className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          isDarkMode
                            ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                            : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        }`}
                      >
                        {language === "en" ? "Previous" : "முந்தைய"}
                      </Button>
                    )}

                    {registrationStep < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                      >
                        {language === "en" ? "Next Step" : "அடுத்த படி"}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none ${
                          isSubmitting ? "animate-pulse" : ""
                        }`}
                      >
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            {language === "en" ? "Registering..." : "பதிவு செய்கிறது..."}
                          </div>
                        ) : language === "en" ? (
                          "Register Team"
                        ) : (
                          "குழுவை பதிவு செய்க"
                        )}
                      </Button>
                    )}

                    <Button
                      type="button"
                      onClick={() => {
                        setShowRegistration(false)
                        setRegistrationStep(1)
                      }}
                      variant="outline"
                      className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                        isDarkMode
                          ? "border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white"
                          : "border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      }`}
                    >
                      {language === "en" ? "Cancel" : "ரத்து செய்க"}
                    </Button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {hoveredKey && (
        <div
          className={`fixed top-24 right-4 ${
            isDarkMode ? "bg-gray-800/90" : "bg-white/90"
          } backdrop-blur-sm rounded-lg p-3 shadow-lg animate-in slide-in-from-top duration-200 border ${
            isDarkMode ? "border-gray-700" : "border-gray-200"
          }`}
        >
          <div className={`text-sm font-medium ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            Key: {hoveredKey.split("-")[0]}
          </div>
        </div>
      )}
    </div>
  )
}
