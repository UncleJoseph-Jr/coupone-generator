/* eslint-disable @typescript-eslint/no-unused-vars */
import QRCode from 'qrcode';

export const generateQRCode = async (text: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    throw new Error('Error generating QR code');
  }
};
