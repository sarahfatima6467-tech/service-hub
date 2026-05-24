// function ContactCard(props){
//     return(
//          <div className="flex gap-5 mb-6">
//             <img src={props.img} alt="" className="h-6"/>
//            <div>
//             <h2>{props.title}</h2>
//             <p>{props.value}</p>
//              </div>
//             </div>
//     )
// }
// export default ContactCard;
function ContactCard(props) {
  return (
    <div className="flex items-start gap-4 p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">

      {/* ICON */}
      <div className="w-10 h-10 flex items-center justify-center bg-blue-50 rounded-lg group-hover:bg-blue-100 transition">
        <img src={props.img} alt="" className="h-5 w-5 object-contain" />
      </div>

      {/* TEXT */}
      <div>
        <h2 className="text-sm font-semibold text-gray-800 group-hover:text-blue-600 transition">
          {props.title}
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          {props.value}
        </p>
      </div>

    </div>
  );
}

export default ContactCard;