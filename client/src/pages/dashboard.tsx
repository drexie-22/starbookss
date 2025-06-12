import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  School, 
  MapPin, 
  Calendar, 
  FileText, 
  TrendingUp, 
  Users,
  Building,
  Filter
} from "lucide-react";


export default function Dashboard() {
  // Mock data for demonstration - will be replaced with real data later
  const stats = [
    {
      title: "No. of Sites",
      value: "1,234",
      icon: School,
      change: "+12%",
      changeType: "increase" as const,
    },
    {
      title: "Provinces Covered",
      value: "17",
      icon: MapPin,
      change: "+2",
      changeType: "increase" as const,
    },
    {
      title: "This Year",
      value: "187",
      icon: Calendar,
      change: "+23%",
      changeType: "increase" as const,
    },
    {
      title: "MOU Documents",
      value: "956",
      icon: FileText,
      change: "+8%",
      changeType: "increase" as const,
    },
  ];

  const recentDeployments = [
    {
      id: 1,
      schoolName: "SLC",
      province: "LU",
      type: "HS",
      dateDeployed: "2024-05-15",
      status: "completed"
    },
    {
      id: 2,
      schoolName: "DMMMSU",
      province: "LU",
      type: "College",
      dateDeployed: "2024-05-14",
      status: "completed"
    },
    {
      id: 3,
      schoolName: "SJBCNL",
      province: "LU",
      type: "College",
      dateDeployed: "2024-05-13",
      status: "pending"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of STARTBOOKS deployment and monitoring system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="bg-white dark:bg-gray-900">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className={`${stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>{' '}
                from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Quick Actions */}
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Quick Filters</span>
          </CardTitle>
          <CardDescription>
            Filter deployments by province, institution type, or year
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex-1">
              <Input
                placeholder="Search by school name..."
                className="bg-background"
              />
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Region 1">Region 1</SelectItem>
                <SelectItem value="Region 2">Region 2</SelectItem>
                <SelectItem value="Region 3">Region 3</SelectItem>
                <SelectItem value="Region 4">Region 4</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Province" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="La Union">La Union</SelectItem>
                <SelectItem value="Ilocos NOrte">Ilocos NOrte</SelectItem>
                <SelectItem value="Ilocos SUr">Ilocos SUr</SelectItem>
                <SelectItem value="Pangasinan">Pangasinan</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Institution Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Elementary">Elementary</SelectItem>
                <SelectItem value="High School">High School</SelectItem>
                <SelectItem value="College">College</SelectItem>
                <SelectItem value="Private Institutions">Private Institutions</SelectItem>
                <SelectItem value="NGAs">NGAs</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
            <Button>Apply Filters</Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Deployments */}
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Recent Deployments</span>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </CardTitle>
          <CardDescription>
            Latest school deployments and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDeployments.map((deployment) => (
              <div
                key={deployment.id}
                className="flex items-center justify-between p-4 border border-border rounded-lg bg-background"
              >
                <div className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <School className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{deployment.schoolName}</h3>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{deployment.province}</span>
                      <span>•</span>
                      <span>{deployment.type}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-foreground">
                      {new Date(deployment.dateDeployed).toLocaleDateString()}
                    </p>
                    <Badge 
                      variant={deployment.status === 'completed' ? 'default' : 'secondary'}
                      className="mt-1"
                    >
                      {deployment.status}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Province Distribution */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Deployment Trends</span>
            </CardTitle>
            <CardDescription>
              Monthly deployment statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Chart will be implemented with real data
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Building className="h-5 w-5" />
              <span>School Type Distribution</span>
            </CardTitle>
            <CardDescription>
              Elementary vs Secondary schools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Elementary</span>
                <span className="text-sm font-medium">687 (56%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '56%' }}></div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Secondary</span>
                <span className="text-sm font-medium">547 (44%)</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-secondary h-2 rounded-full" style={{ width: '44%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}