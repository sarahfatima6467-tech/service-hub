import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabaseClient";
import { useState } from "react";
function Header({
  refreshSellers = () => {},
  setShowSellers,
  session,
}) {
  const [showModel, setshowModel] = useState(false);

  const navigate = useNavigate();
  const handleLogout = async () => {
  await supabase.auth.signOut();

  alert("Logged out!");

  navigate("/");
};
  const [Role, setRole] = useState(null);
  const[phone, setphone]=useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [businessName, setBusinessName] =
    useState("");

  const [location, setLocation] = useState("");

  // ================= SIGNUP =================
  const handleSignup = async (e) => {
    e.preventDefault();
  const fakeEmail = `${phone}@gmail.com`;
    const { data, error } =
      await supabase.auth.signUp({
        email: fakeEmail,
        password,
      });

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    const user = data?.user;

    if (!user) {
      alert("User not returned");
      return;
    }

    // const { error: insertError } =
    //   await supabase.from("profiles").insert([
    //     {
    //       id: user.id,
    //       name,
    //       email,
    //       role: Role,
    //       business_name: businessName,
    //       location: location,
    //     },
    //   ]);
  //   const { error: insertError } =
  // await supabase.from("profiles").insert([
  //   {
  //      id: crypto.randomUUID(),
  //     id: user.id,
  //     user_id: user.id,
  //     name,
  //     email,
  //     role: Role,
  //     business_name: businessName,
  //     location: location,
  //   },
  // ]);
    const { error: insertError } =
  await supabase.from("profiles").insert([
    {
      id: user.id,
      name,
      email: fakeEmail,
      phone,
      role: Role,
      business_name: businessName,
      location,
    },
  ]);
    if (insertError) {
      console.log(insertError);
      alert(insertError.message);
      return;
    }

    await refreshSellers();

    setShowSellers(true);

    alert("Account created successfully!");

    // ✅ AUTO REDIRECT
    if (Role === "seller") {
      navigate("/seller-dashboard");
    }

    // RESET
    setshowModel(false);

    setRole(null);
    setEmail("");
    setPassword("");
    setName("");
    setBusinessName("");
     setLocation("");
  };

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();
  const fakeEmail = `${phone}@gmail.com`;
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email: fakeEmail,
        password,
      });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    const {
      data: profile,
      error: profileError,
    } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profileError) {
      console.log(profileError);
      return;
    }

    alert("Login successful!");

    setshowModel(false);

    // ✅ REDIRECT BASED ON ROLE
    if (profile.role === "seller") {
      navigate("/seller-dashboard");
    }
    if (profile.role === "admin") {
      navigate("/admin-dashboard");
    }
    if (profile.role === "customer") {
  navigate("/customer-dashboard");
}

    // RESET
    setEmail("");
    setPassword("");
    setRole(null);
  };


  return (
  <header className="bg-white shadow-md sticky top-0 z-50">

    <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

      {/* LOGO */}
      <div className="flex items-center gap-3">
        <img
          src="/assets/servicehub-logo.png"
          alt="logo"
          className="w-12 h-12 rounded-xl shadow"
        />

        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Service Hub
          </h1>
          <p className="text-xs text-gray-500">
            Local Services Marketplace
          </p>
        </div>
      </div>

      {/* NAV */}
      <nav className="hidden md:flex items-center gap-8 text-gray-600 font-medium">

        <a className="hover:text-blue-500 transition" href="#home">Home</a>
        <a className="hover:text-blue-500 transition" href="#services">Services</a>
        <a className="hover:text-blue-500 transition" href="#categories">Categories</a>
        <a className="hover:text-blue-500 transition" href="#explore">Explore</a>
        <a className="hover:text-blue-500 transition" href="#contact">Contact</a>

      </nav>

      {/* BUTTONS */}
{/* BUTTONS */}
<div className="flex items-center gap-3">

  {session ? (
    <>
      {/* DASHBOARD BUTTON */}

      <button
        className="px-4 py-2 rounded-xl bg-blue-500 text-white font-semibold shadow hover:scale-105 transition"
        onClick={async () => {
          const user = session.user;

          const { data: profile } =
            await supabase
              .from("profiles")
              .select("*")
              .eq("id", user.id)
              .single();

          if (profile.role === "seller") {
            navigate("/seller-dashboard");
          }

          if (profile.role === "admin") {
            navigate("/admin-dashboard");
          }

          if (profile.role === "customer") {
            navigate("/customer-dashboard");
          }
        }}
      >
        Dashboard
      </button>

      {/* LOGOUT BUTTON */}

      <button
        className="px-4 py-2 rounded-xl border border-red-400 text-red-500 hover:bg-red-50 transition font-medium"
        onClick={handleLogout}
      >
        Logout
      </button>
    </>
  ) : (
    <>
      {/* LOGIN BUTTON */}

      <button
        className="px-4 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium"
        onClick={() => {
          setshowModel(true);
          setRole("login");
        }}
      >
        Login
      </button>

      {/* CREATE ACCOUNT BUTTON */}

      <button
        className="px-4 py-2 rounded-xl bg-linear-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition"
        onClick={() => {
          setshowModel(true);
          setRole(null);
        }}
      >
        Create Account
      </button>
    </>
  )}

</div>

    </div>
      {/* MODAL */}
      {showModel && (
      
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
  <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

          
{!Role && (
  <div className="w-full max-w-sm mx-auto text-center">

    {/* HEADER */}
    <div className="mb-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Choose Your Role
      </h1>

      <p className="text-gray-500 text-sm mt-2">
        Select how you want to use Service Hub
      </p>
    </div>

    {/* OPTIONS */}
    <div className="space-y-3">

      {/* SELLER */}
      <button
        onClick={() => setRole("seller")}
        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl
        bg-linear-to-r from-green-50 to-white border border-green-200
        shadow-sm hover:shadow-lg hover:-translate-y-0.5
        active:scale-95 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">🛠️</span>
          <span className="font-medium text-green-700">Seller</span>
        </div>

        <span className="text-green-400">›</span>
      </button>

      {/* CUSTOMER */}
      <button
        onClick={() => setRole("customer")}
        className="w-full flex items-center justify-between px-5 py-4 rounded-2xl
        bg-linear-to-r from-blue-50 to-white border border-blue-200
        shadow-sm hover:shadow-lg hover:-translate-y-0.5
        active:scale-95 transition-all duration-200"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">👤</span>
          <span className="font-medium text-blue-700">Customer</span>
        </div>

        <span className="text-blue-400">›</span>
      </button>


    </div>

    {/* CANCEL */}
    <button
      className="mt-6 text-sm text-gray-500 hover:text-black transition"
      onClick={() => setshowModel(false)}
    >
      Cancel
    </button>

  </div>
)}
            {/* SELLER FORM */}
            {Role === "seller" && (
              <form
                className="space-y-4"
                onSubmit={handleSignup}
              >
  <div className="flex items-center mb-4">
 <button
  type="button"
  onClick={() => setRole(null)}
  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-2xl"
>
  ←
</button>

  <h2 className="text-2xl font-bold text-gray-800 flex-1 text-center">
    Seller Form
  </h2>
</div>
              

                <input
                  type="text"
                  placeholder="Owner name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300  "
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

                <br />

                <input
                  type="text"
                  placeholder="Profession"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300  "
                  onChange={(e) =>
                    setBusinessName(
                      e.target.value
                    )
                  }
                />

                <br />

   <select
  required
  className="border rounded-md py-2 px-4 w-full"
  value={location}
  onChange={(e) => setLocation(e.target.value)}
>
  <option value="" disabled>
  Select Location
</option>
   <optgroup label="Samundri City (Urban)">
    <option value="municipal_wards">Municipal Committee Wards (1-15)</option>
  <option value="rasoolpura">Rasoolpura</option>
  <option value="christian_colony">Christian Colony</option>
  <option value="rana_market_sector">Rana Market Sector</option>
  <option value="sharifpura">Sharifpura</option>
  <option value="gharibabad">Gharibabad</option>
  <option value="eidgah_colony">Eidgah Colony</option>
  <option value="ravi_mohallah">Ravi Mohallah</option>
  <option value="mohallah_chachi_bazaar">Mohallah Chachi Bazaar</option>
  </optgroup>
  <optgroup label="Main Commercial Markets">
  <option value="anarkali_bazaar">Anarkali Bazaar</option>
  <option value="jinnah_market">Jinnah Market</option>
  <option value="jamat_ali_bazaar">Jamat Ali Bazaar</option>
  <option value="katchery_bazaar">Katchery Bazaar</option>
  <option value="mandi_bazaar">Mandi Bazaar</option>
  <option value="nehar_bazaar">Nehar Bazaar</option>
  <option value="qasim_bazaar">Qasim Bazaar</option>
  <option value="kashmiri_bazaar">Kashmiri Bazaar</option>
  <option value="chaki_bazaar">Chaki Bazaar</option>
  <option value="sunny_plaza">Sunny Plaza</option>
</optgroup>
  <optgroup label="Modern Housing & Societies">
     <option value="citi_housing">Citi Housing (Samundri Road)</option>
  <option value="oasis_orchard">Oasis Orchard</option>
  <option value="green_valley">Green Valley</option>
  <option value="city_villas">City Villas Housing Scheme</option>
  <option value="housing_colony">Housing Colony</option>
  </optgroup>
  <optgroup label="Major Transit Roads & Bypasses">
  <option value="faisalabad_samundri_road">Faisalabad-Samundri Road</option>
  <option value="gojra_samundri_road">Gojra-Samundri Road</option>
  <option value="tandlianwala_samundri_road">Tandlianwala-Samundri Road</option>
  <option value="rajana_road">Rajana Road</option>
  <option value="mongi_road">Mongi Road</option>
  <option value="mission_road">Mission Road</option>
</optgroup>
  <optgroup label="Rural Areas (Chaks 41 - 200)">
  <option value="chak_41_gb">Chak 41 GB (Jagde)</option>
  <option value="chak_42_gb">Chak 42 GB (Lupoki Kalan)</option>
  <option value="chak_43_gb">Chak 43 GB (Kohali)</option>
  <option value="chak_44_gb">Chak 44 GB (Kukran)</option>
  <option value="chak_45_gb">Chak 45 GB (Haveli / Tarn Taran)</option>
  <option value="chak_46_gb">Chak 46 GB (Sukhera)</option>
  <option value="chak_47_gb">Chak 47 GB (Khatran)</option>
  <option value="chak_48_gb">Chak 48 GB (Maluwal / Gujarabad)</option>
  <option value="chak_49_gb">Chak 49 GB (Chonda)</option>
  <option value="chak_50_gb">Chak 50 GB (Ralan Wala)</option>
  <option value="chak_51_gb">Chak 51 GB (Khushpur)</option>
  <option value="chak_52_gb">Chak 52 GB (Cheema Barwali)</option>
  <option value="chak_134_gb">Chak 134 GB (Rais Wala)</option>
  <option value="chak_135_gb">Chak 135 GB (Rasul Pur)</option>
  <option value="chak_136_gb">Chak 136 GB (Kalan / Baghdad Pur)</option>
  <option value="chak_137_gb">Chak 137 GB (Nanak Kot)</option>
  <option value="chak_138_gb">Chak 138 GB (Rasiana Kalan / Khurd)</option>
  <option value="chak_139_gb">Chak 139 GB (Rampur)</option>
  <option value="chak_140_gb">Chak 140 GB (Sardar)</option>
  <option value="chak_141_gb">Chak 141 GB (Nawa Kasa)</option>
  <option value="chak_142_gb">Chak 142 GB (Nanna Kasa)</option>
  <option value="chak_143_gb">Chak 143 GB (Khalsa Abad)</option>
  <option value="chak_165_gb">Chak 165 GB (Dyalpur / Harsan Kot)</option>
  <option value="chak_166_gb">Chak 166 GB (Mialuwan)</option>
  <option value="chak_167_gb">Chak 167 GB (Katarian)</option>
  <option value="chak_168_gb">Chak 168 GB (Siraj)</option>
  <option value="chak_169_gb">Chak 169 GB (Thikrian / Nathukot)</option>
  <option value="chak_170_gb">Chak 170 GB (Katruwal)</option>
  <option value="chak_171_gb">Chak 171 GB (Bamboh)</option>
  <option value="chak_172_gb">Chak 172 GB (Chajjwal)</option>
  <option value="chak_173_gb">Chak 173 GB (Suniar)</option>
  <option value="chak_174_gb">Chak 174 GB (Shimali / Janubi)</option>
  <option value="chak_175_gb">Chak 175 GB (Mingra)</option>
  <option value="chak_176_gb">Chak 176 GB (Poian)</option>
  <option value="chak_177_gb">Chak 177 GB (Mari Atari)</option>
  <option value="chak_192_gb">Chak 192 GB (Ogala / Odanwali / Kotla)</option>
  <option value="chak_193_gb">Chak 193 GB (Janubi / Shimali)</option>
  <option value="chak_195_gb">Chak 195 GB (Pandora)</option>
  <option value="chak_196_gb">Chak 196 GB (Bismillah Pur)</option>
  <option value="chak_197_gb">Chak 197 GB (Rajwah)</option>
  <option value="chak_198_gb">Chak 198 GB (Uninhabited / Boundary Segment)</option>
  <option value="chak_199_gb">Chak 199 GB (Sanaharl)</option>
  <option value="chak_200_gb">Chak 200 GB (Kartar Pur)</option>
</optgroup>
<optgroup label="Rural Areas (Chaks 201 - 436)">
  <option value="chak_201_gb">Chak 201 GB (Torianwala)</option>
  <option value="chak_202_gb">Chak 202 GB (Gobind Sat)</option>
  <option value="chak_203_gb">Chak 203 GB (Feroz Pur)</option>
  <option value="chak_204_gb">Chak 204 GB (Uninhabited / Boundary Segment)</option>
  <option value="chak_205_gb">Chak 205 GB (Ratar Chatar)</option>
  <option value="chak_206_gb">Chak 206 GB (Sarwali)</option>
  <option value="chak_207_gb">Chak 207 GB (Kotla)</option>
  <option value="chak_208_gb">Chak 208 GB (Kalhar)</option>
  <option value="chak_209_gb">Chak 209 GB (Lodi Nangal)</option>
  <option value="chak_210_gb">Chak 210 GB (Lakhan)</option>
  <option value="chak_211_gb">Chak 211 GB (Ali Wal)</option>
  <option value="chak_212_gb">Chak 212 GB (Pali Baran)</option>
  <option value="chak_213_gb">Chak 213 GB (Ladian)</option>
  <option value="chak_214_gb">Chak 214 GB (Jarrar)</option>
  <option value="chak_215_gb">Chak 215 GB (Dawood Hamza)</option>
  <option value="chak_216_gb">Chak 216 GB (Jalal Abad)</option>
  <option value="chak_217_gb">Chak 217 GB (Gujjar Pind)</option>
  <option value="chak_218_gb">Chak 218 GB (Wains)</option>
  <option value="chak_219_gb">Chak 219 GB (Bhalpur)</option>
  <option value="chak_220_gb">Chak 220 GB (Khawaja Wains)</option>
  <option value="chak_221_gb">Chak 221 GB (Nangli)</option>
  <option value="chak_222_gb">Chak 222 GB (Kohala)</option>
  <option value="chak_223_gb">Chak 223 GB (Bhojian)</option>
  <option value="chak_224_gb">Chak 224 GB (R Pal)</option>
  <option value="chak_225_gb">Chak 225 GB (Chagawan)</option>
  <option value="chak_226_gb">Chak 226 GB (Uninhabited / Boundary Segment)</option>
  <option value="chak_227_gb">Chak 227 GB (Malu Nangal / Chinha)</option>
  <option value="chak_228_gb">Chak 228 GB (Nara Dada)</option>
  <option value="chak_229_gb">Chak 229 GB (Fazal Pura)</option>
  <option value="chak_230_gb">Chak 230 GB (Kot Rajput)</option>
  <option value="chak_231_gb">Chak 231 GB (Tiwana)</option>
  <option value="chak_372_gb">Chak 372 GB (Kartak Pur)</option>
  <option value="chak_373_gb">Chak 373 GB (Karam Sar / Khaldi)</option>
  <option value="chak_385_gb">Chak 385 GB (Uninhabited / Boundary Segment)</option>
  <option value="chak_386_gb">Chak 386 GB (Sultan Pur)</option>
  <option value="chak_387_gb">Chak 387 GB (Bari / Mandihar)</option>
  <option value="chak_388_gb">Chak 388 GB (Dilchi Majral)</option>
  <option value="chak_389_gb">Chak 389 GB (Saleh Pur)</option>
  <option value="chak_390_gb">Chak 390 GB (Mohan / Manian)</option>
  <option value="chak_394_gb">Chak 394 GB (Jhok Beg)</option>
  <option value="chak_413_gb">Chak 413 GB (Shabir Wala)</option>
  <option value="chak_414_gb">Chak 414 GB (Jaluana)</option>
  <option value="chak_417_gb">Chak 417 GB (Gouri Adean)</option>
</optgroup>
<optgroup label="Rural Areas (Chaks 437 - 531)">
  <option value="chak_437_gb">Chak 437 GB (Nurpur / Karol)</option>
  <option value="chak_438_gb">Chak 438 GB (Parthan)</option>
  <option value="chak_439_gb">Chak 439 GB (Muhalam / Fateh Rehan)</option>
  <option value="chak_440_gb">Chak 440 GB (Faiz Pur)</option>
  <option value="chak_441_gb">Chak 441 GB (Bhochoki / Sadhan Wala)</option>
  <option value="chak_442_gb">Chak 442 GB (Waraich)</option>
  <option value="chak_443_gb">Chak 443 GB (War Aichan Wala)</option>
  <option value="chak_444_gb">Chak 444 GB (Phallah)</option>
  <option value="chak_445_gb">Chak 445 GB (Thagan Wali)</option>
  <option value="chak_446_gb">Chak 446 GB (Kake Wala)</option>
  <option value="chak_447_gb">Chak 447 GB (Kambanwanwala)</option>
  <option value="chak_448_gb">Chak 448 GB (Lasharan)</option>
  <option value="chak_461_gb">Chak 461 GB (Badowal)</option>
  <option value="chak_462_gb">Chak 462 GB (Eissa Nagri)</option>
  <option value="chak_463_gb">Chak 463 GB (Harial / Khurd)</option>
  <option value="chak_464_gb">Chak 464 GB (Girja)</option>
  <option value="chak_465_gb">Chak 465 GB (Nabi Pur)</option>
  <option value="chak_466_gb">Chak 466 GB (Shah Pur)</option>
  <option value="chak_467_gb">Chak 467 GB (Bawean Wala)</option>
  <option value="chak_468_gb">Chak 468 GB (Rahgir Pur)</option>
  <option value="chak_469_gb">Chak 469 GB (Gunwal)</option>
  <option value="chak_470_gb">Chak 470 GB (Totianwala)</option>
  <option value="chak_471_gb">Chak 471 GB (Ram Singh Wala)</option>
  <option value="chak_472_gb">Chak 472 GB (Hargobind Pur)</option>
  <option value="chak_473_gb">Chak 473 GB (Bajopur / Bamban)</option>
  <option value="chak_474_gb">Chak 474 GB (Patiala)</option>
  <option value="chak_475_gb">Chak 475 GB (Gidar Pindi)</option>
  <option value="chak_476_gb">Chak 476 GB (Buzurg Wal)</option>
  <option value="chak_477_gb">Chak 477 GB (Kot Gharbi / Kot Sharqi)</option>
  <option value="chak_478_gb">Chak 478 GB (Kaki Ava)</option>
  <option value="chak_479_gb">Chak 479 GB (Sartan Pur)</option>
  <option value="chak_480_gb">Chak 480 GB (Uninhabited / Boundary Segment)</option>
  <option value="chak_481_gb">Chak 481 GB (Uninhabited / Boundary Segment)</option>
  <option value="chak_482_gb">Chak 482 GB (Jagranwan)</option>
  <option value="chak_483_gb">Chak 483 GB (Pakka Khoo)</option>
  <option value="chak_484_gb">Chak 484 GB (Thathian)</option>
  <option value="chak_485_gb">Chak 485 GB (Singh Chotahla)</option>
  <option value="chak_486_gb">Chak 486 GB (Arainan)</option>
  <option value="chak_487_gb">Chak 487 GB (Macha Nika)</option>
  <option value="chak_488_gb">Chak 488 GB (Sharqi / Gharbi)</option>
  <option value="chak_495_gb">Chak 495 GB (Bazar Wala)</option>
  <option value="chak_527_gb">Chak 527 GB (Sadheem / Saloni Jhall)</option>
  <option value="chak_528_gb">Chak 528 GB (Jatiana / Manupur)</option>
  <option value="chak_529_gb">Chak 529 GB (Hansan)</option>
  <option value="chak_530_gb">Chak 530 GB (Uninhabited / Boundary Segment)</option>
  <option value="chak_531_gb">Chak 531 GB (Dhalwan)</option>
</optgroup>

</select>

                <br />

             <input
  type="text"
  placeholder="Phone Number"
  className="w-full px-4 py-3 rounded-xl border border-gray-300"
  onChange={(e) => setphone(e.target.value)}
/>
               

                <br />

                <input
                  type="password"
                  placeholder="Password"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300  "
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />

                <br />

                <button className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow hover:scale-105 transition">
                  Submit
                </button>
              </form>
            )}
               {Role === "customer" && (
  <form
    className="space-y-4"
    onSubmit={handleSignup}
  >
    
   {/* <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
      Customer Form
    </h2> */}
    <div className="flex items-center gap-2 mb-4">
 <button
  type="button"
  onClick={() => setRole(null)}
  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-2xl"
>
  ←
</button>

  <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">
    Customer Form
  </h2>
</div>
    <input
      type="text"
      placeholder="Full Name"
     className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      onChange={(e) =>
        setName(e.target.value)
      }
    />

    <br />

   <input
  type="text"
  placeholder="Phone Number"
  className="w-full px-4 py-3 rounded-xl border border-gray-300"
  onChange={(e) => setphone(e.target.value)}
/>

    <br />

    <input
      type="password"
      placeholder="Password"
      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      onChange={(e) =>
        setPassword(e.target.value)
      }
    />

    <br />

    <button className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow hover:scale-105 transition">
      Submit
    </button>
  </form>
)}

            {/* LOGIN FORM */}
            {Role === "login" && (
              <form
                className="space-y-4"
                onSubmit={handleLogin}
              > 
              <div className="flex items-center gap-2 mb-4">
  <button
  type="button"
  onClick={() => setRole(null)}
  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition text-2xl"
>
  ←
</button>

  <h2 className="text-2xl font-bold text-gray-800 text-center flex-1">
    Login
  </h2>
</div>
               <input
  type="text"
  placeholder="Phone Number"
  className="w-full px-4 py-3 rounded-xl border border-gray-300"
  onChange={(e) => setphone(e.target.value)}
/>

                <br />

                <input
                  type="password"
                  placeholder="Password"
                 className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  onChange={(e) =>
                    setPassword(
                      e.target.value
                    )
                  }
                />

                <br />

                <button className="w-full bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold shadow hover:scale-105 transition">
                  Login
                </button>
              </form>
            )}

          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
