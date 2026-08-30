import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchPlant(plantId: string) {
  try {
    const plantsJson = await fetch(
      `http://localhost:3000/api/plants/${plantId}`,
    );
    const data = await plantsJson.json();
    return data;
  } catch (error) {
    // error
  }
}
