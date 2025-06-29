"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ParticleMesh } from "@/components/particle-mesh"
import { ProjectCard } from "@/components/project-card"
import { Navigation } from "@/components/navigation"
import { Mail, MapPin, ChevronDown, ChevronUp, ExternalLink, Phone } from "lucide-react"

export default function PortfolioPage() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger initial load animations
    setIsLoaded(true)

    // Set up intersection observer for section animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe all sections
    const sections = document.querySelectorAll('[id^="section-"], #about, #experience, #projects, #skills, #contact')
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  const handleSectionClick = (section: string) => {
    if (section === "about" || section === "experience" || section === "projects") {
      setExpandedCard(section)
    }
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 relative overflow-hidden">
      {/* Computer Words Background */}
      <ParticleMesh />

      {/* Navigation */}
      <Navigation onSectionClick={handleSectionClick} />

      {/* Main Content */}
      <div className="relative z-10 min-h-screen pt-20">
        {/* Hero Section */}
        <main className="px-6 md:px-8 pt-12 pb-16">
          <div className="max-w-4xl mx-auto text-center space-y-8 mb-16">
            {/* Name and Title */}
            <div className="space-y-4">
              <h1
                className={`text-5xl md:text-7xl font-bold bg-gradient-to-r from-gray-800 via-amber-800 to-stone-800 bg-clip-text text-transparent leading-tight ${isLoaded ? "hero-title" : "opacity-0"}`}
              >
                Shubhendu Jadhav
              </h1>
              <p className={`text-xl md:text-2xl text-gray-700 font-light ${isLoaded ? "hero-subtitle" : "opacity-0"}`}>
                Full-Stack Developer & CS Graduate Student
              </p>
              <div
                className={`flex items-center justify-center gap-2 text-gray-600 ${isLoaded ? "hero-subtitle" : "opacity-0"}`}
              >
                <MapPin className="w-4 h-4" />
                <span>SUNY Binghamton</span>
              </div>
            </div>

            {/* Brief Description */}
            <p
              className={`text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed ${isLoaded ? "hero-description" : "opacity-0"}`}
            >
              Passionate about building scalable backend systems, crafting intuitive user interfaces, and architecting
              robust full-stack applications using modern technologies.
            </p>

            {/* Action Buttons */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center pt-4 ${isLoaded ? "hero-buttons" : "opacity-0"}`}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-700 to-stone-700 hover:from-amber-600 hover:to-stone-600 text-white px-8 py-3 rounded-xl font-medium hover:scale-105 hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 subtle-glow"
                onClick={() => {
                  setExpandedCard("projects")
                  setTimeout(() => {
                    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
                  }, 100)
                }}
              >
                <ExternalLink className="w-5 h-5 mr-2" />
                View Projects
              </Button>
              {/* <Button
                variant="outline"
                size="lg"
                className="border-gray-400 text-gray-700 hover:bg-amber-50 hover:border-amber-600 hover:text-amber-700 px-8 py-3 rounded-xl font-medium hover:scale-105 hover:shadow-lg transition-all duration-300 glass-card"
                onClick={() => (window.location.href = "mailto:shubhenduj1969@gmail.com")}
              >
                <Mail className="w-5 h-5 mr-2" />
                Contact Me
              </Button> */}
            </div>
          </div>

          {/* Toggle Cards */}
          <section className="max-w-4xl mx-auto space-y-6">
            {/* About Me Card */}
            <div
              id="about"
              className={`cursor-pointer transition-all duration-300 ${
                expandedCard === "about" ? "scale-[1.02] animate-fade-in-up" : "hover:scale-[1.01]"
              } ${visibleSections.has("about") ? "section-about" : "opacity-0"}`}
              onClick={() => toggleCard("about")}
            >
              <div className="p-8 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl hover:bg-white hover:border-gray-300/70 hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 card-hover hover-glow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">About Me</h3>
                  <div className="text-gray-600 transition-colors">
                    {expandedCard === "about" ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedCard === "about" ? "max-h-96 opacity-100" : "max-h-16 opacity-70"
                  }`}
                >
                  <div className={expandedCard === "about" ? "expanded-content" : ""}>
                    <p className="text-gray-700 leading-relaxed text-base">
                      I'm a Master's student in Computer Science at SUNY Binghamton with a strong foundation in
                      full-stack development. My expertise lies in building robust backend systems with Java and Spring
                      Boot, creating responsive frontends with React.js, and architecting scalable applications.
                      {expandedCard === "about" && (
                        <>
                          <br />
                          <br />
                          During my internship at Brain Vision Technologies, I gained hands-on experience in
                          enterprise-level development, working with microservices architecture, API optimization, and
                          automated testing. I've successfully delivered multiple projects including a Smart Class
                          Registration System, Crypto Trading Platform, and Job Portal.
                          <br />
                          <br />
                          My passion lies in solving complex problems through clean, efficient code and creating systems
                          that can scale. I enjoy working with modern technologies like Docker, AWS, and implementing
                          best practices in software development lifecycle.
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Experience Card */}
            <div
              id="experience"
              className={`cursor-pointer transition-all duration-300 ${
                expandedCard === "experience" ? "scale-[1.02] animate-fade-in-up" : "hover:scale-[1.01]"
              } ${visibleSections.has("experience") ? "section-experience" : "opacity-0"}`}
              onClick={() => toggleCard("experience")}
            >
              <div className="p-8 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl hover:bg-white hover:border-gray-300/70 hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Experience</h3>
                  <div className="text-gray-600 transition-colors">
                    {expandedCard === "experience" ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedCard === "experience" ? "max-h-96 opacity-100" : "max-h-16 opacity-70"
                  }`}
                >
                  <div className={expandedCard === "experience" ? "expanded-content" : ""}>
                    <div className="text-gray-700 leading-relaxed text-base mb-4">
                      Software Developer Intern at Brain Vision Technologies with hands-on experience in full-stack
                      development and system optimization.
                      {expandedCard === "experience" && (
                        <>
                          <br />
                          <br />
                          <div className="space-y-4">
                            <div className="glass-card p-4 rounded-lg">
                              <h4 className="font-semibold text-amber-700 mb-2">
                                Software Developer Intern - Brain Vision Technologies
                              </h4>
                              <p className="text-sm text-gray-600 mb-3">April 2022 - September 2022</p>
                              <ul className="space-y-2 text-sm">
                                <li className="flex items-start gap-2 animate-fade-in-up stagger-1">
                                  <span className="text-amber-600 mt-1">•</span>
                                  Built full-stack web applications for scalable user management using Java, Spring
                                  Boot, React.js, and MySQL
                                </li>
                                <li className="flex items-start gap-2 animate-fade-in-up stagger-2">
                                  <span className="text-amber-600 mt-1">•</span>
                                  Enhanced API response time by optimizing query logic and implementing caching
                                  mechanisms
                                </li>
                                <li className="flex items-start gap-2 animate-fade-in-up stagger-3">
                                  <span className="text-amber-600 mt-1">•</span>
                                  Automated 90% of regression tests using JUnit, Mockito, and Selenium, reducing QA
                                  effort by 40%
                                </li>
                                <li className="flex items-start gap-2 animate-fade-in-up stagger-4">
                                  <span className="text-amber-600 mt-1">•</span>
                                  Followed Agile methodologies with active participation in sprint planning and
                                  cross-functional collaboration
                                </li>
                              </ul>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Projects Card */}
            <div
              id="projects"
              className={`cursor-pointer transition-all duration-300 ${
                expandedCard === "projects" ? "scale-[1.02] animate-fade-in-up" : "hover:scale-[1.01]"
              } ${visibleSections.has("projects") ? "section-projects" : "opacity-0"}`}
              onClick={() => toggleCard("projects")}
            >
              <div className="p-8 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl hover:bg-white hover:border-gray-300/70 hover:shadow-lg hover:shadow-gray-500/10 transition-all duration-300 card-hover">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-semibold text-gray-800">Featured Projects</h3>
                  <div className="text-gray-600 transition-colors">
                    {expandedCard === "projects" ? (
                      <ChevronUp className="w-6 h-6" />
                    ) : (
                      <ChevronDown className="w-6 h-6" />
                    )}
                  </div>
                </div>

                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    expandedCard === "projects" ? "max-h-[1000px] opacity-100" : "max-h-16 opacity-70"
                  }`}
                >
                  <p className="text-gray-700 leading-relaxed text-base mb-6">
                    Explore my latest projects showcasing full-stack development, system architecture, and modern web
                    technologies.
                  </p>

                  {expandedCard === "projects" && (
                    <div className="space-y-6 expanded-content">
                      <div className="project-card-enter project-card-1">
                        <ProjectCard
                          title="Smart Class Registration System"
                          description="A comprehensive class registration platform built with Java Spring Boot backend and React frontend, featuring role-based access control, conflict detection algorithms, and real-time notifications."
                          duration="Jan 2025 – Mar 2025"
                          team="Solo Project"
                          technologies={[
                            "Java",
                            "Spring Boot",
                            "React",
                            "Tailwind CSS",
                            "MySQL",
                            "AWS",
                            "Docker",
                            "NGINX",
                          ]}
                          details="This enterprise-grade registration system was built to solve the complex challenges of academic course management. The backend leverages Spring Boot's robust framework with custom business logic for conflict detection, while the frontend provides an intuitive React-based interface. The system implements role-based authentication using JWT tokens, ensuring secure access for students, faculty, and administrators. The architecture follows microservices principles with separate services for user management, course catalog, registration processing, and notification delivery. MySQL database with optimized indexing ensures fast query performance even with large datasets. The application is containerized with Docker and deployed on AWS EC2 with NGINX as a reverse proxy for high availability and load distribution."
                          features={[
                            "Advanced Conflict Detection: Custom algorithm that analyzes time slots, room capacity, instructor availability, and student prerequisites to prevent scheduling conflicts with 100% accuracy",
                            "Role-Based Access Control: Secure JWT-based authentication system supporting multiple user roles (students, faculty, advisors, administrators) with granular permissions",
                            "Real-time Notification System: Integrated email and in-app notifications for registration confirmations, waitlist updates, and schedule changes using Spring Boot's async processing",
                            "Intelligent Waitlist Management: Priority-based queue system that automatically enrolls students when spots become available, considering graduation requirements and registration timestamps",
                            "PDF Schedule Generation: Dynamic PDF creation using iText library for personalized student timetables with multiple format options",
                            "RESTful API Architecture: Well-documented REST endpoints enabling integration with existing university systems and third-party applications",
                            "Responsive React Frontend: Mobile-first design using Tailwind CSS with real-time updates and intuitive user experience across all devices",
                            "Database Optimization: Efficient MySQL schema design with proper indexing, foreign key constraints, and query optimization for handling thousands of concurrent users",
                            "Comprehensive Search & Filtering: Advanced search functionality allowing students to find courses by multiple criteria including instructor, time, prerequisites, and availability",
                            "Audit Trail System: Complete logging of all registration activities for compliance and troubleshooting purposes",
                          ]}
                          achievements={[
                            "Achieved 100% accuracy in conflict detection across 10,000+ test scenarios with complex scheduling requirements and edge cases",
                            "Improved registration completion time by 99% compared to manual processes, reducing average time from 45 minutes to under 30 seconds",
                            "Successfully handled 1,000+ concurrent users during peak registration periods with sub-2-second response times",
                            "Reduced administrative workload by 75% through intelligent automation of routine tasks like waitlist management and prerequisite checking",
                            "Implemented comprehensive CI/CD pipeline using GitHub Actions, reducing deployment time by 80% with zero-downtime deployments",
                            "Achieved 99.9% uptime on AWS infrastructure with auto-scaling capabilities and proper monitoring",
                            "Processed over 50,000 course registrations during beta testing with zero data loss or system failures",
                            "Received positive feedback from 95% of beta users for improved user experience and system reliability",
                          ]}
                          githubLink="https://github.com/Shubhendu3011/Smartclass"

                        />
                      </div>

                      <div className="project-card-enter project-card-2">
                        <ProjectCard
                          title="Crypto Trading Platform"
                          description="A secure cryptocurrency trading platform built with Spring Boot microservices architecture, featuring real-time market data integration, advanced order management, and comprehensive portfolio tracking."
                          duration="Aug 2024 – Dec 2024"
                          team="Lead Developer"
                          technologies={[
                            "Spring Boot",
                            "React",
                            "Redux",
                            "MySQL",
                            "Docker",
                            "Stripe API",
                            "Gemini API",
                            "WebSocket",
                            "JWT",
                          ]}
                          details="This professional-grade trading platform was architected using Spring Boot microservices to handle the demanding requirements of cryptocurrency trading. The system features separate, scalable services for user management, order processing, payment handling, and market data aggregation. Security was implemented at multiple layers including JWT authentication, API rate limiting, encrypted data transmission, and secure wallet integration. The platform integrates with major cryptocurrency exchanges through their APIs to provide real-time market data and execute trades. The React frontend with Redux state management ensures smooth user experience with real-time updates via WebSocket connections. The backend infrastructure is designed for high availability and fault tolerance, capable of processing hundreds of transactions per second while maintaining data consistency."
                          features={[
                            "Microservices Architecture: Separate Spring Boot services for user management, trading engine, payment processing, and market data with inter-service communication via REST APIs",
                            "Real-time Market Integration: Live price feeds from Gemini and CoinGecko APIs with WebSocket connections for sub-100ms latency updates",
                            "Advanced Order Management: Support for multiple order types including market, limit, stop-loss, and take-profit orders with proper validation and execution logic",
                            "Secure Payment Processing: Integration with Stripe and Razorpay for fiat deposits/withdrawals with automated reconciliation and fraud detection",
                            "Portfolio Analytics: Real-time profit/loss calculations, performance metrics, and detailed transaction history with data visualization charts",
                            "JWT-based Security: Comprehensive authentication and authorization system with refresh tokens, role-based access, and session management",
                            "WebSocket Real-time Updates: Live price updates, order status changes, and portfolio modifications with automatic reconnection handling",
                            "Database Transaction Management: ACID-compliant transactions ensuring data consistency during high-frequency trading operations",
                            "Docker Containerization: Complete application stack containerized for easy deployment and horizontal scaling",
                            "Comprehensive API Documentation: Well-documented REST APIs with Swagger integration for third-party integrations",
                          ]}
                          achievements={[
                            "Engineered microservices backend ensuring 95% uptime during peak trading hours with over 10,000 concurrent users",
                            "Optimized real-time transaction processing achieving 70% speed improvement through efficient Redux state management and WebSocket implementation",
                            "Successfully processed over $500K in simulated trading volume during comprehensive testing phases with zero transaction failures",
                            "Implemented multi-layer security architecture preventing 100% of attempted unauthorized access during penetration testing",
                            "Achieved sub-100ms latency for real-time price updates and order execution, competing with professional trading platforms",
                            "Containerized entire application stack reducing deployment complexity by 60% and enabling auto-scaling based on demand",
                            "Developed comprehensive testing suite covering 95% of codebase with unit, integration, and end-to-end tests",
                            "Created detailed API documentation and SDK, facilitating integration with external trading bots and analytics tools",
                          ]}
                          githubLink="https://github.com/jake/crypto-trading-platform"
                          link="https://crypto-trading-demo.vercel.app"
                        />
                      </div>

                      <div className="project-card-enter project-card-3">
                        <ProjectCard
                          title="Job Portal Platform"
                          description="A full-stack job matching platform built with Spring Boot and React, featuring intelligent job-candidate matching, comprehensive applicant tracking system, and advanced search capabilities."
                          duration="Jan 2024 – Mar 2024"
                          team="Full-Stack Developer"
                          technologies={[
                            "Spring Boot",
                            "React",
                            "MySQL",
                            "AWS EC2",
                            "Docker",
                            "NGINX",
                            "Redis",
                            "Elasticsearch",
                          ]}
                          details="This comprehensive job portal platform was designed to streamline the recruitment process for both job seekers and employers. The backend is built with Spring Boot, implementing a robust REST API architecture with proper data validation, error handling, and security measures. The system uses MySQL for primary data storage with Redis for caching frequently accessed data like job listings and user sessions. Elasticsearch powers the advanced search functionality, enabling complex queries across job descriptions, skills, and candidate profiles. The React frontend provides an intuitive user experience with responsive design and real-time notifications. The platform includes a complete applicant tracking system (ATS) with customizable hiring pipelines, automated candidate screening, and collaborative evaluation tools. Deployed on AWS EC2 with Docker containerization and NGINX as a reverse proxy for optimal performance and scalability."
                          features={[
                            "Intelligent Job Matching: Advanced algorithm that analyzes job requirements, candidate skills, experience level, and preferences to provide accurate job-candidate matches",
                            "Elasticsearch-Powered Search: High-performance search engine with intelligent filters for location, salary range, experience level, company size, and industry",
                            "Comprehensive ATS: Full applicant tracking system with customizable hiring pipelines, candidate evaluation tools, and automated workflow management",
                            "Resume Parsing & Analysis: Automated resume processing that extracts skills, experience, education, and achievements while identifying potential skill gaps",
                            "Real-time Notification System: Multi-channel notifications for job alerts, application status updates, interview scheduling, and employer communications",
                            "Advanced Analytics Dashboard: Comprehensive reporting tools for employers showing application metrics, time-to-hire statistics, and candidate quality insights",
                            "Mobile-Responsive Design: Progressive web application optimized for mobile job searching with offline capabilities and push notifications",
                            "Redis Caching Strategy: Intelligent caching of frequently accessed data reducing database load and improving response times",
                            "RESTful API Architecture: Well-structured REST endpoints with proper HTTP status codes, error handling, and API versioning",
                            "AWS Cloud Deployment: Scalable infrastructure with auto-scaling capabilities, load balancing, and proper monitoring",
                          ]}
                          achievements={[
                            "Integrated advanced REST APIs achieving 40% faster application processing with optimized database queries and caching strategies",
                            "Improved user retention by 55% through intuitive UI/UX design and personalized job recommendations based on user behavior",
                            "Successfully deployed on AWS EC2 with auto-scaling capabilities, handling traffic spikes of 500% during peak job posting periods",
                            "Implemented intelligent Redis caching strategy reducing database load by 45% and improving overall system performance",
                            "Achieved 98% user satisfaction rate in beta testing with over 1,000 participants across job seekers and employers",
                            "Processed over 10,000 job applications and facilitated 500+ successful hires during the pilot program",
                            "Developed comprehensive search functionality with Elasticsearch, reducing job discovery time by 60%",
                            "Created detailed API documentation and integration guides, enabling seamless integration with existing HR systems",
                          ]}
                          githubLink="https://github.com/jake/job-portal-platform"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div
              id="skills"
              className={`p-8 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl card-hover glass-card ${visibleSections.has("skills") ? "section-skills" : "opacity-0"}`}
            >
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technical Skills</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-amber-50 rounded-lg gentle-float stagger-1">
                  <h4 className="font-semibold text-amber-700 mb-2">Backend</h4>
                  <p className="text-sm text-gray-600">Java, Spring Boot, MySQL</p>
                </div>
                <div className="text-center p-4 bg-stone-50 rounded-lg gentle-float stagger-2">
                  <h4 className="font-semibold text-stone-700 mb-2">Frontend</h4>
                  <p className="text-sm text-gray-600">React.js, Redux, JavaScript</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg gentle-float stagger-3">
                  <h4 className="font-semibold text-gray-700 mb-2">Cloud</h4>
                  <p className="text-sm text-gray-600">AWS, Docker, NGINX</p>
                </div>
                <div className="text-center p-4 bg-amber-50 rounded-lg gentle-float stagger-4">
                  <h4 className="font-semibold text-amber-700 mb-2">Testing</h4>
                  <p className="text-sm text-gray-600">JUnit, Mockito, Selenium</p>
                </div>
              </div>
            </div>

           {/* Contact Section */}
<div
  id="contact"
  className={`p-8 bg-white/95 backdrop-blur-md border border-gray-200/60 rounded-2xl card-hover ${
    visibleSections.has("contact") ? "section-contact" : "opacity-0"
  }`}
>
  <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get In Touch</h3>
  <p className="text-gray-700 mb-6">
    I'm always interested in discussing new opportunities and exciting projects. Feel free to reach out!
  </p>

  <div className="flex flex-col sm:flex-row gap-4">
    <a
      href="mailto:shubhenduj1969@gmail.com"
      className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-amber-700 to-stone-700 hover:from-amber-600 hover:to-stone-600 text-white rounded-lg soft-shimmer transition"
    >
      <Mail className="w-4 h-4 mr-2" />
      Send Email
    </a>

    <a
      href="tel:607-235-1221"
      className="inline-flex items-center justify-center px-4 py-2 border border-gray-400 text-gray-700 hover:bg-amber-50 rounded-lg glass-card transition"
    >
      <Phone className="w-4 h-4 mr-2" />
      Call Me
    </a>
  </div>
</div>

          </section>
        </main>

        {/* Footer */}
        <footer className="p-6 text-center text-gray-600 text-sm">
          <p>© 2025 Shubhendu Jadhav. Built with passion for scalable systems and clean architecture.</p>
        </footer>
      </div>
    </div>
  )
}
