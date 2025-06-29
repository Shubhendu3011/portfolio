"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, Menu, X, Github, Linkedin, Mail} from "lucide-react"
import { Phone } from "lucide-react";

interface NavigationProps {
  onSectionClick?: (section: string) => void
}

export function Navigation({ onSectionClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    if (onSectionClick) {
      onSectionClick(sectionId)
    }
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const downloadResume = () => {
    const resumeContent = `
SHUBHENDU JADHAV
Master's Student in Computer Science | SUNY Binghamton

Contact:
Email: shubhenduj1969@gmail.com
LinkedIn: linkedin.com/in/Shubhendu
GitHub: github.com/shubhendu3011
Phone: 607-235-1221

EDUCATION
Master of Computer Science - SUNY Binghamton (Aug 2023 – May 2025)
Bachelor of Engineering - Pune University (June 2018 – May 2022) - GPA: 8.31/10.0

EXPERIENCE
Software Developer Intern - Brain Vision Technologies (Apr 2022 - Sept 2022)
• Built full-stack web applications for scalable user management using Java, Spring Boot, React.js, MySQL
• Enhanced API response time by optimizing query logic and implementing caching mechanisms
• Automated 90% of regression tests using JUnit, Mockito, and Selenium, reducing QA effort by 40%
• Followed Agile methodologies with active participation in sprint planning and cross-functional collaboration

PROJECTS
Smart Class Registration System (Jan 2025 – Mar 2025)
• Designed role-based system with 100% accurate conflict detection and waitlist handling
• Integrated PDF export, email notifications, and real-time course updates
• Achieved 99% performance improvement with responsive React + Tailwind UI

Crypto Trading Platform (Aug 2024 – Dec 2024)
• Developed secure trading modules with Gemini, CoinGecko, Razorpay, and Stripe APIs
• Engineered microservices backend ensuring 95% uptime during trading sessions
• Boosted transaction speed by 70% with Redux-powered React frontend

Job Portal Platform (Jan 2024 – Mar 2024)
• Built and deployed full-stack portal on AWS EC2 with NGINX & Docker
• Integrated REST APIs achieving 40% faster application handling
• Improved user retention by 55% through responsive, intuitive UI

TECHNICAL SKILLS
Languages: Java, Python, C, C++, JavaScript, SQL
Frameworks: Spring Boot, Hibernate, React.js, Redux, RESTful APIs, JWT, Tailwind CSS
Concepts: Distributed Systems, System Design, Multithreading, Algorithms, Data Structures
Database: MySQL, Hibernate, MongoDB, Oracle
Cloud & Tools: AWS, Docker, NGINX, Git, Maven, JUnit, Mockito, Selenium
    `
    const blob = new Blob([resumeContent], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "Shubhendu_Jadhav_Resume.txt"
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50"
        : "bg-white/80 backdrop-blur-sm"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo/Name Section */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-amber-600 to-stone-600 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-md">
              S
            </div>
            <span className="font-semibold text-xl text-gray-800 tracking-tight">Shubhendu Jadhav</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("about")} className="text-gray-600 hover:text-amber-700 transition-colors font-medium">About</button>
            <button onClick={() => scrollToSection("experience")} className="text-gray-600 hover:text-amber-700 transition-colors font-medium">Experience</button>
            <button onClick={() => scrollToSection("projects")} className="text-gray-600 hover:text-amber-700 transition-colors font-medium">Projects</button>
            <button onClick={() => scrollToSection("skills")} className="text-gray-600 hover:text-amber-700 transition-colors font-medium">Skills</button>
            <button onClick={() => scrollToSection("contact")} className="text-gray-600 hover:text-amber-700 transition-colors font-medium">Contact</button>
          </div>

          {/* Desktop Social Icons & Resume */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://github.com/Shubhendu3011"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              title="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/Shubhendu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              title="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=shubhenduj1969@gmail.com"
  target="_blank"
  rel="noopener noreferrer"
  className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
  title="Email"
>
  <Mail className="w-5 h-5" />
</a>

            <a
              href="tel:607-235-1221"
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
              title="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-300 text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 font-medium ml-2"
              onClick={downloadResume}
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-200/50">
            <div className="flex flex-col gap-4">
              <button onClick={() => scrollToSection("about")} className="text-left text-gray-600 hover:text-amber-700 transition-colors font-medium py-2">About</button>
              <button onClick={() => scrollToSection("experience")} className="text-left text-gray-600 hover:text-amber-700 transition-colors font-medium py-2">Experience</button>
              <button onClick={() => scrollToSection("projects")} className="text-left text-gray-600 hover:text-amber-700 transition-colors font-medium py-2">Projects</button>
              <button onClick={() => scrollToSection("skills")} className="text-left text-gray-600 hover:text-amber-700 transition-colors font-medium py-2">Skills</button>
              <button onClick={() => scrollToSection("contact")} className="text-left text-gray-600 hover:text-amber-700 transition-colors font-medium py-2">Contact</button>

              {/* Mobile Social Icons */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200/50">
                <a
                  href="https://github.com/Shubhendu3011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://linkedin.com/in/Shubhendu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="mailto:shubhenduj1969@gmail.com" className="text-gray-500 hover:text-gray-700 transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="tel:607-235-1221" className="text-gray-500 hover:text-gray-700 transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-700 hover:bg-amber-50 hover:border-amber-300 hover:text-amber-700 font-medium mt-4 self-start"
                onClick={downloadResume}
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
