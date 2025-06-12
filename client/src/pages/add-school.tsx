import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Upload, School, MapPin } from "lucide-react";

const schoolFormSchema = z.object({
  schoolName: z.string().min(1, "School name is required"),
  dateOfDeployment: z.string().min(1, "Date of deployment is required"),
  completeAddress: z.string().min(1, "Complete address is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  recipientName: z.string().min(1, "Recipient name is required"),
  schoolType: z.enum(["Elementary", "Secondary"], {
    required_error: "Please select a school type",
  }),
   region: z.enum(["region1", "region2", "region3"], {
    required_error: "Region is required",
  }),
  province: z.string().min(1, "Province is required"),
  yearDistributed: z.number().min(1900).max(new Date().getFullYear()),
});

type SchoolFormData = z.infer<typeof schoolFormSchema>;

const regionDropdown = [
  { label: "Region I - Ilocos Region", value: "region1" },
  { label: "Region II - Cagayan Valley", value: "region2" },
  { label: "Region III - Central Luzon", value: "region3" }
];

const philippineProvinces = [
  // Region I - Ilocos Region
  "Ilocos Norte",
  "Ilocos Sur",
  "La Union",
  "Pangasinan",

  // Region II - Cagayan Valley
  "Batanes",
  "Cagayan",
  "Isabela",
  "Nueva Vizcaya",
  "Quirino",

  // Region III - Central Luzon
  "Aurora",
  "Bataan",
  "Bulacan",
  "Nueva Ecija",
  "Pampanga",
  "Tarlac",
  "Zambales"
];



export default function AddSchool() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<SchoolFormData>({
    resolver: zodResolver(schoolFormSchema),
    defaultValues: {
      schoolName: "",
      dateOfDeployment: "",
      completeAddress: "",
      email: "",
      phone: "",
      recipientName: "",
      province: "",
      yearDistributed: new Date().getFullYear(),
    },
  });

  const onSubmit = async (data: SchoolFormData) => {
    setIsSubmitting(true);
    
    // This will be connected to the backend API later
    console.log("Form data:", data);
    console.log("MOU file:", selectedFile);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    // Reset form after successful submission
    form.reset();
    setSelectedFile(null);
    
    // Show success message (will implement toast later)
    alert("School added successfully!");
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Add New School</h1>
        <p className="text-muted-foreground">
          Register a new school deployment in the STARTBOOKS monitoring system
        </p>
      </div>

      <Card className="bg-white dark:bg-gray-900 max-w-4xl">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <School className="h-5 w-5" />
            <span>School Information</span>
          </CardTitle>
          <CardDescription>
            Enter all required information for the school deployment
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* School Basic Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="schoolName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter school name" 
                          {...field} 
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter recipient name" 
                          {...field} 
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Address and Location */}
              <FormField
                control={form.control}
                name="completeAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Complete Address</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Enter complete address including barangay, municipality/city"
                        {...field} 
                        className="bg-background"
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-3">
                <FormField
    control={form.control}
    name="region"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Region</FormLabel>
        <Select onValueChange={field.onChange} defaultValue={field.value}>
          <FormControl>
            <SelectTrigger className="bg-background">
              <SelectValue placeholder="Select Region" />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {regionDropdown.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FormMessage />
      </FormItem>
    )}
  />
                
                <FormField
                  control={form.control}
                  name="province"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Province</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select province" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {philippineProvinces.map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schoolType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>School Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-background">
                            <SelectValue placeholder="Select school type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Elementary">Elementary</SelectItem>
                          <SelectItem value="Secondary">Secondary</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Contact Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input 
                          type="email"
                          placeholder="Enter email address" 
                          {...field} 
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="Enter phone number" 
                          {...field} 
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Deployment Information */}
              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="dateOfDeployment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of Deployment</FormLabel>
                      <FormControl>
                        <Input 
                          type="date"
                          {...field} 
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="yearDistributed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year Distributed</FormLabel>
                      <FormControl>
                        <Input 
                          type="number"
                          min="1900"
                          max={new Date().getFullYear()}
                          {...field} 
                          onChange={(e) => field.onChange(parseInt(e.target.value))}
                          className="bg-background"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* MOU Document Upload */}
              <div className="space-y-4">
                <Label>MOU Documentation (Optional)</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 bg-background">
                  <div className="flex flex-col items-center space-y-2">
                    <Upload className="h-8 w-8 text-muted-foreground" />
                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF files up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="hidden"
                      id="mou-upload"
                    />
                    <Label
                      htmlFor="mou-upload"
                      className="cursor-pointer inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                      Choose File
                    </Label>
                  </div>
                  {selectedFile && (
                    <div className="mt-4 p-3 bg-muted rounded-md">
                      <p className="text-sm font-medium text-foreground">
                        Selected: {selectedFile.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    form.reset();
                    setSelectedFile(null);
                  }}
                >
                  Reset Form
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding School..." : "Add School"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}