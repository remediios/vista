export const formatDate = (date: Date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = String(date.getFullYear() % 100).padStart(2, '0');

  return `${day}/${month}/${year}`;
};

export const daysRemaining = (date: Date) => {
  const currentDate = new Date();
  const timeDifference = date.getTime() - currentDate.getTime();
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return days;
};
