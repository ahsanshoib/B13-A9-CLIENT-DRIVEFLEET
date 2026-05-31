"use client";
import { useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function AddCarPage() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_URL;

  const [form, setForm] = useState({
    name: "",
    type: "",
    price: "",
    seats: "",
    location: "",
    image: "",
    status: "Available",
    description: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit() {
    try {
      const res = await fetch(`${API}/api/cars`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      toast.success("Car added!");
      router.push("/my-cars");
    } catch (err) {
      toast.error(err.message || "Failed to add car");
    }
  }

  return (
    <PrivateRoute>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h1 className="text-2xl font-extrabold text-center text-[#8b1a1a] mb-8">
            ADD A NEW CAR
          </h1>

          <div className="space-y-4">
            <Field label="CAR NAME" name="name" value={form.name} onChange={handleChange} placeholder="1935 Chevrolet" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="CAR TYPE" name="type" value={form.type} onChange={handleChange} placeholder="Vintage Cabriolet" />
              <Field label="PICKUP LOCATION" name="location" value={form.location} onChange={handleChange} placeholder="Dhaka" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="RENT PRICE / DAY (BDT)" name="price" type="number" value={form.price} onChange={handleChange} placeholder="5000" />
              <Field label="SEAT CAPACITY" name="seats" type="number" value={form.seats} onChange={handleChange} placeholder="4" />
            </div>
            <Field label="IMAGE URL *" name="image" value={form.image} onChange={handleChange} placeholder="https://images.google.com/photo.jpg" />


        

            <div>
  <label className="block text-xs font-semibold text-gray-600 mb-1">STATUS</label>
  <select
    name="status"
    value={form.status}
    onChange={handleChange}
    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
  >
    <option value="Available">Available</option>
    <option value="Unavailable">Unavailable</option>
  </select>
</div>

            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">DESCRIPTION</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Write something about the car conditions..."
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-orange-400"
              />
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 bg-[#8b1a1a] hover:bg-red-900 text-white font-bold py-3 rounded-xl tracking-wider transition-colors"
          >
            ADD CAR
          </button>
        </div>
      </div>
    </PrivateRoute>
  );
}

function Field({ label, name, value, onChange, placeholder, type = "text" }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-600 mb-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
      />
    </div>
  );
}