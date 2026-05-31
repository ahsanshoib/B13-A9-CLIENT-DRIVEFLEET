import Image from "next/image";
import Link from "next/link";

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col">
      <div className="relative h-44 bg-gray-50 flex-shrink-0">
        <Image
          src={car.image}
          alt={car.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500 mb-1">{car.type}</p>
        <h3 className="font-bold text-gray-900 text-base mb-2 flex-1">{car.name}</h3>
        <p className="text-orange-500 font-bold text-sm mb-4">
          BDT {Number(car.price).toLocaleString()}/day
        </p>
        <Link
          href={`/cars/${car._id}`}
          className="block text-center bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold py-2 px-4 rounded-full transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}