import { useState, useEffect } from "react";

import Categories from "../components/categories/categories";
import Contact from "../components/contact/contact";
import Explore from "../components/explore/explore";
import Header from "../components/header/header";
import Hero from "../components/hero-section/hero";
import Searchbar from "../components/searchbar/search";
import Working from "../components/working/working";
import SellerCard from "../components/searchbar/sellercard";

import { supabase } from "../supabaseClient";
function Home({ session }) {
  const [sellers, setSellers] = useState([]);
  const [query, setQuery] = useState("");
  const [showSellers, setShowSellers] = useState(true);
  const [locationFilter, setLocationFilter] = useState("");
  const [visibleCount, setVisibleCount] = useState(6);
  const fetchSellers = async () => {
   const { data, error } = await supabase
  .from("profiles")
  .select("*")
  .eq("role", "seller")
  .eq("is_blocked", false);
       if (error) {
      console.log(error);
      return;
    }

    setSellers(data || []);
  };

  useEffect(() => {
    fetchSellers();
  }, []);
const filteredSellers = sellers.filter((s) => {
  const matchName = s.business_name
    ?.toLowerCase()
    .includes(query.toLowerCase());

  const matchLocation =
    locationFilter === "" ||
    s.location === locationFilter;

  return matchName && matchLocation;
});
useEffect(() => {
  setVisibleCount(6);
}, [query, locationFilter]);

   return (
    <>
      <Header
  refreshSellers={fetchSellers}
  setShowSellers={setShowSellers}
  session={session}
/>
       <Searchbar
  query={query}
  setQuery={setQuery}
  locationFilter={locationFilter}
  setLocationFilter={setLocationFilter}
/>

{showSellers && (
  <>
    <section className="p-6 grid md:grid-cols-3 gap-4">
      {filteredSellers.slice(0, visibleCount).map((seller) => (
        <SellerCard key={seller.id} seller={seller} />
      ))}
    </section>

    {visibleCount < filteredSellers.length && (
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setVisibleCount((prev) => prev + 6)}
    className="px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl shadow-sm
               hover:shadow-md hover:bg-gray-50 active:scale-95 transition-all duration-200 font-medium"        >
          Show More
        </button>
      </div>
    )}
  </>
)}
        < Categories />
      <Hero />
      <Explore />
      <Working />
      <Contact />
    </>
  );
}

export default Home;