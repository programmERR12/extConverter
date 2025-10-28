import { SiConvertio } from "react-icons/si";

export default function Navbar() {
  return (
    <header className=" bg-[#eef0f7] shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo + Title */}
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-blue-100 text-blue-600 p-2 rounded-full shadow-sm">
            <SiConvertio size={24} />
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 tracking-tight">
            Ext Converter
          </h1>
        </div>

        {/* Button Group */}
        {/* <div className="flex flex-wrap gap-2 sm:gap-4 items-center justify-center sm:justify-end">
          <button className="cursor-pointer bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium px-5 py-2 rounded-xl shadow transition duration-200">
            Convert
          </button>
          <button className="cursor-pointer text-gray-700 font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition duration-200">
            Log In
          </button>
          <button className="cursor-pointer text-gray-700 font-medium px-4 py-2 rounded-xl hover:bg-gray-100 transition duration-200">
            Sign In
          </button>
        </div> */}
      </nav>
    </header>
  );
}
