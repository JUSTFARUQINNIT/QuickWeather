import { motion } from "framer-motion";
import { Cloud } from "lucide-react";

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="loading-state"
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Cloud size={48} className="loading-state__icon" />
      </motion.div>
      <p className="loading-state__text">Fetching weather data...</p>
    </motion.div>
  );
}
