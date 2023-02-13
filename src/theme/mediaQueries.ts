export const deviceSizes = {
  mobile: '280',
  tablet: '650',
  desktop: '1024',
  desktopXl: '1280',
  desktop2xl: '1536',
};

const device = {
  mobile: `only screen and (min-width: ${deviceSizes.mobile}px)`,
  tablet: `only screen and (min-width: ${deviceSizes.tablet}px)`,
  desktop: `only screen and (min-width: ${deviceSizes.desktop}px)`,
  desktopXl: `only screen and (min-width: ${deviceSizes.desktopXl}px)`,
  desktop2xl: `only screen and (min-width: ${deviceSizes.desktop2xl}px)`,
};

export default device;
