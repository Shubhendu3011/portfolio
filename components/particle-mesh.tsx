"use client"

import { useEffect, useRef } from "react"

interface ComputerWord {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  word: string
  connections: number[]
  brightness: number
  size: number
  color: string
}

const computerWords = [
  "API",
  "SQL",
  "JSON",
  "HTTP",
  "REST",
  "CRUD",
  "JWT",
  "OAuth",
  "SSL",
  "TCP",
  "HTML",
  "CSS",
  "JS",
  "React",
  "Node",
  "Java",
  "Python",
  "Docker",
  "AWS",
  "Git",
  "Cache",
  "Redis",
  "MySQL",
  "NoSQL",
  "ACID",
  "Index",
  "Query",
  "Schema",
  "ORM",
  "MVC",
  "CI/CD",
  "DevOps",
  "Agile",
  "Scrum",
  "TDD",
  "BDD",
  "Debug",
  "Deploy",
  "Scale",
  "Load",
  "Auth",
  "Hash",
  "Salt",
  "Token",
  "CORS",
  "CSRF",
  "XSS",
  "HTTPS",
  "CDN",
  "DNS",
  "Class",
  "Object",
  "Method",
  "Array",
  "Loop",
  "Function",
  "Variable",
  "Constant",
  "Boolean",
  "String",
  "Algorithm",
  "Data",
  "Structure",
  "Binary",
  "Tree",
  "Graph",
  "Stack",
  "Queue",
  "Heap",
  "Sort",
  "Frontend",
  "Backend",
  "Fullstack",
  "Mobile",
  "Web",
  "App",
  "UI",
  "UX",
  "Design",
  "Code",
  "<->",
  "$",
  "&&","(  )",
  "{  }","[  ]"
]

export function ParticleMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wordsRef = useRef<ComputerWord[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createWords = () => {
      const words: ComputerWord[] = []
      const wordCount = Math.min(80, Math.floor((window.innerWidth * window.innerHeight) / 12000))

      for (let i = 0; i < wordCount; i++) {
        const word = computerWords[Math.floor(Math.random() * computerWords.length)]
        words.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 300,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          vz: (Math.random() - 0.5) * 0.6,
          word,
          connections: [],
          brightness: Math.random() * 0.5 + 0.5,
          size: Math.random() * 8 + 8,
          color: `hsl(${Math.random() * 60 + 20}, 30%, ${Math.random() * 20 + 40}%)`,
        })
      }

      // Create connections between nearby words
      words.forEach((word, i) => {
        words.forEach((otherWord, j) => {
          if (i !== j) {
            const distance = Math.sqrt(
              (word.x - otherWord.x) ** 2 + (word.y - otherWord.y) ** 2 + (word.z - otherWord.z) ** 2,
            )
            if (distance < 120 && word.connections.length < 3) {
              word.connections.push(j)
            }
          }
        })
      })

      wordsRef.current = words
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = event.clientX
      mouseRef.current.y = event.clientY
    }

    const animate = (timestamp: number) => {
      const time = timestamp * 0.002

      // Pure white background
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const words = wordsRef.current
      const mouse = mouseRef.current

      words.forEach((word, i) => {
        // Update word position with faster floating motion
        word.x += word.vx + Math.sin(time + i * 0.1) * 0.15
        word.y += word.vy + Math.cos(time + i * 0.15) * 0.15
        word.z += word.vz

        // Faster color shifting for dynamic effect
        const colorShift = Math.sin(time * 1.2 + i * 0.1) * 15
        word.color = `hsl(${(30 + colorShift) % 360}, 40%, ${Math.sin(time * 0.8 + i) * 15 + 45}%)`

        // Mouse interaction
        const mouseDistance = Math.sqrt((word.x - mouse.x) ** 2 + (word.y - mouse.y) ** 2)
        if (mouseDistance < 150) {
          const force = (150 - mouseDistance) / 150
          const angle = Math.atan2(word.y - mouse.y, word.x - mouse.x)
          word.vx += Math.cos(angle) * force * 0.004
          word.vy += Math.sin(angle) * force * 0.004
          word.brightness = Math.min(1, word.brightness + force * 0.03)
          word.size = Math.min(16, word.size + force * 3)
        } else {
          word.brightness = Math.max(0.4, word.brightness - 0.008)
          word.size = Math.max(8, word.size - 0.15)
        }

        // Boundary conditions
        if (word.x < -50) {
          word.x = canvas.width + 50
          word.vx = Math.abs(word.vx)
        }
        if (word.x > canvas.width + 50) {
          word.x = -50
          word.vx = -Math.abs(word.vx)
        }
        if (word.y < -50) {
          word.y = canvas.height + 50
          word.vy = Math.abs(word.vy)
        }
        if (word.y > canvas.height + 50) {
          word.y = -50
          word.vy = -Math.abs(word.vy)
        }
        if (word.z < 0 || word.z > 300) word.vz *= -1

        word.z = Math.max(0, Math.min(300, word.z))

        // Draw connections between words with faster animation
        word.connections.forEach((connectionIndex) => {
          const connectedWord = words[connectionIndex]
          if (!connectedWord) return

          const distance = Math.sqrt(
            (word.x - connectedWord.x) ** 2 + (word.y - connectedWord.y) ** 2 + (word.z - connectedWord.z) ** 2,
          )

          if (distance < 150) {
            const opacity = Math.max(0, (150 - distance) / 150)
            const zAverage = (word.z + connectedWord.z) / 2
            const depthOpacity = Math.max(0.1, 1 - zAverage / 300)
            const brightnessFactor = (word.brightness + connectedWord.brightness) / 2

            // Faster dynamic connection colors
            const connectionHue = ((time * 40 + distance) % 60) + 20
            ctx.strokeStyle = `hsla(${connectionHue}, 35%, 50%, ${opacity * depthOpacity * brightnessFactor * 0.5})`
            ctx.lineWidth = Math.max(0.5, opacity * 2)
            ctx.shadowColor = `hsla(${connectionHue}, 35%, 50%, 0.3)`
            ctx.shadowBlur = 3

            ctx.beginPath()
            ctx.moveTo(word.x, word.y)
            ctx.lineTo(connectedWord.x, connectedWord.y)
            ctx.stroke()
          }
        })
      })

      // Draw computer words
      words.forEach((word) => {
        const depthOpacity = Math.max(0.3, 1 - word.z / 300)
        const finalOpacity = depthOpacity * word.brightness

        // Set font properties
        ctx.font = `${word.size}px 'Courier New', monospace`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Word shadow/glow effect
        ctx.shadowColor = word.color
        ctx.shadowBlur = 5
        ctx.fillStyle = `hsla(0, 0%, 20%, ${finalOpacity * 0.9})`
        ctx.fillText(word.word, word.x + 1, word.y + 1)

        // Main word text
        ctx.shadowBlur = 3
        ctx.fillStyle = word.color.replace(")", `, ${finalOpacity})`)
        ctx.fillText(word.word, word.x, word.y)

        // Highlight effect for brighter words
        if (word.brightness > 0.7) {
          ctx.shadowBlur = 8
          ctx.fillStyle = `hsla(45, 60%, 80%, ${(word.brightness - 0.7) * 0.6})`
          ctx.fillText(word.word, word.x, word.y)
        }
      })

      // Add floating code snippets more frequently
      if (Math.random() > 0.992) {
        const codeSnippets = ["{ }", "[ ]", "( )", "< >", "=>", "&&", "||", "!=", "===", "++"]
        const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height

        ctx.font = "12px 'Courier New', monospace"
        ctx.fillStyle = `hsla(${Math.random() * 60 + 20}, 40%, 60%, ${Math.random() * 0.4 + 0.3})`
        ctx.shadowColor = ctx.fillStyle
        ctx.shadowBlur = 4
        ctx.fillText(snippet, x, y)
      }

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    createWords()
    animate(0)

    window.addEventListener("resize", () => {
      resizeCanvas()
      createWords()
    })
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
