"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import CarCard from "@/components/CarCard";
import Spinner from "@/components/Spinner";
import { Star } from "lucide-react";

const reviews = [
  {
    initials: "SM",
    name: "Sameer Mathew",
    role: "Playback Singer",
    text: "Good service! The car was in pristine condition and the whole booking experience was seamless. Truly a ride back in time.",
  },
  {
    initials: "SZ",
    name: "Sheikh Zulfiqaar",
    role: "Supreme Court Lawyer",
    text: "Vintage ride is the best! I rented a '67 Mustang for my anniversary and it was absolutely magical. The team was so professional.",
  },
  {
    initials: "SD",
    name: "Sthuti Dasgupta",
    role: "Civil Sergeon",
    text: "Exceptional attention to detail. Every vehicle felt like a rolling museum piece. Will definitely book again for our next event.",
  },
];

const stats = [
  { value: "18+", label: "CARS" },
  { value: "400+", label: "CLIENTS" },
  { value: "22+", label: "DRIVERS" },
];

export default function Home() {
  const [cars, setCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(true);
  const { checkAuth } = useAuth();

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    
    checkAuth();

  
    fetch(`${API}/api/cars/featured`, {
  credentials: "include",
})

      .then((r) => r.json())
      .then((data) => setCars(data))
      .catch(() => {})
      .finally(() => setLoadingCars(false));
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center justify-center">
        <Image
          src="/hero-banner.jpg"
          alt="Hero"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-white text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-7xl font-extrabold leading-tight mb-4"
          >
            UNPLUG FROM
            <br />
            THE MODERN WORLD
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-200"
          >
            Step away from the fast digital rush and rediscover timeless
            elegance through handcrafted details, chrome reflections, and the
            soulful presence of classic vintage cars that carry stories from
            another golden era.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center"
          >
            <Link
              href="/explore"
              className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-8 py-3 rounded-full text-base transition-colors inline-block"
            >
              Explore Cars →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Available Cars */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center text-[#8b1a1a] mb-10">
          AVAILABLE CARS
        </h2>
        {loadingCars ? (
          <Spinner />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>
        )}
        <div className="text-center mt-10">
          <Link
            href="/explore"
            className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-8 py-3 rounded-full text-sm transition-colors inline-block"
          >
            See All Cars
          </Link>
        </div>
      </section>

      {/* Client Reviews */}
      <section className="bg-[#f8e97e] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-center text-xs font-semibold tracking-widest text-orange-600 mb-2">
            WHAT THEY SAY
          </p>
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-2">
            CLIENT REVIEWS
          </h2>
          <div className="w-10 h-0.5 bg-orange-400 mx-auto mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white text-xs font-bold">
                      {r.initials}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{r.name}</p>
                      <p className="text-xs text-orange-500">{r.role}</p>
                    </div>
                  </div>
                  <span className="text-yellow-400 text-xl">"</span>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} className="fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-5xl font-extrabold text-orange-400">{s.value}</p>
              <div className="w-8 h-0.5 bg-orange-400 mx-auto my-2" />
              <p className="text-xs font-bold tracking-widest text-gray-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}