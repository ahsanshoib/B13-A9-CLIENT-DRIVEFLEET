"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { MapPin, Users, Tag } from "lucide-react";
import Spinner from "@/components/Spinner";
import BookingModal from "@/components/BookingModal";
import { useAuth } from "@/context/AuthContext";

export default function CarDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API}/api/cars/${id}`)
      .then((r) => r.json())
      .then((data) => setCar(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Spinner />;
  if (!car) return <p className="text-center py-20 text-gray-500">Car not found.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        <div className="relative h-72 md:h-96">
          <Image
            src={car.image}
            alt={car.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 md:p-8">
          <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
            <div>
              <p className="text-xs text-gray-500 mb-1">{car.type}</p>
              <h1 className="text-2xl font-extrabold text-gray-900">{car.name}</h1>
            </div>
            <p className="text-orange-500 font-extrabold text-xl">
              BDT {Number(car.price).toLocaleString()}/day
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} className="text-orange-400" />
              {car.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} className="text-orange-400" />
              {car.seats} Seats
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Tag size={16} className="text-orange-400" />
              <span
                className={`font-semibold ${
                  car.status === "Available"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {car.status}
              </span>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-8">
            {car.description}
          </p>

          {car.status === "Available" ? (
  <button
    onClick={() => setShowModal(true)}
    className="bg-[#8b1a1a] hover:bg-red-900 text-white font-bold px-10 py-3 rounded-xl transition-colors"
  >
    Book Now
  </button>
) : (
  <button
    disabled
    className="bg-gray-200 text-gray-500 font-bold px-10 py-3 rounded-xl cursor-not-allowed"
  >
    Unavailable
  </button>
)}
        </div>
      </div>

      {showModal && (
        <BookingModal car={car} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
}