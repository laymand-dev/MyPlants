import { Outlet } from "react-router";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import { MobileSidebar } from "@/components/layout/MobileSidebar";

function App() {
  return (
    <div className="md:flex md:min-h-screen">
      <DesktopSidebar />
      <MobileSidebar />
      <div className="flex-1 flex flex-col px-4 md:px-8 md:py-7">
        <main className="flex-1 bg-app-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;
