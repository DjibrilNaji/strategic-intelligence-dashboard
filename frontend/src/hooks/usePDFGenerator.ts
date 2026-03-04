import { toPng } from "html-to-image"
import jsPDF from "jspdf"
import { useState } from "react"

import { ChartItem } from "@/types"

export function usePDFGenerator() {
  const [loading, setLoading] = useState(false)

  const generate = async (title: string, charts: ChartItem[]) => {
    setLoading(true)

    const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" })
    const pageWidth = pdf.internal.pageSize.getWidth()
    const pageHeight = pdf.internal.pageSize.getHeight()
    const margin = 15

    pdf.setFillColor(15, 15, 15)
    pdf.rect(0, 0, pageWidth, pageHeight, "F")

    pdf.setFontSize(24)
    pdf.setTextColor(255, 255, 255)
    pdf.setFont("helvetica", "bold")
    const titleLines = pdf.splitTextToSize(title, pageWidth - margin * 2)
    pdf.text(titleLines, margin, 20)

    let y = 20 + titleLines.length * 10

    for (const chart of charts) {
      if (!chart.ref.current) continue

      const imgData = await toPng(chart.ref.current, { cacheBust: true })

      const img = new Image()
      img.src = imgData

      await new Promise((resolve) => (img.onload = resolve))

      const imgWidth = pageWidth - margin * 2
      const imgHeight = (img.height * imgWidth) / img.width
      const titleHeight = 10

      if (y + titleHeight + imgHeight > pageHeight - margin) {
        pdf.addPage()
        pdf.setFillColor(15, 15, 15)
        pdf.rect(0, 0, pageWidth, pageHeight, "F")
        y = margin
      }

      pdf.setFontSize(12)
      pdf.setTextColor(255, 255, 255)
      pdf.setFont("helvetica", "bold")
      pdf.text(chart.label, margin, y)
      y += titleHeight

      pdf.addImage(imgData, "PNG", margin, y, imgWidth, imgHeight)
      y += imgHeight + 12
    }

    pdf.save("report.pdf")
    setLoading(false)
  }

  return { generate, loading }
}
