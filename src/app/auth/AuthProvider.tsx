"use client";

import React, { useState } from "react";

// Define the context type
type UserContextType = {
  user: boolean; // Replace 'any' with your user type if you have one
  setUser: React.Dispatch<React.SetStateAction<boolean>>;
};

// Create the context
// const MyContext = createContext<MyContextType | undefined>(undefined);

// Create the provider
export const MyContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState(false);

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use context
export const UserContext = React.createContext<UserContextType>({
  user: false,
  setUser: () => {},
});
