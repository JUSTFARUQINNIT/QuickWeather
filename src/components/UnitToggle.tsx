import { motion } from "framer-motion";

interface UnitToggleProps {
  unit: "C" | "F";
  onToggle: (unit: "C" | "F") => void;
}

export function UnitToggle({ unit, onToggle }: UnitToggleProps) {
  return (
    <div className="unit-toggle">
      {(["C", "F"] as const).map((u) => (
        <button
          key={u}
          onClick={() => onToggle(u)}
          className={`unit-toggle__btn ${unit === u ? "unit-toggle__btn--active" : ""}`}
        >
          {unit === u && (
            <motion.div
              layoutId="unit-bg"
              className="unit-toggle__indicator"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          °{u}
        </button>
      ))}
    </div>
  );
}
