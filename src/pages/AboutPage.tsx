import BlurImage from '../components/BlurImage'

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-br from-white via-blue-50 to-purple-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center pb-4 px-2 sm:px-4">
          <div className="absolute inset-0 pointer-events-none opacity-10 bg-[radial-gradient(circle_at_60%_40%,#a5b4fc_0%,#f0abfc_100%)]" />
          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              Hi, I'm <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">Your Photographer</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-8">
              Capturing honest moments, timeless stories, and the beauty of real life through my lens.
            </p>
          </div>
        </section>

        {/* Profile Card & About */}
        <section className="max-w-4xl mx-auto bg-white/80 rounded-3xl shadow-xl p-10 md:p-16 flex flex-col md:flex-row gap-10 items-center mb-16">
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 tracking-wide">About Me</h2>
          <p className="text-gray-700 text-lg mb-4">
            I’m a photographer drawn to honest moments and quiet details. My work is rooted in natural light, real emotion, and a love for storytelling that feels timeless rather than staged.
          </p>
          <p className="text-gray-600 mb-4">
            Over the years, I’ve photographed people, places, and celebrations—always searching for images that feel lived in, warm, and meaningful. I believe every photo should evoke a memory, a feeling, or a sense of wonder.
          </p>
          <p className="text-gray-600 mb-4">
            When I’m not shooting, I’m exploring new places, finding inspiration in everyday life, and refining my craft one frame at a time. I love collaborating with clients to create images that are both beautiful and authentic.
          </p>
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">Portraits</span>
            <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">Events</span>
            <span className="inline-block bg-pink-100 text-pink-700 px-4 py-2 rounded-full text-sm font-medium">Landscapes</span>
            <span className="inline-block bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">Storytelling</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center gap-6">
          <BlurImage
            className="rounded-2xl shadow-lg w-full max-w-xs h-64 object-cover"
            src="https://tinyurl.com/sevensclickAboutMe1"
            alt="Photographer at work"
          />
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl p-6 w-full max-w-xs text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
            <div className="text-gray-700 text-sm">Years of Experience</div>
          </div>
        </div>
      </section>

        {/* Feature Highlights */}
        <section className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4 pb-20">
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <svg className="w-10 h-10 text-blue-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7" /><path strokeLinecap="round" strokeLinejoin="round" d="M16 3v4M8 3v4m-5 4h18" /></svg>
          <div className="font-semibold text-gray-900 mb-1">Weddings & Events</div>
          <div className="text-gray-500 text-sm text-center">Capturing the joy, emotion, and energy of your most important days.</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <svg className="w-10 h-10 text-purple-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 01.33 1.82A8 8 0 1112 4a8 8 0 017.73 9.18a1.65 1.65 0 01-.33 1.82z" /></svg>
          <div className="font-semibold text-gray-900 mb-1">Portraits</div>
          <div className="text-gray-500 text-sm text-center">Natural, expressive portraits that reflect your personality and style.</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <svg className="w-10 h-10 text-pink-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="14" x="2" y="5" rx="2" /><path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8" /></svg>
          <div className="font-semibold text-gray-900 mb-1">Landscapes</div>
          <div className="text-gray-500 text-sm text-center">Breathtaking scenery and travel images from around the world.</div>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">
          <svg className="w-10 h-10 text-yellow-400 mb-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" /></svg>
          <div className="font-semibold text-gray-900 mb-1">Storytelling</div>
          <div className="text-gray-500 text-sm text-center">Every photo tells a story—let’s create yours together.</div>
        </div>
        </section>
      </div>
    </div>
  )
}