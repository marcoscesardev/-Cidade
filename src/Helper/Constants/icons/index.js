export const getCategoryIcon = (categoryName) => {
  const icons = {
    Segurança: "road",
    Saúde: "hospital",
  };

  const iconName = icons[categoryName] || "environment";
  return `/icons/${iconName}.png`;
};
