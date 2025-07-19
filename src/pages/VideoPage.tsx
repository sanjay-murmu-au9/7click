import VideoShowcase from '../components/VideoShowcase'

export default function VideoPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Video Projects
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            A showcase of my videography work and motion projects.
          </p>
        </div>
        <div className="mt-12">
          <VideoShowcase />
        </div>
      </div>
    </div>
  )
}