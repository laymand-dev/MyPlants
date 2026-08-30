import type { Plant } from "@myplants/shared";
import { useLoaderData, useNavigate } from "react-router";
import plantExample from "@/assets/plant-3.png";
import { Button } from "@/components/ui/button";
import {
  CalendarArrowUp,
  ListTodo,
  NotepadText,
  Pencil,
  Share,
} from "lucide-react";
import { PlantPageTabs } from "./Tabs/Tabs";
interface PlantLoader {
  plant: Plant;
}

export function PlantPage() {
  const { plant } = useLoaderData<PlantLoader>();
  const navigate = useNavigate();

  return (
    <div className="grid md:auto-rows-auto gap-5 p-4">
      <div className="grid md:grid-flow-col gap-8">
        <img
          src={plantExample}
          className="h-80 w-full rounded-xl object-cover"
        />
        <div>
          <p className="text-h1">{plant.name}</p>
          <p className="text-muted">{plant.species}</p>
          {/* <div className="max-md:rounded-xl max-md:border-border-soft max-md:border max-md:p-4 my-4">
            <p className="text-h3 md:hidden mb-4">Основная информация</p>
            <div className="grid grid-rows-2 grid-cols-2 gap-1 h-fit">
              <p>Место</p>
              <p>{plant.placedAt}</p>
              <p>Дата приобретения</p>
              <p>
                {plant.acquiredAt
                  ? new Date(plant.acquiredAt).toLocaleDateString("ru-RU")
                  : "Дата не указана"}
              </p>
            </div>
          </div> */}
        </div>

        <div className="grid md:grid-flow-row gap-2 h-fit">
          <Button
            onClick={() => {
              navigate(`/edit-plant/${plant.id}`);
            }}
            variant="outline"
          >
            <Pencil className="mr-1" /> Изменить
          </Button>
          <Button variant="outline">
            <NotepadText className="mr-1" /> Добавить заметку
          </Button>
          <Button variant="outline">
            <ListTodo className="mr-1" /> Пройти опрос
          </Button>
          <Button variant="outline">
            <CalendarArrowUp className="mr-1" /> Добавить событие
          </Button>
          <Button variant="outline">
            <Share className="mr-1" /> Поделиться в Telegram
          </Button>
        </div>
      </div>

      <PlantPageTabs plant={plant} />
    </div>
  );
}
