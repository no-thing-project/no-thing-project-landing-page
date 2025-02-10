export const fadeInAnimation = ({
  delay = 0.2,
  opacityY = 20,
  duration = 0.5,
}) => ({
  initial: { opacity: 0, y: opacityY },
  whileInView: { opacity: 1, y: 0 },
  transition: { delay, duration },
  viewport: { once: true },
});