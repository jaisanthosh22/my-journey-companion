export interface Trip {
  id: number;
  from: string;
  to: string;
  date: string;
  score: number;
  risk: "Low" | "Medium" | "High";
}

export const recentTrips: Trip[] = [
  { id: 1, from: "Coimbatore", to: "Madurai", date: "Feb 20, 2026", score: 8.2, risk: "Low" },
  { id: 2, from: "Chennai", to: "Bangalore", date: "Feb 18, 2026", score: 6.5, risk: "Medium" },
  { id: 3, from: "Hyderabad", to: "Vizag", date: "Feb 15, 2026", score: 9.1, risk: "Low" },
  { id: 4, from: "Mumbai", to: "Pune", date: "Feb 12, 2026", score: 5.3, risk: "High" },
  { id: 5, from: "Delhi", to: "Agra", date: "Feb 10, 2026", score: 7.0, risk: "Medium" },
];

export function computeSafetyStats(trips: Trip[]) {
  const total = trips.length;
  const avgScore = total > 0
    ? (trips.reduce((sum, t) => sum + t.score, 0) / total).toFixed(1)
    : "0.0";
  const safeRoutes = trips.filter((t) => t.risk === "Low").length;
  const riskAlertsAvoided = trips.filter((t) => t.risk === "High").length;

  return {
    tripsCompleted: total,
    avgSafetyScore: `${avgScore}/10`,
    safeRoutesChosen: safeRoutes,
    riskAlertsAvoided,
  };
}
