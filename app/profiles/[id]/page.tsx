import Image from "next/image";
import Link from "next/link";
import { girlsData } from "../../Pages/data/data";
import ProfileExtras from "../../Pages/components/ProfileExtras";
import { FaPhoneSquare, FaTelegram, FaWhatsappSquare } from "react-icons/fa";

export function generateStaticParams() {
  return girlsData.map((girl) => ({
    id: girl.id.toString(),
  }));
}

interface Props {
  params: { id: string };
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
    <section
      className={
        girl.vip
          ? "min-h-screen bg-yellow-900 text-yellow-100"
          : "min-h-screen bg-black text-white"
      }
    >
      <div className="p-6 max-w-6xl mx-auto">
        {/* BACK */}
        <Link
          href="/"
          className={
            girl.vip
              ? "mb-8 inline-block text-yellow-400 hover:underline"
              : "mb-8 inline-block text-pink-400 hover:underline"
          }
        >
          ← Back to Home
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <Image
            src={`/girls${girl.image}`}
            alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
"
            width={1000}
            height={1000}
            placeholder="blur"
            blurDataURL={`/grils${girl.image}`}
            className="rounded-3xl object-cover h-[320px] md:h-[520px] object-top w-full"
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

            <div className="flex my-10 gap-2">
              <FaPhoneSquare size={50} className="text-yellow-400" />
              <FaWhatsappSquare size={50} className="text-green-400" />
              <FaTelegram size={50} className="text-blue-400" />
            </div>

            <hr className="border-gray-100/30" />
            <br />
            <br />

            <Link
              href={"/profiles/contact/"}
              className={
                girl.vip
                  ? "bg-yellow-800 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-yellow-600 transition"
                  : "bg-pink-500 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-pink-600 transition"
              }
            >
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
                    src={`/girls/${img}`}
                    alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
"
                    width={600}
                    height={800}
                    placeholder="blur"
                    blurDataURL={`/girls/${img}`}
                    className="h-72 w-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
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

            <div
              className="
    flex gap-4 px-4
    overflow-x-auto overflow-y-hidden
    snap-x snap-mandatory
    sm:grid sm:grid-cols-2
    lg:grid-cols-4
    sm:gap-8
    sm:overflow-visible
    scrollbar-hide
    overscroll-x-contain
  "
            >
              {suggestedGirls.map((g) => (
                <Link
                  key={g.id}
                  href={`/profiles/${g.id}`}
                  className="
        group
        snap-center
        flex-shrink-0
        w-[80%] sm:w-auto
        bg-zinc-900
        rounded-3xl
        overflow-hidden
        transition
        hover:scale-[1.04]
      "
                >
                  <Image
                    src={`/girls/${g.image}`}
                    alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
"
                    width={400}
                    height={500}
                    className="h-60 object-top sm:h-64 w-full object-cover"
                  />

                  <div className="p-4 sm:p-5">
                    <h4 className="text-lg sm:text-xl font-semibold">
                      {g.name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {g.age} yrs • {g.city}
                    </p>
                    <p className="text-pink-400 mt-1 sm:mt-2">{g.price}</p>
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
