export const getInitialsFromFullName = (fullName: string) => {
  const words = fullName.trim().split(" ");
  return words.map((word) => word[0].toUpperCase()).join("");
};
