export function convertRunningTime(min: number) {
  const hour = Math.floor(min / 60);
  const minute = min - hour * 60;

  if (min > 60) {
    return `${hour}h ${minute}m`;
  } else {
    return `${min}min`;
  }
}
