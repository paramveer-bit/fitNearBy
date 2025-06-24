export interface GYM {
    id: string;
    name: string;
    location: string;
    email: string;
    logoUrl: string;
    description: string;
    latitude: number;
    longitude: number;
    address: string;
    rating: number;
    _count: { Reviews: number, Trainer: number };
    nearBy: string;
    locationLink: string;
    Facilities: Facility[]
    Plans: Plan[];
    GymOperatingHours: GymOperatingHours[];
    distance: number;

}

export interface Facility {
    id: string;
    name: string;
    description: string;
}

export interface Plan {
    id: string;
    name: string;
    type: "MONTHLY" | "YEARLY" | "QUARTERLY" | "TRIAL" | "HALF_YEARLY";
    newprice: number;
    oldprice: number;
    features: string[];
}

export interface GymOperatingHours {
    id: string;
    day: string;
    openAt: string;
    closeAt: string;
}


interface GymSummary {
    id: string;
    name: string;
    location: string;
    logoUrl?: string;
}
interface UserSummary {
    name: string;
    id: string;
    email: string;
}

export interface Reviews {

    id: string;
    gym?: GymSummary;
    user?: UserSummary;
    rating: number;
    comment: string;
    createdAt: string; // ISO date string
}


export interface Trainer {
    id: string;
    name: string;
    email: string;
    profileUrl: string;
    bio: string;
    specialties: string[];
    trained: number;
    experience: number; // in years
    GymId: string | null; // Nullable if the trainer is not associated with a gym
}

export interface ImageType {
    id: string,
    url: string
}

export interface UserProfile {
    name: string;
    email: string;
    phone_number: string;
    isVerified: boolean;
    createdAt: string; // ISO date string'
    Reviews: Reviews[];
    Booking: Booking[];
}

export interface Booking {
    id: string;
    gym: GYM;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    status: "PENDING" | "CONFIRMED" | "CANCELLED";
    createdAt: string; // ISO date string
    plan: Plan;


}
