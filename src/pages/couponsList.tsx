import { useState, useEffect } from 'react';

interface Coupon {
  id: string;
  code: string;
  points: number;
  createdAt: string;
  updatedAt: string;
}

export default function CouponsList() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // เพิ่ม state สำหรับค้นหา
  const couponsPerPage = 20;

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await fetch('/api/fetchcoupon');
      const data = await response.json();
      setCoupons(data);
    };

    fetchCoupons();
  }, []);

  const handleDelete = async (id: string) => {
  try {
    const response = await fetch('/api/deletecoupon', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (response.ok) {
      setCoupons(coupons.filter((coupon) => coupon.id !== id));
    } else {
      console.error('Failed to delete coupon:', await response.json());
    }
  } catch (error) {
    console.error('Error deleting coupon:', error);
  }
};


  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page * couponsPerPage < coupons.length) {
      setPage(page + 1);
    }
  };

  const filteredCoupons = coupons.filter((coupon) =>
    coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) // กรองคูปองตามรหัสที่ค้นหา
  );

  const paginatedCoupons = filteredCoupons.slice(
    (page - 1) * couponsPerPage,
    page * couponsPerPage
  );

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Coupons List</h1>

      {/* เพิ่มช่องค้นหาคูปอง */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by coupon code..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 w-full"
        />
      </div>

      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Code</th>
            <th className="py-2 px-4 border-b">Points</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Updated At</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCoupons.map((coupon) => (
            <tr key={coupon.id}>
              <td className="py-2 px-4 border-b">{coupon.code}</td>
              <td className="py-2 px-4 border-b">{coupon.points}</td>
              <td className="py-2 px-4 border-b">{new Date(coupon.createdAt).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">{new Date(coupon.updatedAt).toLocaleString()}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleDelete(coupon.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={page * couponsPerPage >= filteredCoupons.length}
          className="bg-gray-500 text-white px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
