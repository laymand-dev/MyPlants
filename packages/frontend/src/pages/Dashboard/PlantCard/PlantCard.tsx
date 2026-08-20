import { Plant } from "@myplants/shared";
import type { MouseEvent } from "react";

type PlantCardProps = {
  plant: Plant;
  onClick?: (plant: Plant) => void;
  onDeleteClick?: (e: MouseEvent, plant: Plant) => void;
};

export function PlantCard({ plant, onClick, onDeleteClick }: PlantCardProps) {
  return (
    <div
      key={plant.id}
      className="grid gap-4 rounded-xl border-border-soft bg-surface border shadow-card"
      onClick={() => onClick?.(plant)}
    >
      <img src={plant.photo} className="h-42 w-full rounded-xl object-cover" />
      <div className="px-4">
        <p className="text-h3 wrap-anywhere">{plant.name}</p>
        <p className="text-muted text-small wrap-anywhere">{plant.species}</p>
      </div>

      <p
        className="plant-card__name--danger"
        onClick={(e) => onDeleteClick?.(e, plant)}
      >
        Удалить
      </p>
    </div>
  );
}
