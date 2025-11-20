"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  ShoppingBag,
  Star,
} from "lucide-react";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Header Section */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              <MessageSquare className="w-4 h-4 mr-2" />
              Get In Touch
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are here to help you with any questions about our products,
              orders, or services. Reach out to our friendly customer support
              team.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className=" border-0">
              <CardHeader className="pb-8">
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Send className="w-6 h-6 mr-3 text-main" />
                  Send us a Message
                </CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and we will get back to you within 24
                  hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter your full name"
                        className="h-12 focus-visible:outline-main focus-visible:outline-offset-0 focus-visible:ring-0"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className="h-12 focus-visible:outline-main focus-visible:outline-offset-0 focus-visible:ring-0"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter your phone number"
                        className="h-12 focus-visible:outline-main focus-visible:outline-offset-0 focus-visible:ring-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-sm font-medium">
                        Subject *
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What's this about?"
                        className="h-12 focus-visible:outline-main focus-visible:outline-offset-0 focus-visible:ring-0"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us more about your inquiry..."
                      className="min-h-[120px] resize-none focus-visible:outline-main focus-visible:outline-offset-0 focus-visible:ring-0"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 text-base font-medium bg-main hover:bg-main"
                  >
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Map Section */}
            <div className="mt-8">
              <Card className=" border-0 overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold flex items-center">
                    <MapPin className="w-6 h-6 mr-3 text-main" />
                    Find Us Here
                  </CardTitle>
                  <CardDescription>
                    Visit our physical store or use this map to locate us
                    easily.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="relative w-full h-0 pb-[56.25%] overflow-hidden rounded-lg">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.0313519190664!2d90.395899642498!3d23.871824562097153!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5ebd8f40f47%3A0xbd507ac3b365456d!2ssihab%20sir%20(ICT%20Coaching)!5e0!3m2!1sen!2sbd!4v1750512111807!5m2!1sen!2sbd"
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Location Map"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Details */}
            <Card className=" border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Headphones className="w-5 h-5 mr-3 text-main" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-main-light p-3 rounded-lg">
                    <MapPin className="w-5 h-5 text-main" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Address</h4>
                    <p className="text-gray-600 mt-1">
                      123 Business Street
                      <br />
                      Dhaka 1000, Bangladesh
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-4">
                  <div className="bg-main-light p-3 rounded-lg">
                    <Phone className="w-5 h-5 text-main" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <p className="text-gray-600 mt-1">
                      +880 1234-567890
                      <br />
                      +880 9876-543210
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-4">
                  <div className="bg-main-light p-3 rounded-lg">
                    <Mail className="w-5 h-5 text-main" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600 mt-1">
                      support@yourstore.com
                      <br />
                      info@yourstore.com
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-start space-x-4">
                  <div className="bg-main-light p-3 rounded-lg">
                    <Clock className="w-5 h-5 text-main" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Business Hours
                    </h4>
                    <p className="text-gray-600 mt-1">
                      Mon - Fri: 9:00 AM - 8:00 PM
                      <br />
                      Sat - Sun: 10:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Support */}
            <Card className=" border-0 ">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-3 text-main" />
                  Quick Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 bg-white hover:bg-main-light"
                  >
                    <MessageSquare className="w-4 h-4 mr-3" />
                    Live Chat Support
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 bg-white hover:bg-main-light"
                  >
                    <Phone className="w-4 h-4 mr-3" />
                    Call Us Now
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 bg-white hover:bg-main-light"
                  >
                    <Mail className="w-4 h-4 mr-3" />
                    Email Support
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Customer Reviews */}
            <Card className=" border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Star className="w-5 h-5 mr-3 text-yellow-500" />
                  What Our Customers Say
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 italic">
                      Excellent customer service! They responded to my query
                      within hours and resolved my issue quickly.
                    </p>
                    <p className="text-xs text-gray-500 mt-2 font-medium">
                      - Sarah Ahmed
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
