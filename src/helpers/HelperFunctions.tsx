export const capatalizeFirst = (str: string): string => {
  if (str !== "") {
    if (str.length === 1) return str.toUpperCase();

    return str.charAt(0).toUpperCase() + str.substring(1, str.length);
  }
  return "";
};

export const lowerFirst = (str: string): string => {
  if (str !== "") {
    if (str.length === 1) return str.toLocaleLowerCase();

    return str.charAt(0).toLocaleLowerCase() + str.substring(1, str.length);
  }
  return "";
};

