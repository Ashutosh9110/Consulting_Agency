import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 sm:px-8 py-12 sm:py-16">
      <section className="max-w-5xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
          Strategic Consulting for Modern Businesses
        </h1>
        <p className="text-gray-300 text-lg mb-8">
          We help organizations scale faster, operate smarter, and lead with confidence.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/my-profile"
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            My Profile
          </Link>
          <Link
            to="/contact"
            className="px-6 py-3 border border-white rounded-lg hover:bg-white hover:text-black transition"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[
          {
            title: "Business Strategy",
            desc: "Market analysis, growth planning, and competitive positioning.",
          },
          {
            title: "Technology Consulting",
            desc: "Digital transformation, cloud adoption, and system architecture.",
          },
          {
            title: "Operations Excellence",
            desc: "Process optimization and performance improvement.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-lg hover:bg-white/20 transition"
          >
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm">{item.desc}</p>
          </div>
        ))}
      </section>

      <footer className="mt-24 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} Maxlence Consulting. All rights reserved.
      </footer>
    </div>
  )
}
