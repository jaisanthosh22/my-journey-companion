import { Shield, MapPin, Bot, AlertTriangle, Navigation, ChevronRight, Route, Mic, Brain, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AboutScreen = () => {
  const navigate = useNavigate();

  const aiFeatures = [
    { icon: Mic, title: "Real-Time Voice Guidance", desc: "Hands-free audio directions that speak up at every critical turn, keeping your eyes on the road and your mind at ease." },
    { icon: Heart, title: "Emotional Reassurance", desc: "Calm, supportive prompts when you enter unfamiliar territory — your AI companion ensures you never feel alone on the road." },
    { icon: Route, title: "Smart Rerouting", desc: "Automatically suggests safer alternative routes when risk levels spike ahead, so you always have an escape plan." },
    { icon: AlertTriangle, title: "Instant Risk Alerts", desc: "Proactive warnings before you approach crime-prone zones, giving you time to adjust your route or stay vigilant." },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-gradient-dark px-5 pt-14 pb-28">
      {/* Hero */}
      <header className="animate-fade-in text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 glow-green">
          <Shield className="h-8 w-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">About MyJourneyCompanion</h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
          Smart Safety Navigation that keeps you protected on every journey.
        </p>
      </header>

      {/* What We Do */}
      <section className="mt-8 animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">What We Do</h2>
        <div className="rounded-2xl bg-gradient-card border border-border p-5 space-y-4">
          <p className="text-sm text-foreground/90 leading-relaxed">
            Our Smart Safety Navigation Web App calculates the <span className="font-semibold text-primary">best and safest route</span> between any two locations while giving you a clear picture of the safety landscape along the way.
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed">
            The map highlights <span className="font-semibold text-destructive">crime-prone areas in red</span> and <span className="font-semibold text-primary">safe zones in green</span>, so you can make informed decisions before and during your trip.
          </p>
        </div>
      </section>

      {/* Example Route */}
      <section className="mt-5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Example Route</h2>
        <div className="rounded-2xl bg-gradient-card border border-border p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15">
              <Navigation className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-semibold">Coimbatore → Madurai</p>
              <p className="text-xs text-muted-foreground">~210 km • NH-44</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-3 w-3 rounded-full bg-primary shrink-0" style={{ boxShadow: "0 0 8px hsl(var(--primary) / 0.5)" }} />
              <div>
                <p className="text-sm font-medium text-foreground">Safe Zones</p>
                <p className="text-xs text-muted-foreground">Well-lit highways, police checkpoints, and populated rest stops marked in green along the route.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-3 w-3 rounded-full bg-destructive shrink-0" style={{ boxShadow: "0 0 8px hsl(var(--destructive) / 0.5)" }} />
              <div>
                <p className="text-sm font-medium text-foreground">Risk Areas</p>
                <p className="text-xs text-muted-foreground">Isolated stretches and historically crime-prone zones flagged in red so you stay alert or reroute.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-3 w-3 rounded-full bg-caution shrink-0" style={{ boxShadow: "0 0 8px hsl(var(--caution) / 0.5)" }} />
              <div>
                <p className="text-sm font-medium text-foreground">Caution Zones</p>
                <p className="text-xs text-muted-foreground">Medium-risk areas where extra vigilance is recommended, especially during night travel.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI Companion */}
      <section className="mt-5 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">AI Companion Voice</h2>
        <div className="rounded-2xl bg-primary/10 border border-primary/20 p-5 mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
              <Bot className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-semibold">Your Intelligent Co-Pilot</p>
              <p className="text-xs text-muted-foreground">Always listening, always protecting</p>
            </div>
          </div>
          <p className="text-sm text-foreground/90 leading-relaxed">
            Our AI Companion Voice is more than navigation — it's a <span className="font-semibold text-primary">trusted travel partner</span> that ensures you feel safe, aware, and confident throughout your entire journey.
          </p>
        </div>

        <div className="space-y-3">
          {aiFeatures.map((f, i) => (
            <div key={i} className="flex items-start gap-3 rounded-2xl bg-gradient-card border border-border p-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 shrink-0">
                <f.icon className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{f.title}</p>
                <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <button
        onClick={() => navigate("/map")}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-primary-foreground font-semibold text-lg transition-all active:scale-[0.98] glow-green animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      >
        Try It Now
        <ChevronRight className="h-5 w-5" />
      </button>
    </main>
  );
};

export default AboutScreen;
