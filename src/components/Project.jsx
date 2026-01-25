function Project() {
  const projects = [
    {
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
      title: "Parking ni Benjo",
      description: "A full-featured e-commerce platform with real-time inventory management, payment processing, and analytics dashboard.",
      tags: ["React", "Node.js", "PostgreSQL", "Stripe"],
      codeLink: "#",
      demoLink: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
      title: "Chapi",
      description: "Collaborative task management tool with real-time updates, team workspaces, and productivity analytics.",
      tags: ["Next.js", "TypeScript", "Supabase", "Tailwind"],
      codeLink: "#",
      demoLink: "#"
    },
    {
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=800&h=600&fit=crop",
      title: "Creative Portfolio",
      description: "A stunning portfolio website for a creative agency featuring smooth animations and interactive galleries.",
      tags: ["React", "Motion", "Three.js", "GSAP"],
      codeLink: "#",
      demoLink: "#"
    }
  ];

  return (
    <div className="w-full bg-white py-20">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Featured Projects</h2>
          <p className="text-lg text-slate-600">
            A selection of my recent work and personal projects
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Project Image */}
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium text-slate-700 bg-white rounded-full border border-slate-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <a
                    href={project.codeLink}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    Code
                  </a>
                  <a
                    href={project.demoLink}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Project
