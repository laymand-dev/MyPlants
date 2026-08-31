import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NavList } from "./NavList";
import icon from "@/assets/icon.png";

export function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="md:hidden grid grid-flow-col auto-cols-max items-center h-14 px-4 border-b">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <button aria-label="Открыть меню">
            <Menu className="w-5 h-5" />
          </button>
        </SheetTrigger>
        <SheetContent side="left" className="bg-background">
          <div className="px-4 py-6">
            <div className=" grid grid-flow-col auto-cols-max items-center pb-2">
              <img src={icon} className="w-15 h-15  grid justify-center" />
              <p className="font-serif text-primary text-h2">MyPlants</p>
            </div>
            <NavList />
          </div>
          <div className="h-200 bg-[url(@/assets/dashboard-sidebar-background.png)] bg-bottom-left bg-no-repeat bg-contain w-full" />
        </SheetContent>
      </Sheet>
    </header>
  );
}
