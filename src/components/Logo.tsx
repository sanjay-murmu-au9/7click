import { Link } from 'react-router-dom'

export default function Logo({ className = '', linkClassName = '' }) {
  return (
    <Link to="/" className={`inline-flex items-center ${linkClassName}`}>
      <div className={`relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-300 ${className}`}>
        <span className="text-3xl tracking-tight">7</span>
        <span className="text-2xl tracking-wider">Click</span>
        <span className="absolute -top-1 -right-2 w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
      </div>
    </Link>
  )
}
