import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative h-fit pt-20 sm:py-0 sm:h-[90vh] flex items-center justify-center text-center"
    >
      <Image
        src="/hero_background.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        width={1000}
        height={1000}
        alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
"
      />
      <div className="relative z-10 max-w-3xl px-6">
        <h1 className="text-2xl sm:text-3xl mb-6 leading-tight">
          Premium Call Girl & Escort Service  
        </h1>
        <p className="text-white text-lg mb-8">
          VIP Call Girls, Desi Bhabhi, Hot & Sexy Russian, Models, Punjabi, and Bengali Escort Waiting for You!
        </p>
        <button
          onClick={() =>
            document
              .getElementById("escorts")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="bg-pink-500 px-10 py-4 rounded-xl text-lg hover:bg-pink-600 cursor-pointer"
        >
          Explore Profiles
        </button>
      </div>
    </section>
  );
}
