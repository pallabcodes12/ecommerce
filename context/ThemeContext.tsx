"use client";

import React, { createContext, useState } from "react";
import { ThemeProvider as NextTheme } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

type Theme = {
  darkMode: boolean;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <NextTheme {...props}>{children}</NextTheme>;
};
