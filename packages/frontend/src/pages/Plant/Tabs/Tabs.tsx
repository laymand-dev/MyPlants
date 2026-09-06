import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { HeartPulse, Info, Notebook, Image as ImageIcon } from "lucide-react";
import { PlantPageInfoTab } from "./InfoTab/InfoTab";
import { PlantPageHealthTab } from "./HealthTab/HealthTab";
import { PlantPagePhotoTab } from "./PhotoTab/PhotoTab";
import { PlantPageNotesTab } from "./NotesTab/NotesTab";
import type { Plant } from "@myplants/shared";

const TABS = [
  {
    children: PlantPageInfoTab,
    Icon: Info,
    label: "Инфо",
    value: "Info",
  },
  {
    children: PlantPageNotesTab,
    value: "Notes",
    label: "Заметки",
    Icon: Notebook,
  },
  {
    children: PlantPageHealthTab,
    value: "Health",
    label: "Здоровье",
    Icon: HeartPulse,
  },
  {
    children: PlantPagePhotoTab,
    value: "Photo",
    label: "Фото",
    Icon: ImageIcon,
  },
] as const;

type TabItem = (typeof TABS)[number];

interface PlantPageTabProps {
  currentTab?: TabItem;
  tab?: TabItem["value"];
  Icon?: LucideIcon;
  label?: string;
  onTabChange?: () => void;
}

function Tab({ currentTab, tab, Icon, label, onTabChange }: PlantPageTabProps) {
  const isActive = currentTab?.value === tab;

  return (
    <div
      className={`flex items-center cursor-pointer ${isActive ? "border-b-2 border-b-deep-green" : ""} pb-4`}
      onClick={onTabChange}
    >
      {Icon && <Icon className={`mr-2 ${isActive ? "text-deep-green" : ""}`} />}
      <p className={`${isActive ? "text-deep-green font-bold" : ""}`}>
        {label}
      </p>
    </div>
  );
}

interface PlantPageTabs {
  plant?: Plant;
}

export function PlantPageTabs({ plant }: PlantPageTabs) {
  const [currentTab, setCurrentTab] = useState<TabItem>(TABS[0]);

  return (
    <div className="grid grid-rows-[auto_2px_1fr]">
      <div className="flex items-center gap-6 overflow-x-scroll scrollbar-none">
        {TABS.map((tab) => (
          <Tab
            key={tab.value}
            currentTab={currentTab}
            tab={tab.value}
            Icon={tab.Icon}
            label={tab.label}
            onTabChange={() => setCurrentTab(tab)}
          />
        ))}
      </div>
      <div className="border border-border-soft mb-8" />
      {currentTab?.children && currentTab?.children({ plant })}
    </div>
  );
}
