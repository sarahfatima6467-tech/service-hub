import { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

function SellerCard({ seller }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };

    fetchUser();
  }, []);

  const handleBooking = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

 
const { error } = await supabase.from("bookings").insert([
  {
    customer_id: user.id,
    // seller_id: seller.user_id,
    seller_id: seller.id,
    service_name: seller.business_name,
    message: "Need service",
    status: "pending",
  },
]);
    if (error) {
      alert(error.message);
    } else {
      alert("Booking successful!");
    }
  };

const addToFavorites = async () => {
  if (!user) {
    alert("Please login first");
    return;
  }


  const { error } = await supabase.from("favorites").insert([
  {
    user_id: user.id,
  
    seller_id: seller.id,
  },
]);
  if (error) {
    alert(error.message);
  } else {
    alert("Added to favorites ❤️");
  }
};

  return (
    <div className="bg-white rounded-2xl p-5 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">

      {/* TITLE */}
      <h2 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
        {seller.business_name || "No Business Name"}
      </h2>

      {/* INFO */}
      <div className="mt-3 space-y-1 text-sm text-gray-600">
        <p><span className="font-medium">Owner:</span> {seller.name}</p>
        <p>
  <span className="font-medium">Phone:</span>{" "}
  {seller.email?.replace("@gmail.com", "")}
</p>

<p>
  <span className="font-medium">Location:</span> {seller.location}
</p>
        {/* <p><span className="font-medium">Phone:</span>{" "}{seller.phone || "No phone"}
</p> */}
      </div>

      {/* BUTTONS */}
      <div className="mt-5 flex gap-3">

    <a
  href={`tel:${seller.email?.replace("@gmail.com", "")}`}
  className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-medium hover:bg-green-600 transition text-center"
>
  Call Now
</a>

        <button
          className="flex-1 bg-teal-50 text-teal-700 border border-teal-200 py-2 rounded-lg text-sm font-medium hover:bg-teal-100 transition"
          onClick={addToFavorites}
        >
          Add to Fav
        </button>

      </div>

    </div>
  );
}

export default SellerCard;