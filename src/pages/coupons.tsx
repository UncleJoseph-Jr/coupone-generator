/* eslint-disable @next/next/no-img-element */
import { useState } from 'react';
import QRCode from 'qrcode';

const Coupons = () => {
  const [points, setPoints] = useState<number>(0); // สถานะสำหรับเก็บค่า points
  const [quantity, setQuantity] = useState<number>(1); // สถานะสำหรับเก็บจำนวนคูปองที่จะสร้าง
  const [qrCodes, setQrCodes] = useState<{ code: string; qr: string }[]>([]); // สถานะสำหรับเก็บรหัสคูปองและ QR codes

  const handleCreateCoupons = async () => {
    const codesAndQRCodes: { code: string; qr: string }[] = []; // ตัวแปรเก็บรหัสคูปองและ QR codes

    for (let i = 0; i < quantity; i++) {
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
        const qrCodeData = await generateQRCode(data.coupon.code); // สร้าง QR code
        codesAndQRCodes.push({ code: data.coupon.code, qr: qrCodeData }); // บันทึกรหัสคูปองและ QR code
      } else {
        console.error('Failed to create coupon');
      }
    }

    setQrCodes(codesAndQRCodes); // ตั้งค่าสถานะ qrCodes หลังจากสร้างคูปองทั้งหมด
    setPoints(0); // รีเซ็ตค่าของ points หลังจากสร้างคูปองสำเร็จ
    setQuantity(1); // รีเซ็ตค่าของ quantity
  };

  const generateQRCode = async (text: string): Promise<string> => {
    try {
      return await QRCode.toDataURL(text);
    } catch (err) {
      console.error('Error generating QR Code:', err);
      throw new Error('Error generating QR code');
    }
  };

  return (
    <div>
      <h1>Create Coupons</h1>
      
      <div>
        <input
          type="number"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))} // เปลี่ยนค่าที่กรอกใน input เป็น number
          placeholder="Enter points"
        />
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))} // เปลี่ยนค่าที่กรอกใน input เป็น number
          min={1} // กำหนดค่าต่ำสุดเป็น 1
          placeholder="Enter quantity"
        />
        <button onClick={handleCreateCoupons}>Create Coupons</button>
      </div>

      {qrCodes.length > 0 && (
        <div>
          <h2>Generated Coupons:</h2>
          {qrCodes.map(({ code, qr }, index) => (
            <div key={index}>
              <p>Coupon Code: {code}</p>
              <img src={qr} alt={`QR Code for ${code}`} /> {/* Show QR code */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Coupons;
