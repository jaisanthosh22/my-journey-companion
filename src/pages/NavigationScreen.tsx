import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CornerDownLeft, Phone, Bot, AlertTriangle, X } from "lucide-react";

const NavigationScreen = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowAlert(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-dark overflow-hidden">
      {/* Dark Map Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 opacity-[0.06]">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full border-t border-foreground/30" style={{ top: `${i * 4}%` }} />
          ))}
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-foreground/30" style={{ left: `${i * 4}%` }} />
          ))}
        </div>

        {/* Navigation route */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800">
          <path
            d="M 200 700 L 200 400 L 150 350 L 150 200"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Current position dot */}
          <circle cx="200" cy="500" r="8" fill="hsl(var(--primary))" opacity="0.9" />
          <circle cx="200" cy="500" r="16" fill="hsl(var(--primary))" opacity="0.2" />
        </svg>

        {/* Risk zones */}
        <div className="absolute rounded-full bg-destructive/10 blur-3xl" style={{ width: 200, height: 200, top: "20%", left: "10%" }} />
        <div className="absolute rounded-full bg-caution/10 blur-2xl" style={{ width: 120, height: 120, top: "35%", left: "55%" }} />
      </div>

      {/* Top instruction banner */}
      <div className="relative z-10 px-4 pt-12">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate("/map")}
            className="flex h-10 w-10 items-center justify-center rounded-xl glass border border-border"
          >
            <ArrowLeft className="h-5 w-5 text-foreground" />
          </button>
          <div className="flex-1 text-center">
            <span className="text-xs text-muted-foreground font-medium">ETA: 4h 12m</span>
          </div>
          <div className="w-10" />
        </div>

        <div className="rounded-2xl bg-primary/15 border border-primary/30 px-5 py-4 flex items-center gap-4 animate-slide-down-banner">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20">
            <CornerDownLeft className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-foreground font-semibold text-lg">Turn left in 200m</p>
            <p className="text-muted-foreground text-sm">onto NH-48 Highway</p>
          </div>
        </div>
      </div>

      {/* Risk Alert Popup */}
      {showAlert && (
        <div className="absolute top-44 left-4 right-4 z-20 animate-slide-down-banner">
          <div className="rounded-2xl bg-destructive/15 border border-destructive/30 px-5 py-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-destructive/20 animate-pulse-danger">
              <AlertTriangle className="h-5 w-5 text-destructive" />
            </div>
            <div className="flex-1">
              <p className="text-destructive font-semibold text-sm">⚠ Entering Medium-Risk Zone</p>
              <p className="text-muted-foreground text-xs mt-0.5">Stay alert. Alternative route available.</p>
            </div>
            <button onClick={() => setShowAlert(false)} className="text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Speed indicator */}
      <div className="absolute left-4 bottom-36 z-10">
        <div className="flex h-16 w-16 flex-col items-center justify-center rounded-2xl glass border border-border">
          <span className="text-lg font-bold text-foreground">72</span>
          <span className="text-[10px] text-muted-foreground">km/h</span>
        </div>
      </div>

      {/* SOS Button */}
      <div className="absolute left-4 bottom-8 z-10">
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-destructive text-destructive-foreground animate-pulse-danger transition-all active:scale-95">
          <Phone className="h-6 w-6" />
        </button>
        <p className="text-[10px] text-muted-foreground text-center mt-1">SOS</p>
      </div>

      {/* AI Assistant Bubble */}
      <div className="absolute right-4 bottom-8 z-10">
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground glow-green transition-all active:scale-95">
          <Bot className="h-6 w-6" />
        </button>
        <p className="text-[10px] text-muted-foreground text-center mt-1">AI Help</p>
      </div>

      {/* Bottom Info Strip */}
      <div className="relative z-10 mt-auto px-20 pb-10">
        <div className="rounded-2xl glass border border-border px-4 py-3 flex items-center justify-between">
          <div className="text-center">
            <p className="text-sm font-bold text-foreground">193 km</p>
            <p className="text-[10px] text-muted-foreground">Remaining</p>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="text-center">
            <p className="text-sm font-bold text-primary">7/10</p>
            <p className="text-[10px] text-muted-foreground">Safety</p>
          </div>
          <div className="h-6 w-px bg-border" />
          <div className="text-center">
            <p className="text-sm font-bold text-foreground">4h 12m</p>
            <p className="text-[10px] text-muted-foreground">ETA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationScreen;
