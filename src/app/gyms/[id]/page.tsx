"use client"

import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Star, Phone, Mail, Users, Award, Dumbbell } from "lucide-react"
import Image from "next/image"
import one from "@/assets/one.webp"
import two from "@/assets/two.webp"
import three from "@/assets/three.webp"
import four from "@/assets/four.webp"
import five from "@/assets/five.webp"
import six from "@/assets/six.webp"
import Logo from "@/assets/logo.jpg"    
import GalleryPage from "@/components/Gallery"
// Mock data - in a real app, this would come from your database
const mockGym = {
  id: 1,
  name: "FitZone Premium",
  location: "Downtown",
  address: "123 Main St, City Center",
  email: "info@fitzonepremium.com",
  phone: "+1 (555) 123-4567",
  description:
    "FitZone Premium is a state-of-the-art fitness facility offering comprehensive wellness solutions. Our modern equipment, expert trainers, and diverse programs cater to all fitness levels and goals.",
  logoUrl: "/placeholder.svg?height=100&width=100",
  rating: 4.8,
  reviewCount: 124,
  images: [
    one,
    two,
    three,
    four,
    five,
    six,
  ],
  facilities: [
    { name: "Cardio Equipment", description: "Latest treadmills, ellipticals, and bikes" },
    { name: "Weight Training", description: "Free weights and resistance machines" },
    { name: "Group Classes", description: "Yoga, Pilates, Zumba, and more" },
    { name: "Swimming Pool", description: "Olympic-size pool for swimming and aqua fitness" },
    { name: "Sauna & Steam", description: "Relaxation and recovery facilities" },
    { name: "Personal Training", description: "One-on-one sessions with certified trainers" },
  ],
  plans: [
    {
      id: 1,
      name: "Trial Pass",
      price: 19.99,
      type: "TRIAL",
      duration: 1,
      description: "7-day trial access to all facilities",
    },
    {
      id: 2,
      name: "Monthly",
      price: 49.99,
      type: "MONTHLY",
      duration: 1,
      description: "Full access with no commitment",
    },
    {
      id: 3,
      name: "Quarterly",
      price: 129.99,
      type: "QUARTERLY",
      duration: 3,
      description: "3-month plan with 15% savings",
    },
    { id: 4, name: "Annual", price: 399.99, type: "YEARLY", duration: 12, description: "Best value with 33% savings" },
  ],
  trainers: [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah@fitzonepremium.com",
      bio: "Certified personal trainer with 8+ years of experience in strength training and nutrition.",
      specialties: ["Strength Training", "Weight Loss", "Nutrition"],
      certifications: ["NASM-CPT", "Precision Nutrition"],
      experience: 8,
      trained: 150,
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike@fitzonepremium.com",
      bio: "Former athlete specializing in functional fitness and sports performance.",
      specialties: ["Functional Training", "Sports Performance", "Injury Prevention"],
      certifications: ["CSCS", "FMS"],
      experience: 6,
      trained: 120,
    },
  ],
  operatingHours: [
    { day: "Monday", openAt: "06:00", closeAt: "22:00" },
    { day: "Tuesday", openAt: "06:00", closeAt: "22:00" },
    { day: "Wednesday", openAt: "06:00", closeAt: "22:00" },
    { day: "Thursday", openAt: "06:00", closeAt: "22:00" },
    { day: "Friday", openAt: "06:00", closeAt: "22:00" },
    { day: "Saturday", openAt: "07:00", closeAt: "20:00" },
    { day: "Sunday", openAt: "08:00", closeAt: "18:00" },
  ],
  reviews: [
    {
      id: 1,
      user: { name: "John Doe" },
      rating: 5,
      comment: "Excellent facilities and friendly staff. The equipment is always clean and well-maintained.",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      user: { name: "Jane Smith" },
      rating: 4,
      comment: "Great gym with good variety of classes. The trainers are knowledgeable and helpful.",
      createdAt: "2024-01-10",
    },
  ],
}

export default function GymDetailPage({ params }: { params: { id: string } }) {
  const [selectedPlan, setSelectedPlan] = useState<string>("")
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const dialogRef = useRef<HTMLDialogElement>(null)
  const toggleDialog = () => {    
    if (dialogRef.current) {
      if (dialogRef.current.open) {
        dialogRef.current.close()
      } else {
        dialogRef.current.showModal()
      }
    }
  }

  const handleBooking = () => {
    // In a real app, this would handle the booking process
    console.log("Booking gym with plan:", selectedPlan)
    setIsBookingOpen(false)
    // Show success message or redirect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-4">
            {/* Logo */}
              <Image
                src={Logo}
                alt={`${mockGym.name} logo`}
                width={90}
                height={90}
                className="rounded-lg"
              />
              <div>
                {/* Gym Address and name*/}
                <h1 className="text-3xl font-bold text-gray-900">{mockGym.name}</h1>
                <div className="flex items-center text-gray-600 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  {mockGym.address}
                </div>
                <div className="flex items-center mt-2">
                  <div className="flex items-center">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 font-semibold">{mockGym.rating}</span>
                    <span className="ml-1 text-gray-600">({mockGym.reviewCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Book Now */}
            <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                  Book Now
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Book Your Membership</DialogTitle>
                  <DialogDescription>Choose a membership plan to get started at {mockGym.name}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a membership plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockGym.plans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id.toString()}>
                          {plan.name} - ${plan.price} ({plan.duration} month{plan.duration > 1 ? "s" : ""})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleBooking} disabled={!selectedPlan} className="w-full">
                    Confirm Booking
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8 relative">
            <div className="grid grid-cols-4 gap-4">
            {/* Large Main Image */}
                {mockGym.images[0] && (
                <div className="col-span-2 row-span-2 relative">
                    <Image
                        src={mockGym.images[0]}
                        alt="Main gym image"
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}

            {/* Top Right Images */}
            {mockGym.images[1] && (
                <div className="col-span-1 relative aspect-square">
                    <Image
                        src={mockGym.images[1]}
                        alt="Gym image 2"
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}
            {mockGym.images[2] && (
                <div className="col-span-1 relative aspect-square">
                    <Image
                        src={mockGym.images[2]}
                        alt="Gym image 3"
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}

            {/* Bottom Right Images */}
            {mockGym.images[3] && (
                <div className="col-span-1 relative aspect-square">
                    <Image
                        src={mockGym.images[3]}
                        alt="Gym image 4"
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}
            {mockGym.images[4] && (
                <div className="col-span-1 relative aspect-square">
                    <Image
                        src={mockGym.images[4]}
                        alt="Gym image 5"
                        fill
                        className="object-cover rounded-lg"
                    />
                    {mockGym.images.length > 5 && (
                        <div className="absolute right-2 bottom-2 bg-black/60 rounded-lg flex items-center justify-center">
                            <button className="text-white font-semibold px-4 py-2 bg-black/70 rounded-lg" onClick={toggleDialog}>
                                +{mockGym.images.length - 5} more
                            </button>                   
                        </div>                        
                    )}
                </div>
            )}
            </div>
                <dialog 
                className="my-auto w-2/3 justify-center fixed mx-auto" 
                ref={dialogRef}
                >
                    <GalleryPage />
                </dialog>  
            
            
        </div>

            
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="facilities">Facilities</TabsTrigger>
                <TabsTrigger value="trainers">Trainers</TabsTrigger>
                <TabsTrigger value="plans">Plans</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {mockGym.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 leading-relaxed">{mockGym.description}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Operating Hours</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {mockGym.operatingHours.map((hours) => (
                        <div key={hours.day} className="flex justify-between">
                          <span className="font-medium">{hours.day}</span>
                          <span className="text-gray-600">
                            {hours.openAt} - {hours.closeAt}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="facilities" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockGym.facilities.map((facility, index) => (
                    <Card key={index}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg flex items-center">
                          <Dumbbell className="h-5 w-5 mr-2 text-blue-600" />
                          {facility.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{facility.description}</CardDescription>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="trainers" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockGym.trainers.map((trainer) => (
                    <Card key={trainer.id}>
                      <CardHeader>
                        <div className="flex items-center space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src="/placeholder.svg?height=64&width=64" />
                            <AvatarFallback>
                              {trainer.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle>{trainer.name}</CardTitle>
                            <div className="flex items-center text-sm text-gray-600 mt-1">
                              <Users className="h-4 w-4 mr-1" />
                              {trainer.trained} clients trained
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <Award className="h-4 w-4 mr-1" />
                              {trainer.experience} years experience
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-gray-600 text-sm">{trainer.bio}</p>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Specialties</h4>
                          <div className="flex flex-wrap gap-1">
                            {trainer.specialties.map((specialty, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-2">Certifications</h4>
                          <div className="flex flex-wrap gap-1">
                            {trainer.certifications.map((cert, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="plans" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockGym.plans.map((plan) => (
                    <Card key={plan.id} className="relative">
                      {plan.type === "YEARLY" && (
                        <Badge className="absolute -top-2 left-4 bg-green-600">Best Value</Badge>
                      )}
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {plan.name}
                          <span className="text-2xl font-bold">${plan.price}</span>
                        </CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div>
                            Duration: {plan.duration} month{plan.duration > 1 ? "s" : ""}
                          </div>
                          <div>Type: {plan.type}</div>
                          {plan.type === "YEARLY" && (
                            <div className="text-green-600 font-semibold">Save 33% compared to monthly</div>
                          )}
                        </div>
                        <Button
                          className="w-full mt-4"
                          onClick={() => {
                            setSelectedPlan(plan.id.toString())
                            setIsBookingOpen(true)
                          }}
                        >
                          Choose Plan
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="space-y-6">
                  {mockGym.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarFallback>
                                {review.user.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-semibold">{review.user.name}</div>
                              <div className="text-sm text-gray-600">{review.createdAt}</div>
                            </div>
                          </div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{review.comment}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-gray-600" />
                  <span>{mockGym.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-gray-600" />
                  <span>{mockGym.email}</span>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-4 w-4 mr-3 text-gray-600 mt-1" />
                  <span>{mockGym.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                    <span className="font-semibold">{mockGym.rating}</span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Reviews</span>
                  <span className="font-semibold">{mockGym.reviewCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Facilities</span>
                  <span className="font-semibold">{mockGym.facilities.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Trainers</span>
                  <span className="font-semibold">{mockGym.trainers.length}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
