export const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeUpSmall = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.68, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] },
  },
};

export const floatLoop = {
  y: [0, -15, 0],
  transition: {
    duration: 5.5,
    repeat: Infinity,
    ease: "easeInOut",
  },
};

export const staggerContainer = (stagger = 0.16) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: 0.12 },
  },
});

export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "-40px",
};
