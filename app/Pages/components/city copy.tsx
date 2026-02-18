import Image from "next/image";
import Link from "next/link";
import { girlsData } from "@/app/Pages/data/data";
import ProfileExtras from "@/app/Pages/components/ProfileExtras";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProfilePage({ params }: Props) {
  const { id } = await params;
  const numericId = Number(id);

  const girl = girlsData.find((g) => g.id === numericId);

  if (!girl) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Profile not found
      </div>
    );
  }

  const suggestedGirls = girlsData
    .filter((g) => g.id !== girl.id && (g.city === girl.city || g.vip))
    .slice(0, 4);

  return (
    <section className={girl.vip ? "min-h-screen bg-yellow-900 text-yellow-100" : "min-h-screen bg-black text-white"}>
      <div className="p-6 max-w-6xl mx-auto">
        {/* BACK */}
        <Link
          href="/"
          className={girl.vip ? "mb-8 inline-block text-yellow-400 hover:underline" : "mb-8 inline-block text-pink-400 hover:underline"}
        >
          ← Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <Image
            src={`/hd${girl.image}`}
            alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
"
            width={1000}
            height={1000}
            placeholder="blur"
            blurDataURL={`/low${girl.image}`}
            className="rounded-3xl object-cover h-[320px] md:h-[520px] w-full"
            priority
          />

          <div>
            <h1 className="text-4xl font-bold mb-4">{girl.name}</h1>

            <p className="text-gray-400 mb-3">
              {girl.age} yrs • {girl.city}
              {girl.itnl && (
                <span className="ml-3 text-xs bg-blue-100 px-3 py-1 rounded-full text-blue-600">
                  International
                </span>
              )}
              {girl.vip && (
                <span className="ml-2 text-xs bg-yellow-500 text-black px-3 py-1 rounded-full">
                  VIP
                </span>
              )}
            </p>

            <p className="text-pink-500 text-2xl font-semibold mb-6">
              {girl.price}
            </p>

            <h2 className="text-lg font-semibold mb-3">Available Services</h2>

            <div className="flex flex-wrap gap-3 mb-8">
              {girl.services.map((service, i) => (
                <span
                  key={i}
                  className="px-4 py-2 bg-zinc-800 rounded-full text-sm"
                >
                  {service}
                </span>
              ))}
            </div>

            <Link href={"/profiles/contact/"} className={girl.vip ? "bg-yellow-800 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-yellow-600 transition" : "bg-pink-500 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-pink-600 transition" }>
              Book Appointment
            </Link>
          </div>
        </div>

        {girl.gallery && girl.gallery.length > 0 && (
          <div className="mb-24">
            <h2 className="text-3xl font-bold mb-10 text-center">Gallery</h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {girl.gallery.map((img, i) => (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-3xl bg-zinc-900"
                >
                  <Image
                    src={`/hd${img}`}
                    alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
"
                    width={600}
                    height={800}
                    placeholder="blur"
                    blurDataURL={`/low${img}`}
                    className="h-72 w-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition" />
                </div>
              ))}
            </div>
          </div>
        )}

        <ProfileExtras
          description={girl.description}
          rating={4.8}
          totalReviews={120}
        />

        {suggestedGirls.length > 0 && (
          <div className="mt-28">
            <h2 className="text-3xl font-bold mb-10 text-center">
              You May Also Like
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {suggestedGirls.map((g) => (
                <Link
                  key={g.id}
                  href={`/profiles/${g.id}`}
                  className="group bg-zinc-900 rounded-3xl overflow-hidden hover:scale-[1.04] transition"
                >
                  <Image
                    src={`/hd${g.image}`}
                    alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
"
                    width={400}
                    height={500}
                    className="h-64 w-full object-cover"
                  />

                  <div className="p-5">
                    <h4 className="text-xl font-semibold">{g.name}</h4>
                    <p className="text-gray-400 text-sm">
                      {g.age} yrs • {g.city}
                    </p>
                    <p className="text-pink-400 mt-2">{g.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
