"use client";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CarCard from "@/components/CarCard";
import Spinner from "@/components/Spinner";

const CAR_TYPES = ["All", "Vintage Tourer", "Classic Hot Rod", "Vintage Sports", "Vintage Luxury", "Vintage Cabriolet", "Vintage Royal", "Classic Sedan"];

export default function ExplorePage() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All");

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchCars(search, type);
  }, [type]);

  async function fetchCars(searchVal = "", typeVal = type) {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchVal.trim()) params.set("search", searchVal.trim());
      if (typeVal !== "All") params.set("type", typeVal);
      
      const res = await fetch(`${API}/api/cars?${params.toString()}`, {
  credentials: "include",
});



      const data = await res.json();
      setCars(Array.isArray(data) ? data : []);
    } catch {
      setCars([]);
    } finally {
      setLoading(false);
    }
  }

  function handleSearch() {
    fetchCars(search, type);
  }

  function handleTypeChange(newType) {
    setType(newType);
    fetchCars(search, newType);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-extrabold text-center text-[#8b1a1a] mb-8">
        EXPLORE CARS
      </h1>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search by car name..."
          className="border border-gray-200 rounded-full px-4 py-2 text-sm w-full sm:w-72 focus:outline-none focus:border-orange-400"
        />
        <button
          onClick={handleSearch}
          className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-full text-sm transition-colors flex items-center gap-2 justify-center"
        >
          <Search size={14} /> Search
        </button>
        <select
          value={type}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-orange-400"
        >
          {CAR_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : cars.length === 0 ? (
        <p className="text-center text-gray-500 py-20">No cars found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}