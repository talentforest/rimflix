const normal = {
  scale: 1,
};

const transition = {
  delay: 0.2,
  duration: 0.3,
  type: 'tween',
};

export const smallVariants = {
  normal,
  hover: {
    scale: 1.02,
    zIndex: 2,
    transition,
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

export const colors = [
  '#3498db',
  '#34495e',
  '#27ae60',
  '#8e44ad',
  '#f1c40f',
  '#e74c3c',
  '#95a5a6',
  '#d35400',
  '#bdc3c7',
  '#e67e22',
];
