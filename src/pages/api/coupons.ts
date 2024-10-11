/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { generateCouponCode } from '@/lib/generateCouponCode';
import { generateQRCode } from '@/lib/generateQRCode';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { discount } = req.body;

    if (!discount || discount > 20) {
      return res.status(400).json({ message: 'Invalid discount' });
    }

    const code = generateCouponCode();
    const qrCode = await generateQRCode(code);

    try {
      const coupon = await prisma.coupon.create({
        data: {
          code,
          discount,
          remaining: discount,
        },
      });
      return res.status(201).json({ coupon, qrCode });
    } catch (error) {
      return res.status(500).json({ message: 'Error creating coupon' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
