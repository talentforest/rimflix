export function convertRunningTime(min: number, language: string) {
  const hour = Math.floor(min / 60);
  const minute = min - hour * 60;
  if (!min) return;
  if (min > 60)
    return language === "ko"
      ? `${hour}시간 ${minute}분`
      : `${hour}h ${minute}m`;
  return language === "ko" ? `${min}분` : `${min}m`;
}
