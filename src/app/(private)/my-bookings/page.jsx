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

  useEffect(() => { fetchBookings(); }, []);

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
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-center text-[#8b1a1a] mb-10">
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
                className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center gap-5"
              >
                <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={b.carImage} alt={b.carName} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">BOOKED</span>
                    <span className="text-orange-500 text-xs font-bold">
                      BDT {Number(b.pricePerDay).toLocaleString()}/day
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900">{b.carName}</h3>
                  <p className="text-sm text-gray-500 truncate">{b.note}</p>
                  <div className="mt-2 inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                    Booked At: {new Date(b.bookedAt).toLocaleString("en-US", {
                      month: "short", day: "numeric", year: "numeric",
                      hour: "numeric", minute: "2-digit",
                    })}
                  </div>
                </div>
                <button
                  onClick={() => setConfirmModal({ open: true, id: b._id })}
                  className="bg-[#8b1a1a] hover:bg-red-900 text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors flex-shrink-0"
                >
                  CANCEL TRIP
                </button>
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