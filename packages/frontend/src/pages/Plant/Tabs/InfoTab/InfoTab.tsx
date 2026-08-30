import type { Plant } from "@myplants/shared";

interface PlantPageInfoTabProps {
  plant?: Plant;
}

export function PlantPageInfoTab({ plant }: PlantPageInfoTabProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mt-8">
      <div className="grid grid-rows-[auto_auto] gap-8 h-fit p-4 border border-border-soft rounded-xl">
        <p className="text-h2">Основная информация</p>
        <div className="divide-y divide-border-soft">
          <div className="grid grid-cols-2 gap-8 py-4">
            <p>Название</p>
            <p>{plant?.name}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 py-4">
            <p>Вид</p>
            <p>{plant?.species}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 py-4">
            <p>Место</p>
            <p>{plant?.placedAt}</p>
          </div>

          <div className="grid grid-cols-2 gap-8 py-4">
            <p>Дата приобретения</p>
            <p>
              {plant?.acquiredAt
                ? new Date(plant.acquiredAt).toLocaleDateString("ru-RU")
                : "Дата не указана"}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 border border-border-soft rounded-xl">
        <p className="text-h1">Ближайшие события</p>
      </div>
    </div>
  );
}
