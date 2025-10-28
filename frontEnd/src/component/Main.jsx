
import React, { useRef, useState } from "react";
import { toast } from "react-hot-toast";


export default function Main() {
  const [target, setTarget] = useState("");
  const [loading, setLoading] = useState(false); // ✅ loading state
  const fileInputRef = useRef(null);

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const file = fileInputRef.current.files[0];

    if (!file) {
      toast.error("Please select a PDF or Word file first!");
      return;
    }

    if (!target) {
      toast.error("Please choose a conversion type (PDF → Word or Word → PDF)");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    // const BASE_URL = "https://extconverter.onrender.com";
    
    const endpoint =
      target === "doc"
        ? "http://localhost:4000/api/convert/pdf-to-word"
        : "http://localhost:4000/api/convert/word-to-pdf";
        // `${BASE_URL}/api/convert/pdf-to-word`
        // `${BASE_URL}/api/convert/word-to-pdf`;
    try {
      setLoading(true); // ✅ start loading
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server Error:${errorText}`);
       
      }

      const blob = await response.blob();
      const downloadUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download =
        target === "doc"
          ? file.name.replace(/\.pdf$/, ".docx")
          : file.name.replace(/\.docx?$/, ".pdf");
      link.click();
      URL.revokeObjectURL(downloadUrl);

      toast.success(`File "${file.name}" converted successfully!`);
    } catch (error) {
      console.error(error);
      toast.error(`Conversion failed: ${error.message}`);
    } finally {
      setLoading(false); // ✅ stop loading
    }
  };

  return (
    <div className="min-h-screen bg-[#eef0f7] text-gray-100 flex flex-col items-center justify-between font-[Inter] relative">
      {/* ==== Loading Overlay ==== */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          <div className="loader w-16 h-16 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-700 font-semibold mt-4">Converting file...</p>
        </div>
      )}

      {/* ==== Header Section ==== */}
      <header className="text-center mt-20 px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-black">
          Convert Documents{" "}
          <span className="bg-gradient-to-r from-indigo-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            Instantly
          </span>
        </h1>
        <p className="text-gray-600 text-base md:text-lg max-w-2xl mx-auto mt-4">
          Transform your PDFs to Word documents and Word files to PDFs with
          ease. Fast, secure, and completely free to use.
        </p>
      </header>

      {/* ==== Converter Card ==== */}
      <main className="flex-grow flex justify-center items-center w-full px-6 mt-12">
        <div className="bg-white/70 backdrop-blur-2xl border border-gray-200 rounded-3xl shadow-2xl p-8 w-full max-w-lg text-center relative">
          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              disabled={loading}
              className={`px-5 py-2 rounded-lg font-semibold ${
                target === "doc"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => setTarget("doc")}
            >
              PDF → Word
            </button>
            <button
              disabled={loading}
              className={`px-5 py-2 rounded-lg font-semibold ${
                target === "pdf"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => setTarget("pdf")}
            >
              Word → PDF
            </button>
          </div>

          {/* Upload Section */}
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <label className="block text-left font-semibold mb-2 text-gray-800">
              Upload File
            </label>
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-full">
                <input
                  type="file"
                  id="fileUpload"
                  ref={fileInputRef}
                  accept=".pdf,.doc,.docx"
                  disabled={loading}
                  className={`w-full bg-white border border-gray-300 p-3 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 transition-all duration-300 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                />
              </div>

              <button
                type="button"
                disabled={loading}
                onClick={() => {
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                title="Clear file"
                className={`p-3 rounded-full bg-white text-gray-600 hover:text-red-500 border border-gray-300 shadow-sm transition-all duration-300 flex items-center justify-center ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                ✕
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`px-5 py-3 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold hover:from-indigo-600 hover:to-blue-600 transition-all duration-300 shadow-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Converting..." : "Convert Now"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

