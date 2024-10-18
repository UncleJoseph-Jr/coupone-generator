import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { generateCouponCode } from '@/lib/generateCouponCode';
import { generateQRCode } from '@/lib/generateQRCode';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { points, quantity, expirationDays } = req.body;

    // Validate input
    if (!points || points <= 0 || !quantity || quantity <= 0 || !expirationDays || expirationDays <= 0) {
      return res.status(400).json({ message: 'Invalid input' });
    }

    try {
      const coupons = [];  // Array to store generated coupons

      for (let i = 0; i < quantity; i++) {
        const code = generateCouponCode();  // Generate unique coupon code
        const qrCode = await generateQRCode(code);  // Generate QR code for the coupon

        // Calculate expiration date
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);  // Add expirationDays to current date

        // Save coupon to database
        const coupon = await prisma.coupon.create({
          data: {
            code,
            points,  // Save points
            expirationDate,  // Save expiration date
          },
        });

        coupons.push({ coupon, qrCode });  // Add generated coupon and QR code to the array
      }

      // Return created coupons and QR codes
      return res.status(201).json({ coupons });
    } catch (error) {
      console.error('Error creating coupon:', error);
      return res.status(500).json({ message: 'Error creating coupons' });
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
