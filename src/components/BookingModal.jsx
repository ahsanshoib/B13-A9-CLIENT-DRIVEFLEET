"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function BookingModal({ car, onClose }) {
  const { user } = useAuth();
  const router = useRouter();
  const [driverNeeded, setDriverNeeded] = useState("No");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const API = process.env.NEXT_PUBLIC_API_URL;

  async function handleBook() {
    if (!user) {
      router.push("/login");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          carId: car._id,
          driverNeeded,
          note,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Car booked successfully!");
      onClose();
      router.push("/my-bookings");
    } catch (err) {
      toast.error(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-bold text-[#8b1a1a] mb-1">Book This Car</h2>
        <p className="text-sm text-gray-500 mb-5">{car.name}</p>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            DRIVER NEEDED
          </label>
          <select
            value={driverNeeded}
            onChange={(e) => setDriverNeeded(e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
          >
            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-600 mb-1">
            SPECIAL NOTE
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            placeholder="Any special requests..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-orange-400"
          />
        </div>

        <button
          onClick={handleBook}
          disabled={loading}
          className="w-full bg-[#8b1a1a] hover:bg-red-900 text-white font-bold py-3 rounded-xl transition-colors disabled:opacity-60"
        >
          {loading ? "Booking..." : "BOOK NOW"}
        </button>
      </div>
    </div>
  );
}