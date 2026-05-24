import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function CustomerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // ---------------- FETCH BOOKINGS ----------------
  const fetchBookings = async () => {
    setLoading(true);

    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) return;

    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("customer_id", user.id)
      .order("created_at", { ascending: false });

    setBookings(data || []);
    setLoading(false);
  };

  // ---------------- FETCH NOTIFICATIONS ----------------
  const fetchNotifications = async () => {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    setNotifications(data || []);
  };

  // ---------------- FETCH FAVORITES ----------------
  const fetchFavorites = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) return;

    const { data: favData, error: favError } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", user.id);

    if (favError) {
      console.log(favError);
      return;
    }

    const sellerIds = favData.map((f) => f.seller_id);

    if (sellerIds.length === 0) {
      setFavorites([]);
      return;
    }

    const { data: sellersData, error: sellersError } =
      await supabase.from("profiles").select("*").in("id", sellerIds);

    if (sellersError) {
      console.log(sellersError);
      return;
    }

    const mergedFavorites = favData.map((fav) => ({
      ...fav,
      seller: sellersData.find((s) => s.id === fav.seller_id),
    }));

    setFavorites(mergedFavorites);
  };

  // ---------------- FETCH REVIEWS ----------------
  const fetchReviews = async () => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) return;

    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("customer_id", user.id);

    setReviews(data || []);
  };

const cancelBooking = async (id) => {
  const { error } = await supabase
    .from("bookings")
    .update({ status: "cancelled" })
    .eq("id", id);

  if (error) {
    console.log(error);
    return;
  }

  // ❌ DO NOT rely only on fetchBookings
  // ✅ instantly remove from UI
  setBookings((prev) =>
    prev.map((b) =>
      b.id === id ? { ...b, status: "cancelled" } : b
    )
  );
};

  useEffect(() => {
    fetchBookings();
    fetchNotifications();
    fetchFavorites();
    fetchReviews();
  }, []);

  // ---------------- STATS ----------------
  const totalBookings = bookings.length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const completed = bookings.filter((b) => b.status === "completed").length;

  const addFavorite = async (sellerId) => {
    const { data: userData } = await supabase.auth.getUser();
    const user = userData?.user;

    if (!user) return;

    const { error } = await supabase.from("favorites").insert([
      {
        user_id: user.id,
        seller_id: sellerId,
      },
    ]);

    if (error) {
      alert(error.message);
      return;
    }

    fetchFavorites();
  };

  const removeFavorite = async (favoriteId) => {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("id", favoriteId);

    if (error) {
      alert(error.message);
      return;
    }

    setFavorites((prev) =>
      prev.filter((f) => f.id !== favoriteId)
    );
  };

  // ---------------- REALTIME BOOKINGS ----------------
  useEffect(() => {
    fetchBookings();

    const channel = supabase
      .channel("bookings-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookings" },
        (payload) => {
          setBookings((prev) => {
            if (payload.eventType === "DELETE") {
              return prev.filter((b) => b.id !== payload.old.id);
            }

            if (payload.eventType === "INSERT") {
              return [payload.new, ...prev];
            }

            if (payload.eventType === "UPDATE") {
              return prev.map((b) =>
                b.id === payload.new.id ? payload.new : b
              );
            }

            return prev;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // ---------------- REALTIME NOTIFICATIONS (FIX) ----------------
  useEffect(() => {
    const notifChannel = supabase
      .channel("notifications-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "notifications",
        },
        () => {
          fetchNotifications();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(notifChannel);
    };
  }, []);

  // ---------------- FIX: hidden statuses ----------------
  const hiddenStatuses = ["accepted", "rejected", "cancelled", "completed"];

 const visibleBookings = bookings.filter(
  (b) => !hiddenStatuses.includes(b.status)
);

  return (
    <div className="p-6 min-h-screen bg-gray-100">

      <h1 className="text-3xl font-bold mb-6">
        Customer Dashboard
      </h1>

      {/* ================= STATS ================= */}
      <div className="grid md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-2xl font-bold">{totalBookings}</h2>
          <p>Total Bookings</p>
        </div>

        <div className="bg-yellow-100 p-4 rounded shadow">
          <h2 className="text-2xl font-bold">{pending}</h2>
          <p>Pending</p>
        </div>

        <div className="bg-green-100 p-4 rounded shadow">
          <h2 className="text-2xl font-bold">{completed}</h2>
          <p>Completed</p>
        </div>
      </div>

      {/* ================= NOTIFICATIONS ================= */}
    {notifications.map((n) => (
  <div
    key={n.id}
    className="flex items-start justify-between gap-4 bg-white border border-gray-100 shadow-sm hover:shadow-md transition p-4 rounded-xl mb-3"
  >
    {/* LEFT SIDE */}
    <div className="flex gap-3">
      
      {/* ICON */}
      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-lg">
        🔔
      </div>

      {/* TEXT */}
      <div>
        <p className="text-gray-800 text-sm font-medium">
          {n.message}
        </p>

        <p className="text-xs text-gray-400 mt-1">
          {new Date(n.created_at).toLocaleString()}
        </p>
      </div>

    </div>

    {/* DELETE BUTTON */}
    <button
      onClick={() => deleteNotification(n.id)}
      className="text-gray-400 hover:text-red-500 transition text-sm font-semibold"
    >
      Delete
    </button>
  </div>
))}

      {/* ================= BOOKINGS ================= */}
      {/* ================= BOOKINGS ================= */}
{loading ? (
  <p className="text-gray-500">Loading...</p>
) : bookings.length === 0 ? (
  <p className="text-gray-500">No bookings yet.</p>
) : (
  <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

    {visibleBookings.map((b) => (
      <div
        key={b.id}
        className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-xl transition duration-300"
      >

        {/* TOP BADGE */}
        <div className="flex justify-between items-center mb-3">
          <span className={`text-xs px-3 py-1 rounded-full font-semibold
            ${b.status === "pending"
              ? "bg-yellow-100 text-yellow-700"
              : b.status === "accepted"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
            }`}
          >
            {b.status.toUpperCase()}
          </span>

          <span className="text-xs text-gray-400">
            #{b.id.slice(0, 6)}
          </span>
        </div>

        {/* CONTENT */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {b.service_name}
        </h3>

        <p className="text-sm text-gray-600 mb-4">
          {b.message}
        </p>

        {/* DIVIDER */}
        <div className="border-t pt-3 flex justify-between items-center">

          <p className="text-xs text-gray-400">
            Service Request
          </p>

          {/* BUTTON */}
          <button
            onClick={() => cancelBooking(b.id)}
            className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg transition shadow-sm"
          >
            Cancel
          </button>

        </div>
      </div>
    ))}

  </div>
)}
      {/* {loading ? (
        <p>Loading...</p>
      ) : bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="grid gap-4">
          {visibleBookings.map((b) => (
            <div key={b.id} className="bg-white p-4 rounded shadow">

              <p><b>Service:</b> {b.service_name}</p>
              <p><b>Message:</b> {b.message}</p>

              <p><b>Status:</b> {b.status}</p>

              <div className="flex gap-2 mt-3">

                <button
                  onClick={() => cancelBooking(b.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )} */}

      {/* ================= REVIEWS ================= */}
      <div className="mt-8 bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">Your Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet</p>
        ) : (
          reviews.map((r) => (
            <p key={r.id}>
              {r.rating} - {r.comment}
            </p>
          ))
        )}
      </div>

      {/* ================= FAVORITES ================= */}
      
      {/* <div className="mt-8 bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-4 text-xl">
          Favorites
        </h2>

        {favorites.length === 0 ? (
          <p>No favorites yet</p>
        ) : (
          favorites.map((f) => (
            <div key={f.id} className="border p-3 rounded mb-2">

              <p>
                ❤️ {f.seller?.business_name || "Business"}
              </p>

              <button
                onClick={() => removeFavorite(f.id)}
                className="bg-red-500 text-white px-3 py-1 rounded mt-2"
              >
                Remove
              </button>

            </div>
          ))
        )}
      </div> */}
       
       <div className="mt-8 bg-white p-4 rounded shadow">
  <h2 className="font-bold mb-4 text-xl">
    Favorites
  </h2>

  {favorites.length === 0 ? (
    <p>No favorites yet</p>
  ) : (
    <div className="grid md:grid-cols-2 gap-4">
      {favorites.map((f) => (
        <div
          key={f.id}
          className="bg-white border rounded-2xl p-5 shadow hover:shadow-xl transition"
        >
          <div className="flex justify-between items-center">

            <h3 className="text-lg font-bold text-gray-800">
              ❤️ {f.seller?.business_name || "Business"}
            </h3>

            <span className="text-yellow-500 font-semibold">
              ⭐ {f.seller?.rating || "N/A"}
            </span>

          </div>

          <div className="mt-3 text-sm text-gray-600 space-y-1">

            <p>
              <span className="font-semibold">
                Owner:
              </span>{" "}
              {f.seller?.name || "Unknown"}
            </p>

            <p>
              <span className="font-semibold">
                Location:
              </span>{" "}
              {f.seller?.location || "No location"}
            </p>

          </div>

          <button
  onClick={() => removeFavorite(f.id)}
  className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-xl transition"
>
  Remove Favorite
</button>
        </div>
      ))}
    </div>
  )}
    </div>
    </div>
  );

}
export default CustomerDashboard;