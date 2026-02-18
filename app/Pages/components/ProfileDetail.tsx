'use client';

import Image from 'next/image';
import { Girl } from '../data/types';
import { FaWhatsapp } from 'react-icons/fa';

export default function ProfileDetail({ girl, onBack }: { girl: Girl; onBack: () => void }) {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button onClick={onBack} className="mb-6 text-pink-400 hover:underline">
        ← Back to Home
      </button>
      <div className="grid md:grid-cols-2 gap-10">
        <Image src={"/hd" + girl.image} placeholder='blur' blurDataURL={"/low" + girl.image} className="rounded-3xl object-cover h-[300px] md:h-[500px] sm:h=[520px] w-full" width={1000} height={1000} alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
" />
        <div>
          <h1 className="text-4xl font-bold mb-3">{girl.name}</h1>
          <p className="text-gray-400 mb-3">{girl.age} yrs • {girl.city}</p>
          <p className="text-pink-500 text-2xl font-semibold mb-6">{girl.price}</p>
          <p className="text-gray-300 mb-6 leading-relaxed">{girl.description}</p>
          <h2 className="text-lg font-semibold mb-3">Available Services</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {girl.services.map((s, i) => (
              <span key={i} className="px-4 py-2 bg-zinc-800 rounded-full text-sm">{s}</span>
            ))}
          </div>
          <button className="bg-pink-500 px-8 py-4 rounded-2xl text-lg font-medium hover:bg-pink-600 transition">
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
}