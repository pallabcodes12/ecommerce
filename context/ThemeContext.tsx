"use client";

import React, { createContext, useState } from "react";
// import { ThemeProvider as NextTheme } from "next-themes";

type Theme = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<Theme | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: Props) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // This "next-themes" library didn't quite work for "darkmode" so leaving the code here to debug later

  // return (
  //   <NextTheme attribute="class" defaultTheme="system" enableSystem>
  //     {children}
  //   </NextTheme>
  // );

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
