import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Upload,
  Download,
  Eye,
  MapPin,
  Calendar,
  PlusCircle,
  ArchiveRestore,
  Bell
} from "lucide-react";

import AddInstitution from "@/pages/add-school";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";

type MOURecord = {
  id: number;
  institutionName: string;
  code: string;
  province: string;
  municipality: string;
  recipientName: string;
  uploadDate: string | null;
  fileName: string | null;
  fileSize: string | null;
  status: "Available" | "Missing";
};

export default function MOU() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [mouDocuments, setMouDocuments] = useState<MOURecord[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/mou-documents");
        const data: MOURecord[] = await res.json();
        setMouDocuments(data);
      } catch (error) {
        console.error("Failed to fetch MOU records", error);
      }
    };
    fetchData();
  }, []);

  const filteredDocuments = mouDocuments.filter((doc) => {
    const matchesSearch =
      searchQuery === "" ||
      doc.institutionName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.province.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesProvince =
      selectedProvince === "" ||
      selectedProvince === "all" ||
      doc.province === selectedProvince;

    const matchesStatus =
      selectedStatus === "" ||
      selectedStatus === "all" ||
      doc.status === selectedStatus;

    return matchesSearch && matchesProvince && matchesStatus;
  });

  const handleViewDocument = (fileName: string) => alert("Viewing: " + fileName);
  const handleDownloadDocument = (fileName: string) => alert("Downloading: " + fileName);
  const handleArchive = (code: string) => alert(`Archiving ${code}`);
  const handleNotify = (recipient: string) => alert(`Notification sent to ${recipient}`);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Institution MOU Records</h1>
        <p className="text-muted-foreground">
          Track and manage signed MOU documents of Region I institutions.
        </p>
      </div>

      <Card className="bg-white dark:bg-gray-900 shadow-lg border rounded-xl">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-xl">Manage MOU Documents</CardTitle>
              <CardDescription>
                Search, filter, and manage institutional MOU files.
              </CardDescription>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <PlusCircle className="h-4 w-4 mr-2" /> Add Institution
                </Button>
              </DialogTrigger>
              <DialogContent className="w-full max-w-4xl h-[800px] rounded-lg shadow-xl bg-white dark:bg-gray-900 overflow-auto">
                <AddInstitution />
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>

        <CardContent className="space-y-6 mt-4">
          <div className="grid gap-4 md:grid-cols-4">
            <Input
              placeholder="Search by institution name or province..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="col-span-2"
            />
            <Select value={selectedProvince} onValueChange={setSelectedProvince}>
              <SelectTrigger>
                <SelectValue placeholder="All Provinces" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Provinces</SelectItem>
                <SelectItem value="Ilocos Norte">Ilocos Norte</SelectItem>
                <SelectItem value="Ilocos Sur">Ilocos Sur</SelectItem>
                <SelectItem value="La Union">La Union</SelectItem>
                <SelectItem value="Pangasinan">Pangasinan</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Available">Available</SelectItem>
                <SelectItem value="Missing">Missing</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Found {filteredDocuments.length} document(s)</span>
            <span>
              {
                filteredDocuments.filter((doc) => doc.status === "Available")
                  .length
              } available, {" "}
              {
                filteredDocuments.filter((doc) => doc.status === "Missing").length
              } missing
            </span>
          </div>

          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Institution</TableHead>
                  <TableHead>Code</TableHead>
                  <TableHead>Recipient</TableHead>
                  <TableHead>Document</TableHead>
                  <TableHead>Upload Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No MOU documents found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <p className="font-medium">{doc.institutionName}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {doc.municipality}, {doc.province}
                        </div>
                      </TableCell>
                      <TableCell className="text-xs font-mono">{doc.code}</TableCell>
                      <TableCell>{doc.recipientName}</TableCell>
                      <TableCell>
                        {doc.fileName ? (
                          <>
                            <p className="text-sm">{doc.fileName}</p>
                            <p className="text-xs text-muted-foreground">{doc.fileSize}</p>
                          </>
                        ) : (
                          <span className="text-xs text-muted-foreground">No file</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {doc.uploadDate ? (
                          <div className="flex items-center text-sm">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </div>
                        ) : (
                          <span className="text-xs text-muted-foreground">Not uploaded</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant={doc.status === "Available" ? "default" : "destructive"}>
                          {doc.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {doc.status === "Available" && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => handleViewDocument(doc.fileName!)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleDownloadDocument(doc.fileName!)}>
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleNotify(doc.recipientName)}>
                            <Bell className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleArchive(doc.code)}>
                            <ArchiveRestore className="h-4 w-4" />
                          </Button>
                          {doc.status === "Missing" && (
                            <Button variant="outline" size="sm">
                              <Upload className="h-4 w-4 mr-1" /> Upload
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
