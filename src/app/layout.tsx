// "use client";

import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MyContextProvider } from "@/context/userContext";
import { Toaster } from "@/components/ui/sonner";

// import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

// type UserContextType = {
//   user: any; // Replace 'any' with your user type if you have one
//   setUser: React.Dispatch<React.SetStateAction<any>>;
// };

export const metadata: Metadata = {
  title: "FNB- Find Near BY",
  description:
    "Discover and book the best gyms in your area with flexible membership plans and expert trainers.",
  icons: {
    icon: "/favicon.png", // Adjust the path as necessary
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [user, setUser] = useState(null);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <UserContext.Provider value={{ user: user, setUser: setUser }}> */}
        <MyContextProvider>
          <Navbar />
          <main>{children}</main>
          <Toaster richColors />
          <Footer />
        </MyContextProvider>
        {/* </UserContext.Provider> */}
      </body>
    </html>
  );
}

// export const UserContext = React.createContext<UserContextType>({
//   user: null,
//   setUser: () => {},
// });
