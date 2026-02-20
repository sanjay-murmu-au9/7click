export default function CareersPage() {
  const jobs = [
    {
      title: 'Wedding Photographer',
      type: 'Full-time',
      location: 'Dumka, Jharkhand',
      description: 'Capture beautiful wedding moments with creativity and professionalism.',
      requirements: ['2+ years experience', 'Own camera equipment', 'Portfolio required'],
      icon: '📸'
    },
    {
      title: 'Video Editor',
      type: 'Full-time',
      location: 'Dumka, Jharkhand',
      description: 'Edit wedding and event videos with cinematic quality.',
      requirements: ['Adobe Premiere/Final Cut Pro', '1+ years experience', 'Creative mindset'],
      icon: '🎬'
    },
    {
      title: 'Photography Assistant',
      type: 'Part-time',
      location: 'Dumka, Jharkhand',
      description: 'Assist photographers during shoots and help with equipment.',
      requirements: ['Passion for photography', 'Flexible schedule', 'Team player'],
      icon: '✨'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-24">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in">
              Join Our Creative Team
            </h1>
            <p className="text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Shape the future of photography with us. Be part of something extraordinary.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 pb-20">
        {/* Job Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((job, index) => (
            <div
              key={index}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              <div className="p-8">
                <div className="text-5xl mb-4">{job.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {job.title}
                  </h2>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full text-xs font-semibold">
                    {job.type}
                  </span>
                  <div className="flex items-center text-gray-500 text-sm">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {job.location}
                  </div>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{job.description}</p>
                <div className="space-y-3 mb-6">
                  <p className="text-sm font-semibold text-gray-900 flex items-center">
                    <svg className="w-4 h-4 mr-2 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Requirements
                  </p>
                  <ul className="space-y-2">
                    {job.requirements.map((req, i) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <span className="text-indigo-500 mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={`mailto:sevensclick@gmail.com?subject=Application for ${job.title}`}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all duration-300 transform group-hover:scale-105 shadow-md hover:shadow-xl"
                >
                  Apply Now →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          <div className="relative px-8 py-16 text-center">
            <div className="text-6xl mb-6">💼</div>
            <h2 className="text-4xl font-bold text-white mb-4">Don't See Your Role?</h2>
            <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your portfolio and let's create magic together!
            </p>
            <a
              href="mailto:sevensclick@gmail.com"
              className="inline-flex items-center px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
