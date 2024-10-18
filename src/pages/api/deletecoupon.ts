import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { id } = req.body; // เข้าถึง id ได้โดยตรง

    if (!id) {
      return res.status(400).json({ message: 'Coupon ID is required' });
    }

    try {
      const deletedCoupon = await prisma.coupon.delete({
        where: { id },
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
