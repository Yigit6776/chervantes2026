"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../src/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import { useSepet } from "../../context/SepetContext";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const UrunDetay = () => {
  const router = useRouter();
  const { id } = router.query;
  const [urun, setUrun] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { sepeteEkle } = useSepet();

  useEffect(() => {
    if (!id) return;

    const fetchUrun = async () => {
      try {
        const urunRef = doc(db, "urunler", id);
        const urunSnap = await getDoc(urunRef);
        if (urunSnap.exists()) {
          const data = urunSnap.data();
          setUrun({ id: urunSnap.id, ...data });
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

  const handleNext = () => {
    if (!urun?.fotograflar) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % urun.fotograflar.length);
  };

  const handlePrev = () => {
    if (!urun?.fotograflar) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + urun.fotograflar.length) % urun.fotograflar.length);
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
            <div className="flex flex-col justify-center items-center w-full md:w-1/2">
              {urun.fotograflar && urun.fotograflar.length > 0 && (
                <><center>


              
                  <img
                    src={urun.fotograflar[currentIndex]}
                    alt={urun.urunAdi}
                    style={{
                      maxWidth: "400px",
                      maxHeight: "400px",
                      objectFit: "contain",
                      borderRadius: "12px",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    }}
                  />

                  {/* Oklar Yan Yana */}
                  <div className="flex justify-center items-center gap-6 mt-4">
                    <button
                      onClick={handlePrev}
                      className="bg-white rounded-full p-3 shadow hover:bg-gray-200 flex items-center justify-center"
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <FaChevronLeft size={24} />
                    </button>

                    <button
                      onClick={handleNext}
                      className="bg-white rounded-full p-3 shadow hover:bg-gray-200 flex items-center justify-center"
                      style={{
                        width: "50px",
                        height: "50px",
                      }}
                    >
                      <FaChevronRight size={24} />
                    </button>
                  </div>
                  </center>
                </>
              )}  
            </div>

            {/* Ürün Bilgileri */}
            <div className="flex flex-col w-full md:w-1/2">
              <h2 className="text-3xl font-semibold text-gray-800">{urun.urunAdi}</h2>

              {/* Açıklamayı ➔ ile madde işareti yapıyoruz */}
              <div className="text-gray-600 mt-4 leading-relaxed whitespace-pre-line">
                {urun?.aciklama && typeof urun.aciklama === "string" ? (
                  urun.aciklama.split("\n").map((satir, index) => (
                    <div key={index} className="flex items-start gap-2 mb-1">
                      <span>➔</span>
                      <span>{satir}</span>
                    </div>
                  ))
                ) : (
                  <p>Bu ürün hakkında açıklama bulunmamaktadır.</p>
                )}
              </div>

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
