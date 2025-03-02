import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AnimatedLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => (
  <motion.div whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
    <Link to={to}>{children}</Link>
  </motion.div>
);

export default AnimatedLink;
