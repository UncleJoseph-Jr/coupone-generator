export const generateCouponCode = (): string => {
    const characters = '0123456789';
    let result = '';
    for (let i = 0; i < 13; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };
  