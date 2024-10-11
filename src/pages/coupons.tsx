/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';

interface Coupon {
  code: string;
  discount: number;
  remaining: number;
  qrCode: string;
}

export default function Coupons() {
  const [coupon, setCoupon] = useState<Coupon | null>(null);
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [maxDiscount, setMaxDiscount] = useState<number>(20);

  const formatCouponCode = (code: string): string => {
    const parts = code.match(/.{1,3}/g);
    if (!parts) return code;
    const lastPart = parts.pop();
    if (lastPart && lastPart.length === 3) {
      parts.push(lastPart + code.slice(-1));
    } else if (lastPart) {
      parts.push(lastPart);
    }
    return parts.join('-');
  };

  const createCoupon = async () => {
    const res = await fetch('/api/coupons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ discount: 10 }),
    });
    const data = await res.json();
    if (data.coupon && data.qrCode){
      setCoupon(data.coupon);
      setQrCode(data.qrCode);
    } else {
      setCoupon(null);
      setQrCode(null);
    }
    // setCoupon(data.coupon ? data.coupon : null);
  };

  return (
    <div>
      <h1>Coupon System</h1>

      {/* อินพุตสำหรับกรอกราคาคูปอง */}
      <div>
        <label htmlFor="price">Coupon Price: </label>
        <input
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          placeholder="Enter coupon price"
        />
      </div>

      {/* อินพุตสำหรับกรอกส่วนลดสูงสุด */}
      <div>
        <label htmlFor="maxDiscount">Max Discount (%): </label>
        <input
          type="number"
          id="maxDiscount"
          value={maxDiscount}
          onChange={(e) => setMaxDiscount(Number(e.target.value))}
          placeholder="Enter max discount %"
        />
      </div>

      <button onClick={createCoupon}>Create Coupon</button>

      {coupon ? (
        <div>
          <p>Code: {formatCouponCode(coupon.code)}</p>
          <p>Discount: {coupon.discount}%</p>
          <p>Remaining: {coupon.remaining}%</p>
          {qrCode && <img src={qrCode} alt="QR Code" />}
        </div>
      ) : (
        <p>No coupon generated yet.</p>
      )}
    </div>
  );
}
