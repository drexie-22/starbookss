import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { Upload, School } from "lucide-react";

// 📌 Schema
const institutionFormSchema = z.object({
  institutionName: z.string().min(1, "Institution name is required"),
  dateOfDeployment: z.string().min(1, "Date of deployment is required"),
  completeAddress: z.string().min(1, "Complete address is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  recipientName: z.string().min(1, "Recipient name is required"),
  institutionType: z.enum(["Public", "Private", "NGO"], {
    required_error: "Please select an institution type",
  }),
  province: z.string().min(1, "Province is required"),
  yearDistributed: z.number().min(1900).max(new Date().getFullYear()),
  institutionalCode: z.string()
    .min(1, "Institutional code is required")
    .regex(/^[a-zA-Z0-9_-]+$/, "Institutional code must be alphanumeric"),

  unitStatus: z.enum(["Active", "Inactive"], {
    required_error: "Please select unit status",
  }),
  statusRemarks: z.string().optional(),

  gadMale: z.number().min(0),
  gadFemale: z.number().min(0),
  gadOthers: z.number().min(0),
  gadNotes: z.string().optional(),
});

type InstitutionFormData = z.infer<typeof institutionFormSchema>;

const philippineProvinces = ["Ilocos Norte", "Ilocos Sur", "La Union", "Pangasinan"];

export default function AddInstitution() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<InstitutionFormData>({
    resolver: zodResolver(institutionFormSchema),
    defaultValues: {
      institutionName: "",
      dateOfDeployment: "",
      completeAddress: "",
      email: "",
      phone: "",
      recipientName: "",
      province: "",
      yearDistributed: new Date().getFullYear(),
      institutionalCode: "",
      institutionType: undefined,
      unitStatus: "Active",
      statusRemarks: "",
      gadMale: 0,
      gadFemale: 0,
      gadOthers: 0,
      gadNotes: "",
    },
  });

  const onSubmit = async (data: InstitutionFormData) => {
    setIsSubmitting(true);
    console.log("Form data:", data);
    console.log("MOU file:", selectedFile);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    form.reset();
    setSelectedFile(null);
    alert("Institution added successfully!");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New Institution</h1>
        <p className="text-muted-foreground">
          Register a new institution deployment in the STARBOOKS monitoring system
        </p>
      </div>

      <Card className="bg-white dark:bg-gray-900 max-w-5xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <School className="h-5 w-5" />
            <span>Institution Information</span>
          </CardTitle>
          <CardDescription>
            Fill in all required information for the institution deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Institution and Recipient */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="institutionName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter institution name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="recipientName" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter recipient name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Address */}
              <FormField control={form.control} name="completeAddress" render={({ field }) => (
                <FormItem>
                  <FormLabel>Complete Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter full address..." rows={3} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              {/* Province, Type, Code */}
              <div className="grid gap-4 md:grid-cols-3">
                <FormField control={form.control} name="province" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Province</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select province" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {philippineProvinces.map((province) => (
                          <SelectItem key={province} value={province}>{province}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="institutionType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institution Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Public">Public</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                        <SelectItem value="NGO">NGO</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="institutionalCode" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Institutional Code</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. ABC123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Contact & Deployment */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="phone" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Contact Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter contact number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="dateOfDeployment" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Deployment</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="yearDistributed" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Distributed</FormLabel>
                    <FormControl>
                      <Input type="number" min="1900" max={new Date().getFullYear()} {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value))} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Unit Status */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField control={form.control} name="unitStatus" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select unit status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="statusRemarks" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status Remarks</FormLabel>
                    <FormControl>
                      <Input placeholder="Optional remarks..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* GAD Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Participants</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <FormField control={form.control} name="gadMale" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Male</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="gadFemale" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Female</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="gadOthers" render={({ field }) => (
                    <FormItem>
                      <FormLabel>Others</FormLabel>
                      <FormControl>
                        <Input type="number" min={0} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
                <FormField control={form.control} name="gadNotes" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Any remarks or observations related to gender..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>

              {/* Upload */}
              <div className="space-y-4">
                <Label>MOU Document (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 bg-background">
                  <div className="flex flex-col items-center space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag & drop</p>
                    <input type="file" accept=".pdf" onChange={handleFileChange} className="hidden" id="mou-upload" />
                    <Label htmlFor="mou-upload" className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium border bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                      Choose File
                    </Label>
                  </div>
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <p className="text-sm font-medium text-foreground">Selected: {selectedFile.name}</p>
                      <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => {
                  form.reset();
                  setSelectedFile(null);
                }}>
                  Reset Form
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding Institution..." : "Add Institution"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
