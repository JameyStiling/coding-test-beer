export const calcScreenType = () => {
  const breakpointMobile = 480;
  const breakpointDesktop = 1024;
  const currentWidth = window.innerWidth;
  return currentWidth < breakpointMobile
    ? "mobile"
    : currentWidth > breakpointDesktop
    ? "desktop"
    : "tablet";
};
