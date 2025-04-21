'use client';

import React, { useEffect, useState } from 'react';
import { useSepet } from '../src/context/SepetContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

const Cart = () => {
  const router = useRouter();
  const { sepet } = useSepet();
  const [localSepet, setLocalSepet] = useState([]);

  useEffect(() => {
    setLocalSepet(sepet);
  }, [sepet]);

  const toplamFiyat = localSepet.reduce(
    (total, urun) => total + Number(urun.fiyat) * (urun.adet || 1),
    0
  );

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h4 className="mb-3">Sepetiniz</h4>

        {localSepet.length === 0 ? (
          <p className="text-muted">Sepetiniz boş.</p>
        ) : (
          <>
            <ul className="list-group">
              {localSepet.map((urun, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center"
                >
                  <span>{urun.ad || urun.urunAdi}</span>
                  <span className="text-muted">₺{urun.fiyat} x {urun.adet || 1}</span>
                </li>
              ))}
            </ul>

            <div className="text-end mt-3">
              <strong>Toplam Tutar: ₺{toplamFiyat.toFixed(2)}</strong>
            </div>

            <div className="mt-4">
              <button
                className="btn btn-primary w-100"
                onClick={() => router.push('/odeme')}
              >
                Sepeti Onayla
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
