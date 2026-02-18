export default function ContactSection() {
  return (
    <section id="contact" className="py-24 max-w-4xl mx-auto px-6 text-center">
      <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
      <p className="text-gray-400 mb-10">For bookings and inquiries, reach out discreetly.</p>
      <div className="grid md:grid-cols-2 gap-6">
        <input placeholder="Your Name" className="bg-zinc-900 p-4 rounded-xl" />
        <input placeholder="Email Address" className="bg-zinc-900 p-4 rounded-xl" />
        <textarea placeholder="Message" className="bg-zinc-900 p-4 rounded-xl md:col-span-2" rows={5} />
      </div>
      <button className="mt-8 bg-pink-500 px-10 py-4 rounded-2xl hover:bg-pink-600">
        Send Message
      </button>
    </section>
  );
}