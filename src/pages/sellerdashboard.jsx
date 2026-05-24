import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function SellerDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minutes, setMinutes] = useState(10);

  // STATS
  const total = bookings?.length || 0;

  const pending =
    bookings?.filter((b) => b.status === "pending")
      ?.length || 0;

  const accepted =
    bookings?.filter((b) => b.status === "accepted")
      ?.length || 0;


const hiddenStatuses = ["accepted", "rejected", "cancelled", "completed"];

const pendingBookings = bookings.filter(
  (b) => b.status === "pending"
);

const activeBookings = bookings.filter(
  (b) => b.status === "accepted"
);



  // TIME LEFT
  const getTimeLeft = (arrivalTime) => {
    const diff = new Date(arrivalTime) - new Date();

    if (diff <= 0) return "Arrived";

    const minutes = Math.floor(diff / 1000 / 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return `${minutes}m ${seconds}s`;
  };
  const rejectedBookings = bookings.filter(
  (b) => b.status === "rejected"
);
  // FETCH BOOKINGS
  const fetchBookings = async () => {
    setLoading(true);

    const { data: userData } =
      await supabase.auth.getUser();

    const user = userData?.user;

    if (!user) {
      console.log("No user logged in");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("seller_id", user.id);

    if (error) {
      console.log(error);
      setLoading(false);
      return;
    }

    setBookings(data || []);
    setLoading(false);
  };

  // UPDATE STATUS
  const updateStatus = async (booking, status) => {
  const { data: userData } = await supabase.auth.getUser();
  const seller = userData?.user;

  if (!seller) return;

  const arrivalTime = new Date(
    Date.now() + minutes * 60000
  ).toISOString();

  const { error } = await supabase
    .from("bookings")
    .update({
      status,
      arrival_time: status === "accepted" ? arrivalTime : null,
    })
    .eq("id", booking.id);

  if (error) {
    console.log(error);
    return;
  }

  if (status === "accepted") {
    await supabase.from("notifications").insert([
      {
        customer_id: booking.customer_id,
        seller_id: seller.id,
        message: `Seller accepted your booking and will arrive in ${minutes} minutes.`,
      },
    ]);
  }
 
if (status === "rejected") {
  await supabase.from("notifications").insert([
    {
      customer_id: booking.customer_id,
      seller_id: seller.id,
      message: `Sorry, your booking request was rejected by the seller.`,
    },
  ]);
}
  // 🔥 IMPORTANT FIX (THIS IS WHAT WAS MISSING)
  await fetchBookings();
};
  // const updateStatus = async (booking, status) => {
  //   const { data: userData } =
  //     await supabase.auth.getUser();

  //   const seller = userData?.user;

  //   if (!seller) return;

  //   const arrivalTime = new Date(
  //     Date.now() + minutes * 60000
  //   ).toISOString();

  //   const { error } = await supabase
  //     .from("bookings")
  //     .update({
  //       status,
  //       arrival_time:
  //         status === "accepted" ? arrivalTime : null,
  //     })
  //     .eq("id", booking.id);

  //   if (error) {
  //     console.log(error);
  //     return;
  //   }

  //   if (status === "accepted") {
  //     await supabase.from("notifications").insert([
  //       {
  //         customer_id: booking.customer_id,
  //         seller_id: seller.id,
  //         message: `Seller accepted your booking and will arrive in ${minutes} minutes.`,
  //       },
  //     ]);
  //   }

  //   fetchBookings();
  // };
useEffect(() => {
  const interval = setInterval(() => {
    setBookings((prev) => [...prev]);
  }, 1000);

  return () => clearInterval(interval);
}, []);
useEffect(() => {
  fetchBookings();

  const channel = supabase
    .channel("bookings-channel")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "bookings",
      },
      () => {
        fetchBookings(); // instantly refresh when DB changes
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(channel);
  };
}, []);
const visibleBookings = bookings.filter((b) => {
  return b.status === "pending";
});
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Seller Dashboard
      </h1>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold">
            {total}
          </h2>
          <p>Total Orders</p>
        </div>

        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold text-yellow-500">
            {pending}
          </h2>
          <p>Pending</p>
        </div>

        <div className="border p-4 rounded">
          <h2 className="text-xl font-bold text-green-500">
            {accepted}
          </h2>
          <p>Accepted</p>
        </div>

      </div>

      {/* ACTIVE BOOKINGS */}
      {activeBookings.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            Active Bookings
          </h2>

          {activeBookings.map((b) => (
            <div
              key={b.id}
              className="border p-4 rounded shadow bg-green-50 mb-2"
            >
              <p>
                <b>Customer:</b> {b.customer_name}
              </p>

              <p className="text-green-600 font-bold text-lg">
                {getTimeLeft(b.arrival_time)}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* PENDING BOOKINGS */}
      <div className="grid gap-4 mt-6">

        {pendingBookings.map((b) => (
          <div
            key={b.id}
            className="border p-4 rounded shadow"
          >
            <p>
              <b>Customer:</b> {b.customer_name}
            </p>

            <p>
              <b>Message:</b> {b.message}
            </p>

            <p>
              <b>Status:</b>{" "}
              <span
                className={
                  b.status === "pending"
                    ? "text-yellow-500"
                    : b.status === "accepted"
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {b.status}
              </span>
            </p>

            <div className="flex gap-2 mt-3">
              <select
                value={minutes}
                onChange={(e) =>
                  setMinutes(Number(e.target.value))
                }
                className="border p-2 rounded"
              >
                <option value="10">10 Minutes</option>
                <option value="15">15 Minutes</option>
                <option value="20">20 Minutes</option>
                <option value="30">30 Minutes</option>
                <option value="45">45 Minutes</option>
              </select>

              <button
                className="bg-green-500 text-white px-3 py-1 rounded"
                onClick={() =>
                  updateStatus(b, "accepted")
                }
              >
                Accept
              </button>

              <button
                className="bg-red-500 text-white px-3 py-1 rounded"
                onClick={() =>
                  updateStatus(b, "rejected")
                }
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* LOADING */}
      {loading && <p>Loading...</p>}

      {/* EMPTY STATE */}
      {!loading && bookings.length === 0 && (
        <p>No bookings yet.</p>
      )}
    </div>
  );
}

export default SellerDashboard;