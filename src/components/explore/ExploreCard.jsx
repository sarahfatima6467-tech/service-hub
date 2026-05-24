// function ExploreCard(props){
//     return(
//          <div className="shadow rounded-2xl w-2sm p-6  hover:scale-110 transition-transform duration-300">
//          <img src={props.img} alt="" className="h-10" />
//          <h2 className="text-2xl font-bold">{props.title}</h2>
//          <p>{props.desc}</p>
//          </div>
//     )
// }  
// export default ExploreCard;
function ExploreCard(props) {
  return (
    <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6
                    hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

      {/* ICON */}
      <div className="w-12 h-12 flex items-center justify-center bg-blue-50 rounded-xl mb-4">
        <img src={props.img} alt="" className="h-6 w-6 object-contain" />
      </div>

      {/* TITLE */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {props.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-500 text-sm leading-relaxed">
        {props.desc}
      </p>

    </div>
  );
}

export default ExploreCard;