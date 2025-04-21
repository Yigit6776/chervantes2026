'use client';

import React, { useEffect, useState } from 'react';
import { useSepet } from '../context/SepetContext';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/router';

const Cart = () => {
  const router = useRouter();
  const { sepet, sepettenCikar } = useSepet(); // ✅ setSepet yok artık
  const [localSepet, setLocalSepet] = useState([]);

  useEffect(() => {
    setLocalSepet(sepet);
  }, [sepet]);

  const toplamFiyat = localSepet.reduce(
    (total, urun) => total + Number(urun.fiyat) * (urun.adet || 1),
    0
  );

  const urunCikar = (urun) => {
    sepettenCikar(urun.id); // ✅ sadece context fonksiyonunu kullanıyoruz
  };

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
                  style={{ gap: '10px' }}
                >
                  {/* Ürün fotoğrafı + adı */}
                  <div className="d-flex align-items-center" style={{ flexGrow: 1 }}>
                    {urun.fotograf && (
                      <img
                        src={urun.fotograf}
                        alt={urun.ad || urun.urunAdi}
                        style={{
                          width: '40px',
                          height: '40px',
                          objectFit: 'cover',
                          borderRadius: '8px',
                          marginRight: '10px',
                        }}
                      />
                    )}
                    <span>{urun.ad || urun.urunAdi}</span>
                  </div>

                  {/* Fiyat ve adet */}
                  <div>
                    <span className="text-muted me-3">
                      ₺{urun.fiyat} x {urun.adet || 1}
                    </span>
                  </div>

                  {/* SİL butonu */}
                  <div>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => urunCikar(urun)}
                    >
                      SİL
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Toplam Fiyat */}
            <div className="text-end mt-3">
              <strong>Toplam Tutar: ₺{toplamFiyat.toFixed(2)}</strong>
            </div>

            {/* Sepeti Onayla Butonu */}
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
