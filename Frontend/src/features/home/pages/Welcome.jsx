import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="https://res.cloudinary.com/djm65usjg/video/upload/v1765699624/1_dmhkb9.mp4"
         type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 flex h-full items-center justify-center text-center px-6">
        <div className="max-w-xl text-white space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold">
            Welcome to Maxlence
          </h1>

          <p className="text-lg text-gray-200">
            Secure authentication, admin control, and modern architecture.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              to="/login"
              className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-gray-200"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-6 py-3 rounded-lg border border-white text-white hover:bg-white hover:text-black"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

    </div>
  )
}
