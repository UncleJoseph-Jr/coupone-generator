import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetches all coupons from the database
      const coupons = await prisma.coupon.findMany();
      return res.status(200).json(coupons); // Returns the fetched coupons as JSON
    } catch (error) {
      console.error('Error fetching coupons:', error);
      return res.status(500).json({ message: 'Error fetching coupons' }); // Handles errors during fetching
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' }); // For methods other than GET
  }
}