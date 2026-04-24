export default function AuthCard({ title, onSubmit, buttonText, children }) {
  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-md bg-white/95 backdrop-blur-lg p-8 rounded-2xl shadow-2xl border border-teal-100 text-slate-800"
    >
      <h2 className="text-3xl font-bold text-[#007c80] text-center mb-6">
        {title}
      </h2>

      <div className="space-y-4">{children}</div>

      <button
        type="submit"
        className="w-full mt-6 bg-[#007c80] hover:bg-teal-600 text-white font-semibold py-2.5 rounded-xl transition duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
      >
        {buttonText}
      </button>
    </form>
  );
}
