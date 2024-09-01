export const isEmailValid = (email: string): boolean => {
  const exp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const regexp = new RegExp(exp);
  return regexp.test(email);
};
