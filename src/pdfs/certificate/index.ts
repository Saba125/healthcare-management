import { Response } from "express"
import PDFDocument from "pdfkit"
export function generateCertificate(
  res: Response,
  studentName: string,
  courseName: string
) {
  const doc = new PDFDocument()
  const fileName = `${studentName}-certificate.pdf`
  res.setHeader("Content-Type", "application/pdf")
  res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`)
  doc.pipe(res)
  // Add content to the PDF
  doc.fontSize(20).text("Certificate of Completion", { align: "center" })
  doc.moveDown()
  doc.fontSize(14).text(`This certifies that`, { align: "center" })
  doc.moveDown()
  doc.fontSize(18).text(studentName, { align: "center" })
  doc.moveDown()
  doc.fontSize(14).text(`has completed the course:`, { align: "center" })
  doc.moveDown()
  doc.fontSize(18).text(courseName, { align: "center" })
  doc.moveDown()
  doc.text("Issued by: Your Organization", { align: "center" })

  // Finalize the PDF and send it to the client
  doc.end()
}
