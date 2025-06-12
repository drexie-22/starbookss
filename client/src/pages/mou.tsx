import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Upload, 
  Download, 
  Eye, 
  Search,
  FileText,
  Calendar,
  MapPin
} from "lucide-react";

export default function MOU() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  // Sample MOU data - will be replaced with real data
  const mouDocuments = [
    {
      id: 1,
      schoolName: "Saint Louis College",
      province: "La Union",
      municipality: "San Fernando City",
      recipientName: "CARLA",
      uploadDate: "2024-05-15",
      fileName: "MOU_SLC_2024.pdf",
      fileSize: "2.3 MB",
      status: "Available"
    },
    {
      iid: 2,
      schoolName: "Saint John Bosco College of Northern Luzon",
      province: "La Union",
      municipality: "San Fernando City",
      recipientName: "SJBCNL",
      uploadDate: "2024-05-14",
      fileName: "MOU_SJBCNL_2024.pdf",
      fileSize: "1.8 MB",
      status: "Available"
    },
    {
      id: 3,
      schoolName: "DMMMSU-ELUC",
      province: "La Union",
      municipality: "Naguilian",
      recipientName: "DMMMSU",
      uploadDate: null,
      fileName: null,
      fileSize: null,
      status: "Missing"
    }
  ];

  const filteredDocuments = mouDocuments.filter(doc => {
    const matchesSearch = searchQuery === "" || 
      doc.schoolName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.province.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesProvince = selectedProvince === "" || selectedProvince === "all" || doc.province === selectedProvince;
    const matchesStatus = selectedStatus === "" || selectedStatus === "all" || doc.status === selectedStatus;

    return matchesSearch && matchesProvince && matchesStatus;
  });

  const handleViewDocument = (fileName: string) => {
    console.log(`Viewing document: ${fileName}`);
    alert("Document viewing will be implemented with backend integration");
  };

  const handleDownloadDocument = (fileName: string) => {
    console.log(`Downloading document: ${fileName}`);
    alert("Document download will be implemented with backend integration");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">MOU Documents</h1>
        <p className="text-muted-foreground">
          Manage and access Memorandum of Understanding documents for each school
        </p>
      </div>

      {/* Upload Section */}
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Upload New MOU</span>
          </CardTitle>
          <CardDescription>
            Upload MOU documents for schools that don't have them yet
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Select>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Select School" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DMMMSU">DMMMSU</SelectItem>
                <SelectItem value="other-school">Other School Without MOU</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                accept=".pdf"
                className="bg-background"
              />
            </div>
            
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload MOU
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search MOU Documents</span>
          </CardTitle>
          <CardDescription>
            Find MOU documents by school name, province, or status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="md:col-span-2">
              <Input
                placeholder="Search by school name or province..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-background"
              />
            </div>
            
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="All Provinces" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Provinces</SelectItem>
                <SelectItem value="pangasinan">Pangasinan</SelectItem>
                <SelectItem value="ilocos sur">Ilocos Sur</SelectItem>
                <SelectItem value="Ilocos Norte">Ilocos Norte</SelectItem>
                <SelectItem value="La Union">La Union</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Missing">Missing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-muted-foreground">
              Found {filteredDocuments.length} documents
            </p>
            <p className="text-sm text-muted-foreground">
              {filteredDocuments.filter(doc => doc.status === "Available").length} available, {" "}
              {filteredDocuments.filter(doc => doc.status === "Missing").length} missing
            </p>
          </div>
        </CardContent>
      </Card>

      {/* MOU Documents Table */}
      <Card className="bg-white dark:bg-gray-900">
        <CardHeader>
          <CardTitle>MOU Documents</CardTitle>
          <CardDescription>
            All MOU documents with their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>School Information</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Document Details</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No MOU documents found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium text-foreground">{doc.schoolName}</p>
                          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                            <MapPin className="h-3 w-3" />
                            <span>{doc.municipality}, {doc.province}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm font-medium">{doc.recipientName}</p>
                      </TableCell>
                      <TableCell>
                        {doc.fileName ? (
                          <div>
                            <p className="text-sm font-medium text-foreground">{doc.fileName}</p>
                            <p className="text-xs text-muted-foreground">{doc.fileSize}</p>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">No document uploaded</p>
                        )}
                      </TableCell>
                      <TableCell>
                        {doc.uploadDate ? (
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">
                              {new Date(doc.uploadDate).toLocaleDateString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-muted-foreground">Not uploaded</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant={doc.status === "Available" ? "default" : "destructive"}
                        >
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {doc.status === "Available" && (
                            <>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleViewDocument(doc.fileName!)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleDownloadDocument(doc.fileName!)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {doc.status === "Missing" && (
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-1" />
                              Upload
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}