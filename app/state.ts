import { atom } from "jotai";

// Create an atom to manage a simple counter state
export const themeAtom = atom<"inherit" | "light" | "dark" | undefined>(
  "light"
);

export const accentAtom = atom<
  | "gray"
  | "gold"
  | "bronze"
  | "brown"
  | "yellow"
  | "amber"
  | "orange"
  | "tomato"
  | "red"
  | "ruby"
  | "crimson"
  | "pink"
  | "plum"
  | "purple"
  | "violet"
  | "iris"
  | "indigo"
  | "blue"
  | "cyan"
  | "teal"
  | "jade"
  | "green"
  | "grass"
  | "lime"
  | "mint"
  | "sky"
  | undefined
>("gray");
