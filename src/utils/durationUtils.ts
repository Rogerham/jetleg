
/**
 * Parses flight duration string into minutes for comparison
 * Handles formats like "2h 30m", "1h 45min", "45m", "3h", etc.
 */
export const parseDurationToMinutes = (duration: string): number => {
  if (!duration) return 0;
  
  // Remove extra spaces and convert to lowercase
  const cleanDuration = duration.toLowerCase().trim();
  
  let totalMinutes = 0;
  
  // Match hours (h or hour/hours)
  const hoursMatch = cleanDuration.match(/(\d+)\s*h(?:our)?s?/);
  if (hoursMatch) {
    totalMinutes += parseInt(hoursMatch[1]) * 60;
  }
  
  // Match minutes (m, min, minute/minutes)
  const minutesMatch = cleanDuration.match(/(\d+)\s*m(?:in)?(?:ute)?s?/);
  if (minutesMatch) {
    totalMinutes += parseInt(minutesMatch[1]);
  }
  
  return totalMinutes;
};

/**
 * Formats minutes back to duration string
 */
export const formatMinutesToDuration = (minutes: number): string => {
  if (minutes === 0) return '0m';
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h ${mins}m`;
  }
};
