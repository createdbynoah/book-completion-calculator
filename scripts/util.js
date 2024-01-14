function calculatePercentageComplete(
  durationComplete,
  durationRemaining,
  totalDuration
) {
  let totalSeconds;
  if (totalDuration) {
    // Use provided total duration directly
    totalSeconds = toSeconds(totalDuration);
  } else {
    // Calculate total duration from complete and remaining
    totalSeconds = toSeconds(durationComplete) + toSeconds(durationRemaining);
  }

  // Calculate percentage complete
  const completeSeconds = toSeconds(durationComplete);
  const percentageComplete = (completeSeconds / totalSeconds) * 100;

  console.log(`Percentage complete: ${percentageComplete.toFixed(2)}%`);
  return percentageComplete.toFixed(2); // Round to two decimal places
}

function toSeconds(durationString) {
  const [hours, minutes, seconds] = durationString.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

export { calculatePercentageComplete };
