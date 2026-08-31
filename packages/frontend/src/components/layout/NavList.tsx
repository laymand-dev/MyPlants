import { Calendar, House, Sprout, Bell, Settings } from "lucide-react";
import { NavItem } from "./NavItem";

export function NavList() {
  return (
    <nav className="flex flex-col gap-1">
      <NavItem to="/" Icon={House} label="Главная" />
      <NavItem to="/plants" Icon={Sprout} label="Мои растения" />
      <NavItem to="/calendar" Icon={Calendar} label="Календарь" />
      <NavItem to="/notifications" Icon={Bell} label="Нотификации" />
      <NavItem to="/settings" Icon={Settings} label="Настройки" />
    </nav>
  );
}
