export const convertMinutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h${remainingMinutes > 0 ? ` ${remainingMinutes}m` : ""}`;
};
