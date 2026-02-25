import { useNavigate } from "react-router-dom";
import {
  User, Shield, MapPin, Route, Bell, Mic, ShieldCheck, Share2,
  Phone, Pencil, Home, Map, Clock, ChevronRight, AlertTriangle,
  TrendingUp, PhoneCall,
} from "lucide-react";
import { useState } from "react";

const ProfileScreen = () => {
  const navigate = useNavigate();

  const [prefs, setPrefs] = useState({
    nightAlerts: true,
    voiceCompanion: true,
    womenSafety: false,
    shareLive: true,
  });

  const toggle = (key: keyof typeof prefs) =>
    setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const stats = [
    { icon: Route, label: "Trips Completed", value: "18", color: "text-primary" },
    { icon: TrendingUp, label: "Avg Safety Score", value: "8.4/10", color: "text-primary" },
    { icon: MapPin, label: "Safe Routes Chosen", value: "14", color: "text-primary" },
    { icon: AlertTriangle, label: "Risk Alerts Avoided", value: "6", color: "text-destructive" },
  ];

  const toggleItems = [
    { key: "nightAlerts" as const, icon: Bell, label: "Night Travel Alerts" },
    { key: "voiceCompanion" as const, icon: Mic, label: "AI Voice Companion" },
    { key: "womenSafety" as const, icon: ShieldCheck, label: "Women Safety Mode" },
    { key: "shareLive" as const, icon: Share2, label: "Share Live Location" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-gradient-dark px-5 pt-12 pb-24">
      {/* Profile Header */}
      <section className="flex flex-col items-center animate-fade-in">
        <div className="relative">
          <div className="h-24 w-24 rounded-full bg-secondary border-2 border-primary/40 flex items-center justify-center overflow-hidden glow-green">
            <User className="h-12 w-12 text-muted-foreground" />
          </div>
          <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center border-2 border-background">
            <Shield className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
        </div>

        <h1 className="mt-4 text-xl font-bold text-foreground">Arjun Mehta</h1>

        <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
          <Shield className="h-3 w-3" />
          Safety Explorer
        </span>

        <button className="mt-4 rounded-xl border border-border px-5 py-2 text-xs font-medium text-muted-foreground transition-all active:scale-[0.97] hover:border-primary/40 hover:text-foreground">
          <Pencil className="inline h-3 w-3 mr-1.5 -mt-px" />
          Edit Profile
        </button>
      </section>

      {/* Safety Statistics */}
      <section
        className="mt-7 rounded-2xl bg-gradient-card border border-border p-5 animate-fade-in-up"
        style={{ animationDelay: "0.15s" }}
      >
        <p className="text-sm font-semibold text-foreground mb-4">Safety Statistics</p>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary/70`}>
                <s.icon className={`h-4 w-4 ${s.color}`} />
              </div>
              <div>
                <p className="text-base font-bold text-foreground leading-tight">{s.value}</p>
                <p className="text-[10px] text-muted-foreground">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Preferences */}
      <section
        className="mt-5 rounded-2xl bg-gradient-card border border-border p-5 animate-fade-in-up"
        style={{ animationDelay: "0.25s" }}
      >
        <p className="text-sm font-semibold text-foreground mb-4">Safety Preferences</p>
        <div className="flex flex-col gap-4">
          {toggleItems.map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <item.icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{item.label}</span>
              </div>
              <button
                onClick={() => toggle(item.key)}
                className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                  prefs[item.key] ? "bg-primary" : "bg-secondary"
                }`}
              >
                <span
                  className={`inline-block h-4.5 w-4.5 rounded-full bg-foreground shadow-md transition-transform ${
                    prefs[item.key] ? "translate-x-[22px]" : "translate-x-[3px]"
                  }`}
                  style={{ width: 18, height: 18 }}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency Contact */}
      <section
        className="mt-5 rounded-2xl bg-gradient-card border border-border p-5 animate-fade-in-up"
        style={{ animationDelay: "0.35s" }}
      >
        <p className="text-sm font-semibold text-foreground mb-4">Emergency Contact</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Ravi Kumar</p>
              <p className="text-xs text-muted-foreground">+91 98765 40000</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-xl border border-border px-3 py-1.5 text-[10px] font-medium text-muted-foreground transition-all active:scale-[0.97] hover:border-primary/40">
              Edit Contact
            </button>
            <button className="flex items-center gap-1 rounded-xl bg-destructive/15 border border-destructive/30 px-3 py-1.5 text-[10px] font-semibold text-destructive transition-all active:scale-[0.97]">
              <PhoneCall className="h-3 w-3" />
              Quick Call
            </button>
          </div>
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-border bg-background/90 backdrop-blur-xl px-2 py-2.5">
        {[
          { icon: Home, label: "Home", path: "/home" },
          { icon: Map, label: "Map", path: "/map" },
          { icon: Clock, label: "History", path: "/history" },
          { icon: User, label: "Profile", path: "/profile" },
        ].map((tab) => {
          const isActive = tab.path === "/profile";
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
    </main>
  );
};

export default ProfileScreen;
