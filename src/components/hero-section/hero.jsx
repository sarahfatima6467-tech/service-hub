// function Hero (){
//     return( 
//         <section id="services" className="p-12">
//             <h1 className="mt-12 text-4xl font-bold text-center mb-12">Services</h1>
//             <div className="md:flex">
//             <div className=" md:w-[50%] ">
//         <h2 className="font-bold text-4xl p-4 leading-16">FIND TRUSTED LOCAL SERVICES NEAR YOU  — <span className="text-blue-400">ALL IN ONE PLACE.</span></h2>
//         <p className="text-gray-600 p-5">Book electricians, plumbers, tutors, cleaners, and many more local experts with just a click. Whether it's fixing, learning, or cleaning, we connect you to reliable services right around the corner.</p>
//         </div>
//         <div className="md:w-[50%]">
//             <img src="/assets/hero-img.png" alt="" className="rounded-3xl" />
//         </div>
//         </div>
//         </section>
//     )
// }
// export default Hero;
function Hero() {
  return (
    <section id="services" className="px-6 md:px-16 py-16 bg-gray-50">

      {/* TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-14">
        Services
      </h1>

      <div className="md:flex items-center gap-10">

        {/* TEXT SIDE */}
        <div className="md:w-1/2 space-y-6">

          <h2 className="font-bold text-4xl md:text-5xl leading-tight text-gray-900">
            FIND TRUSTED LOCAL SERVICES NEAR YOU —
            <span className="text-blue-600"> ALL IN ONE PLACE.</span>
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            Book electricians, plumbers, tutors, cleaners, and many more local experts with just a click.
            Whether it's fixing, learning, or cleaning, we connect you to reliable services right around the corner.
          </p>

          {/* CTA BUTTON */}
          <button className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300 active:scale-95">
            Explore Services
          </button>

        </div>

        {/* IMAGE SIDE */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">

          <div className="relative">

            {/* soft background glow */}
            <div className="absolute -inset-4 bg-blue-100 rounded-3xl blur-2xl opacity-50"></div>

            <img
              src="/assets/hero-img.png"
              alt=""
              className="relative rounded-3xl shadow-xl hover:scale-105 transition duration-300"
            />

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;