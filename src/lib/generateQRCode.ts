/* eslint-disable @typescript-eslint/no-unused-vars */
import QRCode from 'qrcode';

export const generateQRCode = async (text: string): Promise<string> => {
  try {
    // Generate the QR code as a base64 image URL
    return await QRCode.toDataURL(text);
  } catch (err) {
    console.error('Error generating QR Code:', err)
    throw new Error('Error generating QR code');
  }
};
