/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { generateCouponCode } from '@/lib/generateCouponCode';
import { generateQRCode } from '@/lib/generateQRCode';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === 'POST') {
      const { discount } = req.body;
      if (!discount || discount <= 0 || discount > 20) {
        return res.status(400).json({ message: 'Invalid discount' });
      }

      const code = generateCouponCode();
      const qrCode = await generateQRCode(code);

      const coupon = await prisma.coupon.create({
        data: {
          code,
          discount,
          remaining: discount,
        },
      });

      return res.status(201).json({ coupon, qrCode });
    } else if (req.method === 'GET') {
      try {
        const coupons = await prisma.coupon.findMany();
        return res.status(200).json(coupons);
      } catch (error) {
        console.error('Error Fetching Coupons:', error);
        return res.status(500).json({ message: 'Error Fetching Coupons'});
      }
    } else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error creating coupon:', error);
    return res.status(500).json({ message: 'Error creating coupon' });
  } finally {
    await prisma.$disconnect();
  }
}
