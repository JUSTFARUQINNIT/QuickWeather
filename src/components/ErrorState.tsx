import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="error-state glass-card"
    >
      <AlertTriangle size={32} className="error-state__icon" color="red" />
      <p className="error-state__message">{message}</p>
      {onRetry && (
        <button onClick={onRetry} className="error-state__retry">
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </motion.div>
  );
}
