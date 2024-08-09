"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

const PersonalDetails = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    dateHired: null,
    designation: "",
    office: "",
    region: "",
    province: "",
    city: "",
    zipCode: "",
    about: "",
  });

  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    // Fetch data from the database here and update formData
    async function fetchData() {
      try {
        const response = await fetch("/api/personal-details"); // Replace with your API endpoint
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    }
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleDateChange = (selectedDate) => {
    setFormData({ ...formData, dateHired: selectedDate });
  };

  const handleOfficeChange = (office) => {
    setFormData({ ...formData, office });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here, such as API calls
    console.log("Form submitted:", formData);
    // You might also want to disable edit mode after saving
    setIsEditMode(false);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    // Optionally, refetch the data to reset the form
  };

  const handleEdit = () => {
    setIsEditMode(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="rounded-t-none pt-6">
        <CardContent>
          <div className="grid grid-cols-12 md:gap-x-12 gap-y-5">
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="firstName" className="mb-2">
                First Name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="middleName" className="mb-2">
                Middle Name
              </Label>
              <Input
                id="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="lastName" className="mb-2">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="phoneNumber" className="mb-2">
                Phone Number
              </Label>
              <Input
                id="phoneNumber"
                type="number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="email" className="mb-2">
                Email Address
              </Label>
              <Input
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="dateHired" className="mb-2">
                Date Hired
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full text-left font-normal border border-default-200 flex justify-between text-default-600 bg-background"
                    )}
                    disabled={!isEditMode}>
                    {formData.dateHired ? (
                      format(formData.dateHired, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarDays className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.dateHired}
                    onSelect={handleDateChange}
                    initialFocus
                    disabled={!isEditMode}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="designation" className="mb-2">
                Designation
              </Label>
              <Input
                id="designation"
                value={formData.designation}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-span-12 md:col-span-6">
              <Label htmlFor="office" className="mb-2">
                Office
              </Label>
              <Select
                value={formData.office}
                onValueChange={handleOfficeChange}
                disabled={!isEditMode}>
                <SelectTrigger>
                  <SelectValue placeholder="Select an Office" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MIS">MIS</SelectItem>
                  <SelectItem value="PHRMO">PHRMO</SelectItem>
                  <SelectItem value="PGO">PGO</SelectItem>
                  <SelectItem value="PSWD">PSWD</SelectItem>
                  <SelectItem value="PTO">PTO</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Label htmlFor="region" className="mb-2">
                Region
              </Label>
              <Input
                id="region"
                value={formData.region}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Label htmlFor="province" className="mb-2">
                Province
              </Label>
              <Input
                id="province"
                value={formData.province}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Label htmlFor="city" className="mb-2">
                City / Municipality
              </Label>
              <Input
                id="city"
                value={formData.city}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <Label htmlFor="zipCode" className="mb-2">
                Zip Code
              </Label>
              <Input
                id="zipCode"
                type="number"
                value={formData.zipCode}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
            <div className="col-span-12">
              <Label htmlFor="about" className="mb-2">
                About
              </Label>
              <Textarea
                id="about"
                value={formData.about}
                onChange={handleInputChange}
                disabled={!isEditMode}
              />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            {isEditMode ? (
              <>
                <Button color="secondary" type="button" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </>
            ) : (
              <Button color="primary" type="button" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  );
};

export default PersonalDetails;
