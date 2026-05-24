import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

 const { data: usersData, error: usersError } = await supabase
  .from("profiles")
  .select("*")
  .eq("is_blocked", false);

if (usersError) console.log(usersError);

    const { data: messagesData } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });

    setUsers(usersData || []);
    setMessages(messagesData || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
const blockUser = async (id) => {
  const { error } = await supabase
    .from("profiles")
    .update({ is_blocked: true })
    .eq("id", id);

  if (error) {
    console.log(error);
    return;
  }

  // remove instantly from UI
  setUsers((prevUsers) =>
    prevUsers.filter((user) => user.id !== id)
  );

  alert("User blocked successfully");
};

 

const totalUsers = users.length;
const totalSellers = users.filter(u => u.role === "seller").length;
const totalCustomers = users.filter(u => u.role === "customer").length;
const deleteMessage = async (id) => {
  const { error } = await supabase
    .from("messages")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error);
    alert(error.message);
    return;
  }

  // remove instantly from UI
  setMessages((prev) =>
    prev.filter((m) => m.id !== id)
  );
};
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">

  {/* LEFT SIDE */}
  <div>
    <h1 className="text-4xl font-bold text-gray-800">
      Admin Dashboard
    </h1>

    <p className="text-gray-500 mt-1">
      Manage users, messages and platform activity
    </p>
  </div>

  {/* RIGHT SIDE */}
  <div className="mt-4 md:mt-0 flex items-center gap-4">

    {/* DATE BOX */}
    <div className="bg-white shadow px-4 py-2 rounded-xl text-sm text-gray-600">
      {new Date().toLocaleDateString()}
    </div>

    {/* ADMIN BADGE */}
    <div className="bg-linear-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-xl font-semibold shadow">
      Admin Panel
    </div>

  </div>

</div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* STATS */}
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

  {/* TOTAL USERS */}
  <div className="bg-linear-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
    <p className="text-sm opacity-80">Total Users</p>
    <h2 className="text-4xl font-bold mt-2">{totalUsers}</h2>
  </div>

  {/* SELLERS */}
  <div className="bg-linear-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
    <p className="text-sm opacity-80">Sellers</p>
    <h2 className="text-4xl font-bold mt-2">{totalSellers}</h2>
  </div>

  {/* CUSTOMERS */}
  <div className="bg-linear-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:scale-105 transition">
    <p className="text-sm opacity-80">Customers</p>
    <h2 className="text-4xl font-bold mt-2">{totalCustomers}</h2>
  </div>

</div>

        
<div className="bg-white p-6 rounded-2xl shadow-lg">

  <div className="flex justify-between items-center mb-6">
    <h2 className="text-2xl font-bold text-gray-800">
      Users
    </h2>

    <div className="bg-purple-100 text-purple-700 px-4 py-1 rounded-full text-sm font-semibold">
      {users.length} Active Users
    </div>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

    {users
      .filter(u => !u.is_blocked)
      .map(u => (
        <div
          key={u.id}
          className="bg-gray-50 hover:bg-white transition shadow-md hover:shadow-xl rounded-2xl p-5 border"
        >

          {/* Avatar + Info */}
          <div className="flex items-center gap-4 mb-4">

            <div className="w-12 h-12 rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
              {u.name?.charAt(0).toUpperCase()}
            </div>

            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                {u.name}
              </h3>

              <p className="text-sm text-gray-500 capitalize">
                {u.role}
              </p>
            </div>

          </div>

          {/* Email (optional if exists) */}
          {u.email && (
            <p className="text-sm text-gray-600 mb-3 break-all">
              {u.email}
            </p>
          )}

          {/* STATUS BADGE */}
          <div className="mb-4">
            <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
              Active
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={() => blockUser(u.id)}
            className="w-full bg-red-500 hover:bg-red-600 transition text-white py-2 rounded-xl font-semibold shadow"
          >
            Block User
          </button>

        </div>
      ))}

  </div>
</div>
          {/* MESSAGES */}
   {/* MESSAGES */}
<div className="mt-8">
  <div className="flex justify-between items-center mb-6">
    <h2 className="text-3xl font-bold text-gray-800">
      Messages
    </h2>

    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold text-sm">
      {messages.length} Total Messages
    </div>
  </div>

  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

    {messages.map(m => (
      <div
        key={m.id}
        className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition duration-300 p-6 border border-gray-100"
      >

        {/* TOP */}
        <div className="flex items-center gap-4 mb-4">

          <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white text-xl font-bold">
            {m.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="text-lg font-bold text-gray-800">
              {m.name}
            </h3>

            <p className="text-sm text-blue-600 break-all">
              {m.email}
            </p>
          </div>

        </div>

        {/* MESSAGE */}
        <div className="bg-gray-50 p-4 rounded-2xl mb-4">
          <p className="text-gray-700 leading-relaxed">
            {m.message}
          </p>
        </div>

        {/* FOOTER */}
        <div className="flex justify-between items-center">

          <span className="text-xs text-gray-500">
            {new Date(m.created_at).toLocaleString()}
          </span>

          <button
  onClick={() => deleteMessage(m.id)}
  className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-xl text-sm font-semibold"
>
  Delete
</button>

        </div>
      </div>
    ))}

  </div>
</div>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;