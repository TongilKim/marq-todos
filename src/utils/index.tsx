export const getCurrentDate = () => {
  const todayDate = new Date().toLocaleString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return todayDate;
};

export const getCurrentDayName = () => {
  const dayName = new Date().toLocaleString("ko-KR", { weekday: "long" });

  return dayName;
};

export const populateNewId = () => {
  return Math.random().toString(36).substring(2, 16);
};
