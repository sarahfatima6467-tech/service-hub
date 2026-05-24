// import ContactCard from "./cards";
// import { useState } from "react";
// import { supabase } from "../../supabaseClient";
// function Contact (){
//   const [name, setName] = useState("");
// const [email, setEmail] = useState("");
// const [message, setMessage] = useState("");
// const [loading, setLoading] = useState(false);
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   const { error } = await supabase.from("messages").insert([
//     { name, email, message }
//   ]);

//   setLoading(false);

//   if (error) {
//     alert(error.message);
//     return;
//   }

//   alert("Message sent!");

//   setName("");
//   setEmail("");
//   setMessage("");
// };
//     return(
//         <section className="p-16" id="contact">
//          <h1 className="font-bold text-4xl text-center mt-12 mb-16">Contact us</h1>
//         <div className="md:flex gap-12">
//         <div>
//         <h2 className="font-bold text-3xl mt-10">WE'd Love To Hear From You.</h2>
//         <p className="text-gray-600 leading-8 text-lg mt-6 mb-12">Have questions about Service Hub or need help finding the right services for your needs? Whether you are searching for trusted professionals, booking local services, or simply looking for guidance, our dedicated team is here to support you every step of the way. We are committed to providing fast responses, reliable assistance, and a smooth experience to help you connect with the best service providers in your area. Your satisfaction and convenience are our top priorities, and we are always ready to answer your questions and help you get started.</p>
        
//          <ContactCard
//           img="./assets/call.png"
//           title="Phone"
//           value="+92 300 1234567"/>
//          <ContactCard
//           img="./assets/mail.png"
//           title="Email"
//           value="servicehub@gmail.com"/>
//           <ContactCard
//           img="./assets/location.png"
//           title="Location"
//           value="Faisalabad, Punjab"/>
      
//         </div>
        

//         <div className="bg-white rounded-[40px] p-8 md:p-10 border border-gray-200 shadow-2xl">
//              <h2 className="text-4xl font-bold text-gray-900 mt-5 w-md"> Get In Touch</h2><p className="text-gray-600 mt-3 leading-relaxed mb-6"> Fill out the form below and our team will contact you shortly.</p>
//         <form className="space-y-6" onSubmit={handleSubmit}>
  
//   {/* NAME */}
//   <div>
//     <h2 className="block text-gray-700 mb-2 font-medium">
//       Full Name
//     </h2>

//     <input
//       type="text"
//       placeholder="Name.."
//       value={name}
//       onChange={(e) => setName(e.target.value)}
//       className="border border-gray-300 rounded-2xl px-8 py-2 w-full"
//       required
//     />
//   </div>

//   {/* EMAIL */}
//   <div>
//     <h2 className="block text-gray-700 mb-2 font-medium">
//       Email Address
//     </h2>

//     <input
//       type="email"
//       placeholder="example@email.com"
//       value={email}
//       onChange={(e) => setEmail(e.target.value)}
//       className="border border-gray-300 rounded-2xl px-8 py-2 w-full"
//       required
//     />
//   </div>

//   {/* MESSAGE */}
//   <div>
//     <h2 className="block text-gray-700 mb-2 font-medium">
//       Message
//     </h2>

//     <textarea
//       rows="5"
//       placeholder="Write your message here..."
//       value={message}
//       onChange={(e) => setMessage(e.target.value)}
//       className="w-full border rounded-2xl px-5 py-4"
//       required
//     />
//   </div>

//   {/* BUTTON */}
//   <button
//     type="submit"
//     className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-lg font-semibold hover:shadow-xl"
//   >
//     {loading ? "Sending..." : "Send Message"}
//   </button>

// </form>
//         </div>
//         </div>
//         </section>
       
//     )
// }
// export default Contact;
import ContactCard from "./cards";
import { useState } from "react";
import { supabase } from "../../supabaseClient";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.from("messages").insert([
      { name, email, message }
    ]);

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Message sent!");

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <section className="px-6 md:px-16 py-20 bg-gray-50" id="contact">

      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="font-bold text-4xl text-gray-800 mb-3">
          Contact Us
        </h1>

        <p className="text-gray-500 max-w-2xl mx-auto">
          We’d love to hear from you. Get in touch and our team will respond as soon as possible.
        </p>
      </div>

      <div className="md:flex gap-12">

        {/* LEFT SIDE */}
        <div className="md:w-1/2">

          <h2 className="font-bold text-3xl text-gray-800 mt-6">
            WE'D LOVE TO HEAR FROM YOU
          </h2>

          <p className="text-gray-500 leading-relaxed mt-5 mb-10">
            Have questions about Service Hub or need help finding the right services?
            We are here to help you connect with trusted professionals quickly and easily.
          </p>

          <div className="space-y-4">

            <ContactCard
              img="./assets/call.png"
              title="Phone"
              value="+92 303 60153464"
            />

            <ContactCard
              img="./assets/mail.png"
              title="Email"
              value="sarahfatima6467@gmail.com"
            />

            <ContactCard
              img="./assets/location.png"
              title="Location"
              value="Faisalabad, Punjab"
            />

          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <div className="md:w-1/2 mt-10 md:mt-0">

          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">

            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Get In Touch
            </h2>

            <p className="text-gray-500 mb-6">
              Fill out the form and we’ll get back to you shortly.
            </p>

            <form className="space-y-5" onSubmit={handleSubmit}>

              {/* NAME */}
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-3 rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />

              {/* MESSAGE */}
              <textarea
                rows="5"
                placeholder="Write your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-5 py-4 rounded-xl border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-95 transition
                           text-white py-3 rounded-xl font-semibold shadow-md"
              >
                {loading ? "Sending..." : "Send Message"}
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Contact;