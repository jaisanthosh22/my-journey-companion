import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, TrendingUp, AlertTriangle, MapPin, ChevronRight } from "lucide-react";

const recentTrips = [
  { id: 1, from: "Coimbatore", to: "Madurai", date: "Feb 20, 2026", score: 8.2, risk: "Low" },
  { id: 2, from: "Chennai", to: "Bangalore", date: "Feb 18, 2026", score: 6.5, risk: "Medium" },
  { id: 3, from: "Hyderabad", to: "Vizag", date: "Feb 15, 2026", score: 9.1, risk: "Low" },
  { id: 4, from: "Mumbai", to: "Pune", date: "Feb 12, 2026", score: 5.3, risk: "High" },
  { id: 5, from: "Delhi", to: "Agra", date: "Feb 10, 2026", score: 7.0, risk: "Medium" },
];

const weeklyData = [4, 6, 5, 8, 7, 9, 7.8];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxVal = Math.max(...weeklyData);

const riskBadge = (risk: string) => {
  if (risk === "Low") return { bg: "bg-primary/15", text: "text-primary", dot: "bg-primary" };
  if (risk === "Medium") return { bg: "bg-warning/15", text: "text-warning", dot: "bg-warning" };
  return { bg: "bg-destructive/15", text: "text-destructive", dot: "bg-destructive" };
};

const TripHistoryScreen = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen flex-col bg-gradient-dark px-5 pt-12 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-in">
        <button onClick={() => navigate("/home")} className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Your Safety Insights</h1>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="mt-6 rounded-2xl bg-gradient-card border border-border p-5 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <p className="text-sm font-semibold text-foreground mb-4">Weekly Summary</p>
        <div className="grid grid-cols-3 gap-3">
          <div className="flex flex-col items-center rounded-xl bg-secondary/50 p-3">
            <MapPin className="h-4 w-4 text-primary mb-1" />
            <span className="text-lg font-bold text-foreground">5</span>
            <span className="text-[10px] text-muted-foreground">Trips</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-secondary/50 p-3">
            <Shield className="h-4 w-4 text-primary mb-1" />
            <span className="text-lg font-bold text-foreground">7.8</span>
            <span className="text-[10px] text-muted-foreground">Avg Score</span>
          </div>
          <div className="flex flex-col items-center rounded-xl bg-secondary/50 p-3">
            <AlertTriangle className="h-4 w-4 text-warning mb-1" />
            <span className="text-lg font-bold text-foreground">3</span>
            <span className="text-[10px] text-muted-foreground">Alerts</span>
          </div>
        </div>
      </div>

      {/* Safety Trend Chart */}
      <div className="mt-4 rounded-2xl bg-gradient-card border border-border p-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-foreground">Safety Trend</p>
          <div className="flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1">
            <TrendingUp className="h-3 w-3 text-primary" />
            <span className="text-[10px] font-semibold text-primary">+12%</span>
          </div>
        </div>

        {/* Simple bar chart */}
        <div className="flex items-end justify-between gap-2 h-28">
          {weeklyData.map((val, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full relative flex flex-col justify-end h-20">
                <div
                  className="w-full rounded-t-md bg-primary/80 transition-all"
                  style={{ height: `${(val / maxVal) * 100}%` }}
                />
              </div>
              <span className="text-[9px] text-muted-foreground">{weekDays[i]}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Your travel safety improved by <span className="text-primary font-medium">12%</span> this week
        </p>
      </div>

      {/* Recent Trips */}
      <div className="mt-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <p className="text-sm font-semibold text-foreground mb-3">Recent Trips</p>
        <div className="flex flex-col gap-2">
          {recentTrips.map((trip) => {
            const badge = riskBadge(trip.risk);
            return (
              <button
                key={trip.id}
                className="flex items-center gap-3 rounded-2xl bg-gradient-card border border-border p-4 text-left transition-all active:scale-[0.98]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary">
                  <MapPin className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{trip.from} → {trip.to}</p>
                  <p className="text-[10px] text-muted-foreground">{trip.date}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-bold text-foreground">{trip.score}<span className="text-[10px] text-muted-foreground">/10</span></span>
                  <span className={`inline-flex items-center gap-1 rounded-full ${badge.bg} px-2 py-0.5 text-[10px] font-semibold ${badge.text}`}>
                    <span className={`h-1 w-1 rounded-full ${badge.dot}`} />
                    {trip.risk}
                  </span>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TripHistoryScreen;
