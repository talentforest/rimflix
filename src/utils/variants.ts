const normal = {
  scale: 1,
};

const transition = {
  delay: 0.2,
  duration: 0.3,
  type: "tween",
};

export const smallVariants = {
  normal,
  hover: {
    scale: 1.02,
    zIndex: 2,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween",
    },
  },
};

export const bigVariants = {
  normal,
  hover: {
    scale: 1.15,
    zIndex: 2,
    transition,
  },
};

export const infoVariants = {
  normal: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    zIndex: 1,
    transition,
  },
};
