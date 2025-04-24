'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../src/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import { useSepet } from "../../context/SepetContext";

const UrunDetay = () => {
  const router = useRouter();
  const { id } = router.query;
  const [urun, setUrun] = useState(null);
  const [loading, setLoading] = useState(true);
  const { sepeteEkle } = useSepet();

  useEffect(() => {
    if (!id) return;

    const fetchUrun = async () => {
      try {
        const urunRef = doc(db, "urunler", id);
        const urunSnap = await getDoc(urunRef);
        if (urunSnap.exists()) {
          const data = urunSnap.data();

          // Cloudinary linkini optimize et
          const optimizedImage = data.fotograf.replace(
            "/upload/",
            "/upload/w_400,h_400,c_fit/"
          );

          setUrun({ id: urunSnap.id, ...data, optimizedImage });
        } else {
          console.error("🔥 Ürün bulunamadı!");
        }
      } catch (error) {
        console.error("🔥 Firestore Hatası:", error);
      }
      setLoading(false);
    };

    fetchUrun();
  }, [id]);

  const handleSepeteEkle = () => {
    sepeteEkle(urun);
    alert("✅ Ürün sepete eklendi!");
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto p-6">
        {loading ? (
          <p className="text-center text-gray-500 text-xl">⏳ Ürün yükleniyor...</p>
        ) : urun ? (
          <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
            {/* Ürün Görseli */}
            <center>



            
            <div className="flex justify-center items-center w-full md:w-1/2">
              <img
                src={urun.optimizedImage}
                alt={urun.urunAdi}
                className="rounded-xl shadow-md"
              />
            </div>
</center>
            {/* Ürün Bilgileri */}
            <div className="flex flex-col w-full md:w-1/2">
              <h2 className="text-3xl font-semibold text-gray-800">{urun.urunAdi}</h2>
              <p className="text-gray-600 mt-2">
                {urun.aciklama || "Bu ürün hakkında açıklama bulunmamaktadır."}
              </p>

              <div className="mt-4">
                <h3 className="text-2xl font-bold text-green-600">{urun.fiyat} TL</h3>
              </div>

              <button
                className="btn btn-primary mt-6 px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                onClick={handleSepeteEkle}
              >
                Sepete Ekle
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-red-500 text-xl font-semibold">⚠️ Ürün bulunamadı.</p>
        )}
      </div>
    </>
  );
};

export default UrunDetay;
