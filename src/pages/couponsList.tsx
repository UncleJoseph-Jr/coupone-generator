import { useEffect, useState } from 'react';

interface Coupon {
  id: string;
  code: string;
  discount: number;
  remaining: number;
  createdAt: string;
}

const CouponsList = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await fetch('/api/coupons'); // เรียก API เพื่อดึงข้อมูลคูปอง
      const data = await response.json();
      setCoupons(data);
    };

    fetchCoupons();
  }, []);

  return (
    <div>
      <h1>Coupons List</h1>
      {coupons.length > 0 ? (
        <ul>
          {coupons.map((coupon) => (
            <li key={coupon.id}>
              <p>Code: {coupon.code}</p>
              <p>Discount: {coupon.discount}</p>
              <p>Remaining: {coupon.remaining}</p>
              <p>Created At: {new Date(coupon.createdAt).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No coupons found.</p>
      )}
    </div>
  );
};

export default CouponsList;
