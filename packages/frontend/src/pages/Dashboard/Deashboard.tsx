import { useEffect, type MouseEvent } from "react";
import { Plant } from "@myplants/shared";
import { Button } from "@/components/ui/button";
import { PlantCard } from "./PlantCard/PlantCard";
import { ArrowRight, PlusCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { usePlantStore } from "@/stores/plant/plant.store";
import {
  selectPlants,
  selectGetPlants,
  selectDeletePlant,
} from "@/stores/plant/plant.selectors";

export function DashboardPage() {
  const plants = usePlantStore(selectPlants)?.slice(0, 5);
  const getPlants = usePlantStore(selectGetPlants);
  const deletePlants = usePlantStore(selectDeletePlant);

  const navigate = useNavigate();

  const handlePlantCardDelete = async (e: MouseEvent, plant: Plant) => {
    e.stopPropagation();

    deletePlants(plant);
  };

  useEffect(() => {
    getPlants();
  }, []);

  const handlePlantCardClick = (plant: Plant) => {
    navigate(`/plant/${plant.id}`);
  };

  const handleAddPlantClick = () => {
    navigate("/create-plant");
  };

  return (
    <div className="grid auto-rows-max gap-4">
      <div className="grid md:grid-cols-[1fr_0.2fr] grid:rows-[1fr,_1fr] gap-4">
        <p className="text-h1">Доброе утро, садовод 🪴</p>
        <Button onClick={handleAddPlantClick}>
          <PlusCircle className="mr-3" />
          Добавить растение
        </Button>
      </div>
      <p className="text-muted">
        Твой зеленый уголок под контролем, пусть растения радуют тебя каждый
        день
      </p>
      <div className="grid auto-rows-max grid-cols-1 justify-between gap-6">
        <div className="grid grid-cols-2">
          <p className="text-h3">Мои растения</p>
          <div className="grid items-center grid-cols-[1fr_minmax(0,0.1fr)]">
            <NavLink to={"/plants"} end className="text-primary text-right">
              Смотреть все
            </NavLink>
            <ArrowRight size={17} color="var(--color-primary)" />
          </div>
        </div>
        <div className="grid md:grid-cols-[repeat(5,minmax(170px,1fr))] gap-4 grid-cols-2  object-cover">
          {plants?.map((plant) => (
            <PlantCard
              plant={plant}
              onClick={handlePlantCardClick}
              onDeleteClick={handlePlantCardDelete}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
