import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";

const SplashScreen = () => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => navigate("/home"), 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-dark">
      <div
        className={`flex flex-col items-center gap-6 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <img src={logo} alt="MyJourneyCompanion logo" className="w-28 h-28 glow-green rounded-3xl" />
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            My<span className="text-gradient-green">Journey</span>Companion
          </h1>
          <p className="mt-2 text-sm text-muted-foreground font-medium tracking-wide">
            Navigate Smart. Travel Safe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
