// For the task list wrapper card
export const listVariants = {
  hidden: { scale: 0 },
  show: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 1,
      delayChildren: 0.25,
      staggerChildren: 0.25,
      when: "beforeChildren",
    },
  },
};

export const cardVariants = {
  hidden: {
    scale: 0,
  },
  visible: {
    scale: 1,
    transition: {
      type: "spring",
      duration: 1,
      bounce: 0.5,
    },
  },
};

// For the task tile wrapper div
export const tileVariants = {
  hidden: { opacity: 0, x: "-100px" },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      duration: 1,
    },
  },
};
