import { NavList } from "./NavList";
import icon from "@/assets/icon.png";

export function DesktopSidebar() {
  return (
    <div className="hidden md:grid  md:w-58 grid-rows-2 justify-between border-r border-border-soft bg-sidebar-background">
      <aside className="grid grid-rows-[90px_1fr] px-4 ">
        <div className=" grid grid-flow-col auto-cols-max items-center">
          <img src={icon} className="w-15 h-15  grid justify-center" />
          <p className="font-serif text-primary text-h2">MyPlants</p>
        </div>
        <NavList />
      </aside>
      <div className="bg-[url(@/assets/dashboard-sidebar-background.png)] bg-no-repeat bg-left bg-contain w-58 h-100" />
    </div>
  );
}
