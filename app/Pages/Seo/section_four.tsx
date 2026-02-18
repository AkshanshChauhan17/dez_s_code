const GrowingPresenceSection = () => {
  return (
    <section className="bg-black text-gray-300 py-16 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-5">

        {/* Section Heading (H2 – replaced from H3) */}
        <h2 className="text-2xl md:text-3xl font-semibold text-white mb-8 tracking-wide">
          Our Growing Presence as a Leading Companion Service Website
        </h2>

        {/* Body Content */}
        <div className="space-y-6 text-[15px] md:text-base leading-relaxed text-gray-400 max-w-5xl">

          <p>
            As a trusted companion service website, our presence continues to
            expand across popular locations, offering reliable and professional
            companionship services online. We focus on quality, discretion, and
            a smooth user experience for clients seeking refined companionship.
          </p>

          <p>
            We are steadily growing our reach to serve clients in major cities and
            high-demand areas. This expansion allows us to maintain consistent
            service quality while ensuring local availability through a single,
            easy-to-use companion service website.
          </p>

          <p>
            Our growth is built on trust and professionalism. We prioritize the
            core values that matter most to our users:
          </p>

          {/* Priority Points */}
          <ul className="space-y-4 mt-4">
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-500" />
              Secure and private online access
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-500" />
              Verified and professional companions
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-500" />
              Easy navigation and booking support
            </li>

            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-500" />
              Quick assistance and responsive customer care
            </li>
          </ul>

          <p className="pt-4">
            Each step is carefully designed to give users confidence, comfort,
            and peace of mind while engaging with our platform.
          </p>

        </div>

      </div>
    </section>
  );
};

export default GrowingPresenceSection;