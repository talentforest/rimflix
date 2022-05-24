export const deviceSizes = {
  mobile: "500",
  tablet: "1023",
  desktop: "3000",
};

const device = {
  mobile: `only screen and (max-width: ${deviceSizes.mobile}px)`,
  tablet: `only screen and (max-width: ${deviceSizes.tablet}px)`,
  desktop: `only screen and (max-width: ${deviceSizes.desktop}px)`,
};

export default device;
