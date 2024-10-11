import { useState } from 'react';

interface Coupon {
  code: string;
  discount: number;
  remaining: number;
  qrCode: string;
}

export default function Coupons() {
  const [coupon, setCoupon] = useState<Coupon | null>(null);

  const createCoupon = async () => {
    const res = await fetch('/api/coupons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ discount: 10 }),
    });
    const data = await res.json();
    setCoupon(data);
  };

  return (
    <div>
      <h1>Coupon System</h1>
      <button onClick={createCoupon}>Create Coupon</button>
      {coupon && (
        <div>
          <p>Code: {coupon.code}</p>
          <p>Discount: {coupon.discount}%</p>
          <p>Remaining: {coupon.remaining}%</p>
          <img src={coupon.qrCode} alt="QR Code" />
        </div>
      )}
    </div>
  );
}
