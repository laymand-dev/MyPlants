import { z } from "zod";

export const CreatePlantDto = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(100),
  species: z.string().max(100).optional(),
  placedAt: z.string().max(100).optional(),
  coverPhotoId: z.uuid().optional(),
  createdAt: z.coerce.date().optional(),
});

export const PlantResponse = CreatePlantDto.extend({
  id: z.uuid(),
  coverPhotoId: z.uuid().nullable(),
  createdAt: z.coerce.date(),
});

export const UpdatePlantDto = CreatePlantDto.partial();

export type CreatePlantDto = z.infer<typeof CreatePlantDto>;
export type PlantResponse = z.infer<typeof PlantResponse>;
export type UpdatePlantDto = z.infer<typeof UpdatePlantDto>;
