const handleSwipers = (
  swiperSide,
  leftMax,
  rightMax,
  filter,
  setLeftMax,
  setRightMax,
) => {
  if (swiperSide === "Left" && leftMax > 0) {
    const newLeft = Math.max(0, leftMax - 10);
    setLeftMax(newLeft);
    setRightMax(newLeft + 10);
  }
  if (swiperSide === "Right" && rightMax < filter.length) {
    const newLeft = leftMax + 10;
    setLeftMax(newLeft);
    setRightMax(Math.min(newLeft + 10, filter.length));
  }
};

export default handleSwipers;
