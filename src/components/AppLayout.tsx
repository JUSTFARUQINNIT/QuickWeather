import type { ReactNode } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

interface AppLayoutProps {
  logoSrc: string;
  title: string;
  headerRight: ReactNode;
  footerText: string;
  children: ReactNode;
  style?: React.CSSProperties;
}

export function AppLayout({
  // logoSrc,
  // title,
  headerRight,
  footerText,
  children,
  style,
}: AppLayoutProps) {
  return (
    <div className="app-wrapper" style={style}>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="app-header"
      >
        <div className="logo-brand">
          <img
            src={logo}
            className="logo-img"
            style={{ width: "40px", height: "40px" }}
          />
          <h2>QuickWeather</h2>
        </div>
        {headerRight}
      </motion.header>

      <main className="app-main">
        {children}
        <p className="app-footer-text">{footerText}</p>
      </main>
    </div>
  );
}
