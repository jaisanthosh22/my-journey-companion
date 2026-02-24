import { useNavigate } from "react-router-dom";
import { Shield, MapPin, ChevronRight } from "lucide-react";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-dark px-5 pt-14 pb-8">
      {/* Greeting */}
      <div className="animate-fade-in">
        <p className="text-muted-foreground text-sm font-medium">Good evening</p>
        <h1 className="text-2xl font-bold text-foreground mt-1">Welcome back 👋</h1>
      </div>

      {/* Safety Summary Card */}
      <div
        className="mt-8 rounded-2xl bg-gradient-card border border-border p-5 animate-fade-in-up"
        style={{ animationDelay: "0.15s" }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium">Today's Safety</p>
            <p className="text-foreground font-semibold">Your Area Overview</p>
          </div>
        </div>

        <div className="flex items-center justify-between">
          {/* Safety Score */}
          <div className="flex flex-col items-center">
            <div className="relative flex h-20 w-20 items-center justify-center">
              <svg className="absolute h-full w-full -rotate-90" viewBox="0 0 80 80">
                <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--muted))" strokeWidth="6" />
                <circle
                  cx="40" cy="40" r="34" fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={`${0.8 * 2 * Math.PI * 34} ${2 * Math.PI * 34}`}
                />
              </svg>
              <span className="text-2xl font-bold text-foreground">8<span className="text-sm text-muted-foreground">/10</span></span>
            </div>
            <p className="mt-1 text-xs text-muted-foreground">Safety Score</p>
          </div>

          {/* Divider */}
          <div className="h-16 w-px bg-border" />

          {/* Risk Level */}
          <div className="flex flex-col items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1.5 text-xs font-semibold text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Low Risk
            </span>
            <p className="text-xs text-muted-foreground">Current Level</p>
          </div>

          {/* Divider */}
          <div className="h-16 w-px bg-border" />

          {/* Alerts */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-2xl font-bold text-foreground">2</span>
            <p className="text-xs text-muted-foreground">Alerts Nearby</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div
        className="mt-5 grid grid-cols-2 gap-3 animate-fade-in-up"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="rounded-2xl bg-gradient-card border border-border p-4">
          <MapPin className="h-5 w-5 text-primary mb-2" />
          <p className="text-lg font-bold text-foreground">12</p>
          <p className="text-xs text-muted-foreground">Safe Zones Nearby</p>
        </div>
        <div className="rounded-2xl bg-gradient-card border border-border p-4">
          <Shield className="h-5 w-5 text-destructive mb-2" />
          <p className="text-lg font-bold text-foreground">3</p>
          <p className="text-xs text-muted-foreground">Risk Areas Flagged</p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* CTA Button */}
      <button
        onClick={() => navigate("/map")}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-primary-foreground font-semibold text-lg transition-all active:scale-[0.98] glow-green animate-fade-in-up"
        style={{ animationDelay: "0.45s" }}
      >
        Open Safety Map
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default HomeScreen;
