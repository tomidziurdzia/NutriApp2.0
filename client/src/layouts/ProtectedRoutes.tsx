import { Header, Sidebar } from "@/components";
import { Sandwich } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  return (
    <div className="grid w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[65px] lg:px-6">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <div className="bg-primary text-white p-2 rounded-md">
                <Sandwich strokeWidth="1.5" className="h-6 w-6" />
              </div>
              <span className="text-primary">App name</span>
            </Link>
          </div>
          <Sidebar />
        </div>
      </div>
      <div className="flex flex-col">
        <Header />
        <div className="bg-muted">
          <div className=" m-2 rounded-sm shadow-sm min-h-[calc(100vh-82px)]">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoutes;
