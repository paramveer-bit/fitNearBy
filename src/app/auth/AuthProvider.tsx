"use client";

import React, { useState } from "react";

// Define the context type
type UserContextType = {
  user: UserData; // Replace 'any' with your user type if you have one
  setUser: React.Dispatch<React.SetStateAction<UserData>>;
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
  const [user, setUser] = useState({
    email: "",
    isVerified: false,
    isAdmin: false,
  });

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const UserContext = React.createContext<UserContextType>({
  user: { email: "", isVerified: false, isAdmin: false },
  setUser: () => {},
});
