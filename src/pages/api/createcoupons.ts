import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { generateCouponCode } from '@/lib/generateCouponCode';
import { generateQRCode } from '@/lib/generateQRCode';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { points } = req.body;

    if (!points || points <= 0) {
      return res.status(400).json({ message: 'Invalid points value' });
    }

    const code = generateCouponCode();
    const qrCode = await generateQRCode(code);

    try {
      const coupon = await prisma.coupon.create({
        data: {
          code,
          points, // บันทึกจำนวน points
        },
      });

      return res.status(201).json({ coupon, qrCode });
    } catch (error) {
      console.error('Error creating coupon:', error);
      return res.status(500).json({ message: 'Error creating coupon' });
    }
  } else if (req.method === 'GET') {
    try {
      const coupons = await prisma.coupon.findMany();
      return res.status(200).json(coupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
      return res.status(500).json({ message: 'Error fetching coupons' });
    }
  } else if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Coupon ID is required' });
    }

    try {
      const deletedCoupon = await prisma.coupon.delete({
        where: { id: id as string },
      });

      return res.status(200).json({ message: 'Coupon deleted', deletedCoupon });
    } catch (error) {
      console.error('Error deleting coupon:', error);
      return res.status(500).json({ message: 'Error deleting coupon' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
