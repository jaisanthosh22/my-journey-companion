import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Home, Map, Clock, User } from "lucide-react";

const tabs = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: Map, label: "Map", path: "/map" },
  { icon: Clock, label: "History", path: "/history" },
  { icon: User, label: "Profile", path: "/profile" },
];

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen">
      <Outlet />
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-background/90 backdrop-blur-xl px-2 py-2.5">
        {tabs.map((tab) => {
          const isActive = location.pathname === tab.path;
          return (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-xl transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default MainLayout;
