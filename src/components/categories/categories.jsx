// import CategoriesCard from "./categoriescard";
// function Categories (){
//     return(
//         <section id="categories" className="px-16">
//          <h1 className="font-bold text-3xl text-center mt-12">Browse Popular Categories</h1>
//          <p className="text-center mt-3">Explore the most popular service categories trusted by thousands of users.</p>
//          <div className="flex overflow-x-auto gap-6 mt-8 scrollbar-none">
//             <CategoriesCard img="/assets/home.jpg" title="Home Services" desc="60+ Services" />
//             <CategoriesCard img="/assets/technical-support.png" title="Tech Support" desc="60+ Services" />
//             <CategoriesCard img="/assets/paint-palette.png" title="Creative Design" desc="60+ Services" />
//             <CategoriesCard img="/assets/book.png" title="Education" desc="90+ Services" />
//             <CategoriesCard img="/assets/transport.png" title="Transport" desc="40+ Services" />
//             <CategoriesCard img="/assets/service.png" title="Maintenance" desc="70+ Services" />
//             <CategoriesCard img="/assets/household.png" title="Cleaning" desc="55+ Services" />
//             <CategoriesCard img="/assets/electricity.png" title="Electricians" desc="45+ Services" />
//              <CategoriesCard img="/assets/catoring.png" title="Catering" desc="30+ Services" />
//             <CategoriesCard img="/assets/photo.png" title="Photography" desc="25+ Services" />
//             <CategoriesCard img="/assets/lipstick.png" title="Beauty & Salon" desc="65+ Services" />
//             <CategoriesCard img="/assets/fitness.png" title="Fitness Trainers" desc="20+ Services" />
//              <CategoriesCard img="/assets/web.png" title="Web Development" desc="50+ Services" />
//             <CategoriesCard img="/assets/repair.png" title="Mobile Repair" desc="35+ Services" />
//             <CategoriesCard img="/assets/computer.png" title="Computer Services" desc="42+ Services" />
//             <CategoriesCard img="/assets/pet.png" title="Pet Care" desc="18+ Services" />
//             <CategoriesCard img="/assets/gardening.png" title="Gardening" desc="28+ Services" />
//             <CategoriesCard img="/assets/music.png" title="Music Lessons" desc="15+ Services" />
//             <CategoriesCard img="/assets/tailoring.png" title="Tailoring" desc="22+ Services" />
//             <CategoriesCard img="/assets/office.png" title="Office Services" desc="33+ Services" />
//             <CategoriesCard img="/assets/security.png" title="Security Services" desc="26+ Services" />
//             <CategoriesCard img="/assets/packing.png" title="Moving & Packing" desc="31+ Services" />
//          </div>
//         </section>
//     )
// }
// export default Categories;
import CategoriesCard from "./categoriescard";

function Categories() {
  return (
    <section id="categories" className="px-6 md:px-16 py-12">

      {/* HEADER */}
      <div className="text-center mb-10">
        <h1 className="font-bold text-3xl md:text-4xl text-gray-800">
          Browse Popular Categories
        </h1>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Explore the most popular service categories trusted by thousands of users.
        </p>
      </div>

      {/* SCROLL CONTAINER */}
      <div className="flex gap-6 overflow-x-auto pb-4 scroll-smooth">

        <div className="min-w-55">
          <CategoriesCard img="/assets/home.jpg" title="Home Services" desc="60+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/technical-support.png" title="Tech Support" desc="60+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/paint-palette.png" title="Creative Design" desc="60+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/book.png" title="Education" desc="90+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/transport.png" title="Transport" desc="40+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/service.png" title="Maintenance" desc="70+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/household.png" title="Cleaning" desc="55+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/electricity.png" title="Electricians" desc="45+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/catoring.png" title="Catering" desc="30+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/photo.png" title="Photography" desc="25+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/lipstick.png" title="Beauty & Salon" desc="65+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/fitness.png" title="Fitness Trainers" desc="20+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/web.png" title="Web Development" desc="50+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/repair.png" title="Mobile Repair" desc="35+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/computer.png" title="Computer Services" desc="42+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/pet.png" title="Pet Care" desc="18+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/gardening.png" title="Gardening" desc="28+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/music.png" title="Music Lessons" desc="15+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/tailoring.png" title="Tailoring" desc="22+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/office.png" title="Office Services" desc="33+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/security.png" title="Security Services" desc="26+ Services" />
        </div>

        <div className="min-w-55">
          <CategoriesCard img="/assets/packing.png" title="Moving & Packing" desc="31+ Services" />
        </div>

      </div>
    </section>
  );
}

export default Categories;