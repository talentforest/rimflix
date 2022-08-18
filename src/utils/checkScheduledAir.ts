const today = new Date().toISOString().split("T")[0];

export function checkScheduledAir(air_date: string) {
  if (!air_date) {
    return true;
  } else {
    return new Date(air_date) < new Date(`${today}`);
  }
}
