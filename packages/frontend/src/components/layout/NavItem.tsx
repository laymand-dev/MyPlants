import { useMemo } from "react";
import { NavLink, useLocation } from "react-router";

type NavItemProps = {
  to: string;
  Icon: any;
  label: string;
};

export function NavItem({ to, Icon, label }: NavItemProps) {
  const location = useLocation();

  const handleItemClick = () => {};
  const isCurrentPath = useMemo(() => location.pathname === to, [location, to]);

  return (
    <div
      className={`grid grid-flow-col auto-cols-max p-2 ${isCurrentPath ? "bg-sidebar-active-bg" : ""} rounded-xl`}
      onClick={handleItemClick}
    >
      <Icon
        className={`${isCurrentPath ? "text-sidebar-active-text" : ""} mr-3`}
      />
      <NavLink
        to={to}
        end
        className={`${isCurrentPath ? "text-sidebar-active-text" : ""}`}
      >
        {label}
      </NavLink>
    </div>
  );
}
