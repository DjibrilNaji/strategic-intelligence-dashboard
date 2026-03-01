import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { CountryReport } from "@/types"

interface CountriesTableProps {
  title: string
  description: string
  data: CountryReport[]
  variant: "top" | "worst"
}

export function CountriesTable({ title, description, data, variant }: CountriesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">Rank</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Region</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Weather</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((country, index) => (
              <TableRow key={country.country}>
                <TableCell className="font-mono text-muted-foreground">#{index + 1}</TableCell>

                <TableCell className="font-medium">{country.country}</TableCell>

                <TableCell>
                  <Badge variant="outline">{country.region}</Badge>
                </TableCell>

                <TableCell className="text-right">
                  <span
                    className={
                      variant === "top"
                        ? "text-green-500 font-semibold"
                        : "text-red-500 font-semibold"
                    }
                  >
                    {parseFloat(country.score).toFixed(1)}
                  </span>
                </TableCell>

                <TableCell>
                  <Badge variant="secondary" className="capitalize">
                    {country.dominantType}
                  </Badge>
                </TableCell>

                <TableCell className="text-right text-muted-foreground">
                  {parseFloat(country.weatherScore).toFixed(1)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
