import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Target,
  Heart,
  Award,
  Truck,
  Leaf,
  Globe,
  ArrowRight,
  Quote,
} from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Responsive Hero Section */}
      <section className="relative bg-gradient-to-br from-main-light via-main-light to-main-light py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <Badge className="bg-main text-main-light text-sm">
                  Our Story
                </Badge>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                  Farm to Table
                  <span className="text-main block">Since 2015</span>
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  We started with a simple mission: to bring the freshest,
                  highest-quality organic produce directly from local farms to
                  your family is table, supporting sustainable agriculture and
                  healthy living.
                </p>
              </div>

              {/* Responsive Stats Grid */}
              <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-4">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-main">
                    500+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Partner Farms
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-main">
                    50K+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Happy Customers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-main">
                    1M+
                  </div>
                  <div className="text-xs sm:text-sm text-gray-600">
                    Orders Delivered
                  </div>
                </div>
              </div>
            </div>

            {/* Responsive Hero Image */}
            <div className="relative mt-8 lg:mt-0">
              <div className="relative z-10">
                <Image
                  src="/about.webp?height=600&width=600"
                  alt="Farmers working in organic fields"
                  width={600}
                  height={600}
                  className="rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto"
                />
              </div>
              <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-emerald-200 rounded-full opacity-60"></div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 w-20 h-20 sm:w-32 sm:h-32 bg-green-200 rounded-full opacity-40"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Mission, Vision, Values */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Foundation
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-main-light rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8 text-main" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  To revolutionize how families access fresh, organic produce by
                  creating a sustainable bridge between local farmers and
                  conscious consumers, promoting health and environmental
                  responsibility.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  To become the leading platform for sustainable food
                  distribution, where every meal contributes to a healthier
                  planet and stronger farming communities across the nation.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 sm:col-span-2 lg:col-span-1">
              <CardContent className="p-6 sm:p-8 text-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Our Values
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  Sustainability, transparency, quality, and community are at
                  the heart of everything we do. We believe in fair trade,
                  environmental stewardship, and nourishing relationships.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Responsive Company Timeline */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              Milestones that shaped our story
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Mobile Timeline */}
            <div className="block lg:hidden space-y-8">
              {[
                {
                  year: "2015",
                  title: "The Beginning",
                  description:
                    "Started with 5 local farms and a vision for fresh, organic delivery",
                },
                {
                  year: "2017",
                  title: "Rapid Growth",
                  description:
                    "Expanded to 50+ partner farms and launched our mobile app",
                },
                {
                  year: "2019",
                  title: "Going Organic",
                  description:
                    "Achieved 100% organic certification for all our produce",
                },
                {
                  year: "2021",
                  title: "National Expansion",
                  description:
                    "Reached 25 cities with same-day delivery service",
                },
                {
                  year: "2024",
                  title: "Sustainability Leader",
                  description:
                    "Carbon-neutral delivery and 500+ partner farms nationwide",
                },
              ].map((milestone, index) => (
                <Card key={index} className="bg-white shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-main rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-sm">
                          {milestone.year.slice(-2)}
                        </span>
                      </div>
                      <div>
                        <div className="text-main font-bold text-lg mb-1">
                          {milestone.year}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Desktop Timeline */}
            <div className="hidden lg:block relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-main-light"></div>

              {[
                {
                  year: "2015",
                  title: "The Beginning",
                  description:
                    "Started with 5 local farms and a vision for fresh, organic delivery",
                  side: "left",
                },
                {
                  year: "2017",
                  title: "Rapid Growth",
                  description:
                    "Expanded to 50+ partner farms and launched our mobile app",
                  side: "right",
                },
                {
                  year: "2019",
                  title: "Going Organic",
                  description:
                    "Achieved 100% organic certification for all our produce",
                  side: "left",
                },
                {
                  year: "2021",
                  title: "National Expansion",
                  description:
                    "Reached 25 cities with same-day delivery service",
                  side: "right",
                },
                {
                  year: "2024",
                  title: "Sustainability Leader",
                  description:
                    "Carbon-neutral delivery and 500+ partner farms nationwide",
                  side: "left",
                },
              ].map((milestone, index) => (
                <div
                  key={index}
                  className={`flex items-center mb-12 ${
                    milestone.side === "right" ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-1/2 ${
                      milestone.side === "right" ? "pl-8" : "pr-8"
                    }`}
                  >
                    <Card className="bg-white shadow-lg">
                      <CardContent className="p-6">
                        <div className="text-main font-bold text-lg mb-2">
                          {milestone.year}
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-600">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-main rounded-full border-4 border-white shadow-lg z-10"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Team Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg sm:text-xl text-gray-600">
              The passionate people behind FreshMart
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                name: "Sarah Mitchell",
                role: "Founder & CEO",
                bio: "Former agricultural engineer with 15+ years in sustainable farming",
                image: "professional woman ceo smiling",
              },
              {
                name: "David Chen",
                role: "Head of Operations",
                bio: "Supply chain expert ensuring fresh delivery nationwide",
                image: "professional asian man operations manager",
              },
              {
                name: "Maria Rodriguez",
                role: "Sustainability Director",
                bio: "Environmental scientist leading our green initiatives",
                image: "professional latina woman sustainability expert",
              },
              {
                name: "James Wilson",
                role: "Technology Lead",
                bio: "Full-stack developer creating seamless user experiences",
                image: "professional man software developer",
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <CardContent className="p-4 sm:p-6 text-center">
                  <div className="relative mb-4 sm:mb-6">
                    <Image
                      src={`/default.png?height=200&width=200&query=${member.image}`}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="rounded-full mx-auto group-hover:scale-105 transition-transform duration-300 w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40"
                    />
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-main font-medium mb-2 sm:mb-3 text-sm sm:text-base">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Responsive Achievements */}
      <section className="py-12 sm:py-16 lg:py-20 bg-main">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white mb-12 lg:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-lg sm:text-xl opacity-90">
              Making a difference in communities and environment
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="text-center text-white">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Leaf className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                100%
              </div>
              <div className="opacity-90 text-sm sm:text-base">
                Organic Certified
              </div>
            </div>

            <div className="text-center text-white">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Truck className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                Carbon
              </div>
              <div className="opacity-90 text-sm sm:text-base">
                Neutral Delivery
              </div>
            </div>

            <div className="text-center text-white">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Users className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                500+
              </div>
              <div className="opacity-90 text-sm sm:text-base">
                Partner Farms
              </div>
            </div>

            <div className="text-center text-white">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <Award className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">
                15+
              </div>
              <div className="opacity-90 text-sm sm:text-base">
                Industry Awards
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Customer Testimonial */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Quote className="w-12 h-12 sm:w-16 sm:h-16 text-main mx-auto mb-6 sm:mb-8" />
            <blockquote className="text-xl sm:text-2xl lg:text-3xl font-light text-gray-900 leading-relaxed mb-6 sm:mb-8">
              FreshMart has completely transformed how our family eats. The
              quality is exceptional, the farmers are fairly compensated, and we
              are supporting sustainable agriculture. It is a win-win for
              everyone
            </blockquote>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Image
                src="/default.png?height=60&width=60"
                alt="Customer testimonial"
                width={60}
                height={60}
                className="rounded-full w-12 h-12 sm:w-15 sm:h-15"
              />
              <div className="text-center sm:text-left">
                <div className="font-semibold text-gray-900 text-lg">
                  Jennifer Adams
                </div>
                <div className="text-gray-600">Customer since 2018</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsive Call to Action */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Join Our Mission
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed">
              Be part of the sustainable food revolution. Start your journey to
              healthier eating and environmental responsibility today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-main hover:bg-main text-white px-6 sm:px-8 py-3 rounded-full"
              >
                Start Shopping
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="px-6 sm:px-8 py-3 rounded-full bg-transparent border-main text-main hover:bg-transparent hover:text-main"
              >
                Partner with Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
