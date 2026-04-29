import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="relative h-screen bg-gradient-to-br from-white via-slate-50 to-teal-50 text-slate-800 flex flex-col">
      {/* Overlay with subtle tint for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-teal-50/40 to-teal-100/70 backdrop-blur-sm"></div>

      <header className="relative z-10 px-6 md:px-10 py-5 md:py-7 flex flex-wrap justify-between items-center gap-3 md:gap-0 flex-shrink-0">
        <h1 className="text-2xl md:text-3xl font-extrabold text-[#007c80] drop-shadow-lg">
          PRMS
        </h1>
        <div className="space-x-3 md:space-x-4">
          <Link
            to="/signup"
            className="px-4 py-2 bg-[#007c80] text-white font-semibold rounded-lg hover:bg-teal-600 transition-all duration-200"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="px-4 py-2 border border-[#007c80] text-[#007c80] bg-white/80 font-semibold rounded-lg hover:bg-[#007c80] hover:text-white transition-all duration-200"
          >
            Login
          </Link>
        </div>
      </header>

      {/* Centered Content */}
      <main className="relative z-10 flex items-center justify-center flex-1 px-4 md:px-6 overflow-hidden">
        <div className="bg-white/90 backdrop-blur-lg text-slate-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-teal-100 max-w-5xl w-full overflow-y-auto max-h-full">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center text-[#007c80] mb-4">
            Your Smile, Our Priority
          </h2>
          <p className="text-center text-lg md:text-xl text-slate-600 mb-8">
            Welcome — providing trusted, affordable, and modern dental care for
            patients of all ages. Our professional team is committed to helping
            you achieve and maintain excellent oral health with personalized
            care in a friendly environment.
          </p>

          <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">
            Our Services
          </h3>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              "Routine Checkups & Cleanings",
              "Tooth Fillings & Restorations",
              "Root Canal Treatment",
              "Teeth Whitening & Cosmetic Dentistry",
              "Dental Implants & Bridges",
              "Pediatric Dentistry",
              "Orthodontics (Braces)",
              "Tooth Extraction & Surgery",
            ].map((service, index) => (
              <li
                key={index}
                className="bg-white text-center text-sm font-semibold p-4 rounded-lg shadow-lg border border-teal-200 hover:-translate-y-1 hover:shadow-2xl transform transition-all duration-300"
              >
                {service}
              </li>
            ))}
          </ul>

          <div className="text-center mt-10">
            <Link
              to="/signup"
              className="inline-block bg-[#007c80] text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-teal-600 hover:scale-105 transition-all duration-300"
            >
              Get Started — Sign Up
            </Link>
          </div>
        </div>
      </main>

      <footer className="relative z-10 text-center py-6 text-sm text-gray-400 flex-shrink-0">
        &copy; {new Date().getFullYear()} Seid Nur Dental Clinic. All rights
        reserved.
      </footer>
    </div>
  );
}
