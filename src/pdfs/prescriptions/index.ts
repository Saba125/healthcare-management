import { Response } from "express"
import PDFDocument from "pdfkit"
export function generatePrescriptionPDF(
  res: Response,
  patientName: string,
  diagnosis: string,
  treatment: string,
  prescriptions: string[]
) {
  try {
    const doc = new PDFDocument()
    const fileName = `${patientName}-prescription.pdf`

    // Set headers
    res.setHeader("Content-Type", "application/pdf")
    res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`)

    // Pipe the PDF document to the response
    doc.pipe(res)

    // Add content to the PDF
    doc.fontSize(20).text("Medical Prescription", { align: "center" })
    doc.moveDown()
    doc.fontSize(14).text(`Patient Name: ${patientName}`, { align: "left" })
    doc.text(`Diagnosis: ${diagnosis}`, { align: "left" })
    doc.text(`Treatment: ${treatment}`, { align: "left" })
    doc.moveDown()
    doc.fontSize(16).text("Prescriptions:", { underline: true })
    prescriptions.forEach((item, index) => {
      doc.text(`${index + 1}. ${item}`, { align: "left" })
    })
    doc.moveDown()
    doc.fontSize(12).text("Issued by: Your Clinic Name", { align: "center" })
    doc.text(`Date: ${new Date().toLocaleDateString()}`, { align: "center" })

    // Finalize the PDF
    doc.end()

    // No further writes to res after doc.end()
  } catch (error) {
    console.error("Error generating PDF:", error)

    // Handle errors gracefully
    res.status(500).json({
      status: "error",
      message: "Failed to generate the PDF",
    })
  }
}
