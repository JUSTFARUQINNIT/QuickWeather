import React from "react";
import { Wind, Droplets, Sun } from "lucide-react";
import type { CurrentWeather } from "../types/weather";

interface TodayHighlightsProps {
  weather: CurrentWeather;
  unit: "C" | "F";
}

export const TodayHighlights: React.FC<TodayHighlightsProps> = ({
  weather,
  unit,
}) => {
  const getUVIndexLevel = (uvIndex: number) => {
    if (uvIndex <= 2) return { level: "Low", color: "#22c55e" };
    if (uvIndex <= 5) return { level: "Moderate", color: "#eab308" };
    if (uvIndex <= 7) return { level: "High", color: "#f97316" };
    if (uvIndex <= 10) return { level: "Very High", color: "#ef4444" };
    return { level: "Extreme", color: "#991b1b" };
  };

  const uvInfo = getUVIndexLevel(weather.uvIndex || 0);
  const uvValue = weather.uvIndex || 0;

  const rainChance =
    weather.humidity > 70
      ? Math.min(weather.humidity - 40, 90)
      : Math.max(weather.humidity - 20, 10);

  const windSpeed =
    unit === "C"
      ? (weather.windKph ?? weather.windSpeed)
      : (weather.windMph ?? weather.windSpeed);

  // Seeded bar heights for deterministic rendering (avoids Math.random re-renders)
  const rainBars = [18, 28, 14, 32, 22, 26, 38];
  const windBars = [30, 45, 25, 55, 40, 35, 60];

  // UV semicircle arc path (180° sweep)
  const radius = 36;
  const cx = 50;
  const cy = 50;
  const uvFraction = Math.min(uvValue / 10, 1);
  const angleRad = Math.PI * uvFraction; // 0 → PI
  const arcX = cx - radius * Math.cos(angleRad);
  const arcY = cy - radius * Math.sin(angleRad);

  return (
    <div className="today-highlights">
      <h2 className="highlights-title">Today's Highlights</h2>

      <div className="highlights-grid">
        {/* ── Chances of Rain ── */}
        <div className="highlight-card">
          <div className="highlight-header">
            <Droplets
              size={16}
              style={{ color: "var(--color-text-secondary)" }}
            />
            <span className="highlights-label">Chances of Rain</span>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "8px",
              marginTop: "8px",
            }}
          >
            {/* Day-labeled bars */}
            {(["Sun", "Mon", "Tue", "Wed"] as const).map((day, i) => (
              <div
                key={day}
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
              >
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "var(--color-text-secondary)",
                    width: "26px",
                  }}
                >
                  {day}
                </span>
                <div
                  style={{
                    flex: 1,
                    height: "6px",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${rainBars[i]}%`,
                      background: i === 3 ? "#4ade80" : "rgba(74,222,128,0.35)",
                      borderRadius: "3px",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "var(--color-text-secondary)",
                    width: "28px",
                    textAlign: "right",
                  }}
                >
                  {rainBars[i]}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── UV Index ── */}
        <div className="highlight-card">
          <div className="highlight-header">
            <Sun size={16} style={{ color: "var(--color-text-secondary)" }} />
            <span className="highlights-label">UV Index</span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "-30px",
            }}
          >
            <svg viewBox="0 0 100 56" width="120" height="102">
              {/* Track arc */}
              <path
                d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Filled arc */}
              <path
                d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${arcX} ${arcY}`}
                fill="none"
                stroke={uvInfo.color}
                strokeWidth="8"
                strokeLinecap="round"
              />
              {/* Center text */}
              <text
                x={cx}
                y={cy - 6}
                textAnchor="middle"
                fontSize="20"
                fontWeight="500"
                fill="white"
              >
                {uvValue}/10
              </text>
              <text
                x={cx}
                y={cy + 10}
                textAnchor="middle"
                fontSize="11"
                fontWeight="500"
                fill="var(--foreground)"
              >
                {uvInfo.level}
              </text>
            </svg>
          </div>
        </div>

        {/* ── Wind Status ── */}
        <div className="highlight-card">
          <div className="highlight-header">
            <Wind size={16} style={{ color: "var(--color-text-secondary)" }} />
            <span className="highlights-label">Wind Status</span>
          </div>

          <div style={{ marginTop: "50px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                gap: "3px",
                height: "52px",
              }}
            >
              {windBars.map((h, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${h}px`,
                    background:
                      i === windBars.length - 1
                        ? "#4ade80"
                        : "rgba(255,255,255,0.2)",
                    borderRadius: "2px 2px 0 0",
                  }}
                />
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "6px",
              }}
            >
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-secondary)",
                }}
              >
                {Math.round(windSpeed)} {unit === "C" ? "km/h" : "mph"}
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--color-text-secondary)",
                }}
              >
                3:00 pm
              </span>
            </div>
          </div>
        </div>

        {/* ── Humidity ── */}
        <div className="highlight-card">
          <div className="highlight-header">
            <Droplets
              size={16}
              style={{ color: "var(--color-text-secondary)" }}
            />
            <span className="highlights-label">Humidity</span>
          </div>

          <div style={{ marginTop: "8px" }}>
            {/* Cloud + rain icon placeholder */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "8px",
              }}
            >
              <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
                <ellipse
                  cx="24"
                  cy="16"
                  rx="14"
                  ry="9"
                  fill="rgba(255,255,255,0.15)"
                />
                <ellipse
                  cx="17"
                  cy="18"
                  rx="9"
                  ry="7"
                  fill="rgba(255,255,255,0.15)"
                />
                <ellipse
                  cx="31"
                  cy="18"
                  rx="8"
                  ry="6"
                  fill="rgba(255,255,255,0.15)"
                />
                {[14, 20, 26, 32].map((x, i) => (
                  <line
                    key={i}
                    x1={x}
                    y1="27"
                    x2={x - 3}
                    y2="37"
                    stroke="#60a5fa"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                ))}
              </svg>
            </div>

            <div
              style={{
                fontSize: "22px",
                fontWeight: 500,
                color: "white",
                marginBottom: "6px",
              }}
            >
              {weather.humidity}%
            </div>

            {/* Horizontal gauge bar */}
            <div
              style={{
                height: "6px",
                background: "rgba(255,255,255,0.1)",
                borderRadius: "3px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${weather.humidity}%`,
                  background: "#60a5fa",
                  borderRadius: "3px",
                  transition: "width 0.4s ease",
                }}
              />
            </div>

            <div
              style={{
                fontSize: "11px",
                color: "var(--foreground)",
                marginTop: "5px",
                textAlign: "right",
              }}
            >
              {weather.humidity < 30
                ? "Dry"
                : weather.humidity < 60
                  ? "Good Air Quality"
                  : "Humid"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
