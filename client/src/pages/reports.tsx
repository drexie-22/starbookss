import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  BarChart3, 
  PieChart, 
  TrendingUp,
  MapPin,
  Calendar,
  School
} from "lucide-react";

export default function Reports() {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSchoolType, setSelectedSchoolType] = useState("");

  // Sample report data - will be replaced with real data
  const summaryData = {
    totalSchools: 1234,
    byProvince: [
      { province: "Pangasinan", count: 156, percentage: 12.6 },
      { province: "La Union", count: 98, percentage: 7.9 },
      { province: "Ilocos NOrte", count: 87, percentage: 7.1 },
      { province: "Ilocos Sur", count: 76, percentage: 6.2 },
      { province: "Others", count: 817, percentage: 66.2 }
    ],
    byYear: [
      { year: 2024, count: 234, percentage: 19.0 },
      { year: 2023, count: 456, percentage: 37.0 },
      { year: 2022, count: 344, percentage: 27.9 },
      { year: 2021, count: 200, percentage: 16.1 }
    ],
    bySchoolType: [
      { type: "Elementary", count: 687, percentage: 55.7 },
      { type: "Secondary", count: 547, percentage: 44.3 }
    ]
  };

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report with filters:`, {
      province: selectedProvince,
      year: selectedYear,
      schoolType: selectedSchoolType
    });
    alert(`${type} report generation will be implemented with backend integration`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground">
          Generate summaries and export data by province, year, and school type
        </p>
      </div>

      {/* Report Filters */}
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5" />
            <span>Report Filters</span>
          </CardTitle>
          <CardDescription>
            Select criteria to customize your reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="All Provinces" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Provinces</SelectItem>
                <SelectItem value="Ilocos Sur">Ilocus SUr</SelectItem>
                <SelectItem value="Ilocos NOrter">Ilocos Norte</SelectItem>
                <SelectItem value="Pangasinan">Pangasinan</SelectItem>
                <SelectItem value="La Union">La Union</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSchoolType} onValueChange={setSelectedSchoolType}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Elementary">Elementary</SelectItem>
                <SelectItem value="Secondary">Secondary</SelectItem>
              </SelectContent>
            </Select>

            <Button onClick={() => generateReport("Custom")}>
              <Download className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Tabs */}
      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="province">By Province</TabsTrigger>
          <TabsTrigger value="year">By Year</TabsTrigger>
          <TabsTrigger value="type">By School Type</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="space-y-4">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Overall Summary</CardTitle>
              <CardDescription>
                Total deployments and key statistics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-6 border border-border rounded-lg bg-background">
                  <div className="flex justify-center mb-2">
                    <School className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">{summaryData.totalSchools}</div>
                  <p className="text-sm text-muted-foreground">Total Schools</p>
                </div>
                
                <div className="text-center p-6 border border-border rounded-lg bg-background">
                  <div className="flex justify-center mb-2">
                    <MapPin className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">17</div>
                  <p className="text-sm text-muted-foreground">Provinces Covered</p>
                </div>
                
                <div className="text-center p-6 border border-border rounded-lg bg-background">
                  <div className="flex justify-center mb-2">
                    <Calendar className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-foreground">4</div>
                  <p className="text-sm text-muted-foreground">Years Active</p>
                </div>
              </div>

              <div className="mt-6 flex justify-center">
                <Button onClick={() => generateReport("Summary")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Summary Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="province" className="space-y-4">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Distribution by Province</CardTitle>
              <CardDescription>
                School deployments across different provinces
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {summaryData.byProvince.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.province}</p>
                        <p className="text-sm text-muted-foreground">{item.percentage}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{item.count}</p>
                      <p className="text-sm text-muted-foreground">schools</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button onClick={() => generateReport("Province")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Province Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="year" className="space-y-4">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Distribution by Year</CardTitle>
              <CardDescription>
                School deployments over the years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {summaryData.byYear.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <Calendar className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.year}</p>
                        <p className="text-sm text-muted-foreground">{item.percentage}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{item.count}</p>
                      <p className="text-sm text-muted-foreground">schools</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button onClick={() => generateReport("Year")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Year Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="type" className="space-y-4">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Distribution by School Type</CardTitle>
              <CardDescription>
                Elementary vs Secondary school deployments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {summaryData.bySchoolType.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <School className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.type}</p>
                        <p className="text-sm text-muted-foreground">{item.percentage}% of total</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">{item.count}</p>
                      <p className="text-sm text-muted-foreground">schools</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <Button onClick={() => generateReport("School Type")}>
                  <Download className="h-4 w-4 mr-2" />
                  Export School Type Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}