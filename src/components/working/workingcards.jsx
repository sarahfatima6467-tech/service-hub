// function WorkingCards (props){
//     return(
//         <div className="sm:flex gap-12 mt-12">
//             <img src={props.img} alt="" className="bg-blue-500 rounded-full p-2 h-12 mt-3"/>
//             <div className="shadow p-4 rounded-2xl w-2xs:w-xs sm:w-sm mt-4">
//                 <h2 className="text-xl mb-2 font-bold">{props.title}</h2>
//                 <p>{props.desc}</p>
//             </div>
//         </div>
//     )
// }
// export default WorkingCards;
function WorkingCards(props) {
  return (
    <div className="flex gap-5 items-start mt-10 group">

      {/* ICON */}
      <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-full shadow-sm group-hover:bg-blue-100 transition">
        <img src={props.img} alt="" className="h-6 w-6 object-contain" />
      </div>

      {/* CONTENT CARD */}
      <div className="bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl p-5 w-full">

        <h2 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition">
          {props.title}
        </h2>

        <p className="text-gray-500 text-sm leading-relaxed">
          {props.desc}
        </p>

      </div>

    </div>
  );
}

export default WorkingCards;