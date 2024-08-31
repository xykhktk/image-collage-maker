export default function calculateAspectRatio(
  widthRatio: number,
  heightRatio: number,
  wrapperWidth: number,
  wrapperHeight: number,
) {

  return {
    height: Math.round((wrapperWidth * heightRatio) / widthRatio),
    width: wrapperWidth,
  }
}
