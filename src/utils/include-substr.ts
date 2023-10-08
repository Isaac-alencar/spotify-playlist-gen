const format = (str: string) => str.toLowerCase();
export const includesSubstr = (right: string, left: string) => {
  return format(right).includes(format(left));
};
