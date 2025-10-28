import fs from "fs";
import path from "path";
import fetch, { FormData, fileFromSync } from "node-fetch";

export const wordToPdf = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//   const uploadsDir = path.join("uploads");
  const convertedDir = path.join("converted");

  // Ensure both folders exist
//   if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
  if (!fs.existsSync(convertedDir)) fs.mkdirSync(convertedDir);

  const filePath = req.file.path;
  const token = process.env.API_TOKEN;

  if (!token)
    return res.status(500).json({ message: "Missing API token" });

  try {
    // Prepare form data for ConvertAPI
    const form = new FormData();
    form.append("File", fileFromSync(filePath));

    // API endpoint: DOCX → PDF
    const response = await fetch(
      `https://v2.convertapi.com/convert/docx/to/pdf?Secret=${token}`,
      {
        method: "POST",
        body: form,
      }
    );

    const data = await response.json();

    if (!data.Files || !data.Files[0].FileData) {
      return res.status(500).json({ message: "Conversion failed", data });
    }

    // Decode Base64 → binary
    const fileBase64 = data.Files[0].FileData;
    const buffer = Buffer.from(fileBase64, "base64");

    // Save to converted folder
    const outputFileName = `${Date.now()}.pdf`;
    const outputPath = path.join(convertedDir, outputFileName);
    fs.writeFileSync(outputPath, buffer);

    // Send file as download
    res.download(outputPath, outputFileName, (err) => {
      if (err) console.error("Download error:", err);

      // Cleanup: remove uploaded file (optional)
      try {
        fs.unlinkSync(filePath); // delete uploaded docx
        // fs.unlinkSync(outputPath); // keep converted PDF
      } catch (cleanupErr) {
        console.error("Cleanup error:", cleanupErr);
      }
    });
  } catch (error) {
    console.error("❌ Conversion error:", error);
    res.status(500).json({ message: "Conversion failed", error: error.message });
  }
};
