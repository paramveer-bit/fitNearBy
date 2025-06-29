"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import {
  Video,
  Calendar,
  Users,
  Star,
  Play,
  Search,
  Zap,
  Heart,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// Static live sessions data
const staticLiveSessions = [
  {
    id: "1",
    title: "Morning HIIT Blast",
    instructor: "Sarah Johnson",
    instructorImage: "/placeholder.svg?height=60&width=60",
    date: "Today",
    time: "7:00 AM - 8:00 AM",
    duration: "60 min",
    type: "HIIT",
    level: "Intermediate",
    maxParticipants: 25,
    currentParticipants: 18,
    description:
      "High-intensity interval training to kickstart your day with energy and burn calories effectively.",
    isLive: false,
    status: "upcoming",
    imageUrl: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    price: "Free with membership",
  },
  {
    id: "2",
    title: "Yoga Flow & Mindfulness",
    instructor: "Emily Chen",
    instructorImage: "/placeholder.svg?height=60&width=60",
    date: "Today",
    time: "12:00 PM - 1:00 PM",
    duration: "60 min",
    type: "Yoga",
    level: "All Levels",
    maxParticipants: 30,
    currentParticipants: 22,
    description:
      "Gentle yoga flow combined with mindfulness practices for stress relief and flexibility.",
    isLive: true,
    status: "live",
    imageUrl: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    price: "Free with membership",
  },
  {
    id: "3",
    title: "Strength & Conditioning",
    instructor: "Mike Rodriguez",
    instructorImage: "/placeholder.svg?height=60&width=60",
    date: "Today",
    time: "6:00 PM - 7:00 PM",
    duration: "60 min",
    type: "Strength",
    level: "Advanced",
    maxParticipants: 20,
    currentParticipants: 15,
    description:
      "Build muscle and improve overall strength with compound movements and functional exercises.",
    isLive: false,
    status: "upcoming",
    imageUrl: "/placeholder.svg?height=200&width=300",
    rating: 4.7,
    price: "Free with membership",
  },
  {
    id: "4",
    title: "Cardio Dance Party",
    instructor: "Jessica Martinez",
    instructorImage: "/placeholder.svg?height=60&width=60",
    date: "Tomorrow",
    time: "10:00 AM - 11:00 AM",
    duration: "60 min",
    type: "Dance",
    level: "Beginner",
    maxParticipants: 35,
    currentParticipants: 28,
    description:
      "Fun, high-energy dance workout that combines cardio with popular music and dance moves.",
    isLive: false,
    status: "upcoming",
    imageUrl: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    price: "Free with membership",
  },
];

// Static on-demand sessions
const staticOnDemandSessions = [
  {
    id: "od1",
    title: "Full Body Strength Training",
    instructor: "Mike Rodriguez",
    duration: "45 min",
    type: "Strength",
    level: "Intermediate",
    views: 1250,
    rating: 4.8,
    imageUrl: "/placeholder.svg?height=200&width=300",
    description: "Complete full-body workout focusing on major muscle groups.",
  },
  {
    id: "od2",
    title: "Relaxing Evening Yoga",
    instructor: "Emily Chen",
    duration: "30 min",
    type: "Yoga",
    level: "All Levels",
    views: 2100,
    rating: 4.9,
    imageUrl: "/placeholder.svg?height=200&width=300",
    description: "Wind down with gentle stretches and breathing exercises.",
  },
  {
    id: "od3",
    title: "Quick HIIT Workout",
    instructor: "Sarah Johnson",
    duration: "20 min",
    type: "HIIT",
    level: "Beginner",
    views: 3400,
    rating: 4.7,
    imageUrl: "/placeholder.svg?height=200&width=300",
    description:
      "Short but effective high-intensity workout for busy schedules.",
  },
];

// Static featured instructors
const staticInstructors = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialization: "HIIT & Strength Training",
    rating: 4.8,
    sessions: 156,
    imageUrl: "/placeholder.svg?height=100&width=100",
    isOnline: true,
  },
  {
    id: "2",
    name: "Emily Chen",
    specialization: "Yoga & Mindfulness",
    rating: 4.9,
    sessions: 203,
    imageUrl: "/placeholder.svg?height=100&width=100",
    isOnline: true,
  },
  {
    id: "3",
    name: "Mike Rodriguez",
    specialization: "Functional Training",
    rating: 4.7,
    sessions: 134,
    imageUrl: "/placeholder.svg?height=100&width=100",
    isOnline: false,
  },
];

const LiveSessionCard = ({
  session,
}: {
  session: (typeof staticLiveSessions)[0];
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "live":
        return "bg-red-500 text-white";
      case "upcoming":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white via-blue-50/30 to-white">
      <div className="relative aspect-video">
        <Image
          src={session.imageUrl || "/placeholder.svg"}
          alt={session.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 left-3">
          <Badge className={getStatusColor(session.status)}>
            {session.isLive && (
              <div className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
            )}
            {session.status === "live" ? "LIVE NOW" : "UPCOMING"}
          </Badge>
        </div>
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {session.duration}
          </Badge>
        </div>
        {session.isLive && (
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <Link href={`/live-session/${session.id}`}>
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 shadow-xl"
              >
                <Play className="w-5 h-5 mr-2" />
                Join Live
              </Button>
            </Link>
          </div>
        )}
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-blue-600 transition-colors">
            {session.title}
          </h3>
          <Badge className={getLevelColor(session.level)}>
            {session.level}
          </Badge>
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {session.description}
        </p>

        <div className="flex items-center mb-4">
          <Image
            src={session.instructorImage || "/placeholder.svg"}
            alt={session.instructor}
            width={40}
            height={40}
            className="rounded-full mr-3"
          />
          <div>
            <p className="font-semibold text-gray-900">{session.instructor}</p>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span className="text-sm text-gray-600">{session.rating}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-sm text-gray-600 mb-4">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>
              {session.date} • {session.time}
            </span>
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-2" />
            <span>
              {session.currentParticipants}/{session.maxParticipants}{" "}
              participants
            </span>
          </div>
        </div>

        <div className="flex gap-2">
          {session.isLive ? (
            <Link href={`/live-session/${session.id}`} className="flex-1">
              <Button className="w-full bg-red-600 hover:bg-red-700">
                <Play className="w-4 h-4 mr-2" />
                Join Live Session
              </Button>
            </Link>
          ) : (
            <Button variant="outline" className="flex-1 bg-transparent">
              <Calendar className="w-4 h-4 mr-2" />
              Book Session
            </Button>
          )}
          <Button variant="outline" size="icon" className="bg-transparent">
            <Heart className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const OnDemandCard = ({
  session,
}: {
  session: (typeof staticOnDemandSessions)[0];
}) => {
  return (
    <Card className="group relative overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-white via-purple-50/30 to-white">
      <div className="relative aspect-video">
        <Image
          src={session.imageUrl || "/placeholder.svg"}
          alt={session.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-black/70 text-white">
            {session.duration}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 shadow-xl"
          >
            <Play className="w-5 h-5 mr-2" />
            Play Now
          </Button>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
          {session.title}
        </h3>
        <p className="text-gray-600 mb-4">{session.description}</p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="text-sm font-semibold">{session.rating}</span>
            <span className="text-sm text-gray-500 ml-2">
              • {session.views} views
            </span>
          </div>
          <Badge className="bg-purple-100 text-purple-800">
            {session.type}
          </Badge>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">by {session.instructor}</span>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Play className="w-4 h-4 mr-1" />
            Watch
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default function JoinOnlinePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const liveSessions = staticLiveSessions;
  const onDemandSessions = staticOnDemandSessions;
  const instructors = staticInstructors;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 via-purple-600/80 to-pink-600/80"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center bg-white/20 rounded-full px-6 py-3 mb-8 border border-white/30 backdrop-blur-sm">
            <Sparkles className="w-5 h-5 text-white mr-2" />
            <span className="text-white font-semibold">Join From Anywhere</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
            Live Online
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-white to-cyan-300">
              Fitness Sessions
            </span>
          </h1>

          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto leading-relaxed text-blue-100">
            Join live training sessions with expert instructors from the comfort
            of your home. Interactive, engaging, and effective workouts await
            you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-10 py-6 text-xl font-bold rounded-full shadow-xl"
            >
              <Zap className="w-6 h-6 mr-3" />
              Browse Live Sessions
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 px-10 py-6 text-xl font-semibold rounded-full backdrop-blur-sm bg-transparent"
            >
              <Video className="w-6 h-6 mr-3" />
              Watch On-Demand
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
              <div className="text-4xl font-bold mb-2">50+</div>
              <div className="text-blue-200">Live Sessions Weekly</div>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
              <div className="text-4xl font-bold mb-2">1000+</div>
              <div className="text-blue-200">On-Demand Videos</div>
            </div>
            <div className="text-center bg-white/10 rounded-2xl p-6 backdrop-blur-sm border border-white/20">
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-200">Access Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filters */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search sessions, instructors, or workout types..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 w-full border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedFilter === "all" ? "default" : "outline"}
                onClick={() => setSelectedFilter("all")}
                className="rounded-full"
              >
                All
              </Button>
              <Button
                variant={selectedFilter === "live" ? "default" : "outline"}
                onClick={() => setSelectedFilter("live")}
                className="rounded-full"
              >
                Live Now
              </Button>
              <Button
                variant={selectedFilter === "upcoming" ? "default" : "outline"}
                onClick={() => setSelectedFilter("upcoming")}
                className="rounded-full"
              >
                Upcoming
              </Button>
              <Button
                variant={selectedFilter === "on-demand" ? "default" : "outline"}
                onClick={() => setSelectedFilter("on-demand")}
                className="rounded-full"
              >
                On-Demand
              </Button>
            </div>
          </div>
        </div>

        <Tabs defaultValue="live-sessions" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white shadow-lg rounded-full p-1">
            <TabsTrigger
              value="live-sessions"
              className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Video className="w-4 h-4 mr-2" />
              Live Sessions
            </TabsTrigger>
            <TabsTrigger
              value="on-demand"
              className="rounded-full data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Play className="w-4 h-4 mr-2" />
              On-Demand
            </TabsTrigger>
            <TabsTrigger
              value="instructors"
              className="rounded-full data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Instructors
            </TabsTrigger>
          </TabsList>

          <TabsContent value="live-sessions" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                Live Training Sessions
              </h2>
              <Badge className="bg-red-100 text-red-800 px-4 py-2">
                <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse" />
                {liveSessions.filter((s) => s.isLive).length} Live Now
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {liveSessions.map((session) => (
                <LiveSessionCard key={session.id} session={session} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="on-demand" className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-900">
                On-Demand Library
              </h2>
              <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                {onDemandSessions.length}+ Videos Available
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {onDemandSessions.map((session) => (
                <OnDemandCard key={session.id} session={session} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="instructors" className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Featured Instructors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {instructors.map((instructor) => (
                <Card
                  key={instructor.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <CardContent className="p-8 text-center">
                    <div className="relative mb-6">
                      <Image
                        src={instructor.imageUrl || "/placeholder.svg"}
                        alt={instructor.name}
                        width={100}
                        height={100}
                        className="rounded-full mx-auto"
                      />
                      {instructor.isOnline && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        </div>
                      )}
                    </div>
                    <h3 className="font-bold text-xl mb-2 text-gray-900">
                      {instructor.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-4">
                      {instructor.specialization}
                    </p>
                    <div className="flex items-center justify-center space-x-4 mb-6 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                        <span>{instructor.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{instructor.sessions} sessions</span>
                    </div>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
