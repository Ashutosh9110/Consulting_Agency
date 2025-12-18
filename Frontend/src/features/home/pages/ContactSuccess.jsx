import { useNavigate } from "react-router-dom"

export default function ContactSuccess() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 sm:px-8 py-12 sm:py-16 flex items-center justify-center">
      <section className="max-w-2xl w-full bg-white/10 backdrop-blur-xl rounded-2xl p-8 sm:p-12 shadow-2xl text-center">
        
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Thank You for Contacting Us
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          We’ve received your message successfully.  
          Our team at <span className="text-white font-semibold">ABC Consulting</span> will reach out to you with the relevant details at the earliest.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/home")}
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition cursor-pointer"
          >
            Go to Home
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="px-6 py-3 border border-white/60 rounded-lg hover:bg-white hover:text-black transition cursor-pointer"
          >
            Back to Contact
          </button>
        </div>
      </section>
    </div>
  )
}
