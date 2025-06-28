"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ToggleSectionProps {
  title: string
  children: React.ReactNode
  defaultOpen?: boolean
}

export function ToggleSection({ title, children, defaultOpen = false }: ToggleSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="w-full max-w-2xl mx-auto mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 bg-gray-900/40 backdrop-blur-md border border-gray-700/50 rounded-xl hover:bg-gray-800/50 hover:border-gray-600/50 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300 group"
      >
        <h3 className="text-xl font-semibold text-white group-hover:text-purple-300 transition-colors">{title}</h3>
        <div className="text-gray-400 group-hover:text-purple-400 transition-colors">
          {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6 bg-gray-900/20 backdrop-blur-md border-x border-b border-gray-700/50 rounded-b-xl mt-1">
          {children}
        </div>
      </div>
    </div>
  )
}
