"use client"

import { Download, FileText } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { usePDFGenerator } from "@/hooks/usePDFGenerator"
import { ChartItem } from "@/types"

interface PDFReportModalProps {
  charts: ChartItem[]
}

export function PDFReportModal({ charts }: PDFReportModalProps) {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("Strategic Intelligence Report")
  const [selected, setSelected] = useState<string[]>(charts.map((c) => c.id))

  const { generate, loading } = usePDFGenerator()

  const toggleChart = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((s) => s !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const handleGenerate = async () => {
    const selectedCharts = charts.filter((c) => selected.includes(c.id))
    await generate(title, selectedCharts)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <FileText className="size-4 mr-2" />
          Générer un rapport PDF
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Générer un rapport PDF</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-2">
            <Label>Titre du rapport</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Strategic Intelligence Report"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Graphiques à inclure</Label>
            {charts.map((chart) => (
              <div key={chart.id} className="flex items-center gap-2">
                <Checkbox
                  id={chart.id}
                  checked={selected.includes(chart.id)}
                  onCheckedChange={() => toggleChart(chart.id)}
                />
                <label className="text-sm cursor-pointer">{chart.label}</label>
              </div>
            ))}
          </div>

          <Button onClick={handleGenerate} disabled={loading}>
            <Download className="size-4 mr-2" />
            {loading ? "Génération..." : "Télécharger le PDF"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
