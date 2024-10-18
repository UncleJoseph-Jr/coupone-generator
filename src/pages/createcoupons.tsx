/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import axios from 'axios';

const CreateCouponsPage: React.FC = () => {
  const [points, setPoints] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [expirationDays, setExpirationDays] = useState<number>(7);
  const [coupons, setCoupons] = useState<any[]>([]);

  const handleCreateCoupons = async () => {
    try {
      const response = await axios.post('/api/createcoupons', {
        points,
        quantity,
        expirationDays,
      });
      setCoupons(response.data.coupons);
    } catch (error) {
      console.error('Error creating coupons:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create Coupons</h1>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Points</label>
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Expiration Days</label>
        <input
          type="number"
          value={expirationDays}
          onChange={(e) => setExpirationDays(Number(e.target.value))}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <button
        onClick={handleCreateCoupons}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Create Coupons
      </button>

      {/* Display created coupons */}
      {coupons.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Created Coupons</h2>
          {coupons.map((coupon, index) => (
            <div key={index} className="border p-4 mb-4 rounded-md">
              <p><strong>Coupon Code:</strong> {coupon.coupon.code}</p>
              <p><strong>Expiration Date:</strong> {new Date(coupon.coupon.expirationDate).toLocaleDateString()}</p>
              <p><strong>QR Code:</strong></p>
              <img src={coupon.qrCode} alt={`QR Code for ${coupon.coupon.code}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateCouponsPage;
