import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Main handler function to manage DELETE requests
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the method is DELETE
  if (req.method === 'DELETE') {
    try {
      // Parse the request body to get the coupon ID
      const { id } = JSON.parse(req.body);

      // Check if ID is provided
      if (!id) {
        return res.status(400).json({ message: 'Coupon ID is required' });  // Respond with an error if ID is missing
      }

      // Use Prisma to delete the coupon from the database
      const deletedCoupon = await prisma.coupon.delete({
        where: { id },  // Delete based on the provided ID
      });

      // Return a success response with the deleted coupon data
      return res.status(200).json({ message: 'Coupon deleted', deletedCoupon });
    } catch (error) {
      console.error('Error deleting coupon:', error);
      return res.status(500).json({ message: 'Error deleting coupon' });  // Handle errors (e.g., coupon not found or DB issues)
    }
  } else {
    // If method is not DELETE, respond with a 405 (Method Not Allowed) status
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
