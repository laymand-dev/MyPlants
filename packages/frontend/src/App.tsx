import "./App.css";
import { Outlet } from "react-router";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

function App() {
  return (
    <div className="flex min-h-screen">
      <DesktopSidebar />
      <div className="flex-1 flex flex-col">
        <MobileSidebar />
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
