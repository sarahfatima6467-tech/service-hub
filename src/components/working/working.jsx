// import WorkingCards from "./workingcards";
// function Working (){
//     return(
//         <section className="p-16 mt-8">
//         <h1 className="text-center text-3xl font-bold mb-3">How Service Hub Works</h1>
//         <p className="text-center">A simple 4-step process to connect you with trusted local services quickly and easily.</p>
//         <div>
//             <div className="flex md:justify-start">
//             <WorkingCards title="Search Services" img="/assets/search.svg" desc="Find the service you need using smart search or categories"/>
//             </div>
//             <div className="flex md:justify-end">
//             <WorkingCards  title="Choose Provider" img="/assets/location.png" desc="Select verified local professionals near your location."/>
//             </div>
//             <div  className="flex md:justify-start">
//             <WorkingCards title="Book Instantly" img="/assets/calender.png" desc="Schedule your service in just a few clicks without hassle."/>
//             </div>
//             <div  className="flex md:justify-end">
//             <WorkingCards title="Get It Done" img="/assets/star.png" desc="Receive quality service and rate your experience."/>
//             </div>
//         </div>

//         <div className="flex flex-col items-center mt-20">
//             <h2 className="font-bold text-xl mb-3">Ready to get started?</h2>
//             <p>Explore services and book your first experience today</p>
//             <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-3xl mt-3">Start Exploring</button>
//         </div>
//         </section>
//     )
// }
// export default Working;
import WorkingCards from "./workingcards";

function Working() {
  return (
    <section className="px-6 md:px-16 py-20 mt-10 bg-gray-50">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
          How Service Hub Works
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto">
          A simple 4-step process to connect you with trusted local services quickly and easily.
        </p>
      </div>

      {/* STEPS CONTAINER */}
      <div className="relative">

        {/* vertical line (desktop only) */}
        <div className="hidden md:block absolute left-1/2 top-0 h-full w-0.5 bg-gray-200"></div>

        <div className="space-y-12">

          {/* STEP 1 */}
          <div className="md:flex md:justify-start">
            <WorkingCards
              title="Search Services"
              img="/assets/search.svg"
              desc="Find the service you need using smart search or categories"
            />
          </div>

          {/* STEP 2 */}
          <div className="md:flex md:justify-end">
            <WorkingCards
              title="Choose Provider"
              img="/assets/location.png"
              desc="Select verified local professionals near your location."
            />
          </div>

          {/* STEP 3 */}
          <div className="md:flex md:justify-start">
            <WorkingCards
              title="Book Instantly"
              img="/assets/calender.png"
              desc="Schedule your service in just a few clicks without hassle."
            />
          </div>

          {/* STEP 4 */}
          <div className="md:flex md:justify-end">
            <WorkingCards
              title="Get It Done"
              img="/assets/star.png"
              desc="Receive quality service and rate your experience."
            />
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <div className="flex flex-col items-center mt-20 text-center">
        <h2 className="font-bold text-2xl text-gray-800 mb-2">
          Ready to get started?
        </h2>

        <p className="text-gray-500">
          Explore services and book your first experience today
        </p>

        <button className="bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white py-3 px-8 rounded-xl mt-5 shadow-md">
          Start Exploring
        </button>
      </div>

    </section>
  );
}

export default Working;