"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp, ExternalLink, Github, Calendar, Users, Zap, Target, Award } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  technologies: string[]
  details: string
  features: string[]
  achievements: string[]
  duration: string
  team?: string
  link?: string
  githubLink?: string
}

export function ProjectCard({
  title,
  description,
  technologies,
  details,
  features,
  achievements,
  duration,
  team,
  link,
  githubLink,
}: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleCardClick = (e: React.MouseEvent) => {
    // Prevent expansion when clicking on action buttons
    if ((e.target as HTMLElement).closest("button")) {
      return
    }
    setIsExpanded(!isExpanded)
  }

  const handleExpandClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="group">
      <div
        className={`bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-xl hover:bg-white hover:border-gray-300/70 hover:scale-[1.01] hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 glass-card ${isExpanded ? "popup-bounce scale-[1.02]" : ""}`}
      >
        {/* Main Card Content - Clickable */}
        <div onClick={handleCardClick} className="cursor-pointer p-6">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-gray-800 group-hover:text-amber-700 transition-colors mb-2 subtle-color-shift">
                {title}
              </h4>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{duration}</span>
                </div>
                {team && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{team}</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              {githubLink && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(githubLink, "_blank")
                  }}
                  className="text-gray-600 hover:text-amber-700 transition-colors p-1 hover:scale-110"
                  title="View on GitHub"
                >
                  <Github className="w-4 h-4" />
                </button>
              )}
              {link && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(link, "_blank")
                  }}
                  className="text-gray-600 hover:text-stone-700 transition-colors p-1 hover:scale-110"
                  title="View Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={handleExpandClick}
                className={`text-gray-600 group-hover:text-amber-700 transition-all duration-300 p-1 ${isExpanded ? "rotate-180" : ""}`}
                title={isExpanded ? "Collapse details" : "Expand details"}
              >
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <p className="text-gray-700 text-sm mb-4 leading-relaxed">{description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full border border-gray-300/50 hover:scale-105 transition-transform duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Expandable Detailed Content - Fixed Height with Scroll */}
        {isExpanded && (
          <div className="border-t border-gray-200/50 popup-slide-in">
            <div className="max-h-[600px] overflow-y-auto px-6 py-6 space-y-8 custom-scrollbar">
              {/* Project Overview */}
              <div className="slide-in-left">
                <h5 className="text-amber-700 font-semibold mb-4 flex items-center gap-2 text-lg">
                  <Zap className="w-5 h-5" />
                  Project Overview & Architecture
                </h5>
                <div className="bg-gray-50/50 rounded-lg p-4 border border-gray-200/30 glass-card">
                  <p className="text-gray-700 text-sm leading-relaxed">{details}</p>
                </div>
              </div>

              {/* Key Features */}
              <div className="slide-in-right">
                <h5 className="text-amber-700 font-semibold mb-4 flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5" />
                  Key Features & Capabilities
                </h5>
                <div className="grid gap-3">
                  {features.map((feature, index) => (
                    <div
                      key={index}
                      className={`bg-stone-50/50 rounded-lg p-4 border border-stone-200/30 animate-fade-in-up glass-card stagger-${(index % 5) + 1}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-amber-600 mt-1 text-lg flex-shrink-0">•</span>
                        <p className="text-gray-700 text-sm leading-relaxed">{feature}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technical Achievements */}
              <div className="animate-fade-in-up">
                <h5 className="text-amber-700 font-semibold mb-4 flex items-center gap-2 text-lg">
                  <Award className="w-5 h-5" />
                  Technical Achievements & Impact
                </h5>
                <div className="grid gap-3">
                  {achievements.map((achievement, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r from-green-50/50 to-emerald-50/50 rounded-lg p-4 border border-green-200/30 animate-fade-in-up glass-card stagger-${(index % 5) + 1}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-green-600 mt-1 text-lg flex-shrink-0">✓</span>
                        <p className="text-gray-700 text-sm leading-relaxed">{achievement}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-gray-200/30 animate-fade-in-up">
                {githubLink && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(githubLink, "_blank")
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100/50 border border-gray-300/50 text-gray-700 hover:text-gray-800 hover:border-gray-400/50 hover:bg-gray-50/50 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 font-medium hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    View Source Code
                  </button>
                )}
                {link && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(link, "_blank")
                    }}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-amber-100/50 to-stone-100/50 border border-amber-300/50 text-amber-700 hover:from-amber-200/50 hover:to-stone-200/50 hover:text-amber-800 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-2 font-medium hover:scale-105 soft-shimmer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Live Demo
                  </button>
                )}
                {!link && !githubLink && (
                  <div className="flex-1 px-6 py-3 bg-gray-100/30 border border-gray-300/30 text-gray-500 rounded-lg text-sm text-center glass-card">
                    Project completed - Code available upon request
                  </div>
                )}
              </div>

              {/* Collapse Button */}
              <div className="text-center pt-2">
                <button
                  onClick={handleExpandClick}
                  className="px-4 py-2 text-gray-600 hover:text-amber-700 transition-colors text-sm flex items-center gap-2 mx-auto hover:scale-110"
                >
                  <ChevronUp className="w-4 h-4" />
                  Collapse Details
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
