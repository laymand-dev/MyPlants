import { create } from "zustand";
import type { PlantState } from "./plant.types";
import plantCover from "@/assets/plant-1.png";
import {
  addPlant,
  deletePlant,
  editPlant,
  fetchPlants,
} from "./api/plants.api";
import type { Plant } from "@myplants/shared";

export const usePlantStore = create<PlantState>()((set) => ({
  plants: [],
  selectedPlantId: null,
  isLoading: false,
  error: null,

  getPlants: async () => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const data = await fetchPlants();

      set({
        plants: data.map((plant) => ({
          ...plant,
          photo: plantCover,
        })),
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Не удалось загрузить растения",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  deletePlant: async (plant: Plant) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const data = await deletePlant(plant);

      set({
        plants: data,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Не удалось удалить растение",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  addPlant: async (plant) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const data = await addPlant(plant);

      set({
        plants: data,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Не удалось добавить растения",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  editPlant: async (plant) => {
    set({
      isLoading: true,
      error: null,
    });

    try {
      const data = await editPlant(plant);

      set({
        plants: data,
      });
    } catch (error) {
      set({
        error:
          error instanceof Error
            ? error.message
            : "Не удалось обновить растения",
      });
    } finally {
      set({
        isLoading: false,
      });
    }
  },

  selectPlant: (id) => {
    set({ selectedPlantId: id });
  },
}));
