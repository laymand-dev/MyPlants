import type { CreatePlantDto, Plant } from "@myplants/shared";

export interface PlantsActions {
  getPlants: () => void;
  addPlant: (plant: CreatePlantDto) => void;
  deletePlant: (plant: Plant) => void;
  editPlant: (plant: CreatePlantDto) => void;
  selectPlant: (id: string | null) => void;
}

export interface PlantState extends PlantsActions {
  plants: Plant[];
  selectedPlantId: string | null;
  isLoading: boolean;
  error: string | null;
}

export type PlantsStore = PlantState & PlantsActions;
