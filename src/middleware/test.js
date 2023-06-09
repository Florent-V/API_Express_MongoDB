
function calculateDaysBetweenDates(begin, end)  {

  const beginDate = new Date(begin);
  const endDate = new Date(end);

  const timeDiff = Math.abs(endDate.getTime() - beginDate.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

  return diffDays;
}