import { z } from "zod";

export const Plant = z.object({
  id: z.uuid(),
  name: z.string().min(1).max(100),
  species: z.string().max(100).optional(),
  placedAt: z.string().max(100).optional(),
  coverPhotoId: z.uuid().optional(),
  // --NOTE: below helps to avoid browser form bug that set empty string as value even there is no value
  acquiredAt: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.date().optional(),
  ),
  createdAt: z.preprocess(
    (val) => (val === "" ? undefined : val),
    z.coerce.date().optional(),
  ),
  // --
});

export const CreatePlantDto = Plant.extend({
  id: z.uuid().optional(),
});

export const PlantResponse = CreatePlantDto.extend({
  id: z.uuid(),
  coverPhotoId: z.uuid().nullable(),
  createdAt: z.coerce.date(),
});

export const UpdatePlantDto = CreatePlantDto.partial();

export type Plant = z.infer<typeof Plant>;
export type CreatePlantDto = z.infer<typeof CreatePlantDto>;
export type PlantResponse = z.infer<typeof PlantResponse>;
export type UpdatePlantDto = z.infer<typeof UpdatePlantDto>;
export type CreatePlantDtoInput = z.input<typeof CreatePlantDto>;
