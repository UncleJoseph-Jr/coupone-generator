export const generateCouponCode = (): string => {
    const characters = '0123456789';
    let result = '';

    // Loop to create a 13-character long coupon code
    for (let i = 0; i < 13; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result; // Return the generated code
  };
  