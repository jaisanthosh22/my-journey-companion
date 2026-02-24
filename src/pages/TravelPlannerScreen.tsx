import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Sun, Sunset, Moon, Brain, ChevronRight, Clock } from "lucide-react";

// Mock safety data for dates
const getDateSafety = (day: number): "safe" | "moderate" | "danger" => {
  const safedays = [1, 2, 4, 5, 7, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
  const moderatedays = [3, 9, 13, 17, 21, 25, 29];
  if (safedays.includes(day)) return "safe";
  if (moderatedays.includes(day)) return "moderate";
  return "danger";
};

const timeSlots = [
  { id: "morning", label: "Morning", time: "6 AM – 12 PM", icon: Sun, risk: "Low", riskColor: "primary" },
  { id: "afternoon", label: "Afternoon", time: "12 PM – 6 PM", icon: Sunset, risk: "Low", riskColor: "primary" },
  { id: "night", label: "Night", time: "6 PM – 12 AM", icon: Moon, risk: "Medium", riskColor: "warning" },
] as const;

const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const TravelPlannerScreen = () => {
  const navigate = useNavigate();
  const now = new Date();
  const [currentMonth, setCurrentMonth] = useState(now.getMonth());
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(now.getDate());
  const [selectedTime, setSelectedTime] = useState<string>("morning");

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays: (number | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) calendarDays.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendarDays.push(i);

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); }
    else setCurrentMonth(currentMonth - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); }
    else setCurrentMonth(currentMonth + 1);
  };

  const safetyDotColor = (safety: "safe" | "moderate" | "danger") => {
    if (safety === "safe") return "bg-primary";
    if (safety === "moderate") return "bg-warning";
    return "bg-destructive";
  };

  const selectedTimeSlot = timeSlots.find((t) => t.id === selectedTime)!;

  return (
    <div className="flex min-h-screen flex-col bg-gradient-dark px-5 pt-12 pb-8">
      {/* Header */}
      <div className="flex items-center gap-3 animate-fade-in">
        <button onClick={() => navigate("/home")} className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary">
          <ArrowLeft className="h-5 w-5 text-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-bold text-foreground">Plan a Safe Journey</h1>
          <p className="text-xs text-muted-foreground">Choose your travel date and time</p>
        </div>
      </div>

      {/* Calendar */}
      <div className="mt-6 rounded-2xl bg-gradient-card border border-border p-4 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="h-8 w-8 flex items-center justify-center rounded-lg bg-secondary text-foreground">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm font-semibold text-foreground">{months[currentMonth]} {currentYear}</span>
          </div>
          <button onClick={nextMonth} className="h-8 w-8 flex items-center justify-center rounded-lg bg-secondary text-foreground">
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Day headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((d) => (
            <div key={d} className="text-center text-[10px] font-medium text-muted-foreground">{d}</div>
          ))}
        </div>

        {/* Day cells */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, i) => {
            if (day === null) return <div key={`empty-${i}`} />;
            const safety = getDateSafety(day);
            const isSelected = day === selectedDay;
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`relative flex flex-col items-center justify-center h-10 rounded-xl text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-primary/20 text-primary ring-1 ring-primary/50 shadow-[0_0_12px_hsl(162_100%_39%/0.3)]"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {day}
                <span className={`absolute bottom-1 h-1 w-1 rounded-full ${safetyDotColor(safety)}`} />
              </button>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-4 mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary" /><span className="text-[10px] text-muted-foreground">Safe</span></div>
          <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-warning" /><span className="text-[10px] text-muted-foreground">Moderate</span></div>
          <div className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-destructive" /><span className="text-[10px] text-muted-foreground">High Risk</span></div>
        </div>
      </div>

      {/* Time Selection */}
      <div className="mt-4 rounded-2xl bg-gradient-card border border-border p-4 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="h-4 w-4 text-primary" />
          <p className="text-sm font-semibold text-foreground">Select Travel Time</p>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((slot) => {
            const Icon = slot.icon;
            const isActive = selectedTime === slot.id;
            return (
              <button
                key={slot.id}
                onClick={() => setSelectedTime(slot.id)}
                className={`flex flex-col items-center gap-1.5 rounded-xl p-3 transition-all ${
                  isActive
                    ? "bg-primary/15 ring-1 ring-primary/50"
                    : "bg-secondary/50 hover:bg-secondary"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                <span className={`text-xs font-medium ${isActive ? "text-foreground" : "text-muted-foreground"}`}>{slot.label}</span>
                <span className="text-[10px] text-muted-foreground">{slot.time}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-secondary/50 py-2">
          <span className={`h-2 w-2 rounded-full ${selectedTimeSlot.riskColor === "primary" ? "bg-primary" : "bg-warning"}`} />
          <span className="text-xs text-muted-foreground">
            {selectedTimeSlot.label} Travel Risk: <span className={`font-semibold ${selectedTimeSlot.riskColor === "primary" ? "text-primary" : "text-warning"}`}>{selectedTimeSlot.risk}</span>
          </span>
        </div>
      </div>

      {/* AI Recommendation */}
      <div className="mt-4 rounded-2xl bg-gradient-card border border-primary/20 p-4 animate-fade-in-up shadow-[0_0_20px_hsl(162_100%_39%/0.08)]" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/15">
            <Brain className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">AI Safety Suggestion</p>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
              Based on historical data, the safest departure window is{" "}
              <span className="text-primary font-medium">6:00 AM – 5:00 PM</span>. Avoid late-night travel on this route for optimal safety.
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1" />

      {/* CTA */}
      <button
        onClick={() => navigate("/map")}
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-primary-foreground font-semibold text-lg transition-all active:scale-[0.98] glow-green animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        View Safe Route
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
};

export default TravelPlannerScreen;
