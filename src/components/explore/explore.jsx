// import { useState } from "react";
// import ExploreCard from "./ExploreCard";

// function Explore(){
//   const[search, setSearch]=useState("");
 
//   const services = [
// {
//   id: 1,
//   img: "/assets/service.png",
//   title: "Home Repairs",
//   desc: "Electricians, plumbers, and technicians at your doorstep."
// },
// {
//   id: 2,
//   img: "/assets/book.png",
//   title: "Tutoring",
//   desc: "Find expert tutors for all subjects and skill levels"
// },
// {
//   id: 3,
//   img: "/assets/household.png",
//   title: "Cleaning Services",
//   desc: "Professional home and office cleaning services near you."
// },
// {
//   id: 4,
//   img: "/assets/technical-support.png",
//   title: "IT Support",
//   desc: "Fix your computer, internet, and software issues fast"
// },
// {
//   id: 5,
//   img: "/assets/paint-palette.png",
//   title: "Design Services",
//   desc: "Logos, posters, and creative designs for your brand."
// },
// {
//   id: 6,
//   img: "/assets/transport.png",
//   title: "Car Services",
//   desc: "Mechanics and car maintenance services at your location."
// }
// ];
//  const filteredData = services.filter((item) => 
//    item.title.toLowerCase().includes(search.toLowerCase()) ||
// item.desc.toLowerCase().includes(search.toLowerCase()) )
//  return(
// <section id="explore" className="px-16">
// <div className="text-center">
// <h2 className="font-bold text-3xl mt-4 mb-4">Explore Services</h2>
// <p className="text-gray-600">Discover trusted local professionals for all your needs. From home repairs to personal services,<br /> everything is just one click away</p>
// <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="border mt-5 p-2 md:w-md rounded-lg" />
// </div>

// <div className="grid sm:grid-cols-2 gap-12 mt-12">
// {filteredData.map((service) => (
// <ExploreCard
// key={service.id}
// img={service.img}
// title={service.title}
// desc={service.desc}
//   />
// ))}
//  </div>
// </section>
//     )
// }
// export default Explore;
import { useState } from "react";
import ExploreCard from "./ExploreCard";

function Explore() {
  const [search, setSearch] = useState("");

  const services = [
    {
      id: 1,
      img: "/assets/service.png",
      title: "Home Repairs",
      desc: "Electricians, plumbers, and technicians at your doorstep."
    },
    {
      id: 2,
      img: "/assets/book.png",
      title: "Tutoring",
      desc: "Find expert tutors for all subjects and skill levels"
    },
    {
      id: 3,
      img: "/assets/household.png",
      title: "Cleaning Services",
      desc: "Professional home and office cleaning services near you."
    },
    {
      id: 4,
      img: "/assets/technical-support.png",
      title: "IT Support",
      desc: "Fix your computer, internet, and software issues fast"
    },
    {
      id: 5,
      img: "/assets/paint-palette.png",
      title: "Design Services",
      desc: "Logos, posters, and creative designs for your brand."
    },
    {
      id: 6,
      img: "/assets/transport.png",
      title: "Car Services",
      desc: "Mechanics and car maintenance services at your location."
    }
  ];

  const filteredData = services.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="explore" className="px-6 md:px-16 py-16 bg-gray-50">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h2 className="font-bold text-3xl md:text-4xl text-gray-800 mb-3">
          Explore Services
        </h2>

        <p className="text-gray-500 max-w-2xl mx-auto">
          Discover trusted local professionals for all your needs. From home repairs to personal services,
          everything is just one click away.
        </p>

        {/* SEARCH BOX */}
        <div className="mt-6 flex justify-center">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md px-4 py-3 rounded-xl border border-gray-200
                       shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500
                       transition"
          />
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredData.map((service) => (
          <ExploreCard
            key={service.id}
            img={service.img}
            title={service.title}
            desc={service.desc}
          />
        ))}
      </div>

    </section>
  );
}

export default Explore;