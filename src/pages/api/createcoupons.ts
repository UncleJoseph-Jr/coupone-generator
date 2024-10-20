import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { generateCouponCode } from '@/lib/generateCouponCode';
import { generateQRCode } from '@/lib/generateQRCode';

const prisma = new PrismaClient();

// Main handler function to manage different HTTP methods
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Handle POST requests (creating coupons)
  if (req.method === 'POST') {
    const { points, quantity, expirationDays } = req.body;

    // Validate the input to ensure points, quantity, and expirationDays are valid
    if (!points || points <= 0 || !quantity || quantity <= 0 || !expirationDays || expirationDays <= 0) {
      return res.status(400).json({ message: 'Invalid input' }); // Respond with a 400 status if invalid input
    }

    try {
      const coupons = [];  // Array to store the generated coupons

      // Loop to create the specified quantity of coupons
      for (let i = 0; i < quantity; i++) {
        const code = generateCouponCode();  // Generate a unique coupon code
        const qrCode = await generateQRCode(code);  // Generate a QR code for the coupon

        // Calculate the expiration date by adding expirationDays to the current date
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expirationDays);  // Set expiration date

        // Save the coupon to the database using Prisma
        const coupon = await prisma.coupon.create({
          data: {
            code,
            points,  // Save the points for the coupon
            expirationDate,  // Save the expiration date
          },
        });

        coupons.push({ coupon, qrCode });  // Add the generated coupon and QR code to the array
      }

      // Return the created coupons and QR codes as a response
      return res.status(201).json({ coupons });
    } catch (error) {
      console.error('Error creating coupon:', error);
      return res.status(500).json({ message: 'Error creating coupons' });  // Handle any errors during coupon creation
    }
  } 
  // Handle GET requests (retrieving coupons)
  else if (req.method === 'GET') {
    try {
      // Fetch all coupons from the database
      const coupons = await prisma.coupon.findMany();
      return res.status(200).json(coupons);  // Return the fetched coupons as a response
    } catch (error) {
      console.error('Error fetching coupons:', error);
      return res.status(500).json({ message: 'Error fetching coupons' });  // Handle any errors during data fetching
    }
  } 
  // Handle DELETE requests (deleting coupons)
  else if (req.method === 'DELETE') {
    const { id } = req.query;

    // Validate if the ID is provided
    if (!id) {
      return res.status(400).json({ message: 'Coupon ID is required' });
    }

    try {
      // Delete the coupon from the database based on the provided ID
      const deletedCoupon = await prisma.coupon.delete({
        where: { id: id as string },
      });

      return res.status(200).json({ message: 'Coupon deleted', deletedCoupon });  // Return a success message and the deleted coupon
    } catch (error) {
      console.error('Error deleting coupon:', error);
      return res.status(500).json({ message: 'Error deleting coupon' });  // Handle any errors during deletion
    }
  } 
  // Respond with 405 if the method is not allowed
  else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
