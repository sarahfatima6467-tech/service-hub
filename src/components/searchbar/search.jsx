import Select from "react-select";

function Searchbar({
  query,
  setQuery,
  locationFilter,
  setLocationFilter,
}) {

const locationOptions = [
  {
    label: "Samundri City (Urban)",
    options: [
      { value: "municipal_wards", label: "Municipal Committee Wards (1-15)" },
      { value: "rasoolpura", label: "Rasoolpura" },
      { value: "christian_colony", label: "Christian Colony" },
      { value: "rana_market_sector", label: "Rana Market Sector" },
      { value: "sharifpura", label: "Sharifpura" },
      { value: "gharibabad", label: "Gharibabad" },
      { value: "eidgah_colony", label: "Eidgah Colony" },
      { value: "ravi_mohallah", label: "Ravi Mohallah" },
      { value: "chachi_bazaar", label: "Mohallah Chachi Bazaar" },
    ],
  },

  {
    label: "Main Commercial Markets",
    options: [
      { value: "anarkali_bazaar", label: "Anarkali Bazaar" },
      { value: "jinnah_market", label: "Jinnah Market" },
      { value: "jamat_ali_bazaar", label: "Jamat Ali Bazaar" },
      { value: "katchery_bazaar", label: "Katchery Bazaar" },
      { value: "mandi_bazaar", label: "Mandi Bazaar" },
      { value: "nehar_bazaar", label: "Nehar Bazaar" },
      { value: "qasim_bazaar", label: "Qasim Bazaar" },
      { value: "kashmiri_bazaar", label: "Kashmiri Bazaar" },
      { value: "chaki_bazaar", label: "Chaki Bazaar" },
      { value: "sunny_plaza", label: "Sunny Plaza" },
    ],
  },

  {
    label: "Modern Housing & Societies",
    options: [
      { value: "citi_housing", label: "Citi Housing (Samundri Road)" },
      { value: "oasis_orchard", label: "Oasis Orchard" },
      { value: "green_valley", label: "Green Valley" },
      { value: "city_villas", label: "City Villas Housing Scheme" },
      { value: "housing_colony", label: "Housing Colony" },
    ],
  },

  {
    label: "Major Roads & Bypasses",
    options: [
      { value: "faisalabad_samundri_road", label: "Faisalabad-Samundri Road" },
      { value: "gojra_samundri_road", label: "Gojra-Samundri Road" },
      { value: "tandlianwala_road", label: "Tandlianwala-Samundri Road" },
      { value: "rajana_road", label: "Rajana Road" },
      { value: "mongi_road", label: "Mongi Road" },
      { value: "mission_road", label: "Mission Road" },
    ],
  },

  {
    label: "Rural Areas (Chaks 41–200)",
    options: [
      { value: "chak_41_gb", label: "Chak 41 GB (Jagde)" },
      { value: "chak_42_gb", label: "Chak 42 GB (Lupoki Kalan)" },
      { value: "chak_43_gb", label: "Chak 43 GB (Kohali)" },
      { value: "chak_44_gb", label: "Chak 44 GB (Kukran)" },
      { value: "chak_45_gb", label: "Chak 45 GB (Haveli / Tarn Taran)" },
      { value: "chak_46_gb", label: "Chak 46 GB (Sukhera)" },
      { value: "chak_47_gb", label: "Chak 47 GB (Khatran)" },
      { value: "chak_48_gb", label: "Chak 48 GB (Maluwal / Gujarabad)" },
      { value: "chak_49_gb", label: "Chak 49 GB (Chonda)" },
      { value: "chak_50_gb", label: "Chak 50 GB (Ralan Wala)" },
      { value: "chak_51_gb", label: "Chak 51 GB (Khushpur)" },
      { value: "chak_52_gb", label: "Chak 52 GB (Cheema Barwali)" },
      { value: "chak_134_gb", label: "Chak 134 GB (Rais Wala)" },
      { value: "chak_135_gb", label: "Chak 135 GB (Rasul Pur)" },
      { value: "chak_136_gb", label: "Chak 136 GB (Kalan / Baghdad Pur)" },
      { value: "chak_137_gb", label: "Chak 137 GB (Nanak Kot)" },
      { value: "chak_138_gb", label: "Chak 138 GB (Rasiana Kalan / Khurd)" },
      { value: "chak_139_gb", label: "Chak 139 GB (Rampur)" },
      { value: "chak_140_gb", label: "Chak 140 GB (Sardar)" },
      { value: "chak_141_gb", label: "Chak 141 GB (Nawa Kasa)" },
      { value: "chak_142_gb", label: "Chak 142 GB (Nanna Kasa)" },
      { value: "chak_143_gb", label: "Chak 143 GB (Khalsa Abad)" },
      { value: "chak_165_gb", label: "Chak 165 GB (Dyalpur / Harsan Kot)" },
      { value: "chak_166_gb", label: "Chak 166 GB (Mialuwan)" },
      { value: "chak_167_gb", label: "Chak 167 GB (Katarian)" },
      { value: "chak_168_gb", label: "Chak 168 GB (Siraj)" },
      { value: "chak_169_gb", label: "Chak 169 GB (Thikrian / Nathukot)" },
      { value: "chak_170_gb", label: "Chak 170 GB (Katruwal)" },
      { value: "chak_171_gb", label: "Chak 171 GB (Bamboh)" },
      { value: "chak_172_gb", label: "Chak 172 GB (Chajjwal)" },
      { value: "chak_173_gb", label: "Chak 173 GB (Suniar)" },
      { value: "chak_174_gb", label: "Chak 174 GB (Shimali / Janubi)" },
      { value: "chak_175_gb", label: "Chak 175 GB (Mingra)" },
      { value: "chak_176_gb", label: "Chak 176 GB (Poian)" },
      { value: "chak_177_gb", label: "Chak 177 GB (Mari Atari)" },
      { value: "chak_192_gb", label: "Chak 192 GB (Ogala / Odanwali / Kotla)" },
      { value: "chak_193_gb", label: "Chak 193 GB (Janubi / Shimali)" },
      { value: "chak_195_gb", label: "Chak 195 GB (Pandora)" },
      { value: "chak_196_gb", label: "Chak 196 GB (Bismillah Pur)" },
      { value: "chak_197_gb", label: "Chak 197 GB (Rajwah)" },
      { value: "chak_198_gb", label: "Chak 198 GB (Uninhabited / Boundary Segment)" },
      { value: "chak_199_gb", label: "Chak 199 GB (Sanaharl)" },
      { value: "chak_200_gb", label: "Chak 200 GB (Kartar Pur)" },
      { value: "chak_201_gb", label: "Chak 201 GB (Torianwala)" },
      { value: "chak_202_gb", label: "Chak 202 GB (Gobind Sat)" },
      { value: "chak_203_gb", label: "Chak 203 GB (Feroz Pur)" },
      { value: "chak_204_gb", label: "Chak 204 GB (Uninhabited / Boundary Segment)" },
      { value: "chak_205_gb", label: "Chak 205 GB (Ratar Chatar)" },
      { value: "chak_206_gb", label: "Chak 206 GB (Sarwali)" },
      { value: "chak_207_gb", label: "Chak 207 GB (Kotla)" },
      { value: "chak_208_gb", label: "Chak 208 GB (Kalhar)" },
      { value: "chak_209_gb", label: "Chak 209 GB (Lodi Nangal)" },
      { value: "chak_210_gb", label: "Chak 210 GB (Lakhan)" },
      { value: "chak_211_gb", label: "Chak 211 GB (Ali Wal)" },
      { value: "chak_212_gb", label: "Chak 212 GB (Pali Baran)" },
      { value: "chak_213_gb", label: "Chak 213 GB (Ladian)" },
      { value: "chak_214_gb", label: "Chak 214 GB (Jarrar)" },
      { value: "chak_215_gb", label: "Chak 215 GB (Dawood Hamza)" },
      { value: "chak_216_gb", label: "Chak 216 GB (Jalal Abad)" },
      { value: "chak_217_gb", label: "Chak 217 GB (Gujjar Pind)" },
      { value: "chak_218_gb", label: "Chak 218 GB (Wains)" },
      { value: "chak_219_gb", label: "Chak 219 GB (Bhalpur)" },
      { value: "chak_220_gb", label: "Chak 220 GB (Khawaja Wains)" },
      { value: "chak_221_gb", label: "Chak 221 GB (Nangli)" },
      { value: "chak_222_gb", label: "Chak 222 GB (Kohala)" },
      { value: "chak_223_gb", label: "Chak 223 GB (Bhojian)" },
      { value: "chak_224_gb", label: "Chak 224 GB (R Pal)" },
      { value: "chak_225_gb", label: "Chak 225 GB (Chagawan)" },
      { value: "chak_226_gb", label: "Chak 226 GB (Uninhabited / Boundary Segment)" },
      { value: "chak_227_gb", label: "Chak 227 GB (Malu Nangal / Chinha)" },
      { value: "chak_228_gb", label: "Chak 228 GB (Nara Dada)" },
      { value: "chak_229_gb", label: "Chak 229 GB (Fazal Pura)" },
      { value: "chak_230_gb", label: "Chak 230 GB (Kot Rajput)" },
      { value: "chak_231_gb", label: "Chak 231 GB (Tiwana)" },
      { value: "chak_372_gb", label: "Chak 372 GB (Kartak Pur)" },
      { value: "chak_373_gb", label: "Chak 373 GB (Karam Sar / Khaldi)" },
      { value: "chak_385_gb", label: "Chak 385 GB (Uninhabited / Boundary Segment)" },
      { value: "chak_386_gb", label: "Chak 386 GB (Sultan Pur)" },
      { value: "chak_387_gb", label: "Chak 387 GB (Bari / Mandihar)" },
      { value: "chak_388_gb", label: "Chak 388 GB (Dilchi Majral)" },
      { value: "chak_389_gb", label: "Chak 389 GB (Saleh Pur)" },
      { value: "chak_390_gb", label: "Chak 390 GB (Mohan / Manian)" },
      { value: "chak_394_gb", label: "Chak 394 GB (Jhok Beg)" },
      { value: "chak_413_gb", label: "Chak 413 GB (Shabir Wala)" },
      { value: "chak_414_gb", label: "Chak 414 GB (Jaluana)" },
      { value: "chak_417_gb", label: "Chak 417 GB (Gouri Adean)" },
          { value: "chak_437_gb", label: "Chak 437 GB (Nurpur / Karol)" },
    { value: "chak_438_gb", label: "Chak 438 GB (Parthan)" },
    { value: "chak_439_gb", label: "Chak 439 GB (Muhalam / Fateh Rehan)" },
    { value: "chak_440_gb", label: "Chak 440 GB (Faiz Pur)" },
    { value: "chak_441_gb", label: "Chak 441 GB (Bhochoki / Sadhan Wala)" },
    { value: "chak_442_gb", label: "Chak 442 GB (Waraich)" },
    { value: "chak_443_gb", label: "Chak 443 GB (War Aichan Wala)" },
    { value: "chak_444_gb", label: "Chak 444 GB (Phallah)" },
    { value: "chak_445_gb", label: "Chak 445 GB (Thagan Wali)" },
    { value: "chak_446_gb", label: "Chak 446 GB (Kake Wala)" },
    { value: "chak_447_gb", label: "Chak 447 GB (Kambanwanwala)" },
    { value: "chak_448_gb", label: "Chak 448 GB (Lasharan)" },

    { value: "chak_461_gb", label: "Chak 461 GB (Badowal)" },
    { value: "chak_462_gb", label: "Chak 462 GB (Eissa Nagri)" },
    { value: "chak_463_gb", label: "Chak 463 GB (Harial / Khurd)" },
    { value: "chak_464_gb", label: "Chak 464 GB (Girja)" },
    { value: "chak_465_gb", label: "Chak 465 GB (Nabi Pur)" },
    { value: "chak_466_gb", label: "Chak 466 GB (Shah Pur)" },
    { value: "chak_467_gb", label: "Chak 467 GB (Bawean Wala)" },
    { value: "chak_468_gb", label: "Chak 468 GB (Rahgir Pur)" },
    { value: "chak_469_gb", label: "Chak 469 GB (Gunwal)" },
    { value: "chak_470_gb", label: "Chak 470 GB (Totianwala)" },
    { value: "chak_471_gb", label: "Chak 471 GB (Ram Singh Wala)" },
    { value: "chak_472_gb", label: "Chak 472 GB (Hargobind Pur)" },
    { value: "chak_473_gb", label: "Chak 473 GB (Bajopur / Bamban)" },
    { value: "chak_474_gb", label: "Chak 474 GB (Patiala)" },
    { value: "chak_475_gb", label: "Chak 475 GB (Gidar Pindi)" },
    { value: "chak_476_gb", label: "Chak 476 GB (Buzurg Wal)" },
    { value: "chak_477_gb", label: "Chak 477 GB (Kot Gharbi / Kot Sharqi)" },
    { value: "chak_478_gb", label: "Chak 478 GB (Kaki Ava)" },
    { value: "chak_479_gb", label: "Chak 479 GB (Sartan Pur)" },
    { value: "chak_480_gb", label: "Chak 480 GB (Uninhabited / Boundary Segment)" },
    { value: "chak_481_gb", label: "Chak 481 GB (Uninhabited / Boundary Segment)" },
    { value: "chak_482_gb", label: "Chak 482 GB (Jagranwan)" },
    { value: "chak_483_gb", label: "Chak 483 GB (Pakka Khoo)" },
    { value: "chak_484_gb", label: "Chak 484 GB (Thathian)" },
    { value: "chak_485_gb", label: "Chak 485 GB (Singh Chotahla)" },
    { value: "chak_486_gb", label: "Chak 486 GB (Arainan)" },
    { value: "chak_487_gb", label: "Chak 487 GB (Macha Nika)" },
    { value: "chak_488_gb", label: "Chak 488 GB (Sharqi / Gharbi)" },
    { value: "chak_495_gb", label: "Chak 495 GB (Bazar Wala)" },

    { value: "chak_527_gb", label: "Chak 527 GB (Sadheem / Saloni Jhall)" },
    { value: "chak_528_gb", label: "Chak 528 GB (Jatiana / Manupur)" },
    { value: "chak_529_gb", label: "Chak 529 GB (Hansan)" },
    { value: "chak_530_gb", label: "Chak 530 GB (Uninhabited / Boundary Segment)" },
    { value: "chak_531_gb", label: "Chak 531 GB (Dhalwan)" },    
    ],
  },


];

  return (
    <div
      className="flex flex-col items-center text-center px-4 py-10"
      id="home"
    >
      <h2 className="text-4xl md:text-[42px] font-bold text-gray-800 mt-8">
        Find and book services
      </h2>

      <p className="text-gray-500 mt-3 max-w-xl mb-5">
        Search trusted local sellers and services in your area instantly
      </p>

      {/* SEARCHABLE LOCATION DROPDOWN */}
      <div className="w-full max-w-md">
        <Select
          options={locationOptions}
          placeholder="Search or Select Location"
          isSearchable
          value={
            locationOptions
              .flatMap((group) => group.options)
              .find(
                (option) =>
                  option.value === locationFilter
              ) || null
          }
          onChange={(selectedOption) =>
            setLocationFilter(selectedOption.value)
          }
          className="text-left"
        />
      </div>
    </div>
  );
}

export default Searchbar;