import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, LocateFixed, Layers, Clock, Route, Shield, Navigation, ArrowLeft } from "lucide-react";

const markers = [
  { id: 1, type: "danger", top: "28%", left: "35%" },
  { id: 2, type: "danger", top: "42%", left: "62%" },
  { id: 3, type: "danger", top: "55%", left: "25%" },
  { id: 4, type: "safe", top: "32%", left: "55%" },
  { id: 5, type: "safe", top: "48%", left: "40%" },
  { id: 6, type: "safe", top: "60%", left: "70%" },
  { id: 7, type: "safe", top: "38%", left: "78%" },
];

const MapScreen = () => {
  const navigate = useNavigate();
  const [heatmap, setHeatmap] = useState(false);

  return (
    <div className="relative flex min-h-screen flex-col bg-background overflow-hidden">
      {/* Mock Map Background */}
      <div className="absolute inset-0 bg-gradient-dark">
        {/* Grid pattern to simulate map */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`h-${i}`} className="absolute w-full border-t border-foreground/20" style={{ top: `${i * 5}%` }} />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={`v-${i}`} className="absolute h-full border-l border-foreground/20" style={{ left: `${i * 5}%` }} />
          ))}
        </div>

        {/* Heatmap overlay */}
        {heatmap && (
          <div className="absolute inset-0 transition-opacity duration-500">
            <div className="absolute rounded-full bg-destructive/20 blur-3xl" style={{ width: 180, height: 180, top: "22%", left: "20%" }} />
            <div className="absolute rounded-full bg-destructive/15 blur-3xl" style={{ width: 140, height: 140, top: "38%", left: "50%" }} />
            <div className="absolute rounded-full bg-primary/15 blur-3xl" style={{ width: 200, height: 200, top: "30%", left: "55%" }} />
            <div className="absolute rounded-full bg-primary/20 blur-3xl" style={{ width: 160, height: 160, top: "50%", left: "60%" }} />
          </div>
        )}

        {/* Mock route line */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 800">
          <path
            d="M 120 250 Q 180 350 200 400 Q 220 450 280 550"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="3"
            strokeDasharray="8 4"
            opacity="0.7"
          />
        </svg>

        {/* Markers */}
        {markers.map((m) => (
          <div
            key={m.id}
            className={`absolute w-4 h-4 rounded-full ${m.type === "danger" ? "danger-marker animate-pulse-danger" : "safe-marker animate-pulse-glow"}`}
            style={{ top: m.top, left: m.left, transform: "translate(-50%, -50%)" }}
          />
        ))}
      </div>

      {/* Top Bar */}
      <div className="relative z-10 px-4 pt-12 pb-3 flex items-center gap-3">
        <button
          onClick={() => navigate("/home")}
          className="flex h-11 w-11 items-center justify-center rounded-xl glass border border-border"
        >
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex-1 flex items-center gap-2 rounded-xl glass border border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Enter destination</span>
        </div>
      </div>

      {/* Floating buttons */}
      <div className="absolute right-4 top-32 z-10 flex flex-col gap-3">
        <button
          onClick={() => setHeatmap(!heatmap)}
          className={`flex h-11 items-center gap-2 rounded-xl glass border px-3 text-xs font-medium transition-all ${
            heatmap ? "border-primary text-primary" : "border-border text-foreground"
          }`}
        >
          <Layers className="h-4 w-4" />
          Heatmap
        </button>
        <button className="flex h-11 w-11 items-center justify-center rounded-xl glass border border-border">
          <LocateFixed className="h-5 w-5 text-primary" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute left-4 top-32 z-10 flex flex-col gap-2">
        <div className="flex items-center gap-2 rounded-lg glass border border-border px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="text-xs text-muted-foreground">Safe</span>
        </div>
        <div className="flex items-center gap-2 rounded-lg glass border border-border px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
          <span className="text-xs text-muted-foreground">Risk</span>
        </div>
      </div>

      {/* Bottom Info Card */}
      <div className="relative z-10 mt-auto">
        <div className="rounded-t-3xl bg-gradient-card border-t border-border px-5 pt-4 pb-8 animate-slide-up">
          {/* Drag handle */}
          <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-muted-foreground/30" />

          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-lg font-bold text-foreground">4h 20m</span>
                </div>
                <span className="text-xs text-muted-foreground">Route Time</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <Route className="h-4 w-4 text-muted-foreground" />
                  <span className="text-lg font-bold text-foreground">210 km</span>
                </div>
                <span className="text-xs text-muted-foreground">Distance</span>
              </div>
              <div className="h-8 w-px bg-border" />
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-lg font-bold text-foreground">7/10</span>
                </div>
                <span className="text-xs text-muted-foreground">Safety</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate("/navigation")}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-primary-foreground font-semibold text-base transition-all active:scale-[0.98] glow-green"
          >
            <Navigation className="h-5 w-5" />
            Start Navigation
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapScreen;
