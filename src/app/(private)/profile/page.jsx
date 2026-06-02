"use client";
import { useState } from "react";
import PrivateRoute from "@/components/PrivateRoute";
import { useAuth } from "@/context/AuthContext";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const { user, checkAuth } = useAuth();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [photo, setPhoto] = useState(user?.image || user?.photo || "");
  const [loading, setLoading] = useState(false);

  const photoURL = user?.image || user?.photo || null;
  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  async function handleUpdate() {
  setLoading(true);
  try {
    const { error } = await authClient.updateUser({
      name,
      image: photo,
    });
    if (error) throw new Error(error.message);
    await checkAuth();
    toast.success("Profile updated!");
    setEditing(false);
  } catch (err) {
    toast.error(err.message || "Failed to update");
  } finally {
    setLoading(false);
  }
}

  return (
    <PrivateRoute>
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold mb-8">Profile Overview</h1>

          <div className="flex items-start gap-8 flex-wrap">
            {/* Profile Picture */}
            <div className="text-center">
              {photoURL ? (
                <img
                  src={photoURL}
                  alt={user?.name}
                  className="w-24 h-24 rounded-xl object-cover mb-2"
                />
              ) : (
                <div className="w-24 h-24 rounded-xl bg-orange-400 flex items-center justify-center text-white text-3xl font-extrabold mb-2">
                  {initials}
                </div>
              )}
              <p className="text-xs text-gray-500">Current Profile Picture</p>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-500">NAME</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-orange-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-500">PHOTO URL</label>
                    <input
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:outline-none focus:border-orange-400"
                    />
                  </div>
                  {/* Preview */}
                  {photo && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Preview:</p>
                      <img
                        src={photo}
                        alt="preview"
                        className="w-16 h-16 rounded-xl object-cover"
                        onError={(e) => e.target.style.display = "none"}
                      />
                    </div>
                  )}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={handleUpdate}
                      disabled={loading}
                      className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-6 py-2 rounded-xl text-sm transition-colors disabled:opacity-60"
                    >
                      {loading ? "Saving..." : "Save"}
                    </button>
                    <button
                      onClick={() => setEditing(false)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold px-6 py-2 rounded-xl text-sm transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-sm text-gray-400 mb-1">Current Name</p>
                  <p className="text-xl font-bold mb-1">{user?.name}</p>
                  <p className="text-sm text-gray-400 mb-6">{user?.email}</p>
                  <button
                    onClick={() => {
                      setName(user?.name || "");
                      setPhoto(user?.image || user?.photo || "");
                      setEditing(true);
                    }}
                    className="bg-orange-400 hover:bg-orange-500 text-white font-bold px-6 py-2 rounded-xl text-sm transition-colors"
                  >
                    Update Information
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
}