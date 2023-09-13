export const dateFormat = (data) => {
  const dateObject = new Date(data);
  dateObject.setHours(dateObject.getHours()-3)

  const day = String(dateObject.getDate()).padStart(2, "0");
  const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Os monthes começam em 0, então somamos 1
  const year = dateObject.getFullYear();
  const hour = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  const dateFormatted = `${day}/${month}/${year} ${hour}:${minutes}:${seconds}`;
  return dateFormatted;
};
