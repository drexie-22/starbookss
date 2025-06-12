import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Bell, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Users,
  Mail
} from "lucide-react";

export default function Notifications() {
  const [selectedType, setSelectedType] = useState("");
  const [selectedRecipients, setSelectedRecipients] = useState("");
  const [notificationSubject, setNotificationSubject] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");

  // Sample notification history - will be replaced with real data
  const notificationHistory = [
    {
      id: 1,
      type: "Follow-up",
      subject: "STARTBOOKS Deployment Follow-up",
      message: "Please confirm the status of your recent STARTBOOKS deployment...",
      recipients: "ALL schools in La Union",
      sentDate: "2024-05-15",
      status: "Sent",
      responses: 18
    },
    {
      id: 2,
      type: "Announcement",
      subject: "New Training Schedule Available",
      message: "We are pleased to announce new training sessions for STARTBOOKS...",
      recipients: "All school principals",
      sentDate: "2024-05-10",
      status: "Sent",
      responses: 42
    },
    {
      id: 3,
      type: "Reminder",
      subject: "MOU Document Submission Reminder",
      message: "This is a friendly reminder to submit your signed MOU documents...",
      recipients: "15 schools with pending MOUs",
      sentDate: "2024-05-08",
      status: "Sent",
      responses: 12
    }
  ];

  const sendNotification = () => {
    if (!selectedType || !selectedRecipients || !notificationSubject || !notificationMessage) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Sending notification:", {
      type: selectedType,
      recipients: selectedRecipients,
      subject: notificationSubject,
      message: notificationMessage
    });

    alert("Notification functionality will be implemented with backend integration");
    
    // Reset form
    setSelectedType("");
    setSelectedRecipients("");
    setNotificationSubject("");
    setNotificationMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
        <p className="text-muted-foreground">
          Send notifications to school contacts for follow-ups, announcements, and reminders
        </p>
      </div>

      <Tabs defaultValue="send" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="send">Send Notification</TabsTrigger>
          <TabsTrigger value="history">Notification History</TabsTrigger>
        </TabsList>

        <TabsContent value="send" className="space-y-4">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Send className="h-5 w-5" />
                <span>Compose Notification</span>
              </CardTitle>
              <CardDescription>
                Create and send notifications to school contacts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Notification Type and Recipients */}
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Notification Type
                  </label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select notification type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="follow-up">Follow-up</SelectItem>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Recipients
                  </label>
                  <Select value={selectedRecipients} onValueChange={setSelectedRecipients}>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Schools</SelectItem>
                      <SelectItem value="La Union">La Union Schools</SelectItem>
                      <SelectItem value="Pangasinan">Pangasinan Schools</SelectItem>
                      <SelectItem value="Ilocos Sur">Ilocos Sur Schools</SelectItem>
                      <SelectItem value="Ilocos Norte">Ilocos Norte Schools</SelectItem>
                      <SelectItem value="elementary">Elementary Schools Only</SelectItem>
                      <SelectItem value="secondary">Secondary Schools Only</SelectItem>
                      <SelectItem value="pending-mou">Schools with Pending MOUs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Subject Line */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Subject Line
                </label>
                <Input
                  placeholder="Enter notification subject"
                  value={notificationSubject}
                  onChange={(e) => setNotificationSubject(e.target.value)}
                  className="bg-background"
                />
              </div>

              {/* Message Content */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Message Content
                </label>
                <Textarea
                  placeholder="Enter your notification message here..."
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  className="bg-background"
                  rows={6}
                />
              </div>

              {/* Preview and Send */}
              <div className="flex justify-between items-center pt-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  {selectedRecipients && (
                    <span>Sending to: {selectedRecipients.replace('-', ' ')}</span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    Preview
                  </Button>
                  <Button onClick={sendNotification}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Notification
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Templates */}
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Quick Templates</CardTitle>
              <CardDescription>
                Use pre-made templates for common notifications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start"
                  onClick={() => {
                    setSelectedType("follow-up");
                    setNotificationSubject("STARTBOOKS Deployment Follow-up");
                    setNotificationMessage("We hope your STARTBOOKS deployment is going well. Please let us know if you need any assistance or have questions about the program.");
                  }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-4 w-4" />
                    <span className="font-medium">Follow-up Template</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    Standard follow-up message for recent deployments
                  </p>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start"
                  onClick={() => {
                    setSelectedType("reminder");
                    setNotificationSubject("MOU Document Submission Reminder");
                    setNotificationMessage("This is a friendly reminder to submit your signed MOU documents for the STARTBOOKS program. Please upload them through the monitoring system.");
                  }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="h-4 w-4" />
                    <span className="font-medium">MOU Reminder</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    Reminder for pending MOU submissions
                  </p>
                </Button>

                <Button
                  variant="outline"
                  className="h-auto p-4 flex flex-col items-start"
                  onClick={() => {
                    setSelectedType("announcement");
                    setNotificationSubject("Important STARTBOOKS Update");
                    setNotificationMessage("We have important updates regarding the STARTBOOKS program. Please check the monitoring system for the latest information.");
                  }}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    <Bell className="h-4 w-4" />
                    <span className="font-medium">Announcement</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-left">
                    General announcement template
                  </p>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card className="bg-white dark:bg-gray-900">
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>
                View all previously sent notifications and their response rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Subject</TableHead>
                      <TableHead>Recipients</TableHead>
                      <TableHead>Sent Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Responses</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {notificationHistory.map((notification) => (
                      <TableRow key={notification.id} className="hover:bg-muted/50">
                        <TableCell>
                          <Badge variant="outline">
                            {notification.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium text-foreground">{notification.subject}</p>
                            <p className="text-xs text-muted-foreground truncate max-w-xs">
                              {notification.message}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">{notification.recipients}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <span className="text-sm">
                              {new Date(notification.sentDate).toLocaleDateString()}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            {notification.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm font-medium">{notification.responses}</span>
                          <span className="text-xs text-muted-foreground ml-1">responses</span>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}