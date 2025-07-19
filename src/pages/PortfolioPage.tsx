import PortfolioGallery from '../components/PortfolioGallery'

export default function PortfolioPage() {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Portfolio
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            A collection of my best work across different photography styles and subjects.
          </p>
        </div>
        <div className="mt-12">
          <PortfolioGallery />
        </div>
      </div>
    </div>
  )
}