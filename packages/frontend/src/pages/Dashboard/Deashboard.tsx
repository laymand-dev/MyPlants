import { useEffect, useState } from "react";
import { PlantForm } from "./Platform";
import { Plant } from "@myplants/shared";
import { Button } from "@/components/ui/button";

export function DashboardPage() {
  const [plants, setPlants] = useState<Plant[]>([]);
  const [formOpened, setFormOpened] = useState(false);
  const [editingPlant, setEditingPlant] = useState<Plant | undefined>(
    undefined,
  );

  const fetchPlants = async () => {
    try {
      const plantsJson = await fetch("http://localhost:3000/api/plants");
      const data = await plantsJson.json();
      setPlants(data);
    } catch (error) {
      console.log(error, "ERORR");
    }
  };

  const handleDelete = async (plant: Plant) => {
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

  return (
    <>
      <div className="plant-list">
        <p>Список растений</p>
        {plants?.map((plant) => (
          <div className="plant-card" key={plant.id}>
            <h5
              onClick={() => {
                setEditingPlant(plants.find((el) => el.id === plant.id));
                setFormOpened(true);
              }}
            >
              {plant.name}
            </h5>
            <p
              className="plant-card__name--danger"
              onClick={() => handleDelete(plant)}
            >
              Удалить
            </p>
          </div>
        ))}
      </div>
      <Button onClick={() => setFormOpened(true)}>Создать</Button>
      {formOpened && (
        <PlantForm
          defaultValues={editingPlant}
          onClose={() => setFormOpened(false)}
          onCreated={() => {
            // TODO: add list of plants update
            fetchPlants();
          }}
        />
      )}
    </>
  );
}
