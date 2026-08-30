import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePlantDto,
  Plant,
  type CreatePlantDtoInput,
} from "@myplants/shared";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLoaderData, useNavigate } from "react-router";

interface PlantLoader {
  plant: Plant;
}

export function EditPlantPage() {
  const navigate = useNavigate();
  const { plant } = useLoaderData<PlantLoader>();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePlantDtoInput, unknown, CreatePlantDto>({
    resolver: zodResolver(CreatePlantDto),
    defaultValues: plant
      ? {
          name: plant.name,
          species: plant.species,
          acquiredAt: plant.acquiredAt,
          placedAt: plant.placedAt,
        }
      : {},
  });

  const handleGoBack = () => {
    navigate(-1);
  };

  const onSubmit = async (data: CreatePlantDto) => {
    if (!plant) return;

    const res = await fetch(`http://localhost:3000/api/plants/${plant.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      console.error("Не удалось создать растение");
      return;
    }

    handleGoBack();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-h1 mb-2">Редактировать растение</p>
      <p className="text-muted mb-6">
        Заполни основные данные о твоем растении
      </p>
      <div className="grid gap-2 grid-rows-5 rounded-xl border-border-soft border p-4">
        <p className="text-h3">
          Название
          <Input
            {...register("name")}
            placeholder="Monstera deliciosa"
            className="my-3"
          />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </p>

        <p className="text-h3 ">
          Вид (необязательно)
          <Input
            {...register("species")}
            placeholder="Monstera"
            className="my-3"
          />
          {errors.species && (
            <span className="error">{errors.species.message}</span>
          )}
        </p>

        <p className="text-h3">
          Где стоит (необязательно)
          <Input
            {...register("placedAt")}
            placeholder="Кухня, подоконник"
            className="my-3"
          />
          {errors.placedAt && (
            <span className="error">{errors.placedAt.message}</span>
          )}
        </p>

        <p className="text-h3">
          Дата приобретения (необязательно)
          <Input type="date" {...register("acquiredAt")} className="my-3" />
          {errors.acquiredAt && (
            <span className="error">{errors.acquiredAt.message}</span>
          )}
        </p>

        <div className="grid grid-cols-2 gap-15 justify-between">
          <Button type="submit" disabled={isSubmitting}>
            <Sprout size={24} className="mx-3" />
            {isSubmitting ? "Сохраняем…" : "Изменить растение"}
          </Button>
          <Button
            variant="outline"
            onClick={handleGoBack}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
        </div>
      </div>
    </form>
  );
}
