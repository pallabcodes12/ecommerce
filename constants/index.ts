import { Color, Size } from "@/lib/types";

export const API = "https://dummyjson.com";

// Size variants
export const SIZE_VARIANT: Size[] = [
  { id: "cfc2147f-f678-4a5d-8b18-09c964b0957d", size: "L" },
  { id: "7d626d26-58c2-4ee4-87eb-32ffef581ac2", size: "S" },
  { id: "107cac69-0d8a-497c-ad48-8a1f82bc5d20", size: "M" },
  { id: "17c4e1cc-38fc-475a-973f-b83ce0eef0f5", size: "XL" },
];

export const SIZE_VARIANT_DEFAULT_IS: Size = SIZE_VARIANT[0];

// Color variants
export const COLOR_VARIANT: Color[] = [
  { id: "1e556f1b-7c5a-41e9-a2fc-8d7c52e12f9e", color: "black" },
  { id: "79078342-07e0-444b-9d1f-60361e6e2a37", color: "green" },
  { id: "5bab51d6-74f7-4b26-b908-7fd3fae73f14", color: "lightblue" },
  { id: "1ca59dfd-9425-4d7f-af9d-715961d9311d", color: "blue" },
];

export const COLOR_VARIANT_DEFAULT_IS = COLOR_VARIANT[0];

export const CART_DEFAULT = 1;

export const CART_MAX = 10;
