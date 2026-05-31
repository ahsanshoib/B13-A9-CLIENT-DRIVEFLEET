"use client";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleLogout() {
    await logout();
    toast.success("Logged out");
    router.push("/");
    setDropdownOpen(false);
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/explore", label: "Explore" },
    ...(user
      ? [
          { href: "/add-car", label: "Add Car" },
          { href: "/my-bookings", label: "Booking" },
        ]
      : []),
  ];

 const photoURL = user?.image || user?.photo || null;

const initials = user?.name
  ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
  : "U";

  return (
    <nav className="bg-[#f8e97e] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="Vintage Rides" width={40} height={40} />
          <span className="font-extrabold text-[#8b1a1a] text-sm leading-tight">
            VINTAGE
            <br />
            RIDES
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium text-gray-800 hover:text-[#8b1a1a] transition-colors ${
                pathname === link.href
                  ? "underline underline-offset-4 text-[#8b1a1a]"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
  onClick={() => setDropdownOpen(!dropdownOpen)}
  className="flex items-center gap-2 bg-orange-400 hover:bg-orange-500 text-white font-semibold px-2 py-1 rounded-full transition-colors"
>
  {photoURL ? (
    <img
      src={photoURL}
      alt={user.name}
      className="w-8 h-8 rounded-full object-cover"
    />
  ) : (
    <span className="w-8 h-8 flex items-center justify-center text-sm font-bold">
      {initials}
    </span>
  )}
  <ChevronDown size={14} />
</button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
                  <Link
                    href="/profile"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    My Profile
                  </Link>
                  <Link
                    href="/add-car"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Add Car
                  </Link>
                  <Link
                    href="/my-bookings"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    My Bookings
                  </Link>
                  <Link
                    href="/my-cars"
                    onClick={() => setDropdownOpen(false)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    My Listing
                  </Link>
                  <hr className="my-1" />
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/login"
              className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-5 py-2 rounded-full text-sm transition-colors"
            >
              Login
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#f8e97e] border-t border-yellow-300 px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-sm font-medium text-gray-800"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}