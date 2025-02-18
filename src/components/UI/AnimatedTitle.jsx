import { motion } from "framer-motion";

const fadeInUp = (delay = 0.2) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration: 0.5 },
  viewport: { once: true },
});

const AnimatedTitle = ({ as: Tag = "h2", className = "", delay = 0.2, children }) => (
  <motion.div {...fadeInUp(delay)}>
    <Tag className={className}>{children}</Tag>
  </motion.div>
);

export default AnimatedTitle;
