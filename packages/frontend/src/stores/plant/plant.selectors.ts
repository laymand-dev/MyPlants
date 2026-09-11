import type { PlantsStore } from "./plant.types";

export const selectPlants = (state: PlantsStore) => state.plants;

export const selectSelectedPlantId = (state: PlantsStore) =>
  state.selectedPlantId;

export const selectGetPlants = (state: PlantsStore) => state.getPlants;
export const selectAddPlant = (state: PlantsStore) => state.addPlant;
export const selectEditPlant = (state: PlantsStore) => state.editPlant;
export const selectDeletePlant = (state: PlantsStore) => state.deletePlant;
