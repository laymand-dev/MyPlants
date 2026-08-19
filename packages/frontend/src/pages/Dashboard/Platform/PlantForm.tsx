import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePlantDto,
  Plant,
  type CreatePlantDtoInput,
} from "@myplants/shared";
import "./PlantForm.css";
import { Button } from "@/components/ui/button";

interface PlantFormProps {
  defaultValues?: Plant;
  onClose: () => void;
  onCreated: () => void;
}

function PlantForm({ defaultValues, onClose, onCreated }: PlantFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePlantDtoInput, unknown, CreatePlantDto>({
    resolver: zodResolver(CreatePlantDto),
    defaultValues,
  });

  const onSubmit = async (data: CreatePlantDto) => {
    const res = await fetch(
      defaultValues?.id
        ? `http://localhost:3000/api/plants/${defaultValues.id}`
        : "http://localhost:3000/api/plants",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      },
    );

    if (!res.ok) {
      console.error("Не удалось создать растение");
      return;
    }

    onCreated();
    onClose();
  };

  return (
    <div className="plant-form-overlay">
      <form className="plant-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>
          {defaultValues
            ? `Редактирование: ${defaultValues.name} ${defaultValues.species}`
            : "Новое растение"}
        </h2>

        <label>
          Название
          <input {...register("name")} placeholder="Монстера" />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </label>

        <label>
          Вид (необязательно)
          <input {...register("species")} placeholder="Monstera deliciosa" />
          {errors.species && (
            <span className="error">{errors.species.message}</span>
          )}
        </label>

        <label>
          Где стоит (необязательно)
          <input {...register("placedAt")} placeholder="Кухня, подоконник" />
          {errors.placedAt && (
            <span className="error">{errors.placedAt.message}</span>
          )}
        </label>

        <label>
          Дата приобретения (необязательно)
          <input type="date" {...register("acquiredAt")} />
          {errors.acquiredAt && (
            <span className="error">{errors.acquiredAt.message}</span>
          )}
        </label>

        <div className="plant-form-actions">
          <Button onClick={onClose} disabled={isSubmitting}>
            Отмена
          </Button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Сохраняем…" : "Создать"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default PlantForm;
