import { videos } from '../assets/videoData'

export default function VideoShowcase() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {videos.map((video, index) => (
        <div key={index} className="flex flex-col">
          <div className="relative aspect-video mb-4">
            <iframe
              src={video.url}
              title={video.title}
              className="absolute inset-0 w-full h-full rounded-lg shadow-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">{video.title}</h3>
          <p className="mt-1 text-sm text-gray-500">{video.description}</p>
        </div>
      ))}
    </div>
  )
}