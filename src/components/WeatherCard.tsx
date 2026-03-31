// import { motion } from "framer-motion";
// import { Clock, Droplets, Eye, Gauge, MapPin, Wind } from "lucide-react";
// import type { CurrentWeather } from "../types/weather";
// import { WeatherIcon } from "../components/WeatherIcon";

// interface WeatherCardProps {
//   data: CurrentWeather;
//   unit: "C" | "F";
// }

// export function WeatherCard({ data, unit }: WeatherCardProps) {
//   const temp = unit === "C" ? data.tempC : data.tempF;
//   const feelsLike = unit === "C" ? data.feelsLikeC : data.feelsLikeF;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.4, ease: "easeOut" }}
//       className="glass-card weather-card"
//     >
//       <div className="weather-card__header">
//         <div className="weather-card__location">
//           <MapPin size={16} />
//           <span>
//             {data.city}, {data.country}
//           </span>
//         </div>
//         <div className="weather-card__time">
//           <Clock size={16} />
//           <span>
//             {data.localTime} {data.timezone}
//           </span>
//         </div>
//       </div>

//       <div className="weather-card__main">
//         <div>
//           <motion.p
//             key={`${temp}-${unit}`}
//             initial={{ opacity: 0, x: -10 }}
//             animate={{ opacity: 1, x: 0 }}
//             className="weather-card__temp"
//           >
//             {temp}°<span className="weather-card__temp-unit">{unit}</span>
//           </motion.p>
//           <p className="weather-card__feels-like">
//             Feels like {feelsLike}°{unit}
//           </p>
//         </div>
//         <motion.div
//           initial={{ rotate: -20, opacity: 0 }}
//           animate={{ rotate: 0, opacity: 1 }}
//           transition={{ delay: 0.2 }}
//         >
//           <WeatherIcon condition={data.condition} size={80} />
//         </motion.div>
//       </div>

//       <div>
//         <span className="weather-card__condition-badge">
//           {data.conditionLabel}
//         </span>
//       </div>

//       <div className="weather-card__details">
//         <DetailItem
//           icon={Droplets}
//           label="Humidity"
//           value={`${data.humidity}%`}
//         />
//         <DetailItem icon={Wind} label="Wind" value={`${data.windSpeed} km/h`} />
//         <DetailItem
//           icon={Eye}
//           label="Visibility"
//           value={`${data.visibility} km`}
//         />
//         <DetailItem
//           icon={Gauge}
//           label="Pressure"
//           value={`${data.pressure} hPa`}
//         />
//       </div>
//     </motion.div>
//   );
// }

// function DetailItem({
//   icon: Icon,
//   label,
//   value,
// }: {
//   icon: React.ElementType;
//   label: string;
//   value: string;
// }) {
//   return (
//     <div className="detail-item">
//       <Icon size={18} className="detail-item__icon" />
//       <div>
//         <p className="detail-item__label">{label}</p>
//         <p className="detail-item__value">{value}</p>
//       </div>
//     </div>
//   );
// }
