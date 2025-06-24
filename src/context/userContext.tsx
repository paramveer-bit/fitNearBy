"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

// Define the context type
type UserContextType = {
  user: UserData | null; // Replace 'any' with your user type if you have one
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
};

interface UserData {
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

// Create the context
// const MyContext = createContext<MyContextType | undefined>(undefined);

// Create the provider
export const MyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    console.log("Fetching user data...");
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BASEURL}/user/auth/isSignedIn`,
          { withCredentials: true }
        );
        console.log("User data:", res.data);
        setUser(res.data.data);
      } catch (error) {
        // console.error("Error fetching user data:", error);
        setUser(null); // Set user to null if there's an error
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const UserContext = React.createContext<UserContextType>({
  user: null,
  setUser: () => {},
});
