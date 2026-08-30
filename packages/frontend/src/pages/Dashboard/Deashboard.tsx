import { useEffect, useState, type MouseEvent } from "react";
import { Plant } from "@myplants/shared";
import { Button } from "@/components/ui/button";
import plantCover from "@/assets/plant-1.png";
import { PlantCard } from "./PlantCard/PlantCard";
import { ArrowRight, PlusCircle } from "lucide-react";
import { NavLink, useNavigate } from "react-router";

export function DashboardPage() {
  const [plants, setPlants] = useState<Plant[]>([]);

  const navigate = useNavigate();

  const fetchPlants = async () => {
    try {
      const plantsJson = await fetch("http://localhost:3000/api/plants");
      const data: Plant[] = await plantsJson.json();
      setPlants(
        data.map((plant) => ({ ...plant, photo: plantCover })).slice(0, 5),
      );
    } catch (error) {
      console.log(error, "ERORR");
    }
  };

  const handlePlantCardDelete = async (e: MouseEvent, plant: Plant) => {
    e.stopPropagation();

    const plantsJson = await fetch(
      `http://localhost:3000/api/plants/${plant.id}`,
      { method: "DELETE" },
    );
    const data = await plantsJson.json();
    setPlants(data);
  };

  useEffect(() => {
    fetchPlants();
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
