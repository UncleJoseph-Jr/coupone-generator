/* eslint-disable @typescript-eslint/no-unused-vars */
import QRCode from 'qrcode';

export const generateQRCode = async (text: string): Promise<string> => {
  try {
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error('Error generating QR Code:', err)
    throw new Error('Error generating QR code');
  }
};
