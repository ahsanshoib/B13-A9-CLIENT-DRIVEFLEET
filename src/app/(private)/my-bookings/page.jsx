"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import ConfirmModal from "@/components/ConfirmModal";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmModal, setConfirmModal] = useState({ open: false, id: null });
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    try {
      const res = await fetch(`${API}/api/bookings`, { credentials: "include" });
      const data = await res.json();
      setBookings(data);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id) {
    try {
      const res = await fetch(`${API}/api/bookings/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Booking cancelled");
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch {
      toast.error("Failed to cancel");
    }
  }

  return (
    <PrivateRoute>
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-center text-[#8b1a1a] mb-6 sm:mb-10 tracking-wide">
          MY BOOKINGS
        </h1>

        {loading ? (
          <Spinner />
        ) : bookings.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No bookings yet.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-white rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100"
              >
                {/* Top row: image + info */}
                <div className="flex gap-4">
                  {/* Car Image */}
                  <div className="relative w-24 h-20 sm:w-28 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
                    <Image
                      src={b.carImage}
                      alt={b.carName}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    {/* Status + Price */}
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">
                        BOOKED
                      </span>
                      <span className="text-orange-500 text-xs font-bold">
                        BDT {Number(b.pricePerDay).toLocaleString()}/day
                      </span>
                    </div>

                    {/* Car Name */}
                    <h3 className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                      {b.carName}
                    </h3>

                    {/* Note */}
                    {b.note && (
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                        {b.note}
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom row: date + button */}
                <div className="flex items-center justify-between gap-3 mt-3 flex-wrap">
                  {/* Booked At Badge */}
                  <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1.5 rounded-full">
                    Booked:{" "}
                    {new Date(b.bookedAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </div>

                  {/* Cancel Button */}
                  <button
                    onClick={() => setConfirmModal({ open: true, id: b._id })}
                    className="bg-[#8b1a1a] hover:bg-red-900 active:scale-95 text-white text-xs sm:text-sm font-bold px-4 sm:px-5 py-2 rounded-xl transition-all flex-shrink-0"
                  >
                    CANCEL TRIP
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, id: null })}
        onConfirm={() => handleCancel(confirmModal.id)}
        title="Cancel Booking?"
        message="Are you sure you want to cancel this trip? This action cannot be undone."
        confirmText="Yes, Cancel"
        type="danger"
      />
    </PrivateRoute>
  );
}