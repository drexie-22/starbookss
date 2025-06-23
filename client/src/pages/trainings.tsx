import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectItem, SelectContent } from "@/components/ui/select";

export default function TrainingForm() {
  const [participants, setParticipants] = useState({
    male: 0,
    female: 0,
    others: 0,
  });

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const computedTotal =
      Number(participants.male) +
      Number(participants.female) +
      Number(participants.others);
    setTotal(computedTotal);
  }, [participants]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParticipants((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>STARBOOKS Training Form</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label>Institution Name</Label>
            <Input placeholder="e.g. Naguilian NHS" />
          </div>
          <div>
            <Label>Training Date</Label>
            <Input type="date" />
          </div>
          <div>
            <Label>Province</Label>
            <Input placeholder="e.g. La Union" />
          </div>
          <div>
            <Label>Municipality</Label>
            <Input placeholder="e.g. Naguilian" />
          </div>
          <div>
            <Label>Trainer(s)</Label>
            <Input placeholder="e.g. DOST-STII Team" />
          </div>
          <div>
            <Label>Training Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="orientation">Orientation</SelectItem>
                <SelectItem value="refresher">Refresher</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Training Mode</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="on-site">On-site</SelectItem>
                <SelectItem value="virtual">Virtual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <Label>Male Participants</Label>
            <Input type="number" name="male" value={participants.male} onChange={handleChange} />
          </div>
          <div>
            <Label>Female Participants</Label>
            <Input type="number" name="female" value={participants.female} onChange={handleChange} />
          </div>
          <div>
            <Label>Others / Prefer not to say</Label>
            <Input type="number" name="others" value={participants.others} onChange={handleChange} />
          </div>
        </div>

        <div>
          <Label>Total Participants</Label>
          <Input value={total} disabled />
        </div>

        <div>
          <Label>GAD Notes / Remarks</Label>
          <Textarea placeholder="Enter any gender-related observations or remarks..." />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Save Training</Button>
        </div>
      </CardContent>
    </Card>
  );
}
