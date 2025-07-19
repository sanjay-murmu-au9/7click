export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              About Me
            </h2>
            <div className="mt-3 text-lg text-gray-500">
              <p className="mb-4">
                Hello! I'm a passionate photographer with over 5 years of experience
                capturing life's most beautiful moments. My journey in photography
                began with a simple desire to preserve memories, but it quickly
                evolved into a professional pursuit of artistic excellence.
              </p>
              <p className="mb-4">
                I specialize in portrait, landscape, and event photography, bringing
                a unique perspective to each shoot. My style combines natural light
                with creative composition to create stunning, authentic images.
              </p>
              <p>
                When I'm not behind the camera, you can find me exploring new
                locations, learning new techniques, and connecting with fellow
                photography enthusiasts.
              </p>
            </div>
          </div>
          <div className="mt-8 lg:mt-0">
            <img
              className="rounded-lg shadow-lg w-full h-[600px] object-cover"
              src="https://images.unsplash.com/photo-1493863641943-9b68992a8d07"
              alt="Professional photographer with camera in studio"
            />
          </div>
        </div>
      </div>
    </div>
  )
}