import { useEffect, useState } from 'react';

interface Coupon {
  id: string;
  code: string;
  points: number; // เปลี่ยนจาก discount และ remaining เป็น points
  createdAt: string;
}

const CouponsList = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [points, setPoints] = useState<number>(0); // สถานะสำหรับเก็บค่า points

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await fetch('/api/coupons');
      const data = await response.json();
      console.log('Coupons fetched:', data); // ตรวจสอบข้อมูลที่ดึงมาจาก API
      setCoupons(data);
    };

    fetchCoupons();
  }, []);

  const handleCreateCoupon = async () => {
    const response = await fetch('/api/coupons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ points }), // ส่ง points ไปยัง API
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Coupon created:', data); // ตรวจสอบว่าได้รับข้อมูลตอบกลับจาก API
      setCoupons([...coupons, data.coupon]);
      setPoints(0); // รีเซ็ตค่าของ points หลังจากสร้างคูปองสำเร็จ
    } else {
      console.error('Failed to create coupon');
    }
  };

  const deleteCoupon = async (id: string) => {
    const response = await fetch(`/api/coupons?id=${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      setCoupons(coupons.filter((coupon) => coupon.id !== id));
    } else {
      console.error('Failed to delete coupon');
    }
  };

  return (
    <div>
      <h1>Coupons List</h1>
      
      <div>
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))} // เปลี่ยนค่าที่กรอกใน input เป็น number
          placeholder="Enter points"
        />
        <button onClick={handleCreateCoupon}>Create Coupon</button>
      </div>
      
      {coupons.length > 0 ? (
        <ul>
          {coupons.map((coupon) => (
            <li key={coupon.id}>
              <p>Code: {coupon.code}</p>
              <p>Points: {coupon.points}</p>
              <p>Created At: {new Date(coupon.createdAt).toLocaleString()}</p>
              <button onClick={() => deleteCoupon(coupon.id)}>Delete</button>
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
