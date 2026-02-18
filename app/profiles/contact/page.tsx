'use client';

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [click, setClick] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    setSubmitted(true);
  };

  const inputVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, type: "spring" as const, stiffness: 100 },
    }),
  };

  return (
    <section className="min-h-screen bg-black flex items-center justify-center px-5 py-5">
      <div className=" w-full grid md:grid-cols-2 gap-5 items-center">
        
        {/* Left Column: Image / Hero */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src={click ? "/contact_us.jpg" : "/contact_us_local.jpg"}
            alt="luxury escort services at affordable price, top escort services agency,
best escorts services online, vip call girls services online, professional escort booking site
online
"
            width={1000}
            height={1000}
            className="rounded-3xl object-cover w-full h-[100vh]"
            priority
            onClick={()=>setClick(!click)}
          />
          
        </motion.div>

        {/* Right Column: Form */}
        <motion.div
        id="contact"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-zinc-900/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Get in Touch</h2>
          <p className="text-gray-400 mb-8">
            Fill the form below to book a session or ask any questions. We will respond within 24 hours.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-green-400 text-xl font-semibold text-center"
            >
              Thank you! Your message has been sent.
            </motion.div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {(["name", "email", "phone"] as (keyof typeof formData)[]).map((field, i) => (
                <motion.div
                  key={field}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                  variants={inputVariants}
                >
                  <label className="relative block">
                    <input
                      type={field === "email" ? "email" : "text"}
                      name={field}
                      placeholder=" "
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="peer w-full px-4 py-5 rounded-2xl bg-zinc-800 border border-zinc-700 text-white placeholder-transparent focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                    />
                    <span className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-pink-400 peer-focus:text-sm">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </span>
                  </label>
                </motion.div>
              ))}

              <motion.div
                custom={3}
                initial="hidden"
                animate="visible"
                variants={inputVariants}
              >
                <label className="relative block">
                  <textarea
                    name="message"
                    placeholder=" "
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="peer w-full px-4 py-5 rounded-2xl bg-zinc-800 border border-zinc-700 text-white placeholder-transparent focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition"
                  />
                  <span className="absolute left-4 top-4 text-gray-400 text-sm transition-all peer-placeholder-shown:top-5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base peer-focus:top-1 peer-focus:text-pink-400 peer-focus:text-sm">
                    Your Message
                  </span>
                </label>
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.03, backgroundColor: "#ec4899" }}
                whileTap={{ scale: 0.95 }}
                className="w-full py-4 rounded-2xl bg-pink-500 text-lg font-semibold text-white shadow-lg transition"
              >
                Send Message
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}