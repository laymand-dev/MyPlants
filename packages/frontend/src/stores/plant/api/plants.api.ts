import type { CreatePlantDto, Plant } from "@myplants/shared";

const API_URL = "http://localhost:3000/api/plants";

export async function fetchPlant(plantId: string): Promise<Plant> {
  const response = await fetch(`${API_URL}/${plantId}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch plant: ${response.status}`);
  }

  return response.json();
}

export async function fetchPlants(): Promise<Plant[]> {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch plants: ${response.status}`);
  }

  return response.json();
}

export async function addPlant(plant: CreatePlantDto): Promise<Plant[]> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plant),
  });

  if (!response.ok) {
    throw new Error(`Failed to add plants: ${response.status}`);
  }

  return response.json();
}

export async function editPlant(plant: CreatePlantDto): Promise<Plant[]> {
  const response = await fetch(`${API_URL}/${plant.id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plant),
  });

  if (!response.ok) {
    throw new Error(`Failed to edit plants: ${response.status}`);
  }

  return response.json();
}

export async function deletePlant(plant: Plant) {
  const response = await fetch(`${API_URL}/${plant.id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete plant: ${response.status}`);
  }

  return await response.json();
}
