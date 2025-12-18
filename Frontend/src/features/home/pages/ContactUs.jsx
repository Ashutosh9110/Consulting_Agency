import { useNavigate } from "react-router-dom"

export default function ContactUs() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white px-4 sm:px-8 py-12 sm:py-16">
      
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="mb-8 inline-flex items-center gap-2 text-white border border-white/60 px-4 py-2 rounded-lg hover:bg-white hover:text-black transition cursor-pointer"
      >
        ← Back to Home
      </button>

      {/* Contact Card */}
      <section className="max-w-4xl mx-auto bg-white/10 backdrop-blur-xl rounded-2xl p-6 sm:p-10 shadow-2xl">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          Contact Us
        </h1>

        <p className="text-gray-300 mb-8">
          Have questions or need professional consulting support?  
          Reach out to <span className="text-white font-semibold">ABC Consulting</span> — we’re here to help.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Company</h3>
              <p className="text-gray-300">ABC Consulting Pvt. Ltd.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Address</h3>
              <p className="text-gray-300">
                3rd Floor, Orion Business Park<br />
                MG Road, Bengaluru<br />
                Karnataka, India – 560001
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-300">contact@abcconsulting.com</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Phone</h3>
              <p className="text-gray-300">+91 98765 43210</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Business Hours</h3>
              <p className="text-gray-300">
                Monday – Friday<br />
                9:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form (UI Only / Dummy) */}
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm">Message</label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-white"
              />
            </div>

            <button
              type="button"
              onClick={() => navigate("/contact-success")}
              className="w-full mt-2 px-6 py-3 border border-white/60 rounded-lg text-white hover:bg-white hover:text-black transition cursor-pointer"
            >
              Send Message
            </button>
          </div>

        </div>
      </section>
    </div>
  )
}
