interface SafetyIndicatorProps {
  safety: number | null;
}

export default function SafetyIndicator({ safety }: SafetyIndicatorProps) {
  if (safety == null) {
    return (
      <div className="safety-indicator neutral">
        <span className="label">Safety</span>
        <span className="value">--</span>
      </div>
    );
  }

  let level: "low" | "medium" | "high";
  if (safety >= 75) {
    level = "high";
  } else if (safety >= 50) {
    level = "medium";
  } else {
    level = "low";
  }

  return (
    <div className={`safety-indicator ${level}`}>
      <span className="label">Safety</span>
      <span className="value">{safety}%</span>
    </div>
  );
}

