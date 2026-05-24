// function CategoriesCard (props){
//     return(
//         <div className="shadow p-6 w-full rounded-2xl mt-12 mb-4">
//             <img src={props.img} alt="" className="h-12 mb-4"/>
//             <h2 className="font-bold text-xl mb-1">{props.title}</h2>
//             <p className="mb-2">{props.desc}</p>
//             <button className="text-white bg-blue-600 px-6 rounded-3xl py-2">Explore</button>
//         </div>
//     )
// }
// export default CategoriesCard;
function CategoriesCard(props) {
  return (
    <div className="bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 rounded-2xl p-6 group hover:-translate-y-1">

      {/* IMAGE */}
      <div className="w-14 h-14 flex items-center justify-center bg-blue-50 rounded-xl mb-4 group-hover:scale-110 transition">
        <img src={props.img} alt="" className="h-8 w-8 object-contain" />
      </div>

      {/* TITLE */}
      <h2 className="font-semibold text-lg text-gray-800 mb-1 group-hover:text-blue-600 transition">
        {props.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-sm text-gray-500 mb-5 leading-relaxed">
        {props.desc}
      </p>

      {/* BUTTON */}
      <button className="w-full bg-blue-600 text-white py-2.5 rounded-xl font-medium
                         hover:bg-blue-700 active:scale-95 transition-all duration-200">
        Explore
      </button>

    </div>
  );
}

export default CategoriesCard;