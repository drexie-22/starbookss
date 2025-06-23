import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  School,
  MapPin,
  Calendar,
  TrendingUp,
  Building,
  Star,
  Ban,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import useSWR from "swr";
import axios from "axios";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function Dashboard() {
  const { data, isLoading, error } = useSWR("/api/dashboard", fetcher);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data.</p>;
  if (!data) return <p>No data available.</p>;

  const paginatedDeployments = data.recentDeployments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function MunicipalitySection({ name }: { name: string }) {
    const [open, setOpen] = useState(false);
    const records = data.deployments[name] || [];

    return (
      <div className="border rounded-md bg-muted p-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left font-semibold text-primary hover:underline"
        >
          {name}
        </button>
        {open && (
          <div className="mt-2 space-y-2">
            {records.length > 0 ? (
              records.map((inst: any, idx: number) => (
                <div
                  key={idx}
                  className="border rounded bg-background p-3 text-sm space-y-1"
                >
                  <p><strong>Name:</strong> {inst.name}</p>
                  <p><strong>Type:</strong> {inst.type}</p>
                  <p><strong>Code:</strong> {inst.code}</p>
                  <p><strong>Date:</strong> {inst.date}</p>
                  <p><strong>STARBOOKS:</strong> {inst.starbooks}</p>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground italic text-sm">
                No deployment records.
              </p>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Region 1 Deployment Dashboard</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((stat: any) => (
          <Card key={stat.title} className="shadow-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Deployment Trends (Monthly)</span>
            </CardTitle>
            <CardDescription>Deployments across Region 1 (2024)</CardDescription>
          </CardHeader>
          <CardContent className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.trends}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Institution Type Distribution
            </CardTitle>
            <CardDescription>Breakdown of all deployed institution types</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.institutionDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  label
                >
                  {data.institutionDistribution.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={data.colors[index % data.colors.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MapPin className="h-5 w-5" />
            <span>Deployments by Province</span>
          </CardTitle>
          <CardDescription>
            Click a province to view its municipalities and institution records.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(data.municipalities).map(([province, municipalities]) => (
              <Dialog key={province}>
                <DialogTrigger asChild>
                  <button className="p-4 border rounded-lg bg-muted w-full text-center hover:bg-muted/80 transition">
                    <p className="text-sm text-muted-foreground">{province}</p>
                    <p className="text-xl font-bold text-primary">{municipalities.length}</p>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{province} – Municipalities</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    {municipalities.map((municipality: string) => (
                      <MunicipalitySection key={municipality} name={municipality} />
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Recent Deployments</span>
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, Math.ceil(data.recentDeployments.length / itemsPerPage)))}
                disabled={currentPage === Math.ceil(data.recentDeployments.length / itemsPerPage)}
              >
                Next
              </Button>
            </div>
          </CardTitle>
          <CardDescription>Latest deployments within Region 1</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paginatedDeployments.map((deployment: any) => (
              <div
                key={deployment.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-muted rounded-full">
                    <School className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">{deployment.institutionName}</div>
                    <div className="text-sm text-muted-foreground">
                      {deployment.province} • {deployment.type} • {deployment.place}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Code: {deployment.code} • STARBOOKS: {deployment.starbooks}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-foreground">
                    {new Date(deployment.dateDeployed).toLocaleDateString()}
                  </p>
                  <Badge variant="secondary" className="mt-1">
                    {deployment.status || ""}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
