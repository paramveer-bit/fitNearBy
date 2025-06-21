// "use client";

// import { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import {
//   Plus,
//   Trash2,
//   MapPin,
//   Clock,
//   Users,
//   Dumbbell,
//   CreditCard,
//   ImageIcon,
// } from "lucide-react";
// import Basic from "../gyms/[id]/basic";
// interface GymData {
//   name: string;
//   location: string;
//   email: string;
//   description: string;
//   address: string;
//   latitude: number | null;
//   longitude: number | null;
//   nearBy: string;
//   logoUrl: string;
// }

// interface Facility {
//   id: string;
//   name: string;
//   description: string;
// }

// interface Plan {
//   id: string;
//   name: string;
//   price: number;
//   type: "TRIAL" | "MONTHLY" | "QUARTERLY" | "YEARLY";
//   duration: number;
//   description: string;
// }

// interface Trainer {
//   id: string;
//   name: string;
//   email: string;
//   bio: string;
//   profileUrl: string;
//   specialties: string[];
//   certifications: string[];
//   experience: number | null;
// }

// interface OperatingHours {
//   id: string;
//   day: string;
//   openAt: string;
//   closeAt: string;
// }

// interface GymImage {
//   id: string;
//   url: string;
// }

// const DAYS_OF_WEEK = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];
// const PLAN_TYPES = ["TRIAL", "MONTHLY", "QUARTERLY", "YEARLY"];

// export default function GymDashboard() {
//   const [gymData, setGymData] = useState<GymData>({
//     name: "",
//     location: "",
//     email: "",
//     description: "",
//     address: "",
//     latitude: null,
//     longitude: null,
//     nearBy: "",
//     logoUrl: "",
//   });

//   const [images, setImages] = useState<GymImage[]>([]);
//   const [facilities, setFacilities] = useState<Facility[]>([]);
//   const [plans, setPlans] = useState<Plan[]>([]);
//   const [trainers, setTrainers] = useState<Trainer[]>([]);
//   const [operatingHours, setOperatingHours] = useState<OperatingHours[]>(
//     DAYS_OF_WEEK.map((day) => ({
//       id: Math.random().toString(),
//       day,
//       openAt: "06:00",
//       closeAt: "22:00",
//     }))
//   );

//   const addFacility = () => {
//     setFacilities([
//       ...facilities,
//       {
//         id: Math.random().toString(),
//         name: "",
//         description: "",
//       },
//     ]);
//   };

//   const removeFacility = (id: string) => {
//     setFacilities(facilities.filter((f) => f.id !== id));
//   };

//   const updateFacility = (id: string, field: keyof Facility, value: string) => {
//     setFacilities(
//       facilities.map((f) => (f.id === id ? { ...f, [field]: value } : f))
//     );
//   };

//   const addPlan = () => {
//     setPlans([
//       ...plans,
//       {
//         id: Math.random().toString(),
//         name: "",
//         price: 0,
//         type: "MONTHLY",
//         duration: 1,
//         description: "",
//       },
//     ]);
//   };

//   const removePlan = (id: string) => {
//     setPlans(plans.filter((p) => p.id !== id));
//   };

//   const updatePlan = (id: string, field: keyof Plan, value: any) => {
//     setPlans(plans.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
//   };

//   const addTrainer = () => {
//     setTrainers([
//       ...trainers,
//       {
//         id: Math.random().toString(),
//         name: "",
//         email: "",
//         bio: "",
//         profileUrl: "",
//         specialties: [],
//         certifications: [],
//         experience: null,
//       },
//     ]);
//   };

//   const removeTrainer = (id: string) => {
//     setTrainers(trainers.filter((t) => t.id !== id));
//   };

//   const updateTrainer = (id: string, field: keyof Trainer, value: any) => {
//     setTrainers(
//       trainers.map((t) => (t.id === id ? { ...t, [field]: value } : t))
//     );
//   };

//   const addSpecialty = (trainerId: string, specialty: string) => {
//     if (!specialty.trim()) return;
//     setTrainers(
//       trainers.map((t) =>
//         t.id === trainerId
//           ? { ...t, specialties: [...t.specialties, specialty] }
//           : t
//       )
//     );
//   };

//   const removeSpecialty = (trainerId: string, specialty: string) => {
//     setTrainers(
//       trainers.map((t) =>
//         t.id === trainerId
//           ? { ...t, specialties: t.specialties.filter((s) => s !== specialty) }
//           : t
//       )
//     );
//   };

//   const addImage = () => {
//     setImages([
//       ...images,
//       {
//         id: Math.random().toString(),
//         url: "",
//       },
//     ]);
//   };

//   const removeImage = (id: string) => {
//     setImages(images.filter((img) => img.id !== id));
//   };

//   const updateImage = (id: string, url: string) => {
//     setImages(images.map((img) => (img.id === id ? { ...img, url } : img)));
//   };

//   const updateOperatingHours = (
//     id: string,
//     field: "openAt" | "closeAt",
//     value: string
//   ) => {
//     setOperatingHours(
//       operatingHours.map((oh) =>
//         oh.id === id ? { ...oh, [field]: value } : oh
//       )
//     );
//   };

//   const handleSubmit = async () => {
//     const gymPayload = {
//       ...gymData,
//       images,
//       facilities,
//       plans,
//       trainers,
//       operatingHours,
//     };

//     console.log("Gym data to submit:", gymPayload);
//     // Here you would typically send this data to your API
//     alert("Gym data prepared for submission! Check console for details.");
//   };

//   return (
//     <div className="container mx-auto p-6 max-w-6xl">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold">Add New Gym</h1>
//         <p className="text-muted-foreground">
//           Create a comprehensive gym profile with all details
//         </p>
//       </div>

//       <Tabs defaultValue="basic" className="space-y-6">
//         <TabsList className="grid w-full grid-cols-6">
//           <TabsTrigger value="basic" className="flex items-center gap-2">
//             <MapPin className="h-4 w-4" />
//             Basic Info
//           </TabsTrigger>
//           <TabsTrigger value="images" className="flex items-center gap-2">
//             <ImageIcon className="h-4 w-4" />
//             Images
//           </TabsTrigger>
//           <TabsTrigger value="facilities" className="flex items-center gap-2">
//             <Dumbbell className="h-4 w-4" />
//             Facilities
//           </TabsTrigger>
//           <TabsTrigger value="plans" className="flex items-center gap-2">
//             <CreditCard className="h-4 w-4" />
//             Plans
//           </TabsTrigger>
//           <TabsTrigger value="trainers" className="flex items-center gap-2">
//             <Users className="h-4 w-4" />
//             Trainers
//           </TabsTrigger>
//           <TabsTrigger value="hours" className="flex items-center gap-2">
//             <Clock className="h-4 w-4" />
//             Hours
//           </TabsTrigger>
//         </TabsList>

//         <TabsContent value="basic">
//           <Basic />
//         </TabsContent>

//         <TabsContent value="images">
//           <Card>
//             <CardHeader>
//               <CardTitle>Gym Images</CardTitle>
//               <CardDescription>Add photos to showcase your gym</CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {images.map((image) => (
//                 <div key={image.id} className="flex gap-2">
//                   <Input
//                     value={image.url}
//                     onChange={(e) => updateImage(image.id, e.target.value)}
//                     placeholder="Image URL"
//                     className="flex-1"
//                   />
//                   <Button
//                     variant="outline"
//                     size="icon"
//                     onClick={() => removeImage(image.id)}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </div>
//               ))}
//               <Button onClick={addImage} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Image
//               </Button>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="facilities">
//           <Card>
//             <CardHeader>
//               <CardTitle>Facilities</CardTitle>
//               <CardDescription>
//                 List all available facilities and equipment
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {facilities.map((facility) => (
//                 <div
//                   key={facility.id}
//                   className="grid grid-cols-1 md:grid-cols-2 gap-2"
//                 >
//                   <Input
//                     value={facility.name}
//                     onChange={(e) =>
//                       updateFacility(facility.id, "name", e.target.value)
//                     }
//                     placeholder="Facility name"
//                   />
//                   <div className="flex gap-2">
//                     <Input
//                       value={facility.description}
//                       onChange={(e) =>
//                         updateFacility(
//                           facility.id,
//                           "description",
//                           e.target.value
//                         )
//                       }
//                       placeholder="Description"
//                       className="flex-1"
//                     />
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => removeFacility(facility.id)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//               <Button
//                 onClick={addFacility}
//                 variant="outline"
//                 className="w-full"
//               >
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Facility
//               </Button>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="plans">
//           <Card>
//             <CardHeader>
//               <CardTitle>Membership Plans</CardTitle>
//               <CardDescription>
//                 Create different pricing plans for your gym
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {plans.map((plan) => (
//                 <div key={plan.id} className="border rounded-lg p-4 space-y-4">
//                   <div className="flex justify-between items-start">
//                     <h4 className="font-medium">Plan Details</h4>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => removePlan(plan.id)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label>Plan Name</Label>
//                       <Input
//                         value={plan.name}
//                         onChange={(e) =>
//                           updatePlan(plan.id, "name", e.target.value)
//                         }
//                         placeholder="Basic Plan"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Price ($)</Label>
//                       <Input
//                         type="number"
//                         value={plan.price}
//                         onChange={(e) =>
//                           updatePlan(
//                             plan.id,
//                             "price",
//                             Number.parseFloat(e.target.value) || 0
//                           )
//                         }
//                         placeholder="29.99"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label>Plan Type</Label>
//                       <Select
//                         value={plan.type}
//                         onValueChange={(value) =>
//                           updatePlan(plan.id, "type", value)
//                         }
//                       >
//                         <SelectTrigger>
//                           <SelectValue />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {PLAN_TYPES.map((type) => (
//                             <SelectItem key={type} value={type}>
//                               {type}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Duration (months)</Label>
//                       <Input
//                         type="number"
//                         value={plan.duration}
//                         onChange={(e) =>
//                           updatePlan(
//                             plan.id,
//                             "duration",
//                             Number.parseInt(e.target.value) || 1
//                           )
//                         }
//                         placeholder="1"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Description</Label>
//                     <Textarea
//                       value={plan.description}
//                       onChange={(e) =>
//                         updatePlan(plan.id, "description", e.target.value)
//                       }
//                       placeholder="Plan description..."
//                       rows={2}
//                     />
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addPlan} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Plan
//               </Button>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="trainers">
//           <Card>
//             <CardHeader>
//               <CardTitle>Trainers</CardTitle>
//               <CardDescription>
//                 Add information about gym trainers
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               {trainers.map((trainer) => (
//                 <div
//                   key={trainer.id}
//                   className="border rounded-lg p-4 space-y-4"
//                 >
//                   <div className="flex justify-between items-start">
//                     <h4 className="font-medium">Trainer Details</h4>
//                     <Button
//                       variant="outline"
//                       size="icon"
//                       onClick={() => removeTrainer(trainer.id)}
//                     >
//                       <Trash2 className="h-4 w-4" />
//                     </Button>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label>Name</Label>
//                       <Input
//                         value={trainer.name}
//                         onChange={(e) =>
//                           updateTrainer(trainer.id, "name", e.target.value)
//                         }
//                         placeholder="John Doe"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Email</Label>
//                       <Input
//                         type="email"
//                         value={trainer.email}
//                         onChange={(e) =>
//                           updateTrainer(trainer.id, "email", e.target.value)
//                         }
//                         placeholder="trainer@gym.com"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label>Profile Image URL</Label>
//                       <Input
//                         value={trainer.profileUrl}
//                         onChange={(e) =>
//                           updateTrainer(
//                             trainer.id,
//                             "profileUrl",
//                             e.target.value
//                           )
//                         }
//                         placeholder="https://example.com/profile.jpg"
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label>Experience (years)</Label>
//                       <Input
//                         type="number"
//                         value={trainer.experience || ""}
//                         onChange={(e) =>
//                           updateTrainer(
//                             trainer.id,
//                             "experience",
//                             e.target.value
//                               ? Number.parseInt(e.target.value)
//                               : null
//                           )
//                         }
//                         placeholder="5"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Bio</Label>
//                     <Textarea
//                       value={trainer.bio}
//                       onChange={(e) =>
//                         updateTrainer(trainer.id, "bio", e.target.value)
//                       }
//                       placeholder="Trainer biography..."
//                       rows={2}
//                     />
//                   </div>

//                   <div className="space-y-2">
//                     <Label>Specialties</Label>
//                     <div className="flex flex-wrap gap-2 mb-2">
//                       {trainer.specialties.map((specialty) => (
//                         <Badge
//                           key={specialty}
//                           variant="secondary"
//                           className="cursor-pointer"
//                           onClick={() => removeSpecialty(trainer.id, specialty)}
//                         >
//                           {specialty} ×
//                         </Badge>
//                       ))}
//                     </div>
//                     <div className="flex gap-2">
//                       <Input
//                         placeholder="Add specialty"
//                         onKeyPress={(e) => {
//                           if (e.key === "Enter") {
//                             addSpecialty(trainer.id, e.currentTarget.value);
//                             e.currentTarget.value = "";
//                           }
//                         }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <Button onClick={addTrainer} variant="outline" className="w-full">
//                 <Plus className="h-4 w-4 mr-2" />
//                 Add Trainer
//               </Button>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="hours">
//           <Card>
//             <CardHeader>
//               <CardTitle>Operating Hours</CardTitle>
//               <CardDescription>
//                 Set the gym's operating hours for each day
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               {operatingHours.map((hours) => (
//                 <div
//                   key={hours.id}
//                   className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
//                 >
//                   <div className="font-medium">{hours.day}</div>
//                   <div className="space-y-2">
//                     <Label>Open Time</Label>
//                     <Input
//                       type="time"
//                       value={hours.openAt}
//                       onChange={(e) =>
//                         updateOperatingHours(hours.id, "openAt", e.target.value)
//                       }
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label>Close Time</Label>
//                     <Input
//                       type="time"
//                       value={hours.closeAt}
//                       onChange={(e) =>
//                         updateOperatingHours(
//                           hours.id,
//                           "closeAt",
//                           e.target.value
//                         )
//                       }
//                     />
//                   </div>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>

//       <div className="flex justify-end mt-8">
//         <Button onClick={handleSubmit} size="lg" className="px-8">
//           Create Gym
//         </Button>
//       </div>
//     </div>
//   );
// }
