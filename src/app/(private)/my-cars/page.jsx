"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import PrivateRoute from "@/components/PrivateRoute";
import Spinner from "@/components/Spinner";
import ConfirmModal from "@/components/ConfirmModal";
import toast from "react-hot-toast";

export default function MyCarsPage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ open: false, id: null });
  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => { fetchMyCars(); }, []);

  async function fetchMyCars() {
    try {
      const res = await fetch(`${API}/api/my-cars`, { credentials: "include" });
      const data = await res.json();
      setCars(data);
    } catch {
      setCars([]);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    try {
      const res = await fetch(`${API}/api/cars/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Car deleted");
      setCars((prev) => prev.filter((c) => c._id !== id));
    } catch {
      toast.error("Failed to delete");
    }
  }

  async function handleUpdate() {
    try {
      const res = await fetch(`${API}/api/cars/${editingCar._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(editingCar),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success("Updated!");
      setCars((prev) => prev.map((c) => (c._id === editingCar._id ? editingCar : c)));
      setEditingCar(null);
    } catch {
      toast.error("Failed to update");
    }
  }

  return (
    <PrivateRoute>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-extrabold text-center text-[#8b1a1a] mb-10">
          MY ADDED CARS
        </h1>

        {loading ? (
          <Spinner />
        ) : cars.length === 0 ? (
          <p className="text-center text-gray-500 py-20">No cars added yet.</p>
        ) : (
          <div className="space-y-4">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-white rounded-2xl p-5 shadow-sm border border-yellow-200 flex items-center gap-5"
              >
                <div className="relative w-28 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image src={car.image} alt={car.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-400 font-semibold tracking-wide">CAR NAME</p>
                  <p className="font-bold text-gray-900">{car.name}</p>
                  <p className="text-xs text-gray-400 font-semibold tracking-wide mt-2">CAR DESCRIPTION</p>
                  <p className="text-sm text-gray-600 line-clamp-1">{car.description}</p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setEditingCar({ ...car })}
                    className="bg-orange-400 hover:bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeleteModal({ open: true, id: car._id })}
                    className="bg-[#8b1a1a] hover:bg-red-900 text-white text-sm font-bold px-4 py-2 rounded-full transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold text-[#8b1a1a] mb-5">Edit Car</h2>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">

              {["name", "price", "type", "location", "image"].map((field) => (
                <div key={field}>
                  <label className="text-xs font-semibold text-gray-500 uppercase">{field}</label>
                  <input
                    value={editingCar[field] || ""}
                    onChange={(e) => setEditingCar({ ...editingCar, [field]: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-orange-400"
                  />
                </div>
              ))}

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Status</label>
                <select
                  value={editingCar.status || "Available"}
                  onChange={(e) => setEditingCar({ ...editingCar, status: e.target.value })}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-orange-400"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase">Description</label>
                <textarea
                  value={editingCar.description || ""}
                  onChange={(e) => setEditingCar({ ...editingCar, description: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 resize-none focus:outline-none focus:border-orange-400"
                />
              </div>

            </div>
            <div className="flex gap-3 mt-5">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-orange-400 hover:bg-orange-500 text-white font-bold py-2 rounded-xl transition-colors"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingCar(null)}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-2 rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmModal
        isOpen={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, id: null })}
        onConfirm={() => handleDelete(deleteModal.id)}
        title="Delete This Car?"
        message="Are you sure you want to delete this listing? This action is permanent and cannot be undone."
        confirmText="Yes, Delete"
        type="danger"
      />
    </PrivateRoute>
  );
}