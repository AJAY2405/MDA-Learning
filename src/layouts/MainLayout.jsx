import { Outlet } from "react-router-dom";
import Sidebar from "@/components/LOG-RES/Sidebar";
import Footer from "@/components/LOG-RES/Footer";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content + footer */}
      <div className="flex flex-col flex-1 bg-gray-50">
        <div className="flex-1 overflow-auto [background:radial-gradient(125%_115%_at_40%_50%,#e5e7eb_40%,#d1d5db_100%)]">
          <Outlet />
          <Footer />
        </div>  
      </div>
    </div>
  );
};

export default MainLayout;
