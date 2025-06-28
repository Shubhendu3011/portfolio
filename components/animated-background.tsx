"use client"

import { useEffect, useRef } from "react"

interface Shape {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  rotation: number
  rotationSpeed: number
  type: "circle" | "triangle" | "square" | "hexagon"
}

interface BinaryStream {
  x: number
  y: number
  speed: number
  length: number
  digits: string[]
  opacity: number[]
}

interface CircuitNode {
  x: number
  y: number
  type: "processor" | "capacitor" | "resistor" | "chip" | "connector"
  size: number
  pulsePhase: number
  connections: number[]
}

interface DataFlow {
  pathIndex: number
  progress: number
  speed: number
  color: string
  intensity: number
}

interface CircuitPath {
  points: { x: number; y: number }[]
  width: number
  active: boolean
  pulsePhase: number
}

const colors = [
  "#3b82f6", // Blue
  "#6366f1", // Indigo
  "#8b5cf6", // Violet
  "#06b6d4", // Cyan
  "#10b981", // Emerald
  "#f59e0b", // Amber
]

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapesRef = useRef<Shape[]>([])
  const streamsRef = useRef<BinaryStream[]>([])
  const nodesRef = useRef<CircuitNode[]>([])
  const pathsRef = useRef<CircuitPath[]>([])
  const dataFlowsRef = useRef<DataFlow[]>([])
  const animationRef = useRef<number>()
  const timeRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const createShapes = () => {
      const shapes: Shape[] = []
      const shapeCount = Math.floor((window.innerWidth * window.innerHeight) / 15000)

      const shapeTypes: Shape["type"][] = ["circle", "triangle", "square", "hexagon"]

      for (let i = 0; i < shapeCount; i++) {
        shapes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 20 + 10,
          opacity: Math.random() * 0.15 + 0.05,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.01,
          type: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        })
      }

      shapesRef.current = shapes
    }

    const createStreams = () => {
      const streams: BinaryStream[] = []
      const streamCount = Math.floor(canvas.width / 20) // One stream every 20px

      for (let i = 0; i < streamCount; i++) {
        const length = Math.floor(Math.random() * 20) + 10
        const digits: string[] = []
        const opacity: number[] = []

        // Generate random binary digits for the stream
        for (let j = 0; j < length; j++) {
          digits.push(Math.random() > 0.5 ? "1" : "0")
          opacity.push(1 - j / length) // Fade out towards the tail
        }

        streams.push({
          x: i * 20 + Math.random() * 10, // Slight random offset
          y: Math.random() * canvas.height - length * 20,
          speed: Math.random() * 3 + 1, // Speed between 1-4
          length,
          digits,
          opacity,
        })
      }

      streamsRef.current = streams
    }

    const createCircuitBoard = () => {
      const nodes: CircuitNode[] = []
      const paths: CircuitPath[] = []
      const dataFlows: DataFlow[] = []

      // Create main processor in center
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      nodes.push({
        x: centerX,
        y: centerY,
        type: "processor",
        size: 80,
        pulsePhase: 0,
        connections: [],
      })

      // Create grid of components
      const gridSize = 120
      const rows = Math.ceil(canvas.height / gridSize) + 2
      const cols = Math.ceil(canvas.width / gridSize) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * gridSize + (row % 2) * (gridSize / 2) - gridSize
          const y = row * gridSize - gridSize

          if (Math.abs(x - centerX) < 100 && Math.abs(y - centerY) < 100) continue

          const types: CircuitNode["type"][] = ["chip", "capacitor", "resistor", "connector"]
          const type = types[Math.floor(Math.random() * types.length)]

          nodes.push({
            x,
            y,
            type,
            size: type === "chip" ? 30 + Math.random() * 20 : 15 + Math.random() * 10,
            pulsePhase: Math.random() * Math.PI * 2,
            connections: [],
          })
        }
      }

      // Create circuit paths connecting nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i]
        const nearbyNodes = nodes.filter((n, idx) => {
          if (idx === i) return false
          const dist = Math.sqrt((n.x - node.x) ** 2 + (n.y - node.y) ** 2)
          return dist < 150 && Math.random() > 0.6
        })

        nearbyNodes.forEach((targetNode, idx) => {
          if (idx > 2) return // Limit connections per node

          const path: CircuitPath = {
            points: [],
            width: 2 + Math.random() * 3,
            active: Math.random() > 0.7,
            pulsePhase: Math.random() * Math.PI * 2,
          }

          // Create L-shaped or direct paths
          if (Math.random() > 0.5) {
            // L-shaped path
            const midX = Math.random() > 0.5 ? node.x : targetNode.x
            const midY = Math.random() > 0.5 ? node.y : targetNode.y
            path.points = [
              { x: node.x, y: node.y },
              { x: midX, y: midY },
              { x: targetNode.x, y: targetNode.y },
            ]
          } else {
            // Direct path with slight curve
            const midX = (node.x + targetNode.x) / 2 + (Math.random() - 0.5) * 50
            const midY = (node.y + targetNode.y) / 2 + (Math.random() - 0.5) * 50
            path.points = [
              { x: node.x, y: node.y },
              { x: midX, y: midY },
              { x: targetNode.x, y: targetNode.y },
            ]
          }

          paths.push(path)
          node.connections.push(paths.length - 1)
        })
      }

      // Create data flows
      for (let i = 0; i < 25; i++) {
        dataFlows.push({
          pathIndex: Math.floor(Math.random() * paths.length),
          progress: Math.random(),
          speed: 0.005 + Math.random() * 0.015,
          color: ["#00ff41", "#0099ff", "#ff6600", "#ffff00"][Math.floor(Math.random() * 4)],
          intensity: 0.8 + Math.random() * 0.2,
        })
      }

      nodesRef.current = nodes
      pathsRef.current = paths
      dataFlowsRef.current = dataFlows
    }

    const drawCircle = (ctx: CanvasRenderingContext2D, shape: Shape) => {
      ctx.beginPath()
      ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2)
      ctx.fill()
    }

    const drawTriangle = (ctx: CanvasRenderingContext2D, shape: Shape) => {
      const size = shape.size / 2
      ctx.beginPath()
      ctx.moveTo(0, -size)
      ctx.lineTo(-size * 0.866, size * 0.5)
      ctx.lineTo(size * 0.866, size * 0.5)
      ctx.closePath()
      ctx.fill()
    }

    const drawSquare = (ctx: CanvasRenderingContext2D, shape: Shape) => {
      const size = shape.size / 2
      ctx.beginPath()
      ctx.rect(-size, -size, size * 2, size * 2)
      ctx.fill()
    }

    const drawHexagon = (ctx: CanvasRenderingContext2D, shape: Shape) => {
      const size = shape.size / 2
      ctx.beginPath()
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3
        const x = size * Math.cos(angle)
        const y = size * Math.sin(angle)
        if (i === 0) ctx.moveTo(x, y)
        else ctx.lineTo(x, y)
      }
      ctx.closePath()
      ctx.fill()
    }

    const drawGrid = (time: number) => {
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      // Clear canvas with gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "#0a0a0a")
      gradient.addColorStop(0.3, "#1a0a2e")
      gradient.addColorStop(0.7, "#16213e")
      gradient.addColorStop(1, "#0f0f0f")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Grid parameters
      const gridSize = 50
      const perspective = 300
      const cameraY = Math.sin(time * 0.0005) * 100 + 200
      const cameraZ = time * 0.02

      // Horizon line
      const horizon = centerY - 100

      ctx.save()
      ctx.translate(centerX, horizon)

      // Draw horizontal lines (perspective grid)
      for (let i = 0; i < 20; i++) {
        const z = i * gridSize + (cameraZ % gridSize)
        const scale = perspective / (perspective + z)
        const y = z * scale

        if (scale > 0.01) {
          const alpha = Math.max(0, Math.min(1, scale * 2))
          const width = canvas.width * scale

          // Main grid line
          ctx.strokeStyle = `rgba(138, 43, 226, ${alpha * 0.8})`
          ctx.lineWidth = scale * 2
          ctx.shadowColor = "#8a2be2"
          ctx.shadowBlur = scale * 10

          ctx.beginPath()
          ctx.moveTo(-width, y)
          ctx.lineTo(width, y)
          ctx.stroke()

          // Glow effect
          ctx.strokeStyle = `rgba(255, 20, 147, ${alpha * 0.4})`
          ctx.lineWidth = scale * 4
          ctx.shadowBlur = scale * 20
          ctx.stroke()
        }
      }

      // Draw vertical lines
      for (let i = -10; i <= 10; i++) {
        if (i === 0) continue // Skip center line for now

        const x = i * gridSize + Math.sin(time * 0.001) * 20

        ctx.strokeStyle = `rgba(0, 191, 255, 0.6)`
        ctx.lineWidth = 1.5
        ctx.shadowColor = "#00bfff"
        ctx.shadowBlur = 8

        ctx.beginPath()
        ctx.moveTo(x, 0)

        // Draw perspective line
        for (let j = 0; j < 20; j++) {
          const z = j * gridSize + (cameraZ % gridSize)
          const scale = perspective / (perspective + z)
          const y = z * scale

          if (scale > 0.01) {
            const perspectiveX = x * scale
            ctx.lineTo(perspectiveX, y)
          }
        }
        ctx.stroke()
      }

      // Center line (special)
      ctx.strokeStyle = `rgba(255, 20, 147, 0.9)`
      ctx.lineWidth = 3
      ctx.shadowColor = "#ff1493"
      ctx.shadowBlur = 15

      ctx.beginPath()
      ctx.moveTo(0, 0)

      for (let j = 0; j < 20; j++) {
        const z = j * gridSize + (cameraZ % gridSize)
        const scale = perspective / (perspective + z)
        const y = z * scale

        if (scale > 0.01) {
          ctx.lineTo(0, y)
        }
      }
      ctx.stroke()

      ctx.restore()

      // Add floating neon particles
      for (let i = 0; i < 15; i++) {
        const particleTime = time + i * 1000
        const x = centerX + Math.sin(particleTime * 0.001 + i) * (canvas.width * 0.4)
        const y = centerY + Math.cos(particleTime * 0.0007 + i) * (canvas.height * 0.3)
        const size = Math.sin(particleTime * 0.003 + i) * 3 + 5

        const colors = [
          "#ff1493", // Deep pink
          "#8a2be2", // Blue violet
          "#00bfff", // Deep sky blue
          "#ff69b4", // Hot pink
          "#9370db", // Medium purple
        ]

        const color = colors[i % colors.length]

        ctx.save()
        ctx.globalAlpha = 0.8
        ctx.fillStyle = color
        ctx.shadowColor = color
        ctx.shadowBlur = 20

        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fill()

        // Inner glow
        ctx.globalAlpha = 0.4
        ctx.shadowBlur = 40
        ctx.fill()

        ctx.restore()
      }

      // Add scan lines effect
      for (let i = 0; i < canvas.height; i += 4) {
        ctx.fillStyle = `rgba(255, 20, 147, ${0.02 + Math.sin(time * 0.01 + i * 0.1) * 0.01})`
        ctx.fillRect(0, i, canvas.width, 1)
      }

      // Add subtle vignette
      const vignette = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        Math.max(canvas.width, canvas.height),
      )
      vignette.addColorStop(0, "rgba(0,0,0,0)")
      vignette.addColorStop(0.7, "rgba(0,0,0,0)")
      vignette.addColorStop(1, "rgba(0,0,0,0.4)")
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const drawCircuitBoard = (time: number) => {
      // Dark circuit board background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, "#0a0f0a")
      gradient.addColorStop(0.3, "#0f1a0f")
      gradient.addColorStop(0.7, "#1a2f1a")
      gradient.addColorStop(1, "#0f1f0f")
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw circuit paths
      pathsRef.current.forEach((path, pathIndex) => {
        if (path.points.length < 2) return

        const pulseIntensity = (Math.sin(time * 0.003 + path.pulsePhase) + 1) / 2
        const baseOpacity = path.active ? 0.6 : 0.3
        const opacity = baseOpacity + pulseIntensity * 0.4

        // Draw path glow
        ctx.strokeStyle = `rgba(0, 255, 65, ${opacity * 0.3})`
        ctx.lineWidth = path.width * 3
        ctx.shadowColor = "#00ff41"
        ctx.shadowBlur = 15
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        ctx.beginPath()
        ctx.moveTo(path.points[0].x, path.points[0].y)
        for (let i = 1; i < path.points.length; i++) {
          ctx.lineTo(path.points[i].x, path.points[i].y)
        }
        ctx.stroke()

        // Draw main path
        ctx.strokeStyle = `rgba(0, 255, 65, ${opacity})`
        ctx.lineWidth = path.width
        ctx.shadowBlur = 8
        ctx.stroke()

        // Draw data flows on this path
        dataFlowsRef.current
          .filter((flow) => flow.pathIndex === pathIndex)
          .forEach((flow) => {
            if (path.points.length < 2) return

            // Calculate position along path
            const segmentCount = path.points.length - 1
            const totalProgress = flow.progress * segmentCount
            const segmentIndex = Math.floor(totalProgress)
            const segmentProgress = totalProgress - segmentIndex

            if (segmentIndex >= segmentCount) return

            const startPoint = path.points[segmentIndex]
            const endPoint = path.points[segmentIndex + 1]

            const x = startPoint.x + (endPoint.x - startPoint.x) * segmentProgress
            const y = startPoint.y + (endPoint.y - startPoint.y) * segmentProgress

            // Draw data packet
            ctx.fillStyle = flow.color
            ctx.shadowColor = flow.color
            ctx.shadowBlur = 20
            ctx.beginPath()
            ctx.arc(x, y, 3, 0, Math.PI * 2)
            ctx.fill()

            // Draw trail
            for (let i = 1; i <= 5; i++) {
              const trailProgress = Math.max(0, segmentProgress - i * 0.1)
              const trailX = startPoint.x + (endPoint.x - startPoint.x) * trailProgress
              const trailY = startPoint.y + (endPoint.y - startPoint.y) * trailProgress

              ctx.globalAlpha = ((6 - i) / 6) * flow.intensity * 0.5
              ctx.beginPath()
              ctx.arc(trailX, trailY, 2, 0, Math.PI * 2)
              ctx.fill()
            }
            ctx.globalAlpha = 1
          })
      })

      // Draw circuit nodes/components
      nodesRef.current.forEach((node) => {
        const pulseIntensity = (Math.sin(time * 0.004 + node.pulsePhase) + 1) / 2

        ctx.save()
        ctx.translate(node.x, node.y)

        switch (node.type) {
          case "processor":
            // Main processor chip
            const processorSize = node.size + pulseIntensity * 10

            // Outer glow
            ctx.fillStyle = `rgba(0, 153, 255, ${0.3 + pulseIntensity * 0.3})`
            ctx.shadowColor = "#0099ff"
            ctx.shadowBlur = 30
            ctx.fillRect(-processorSize / 2, -processorSize / 2, processorSize, processorSize)

            // Main body
            ctx.fillStyle = `rgba(0, 153, 255, ${0.8 + pulseIntensity * 0.2})`
            ctx.shadowBlur = 15
            ctx.fillRect(-processorSize / 2 + 5, -processorSize / 2 + 5, processorSize - 10, processorSize - 10)

            // Internal grid pattern
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.6 + pulseIntensity * 0.4})`
            ctx.lineWidth = 1
            ctx.shadowBlur = 5

            for (let i = -3; i <= 3; i++) {
              const offset = i * (processorSize / 8)
              ctx.beginPath()
              ctx.moveTo(offset, -processorSize / 2 + 10)
              ctx.lineTo(offset, processorSize / 2 - 10)
              ctx.stroke()

              ctx.beginPath()
              ctx.moveTo(-processorSize / 2 + 10, offset)
              ctx.lineTo(processorSize / 2 - 10, offset)
              ctx.stroke()
            }

            // Corner pins
            const pinPositions = [
              [-processorSize / 2 - 3, -processorSize / 2 - 3],
              [processorSize / 2 + 3, -processorSize / 2 - 3],
              [-processorSize / 2 - 3, processorSize / 2 + 3],
              [processorSize / 2 + 3, processorSize / 2 + 3],
            ]

            pinPositions.forEach(([px, py]) => {
              ctx.fillStyle = `rgba(255, 215, 0, ${0.8 + pulseIntensity * 0.2})`
              ctx.shadowColor = "#ffd700"
              ctx.shadowBlur = 10
              ctx.beginPath()
              ctx.arc(px, py, 3, 0, Math.PI * 2)
              ctx.fill()
            })
            break

          case "chip":
            // IC chip
            const chipWidth = node.size
            const chipHeight = node.size * 0.6

            ctx.fillStyle = `rgba(0, 255, 65, ${0.6 + pulseIntensity * 0.3})`
            ctx.shadowColor = "#00ff41"
            ctx.shadowBlur = 10
            ctx.fillRect(-chipWidth / 2, -chipHeight / 2, chipWidth, chipHeight)

            // Pins
            for (let i = 0; i < 6; i++) {
              const pinY = -chipHeight / 2 + (i / 5) * chipHeight
              ctx.fillStyle = `rgba(255, 215, 0, ${0.7 + pulseIntensity * 0.3})`
              ctx.fillRect(-chipWidth / 2 - 3, pinY - 1, 6, 2)
              ctx.fillRect(chipWidth / 2 - 3, pinY - 1, 6, 2)
            }
            break

          case "capacitor":
            // Cylindrical capacitor
            ctx.fillStyle = `rgba(255, 102, 0, ${0.7 + pulseIntensity * 0.3})`
            ctx.shadowColor = "#ff6600"
            ctx.shadowBlur = 8
            ctx.beginPath()
            ctx.arc(0, 0, node.size / 2, 0, Math.PI * 2)
            ctx.fill()

            // Top marking
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.8 + pulseIntensity * 0.2})`
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.arc(0, 0, node.size / 3, 0, Math.PI * 2)
            ctx.stroke()
            break

          case "resistor":
            // Resistor with color bands
            const resistorWidth = node.size
            const resistorHeight = node.size * 0.3

            ctx.fillStyle = `rgba(139, 69, 19, ${0.8 + pulseIntensity * 0.2})`
            ctx.fillRect(-resistorWidth / 2, -resistorHeight / 2, resistorWidth, resistorHeight)

            // Color bands
            const bandColors = ["#ff0000", "#00ff00", "#0000ff"]
            bandColors.forEach((color, i) => {
              ctx.fillStyle = color
              const bandX = -resistorWidth / 2 + (i + 1) * (resistorWidth / 4)
              ctx.fillRect(bandX, -resistorHeight / 2, 2, resistorHeight)
            })
            break

          case "connector":
            // Connector port
            ctx.fillStyle = `rgba(192, 192, 192, ${0.6 + pulseIntensity * 0.3})`
            ctx.shadowColor = "#c0c0c0"
            ctx.shadowBlur = 5
            ctx.fillRect(-node.size / 2, -node.size / 4, node.size, node.size / 2)

            // Connection points
            for (let i = 0; i < 4; i++) {
              ctx.fillStyle = `rgba(255, 215, 0, ${0.8 + pulseIntensity * 0.2})`
              const pointX = -node.size / 2 + (i / 3) * node.size
              ctx.beginPath()
              ctx.arc(pointX, 0, 2, 0, Math.PI * 2)
              ctx.fill()
            }
            break
        }

        ctx.restore()
      })

      // Update data flows
      dataFlowsRef.current.forEach((flow) => {
        flow.progress += flow.speed
        if (flow.progress > 1) {
          flow.progress = 0
          flow.pathIndex = Math.floor(Math.random() * pathsRef.current.length)
        }
      })

      // Add random electrical sparks
      if (Math.random() > 0.98) {
        const sparkX = Math.random() * canvas.width
        const sparkY = Math.random() * canvas.height

        ctx.fillStyle = `rgba(255, 255, 0, ${Math.random()})`
        ctx.shadowColor = "#ffff00"
        ctx.shadowBlur = 20
        ctx.beginPath()
        ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2)
        ctx.fill()
      }

      // Add subtle grid overlay
      ctx.strokeStyle = "rgba(0, 255, 65, 0.05)"
      ctx.lineWidth = 0.5
      const gridSpacing = 20

      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }

      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }

    const animate = () => {
      timeRef.current += 16
      drawGrid(timeRef.current)
      drawCircuitBoard(timeRef.current)

      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.font = "14px 'Courier New', monospace"
      ctx.textAlign = "center"

      shapesRef.current.forEach((shape) => {
        // Update position
        shape.x += shape.vx
        shape.y += shape.vy
        shape.rotation += shape.rotationSpeed

        // Bounce off edges
        if (shape.x < -50 || shape.x > canvas.width + 50) shape.vx *= -1
        if (shape.y < -50 || shape.y > canvas.height + 50) shape.vy *= -1

        // Keep shapes in bounds
        shape.x = Math.max(-50, Math.min(canvas.width + 50, shape.x))
        shape.y = Math.max(-50, Math.min(canvas.height + 50, shape.y))

        // Subtle opacity changes
        shape.opacity += (Math.random() - 0.5) * 0.003
        shape.opacity = Math.max(0.02, Math.min(0.2, shape.opacity))

        // Draw shape
        ctx.save()
        ctx.translate(shape.x, shape.y)
        ctx.rotate(shape.rotation)
        ctx.fillStyle = shape.color.replace(")", `, ${shape.opacity})`)

        // Add subtle glow
        ctx.shadowColor = shape.color
        ctx.shadowBlur = 8

        switch (shape.type) {
          case "circle":
            drawCircle(ctx, shape)
            break
          case "triangle":
            drawTriangle(ctx, shape)
            break
          case "square":
            drawSquare(ctx, shape)
            break
          case "hexagon":
            drawHexagon(ctx, shape)
            break
        }

        ctx.restore()
      })

      streamsRef.current.forEach((stream) => {
        // Update stream position
        stream.y += stream.speed

        // Reset stream when it goes off screen
        if (stream.y > canvas.height + stream.length * 20) {
          stream.y = -stream.length * 20
          stream.x = Math.random() * canvas.width
          stream.speed = Math.random() * 3 + 1

          // Regenerate digits occasionally
          if (Math.random() > 0.7) {
            for (let i = 0; i < stream.digits.length; i++) {
              if (Math.random() > 0.8) {
                stream.digits[i] = Math.random() > 0.5 ? "1" : "0"
              }
            }
          }
        }

        // Draw each digit in the stream
        for (let i = 0; i < stream.digits.length; i++) {
          const digitY = stream.y + i * 20

          // Skip if digit is off screen
          if (digitY < -20 || digitY > canvas.height + 20) continue

          const digit = stream.digits[i]
          const baseOpacity = stream.opacity[i]

          // Leading digit (brightest)
          if (i === 0) {
            ctx.fillStyle = `rgba(0, 255, 0, ${baseOpacity})`
            ctx.shadowColor = "#00ff00"
            ctx.shadowBlur = 10
          }
          // Second digit (bright green)
          else if (i === 1) {
            ctx.fillStyle = `rgba(0, 220, 0, ${baseOpacity * 0.8})`
            ctx.shadowColor = "#00dd00"
            ctx.shadowBlur = 5
          }
          // Rest of the digits (fading green)
          else {
            const greenValue = Math.floor(200 - i * 15)
            ctx.fillStyle = `rgba(0, ${Math.max(greenValue, 50)}, 0, ${baseOpacity * 0.6})`
            ctx.shadowColor = `rgba(0, ${Math.max(greenValue, 50)}, 0, 0.5)`
            ctx.shadowBlur = 2
          }

          ctx.fillText(digit, stream.x, digitY)
        }

        // Occasionally change some digits in the stream
        if (Math.random() > 0.98) {
          const randomIndex = Math.floor(Math.random() * stream.digits.length)
          stream.digits[randomIndex] = Math.random() > 0.5 ? "1" : "0"
        }
      })

      // Add some random glitch effects
      if (Math.random() > 0.99) {
        const glitchX = Math.random() * canvas.width
        const glitchY = Math.random() * canvas.height
        ctx.fillStyle = `rgba(0, 255, 0, ${Math.random() * 0.5})`
        ctx.shadowColor = "#00ff00"
        ctx.shadowBlur = 15
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", glitchX, glitchY)
      }
    }

    resizeCanvas()
    createShapes()
    createStreams()
    createCircuitBoard()
    animate()

    const handleResize = () => {
      resizeCanvas()
      createShapes()
      createStreams()
      createCircuitBoard()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />
}
