import { NavList } from "./NavList";
import icon from "@/assets/icon.png";

export function DesktopSidebar() {
  return (
    <div className="grid grid-rows-2 justify-between border-r border-border-soft pb-6 bg-sidebar-background">
      <aside className="hidden md:grid md:w-58 px-4 ">
        <div className=" grid grid-flow-col auto-cols-max items-center pb-2">
          <img src={icon} className="w-15 h-15  grid justify-center" />
          <p className="font-serif text-primary text-h2">MyPlants</p>
        </div>
        <NavList />
      </aside>
      <div className="bg-[url(@/assets/dashboard-sidebar-background.png)] bg-no-repeat bg-left bg-contain md:w-58 h-100" />
    </div>
  );
}
