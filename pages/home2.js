"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { db } from "../src/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "@/components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home2() {
  const [urunler, setUrunler] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUrunler = async () => {
      try {
        const snapshot = await getDocs(collection(db, "urunler"));
        const urunListesi = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUrunler(urunListesi);
      } catch (error) {
        console.error("🔥 Firebase Hatası:", error);
      }
      setLoading(false);
    };

    fetchUrunler();
  }, []);

  return (
    <>
      <Navbar />

      <div className="container mt-5">
      
        {loading && <p className="text-center">⏳ Yükleniyor...</p>}
        <div className="row">
          {urunler.map((urun) => {
            // 📸 Burada fotograflar[0]'ı çekiyoruz
            const kapakFotograf = 
              Array.isArray(urun.fotograflar) && urun.fotograflar.length > 0
                ? urun.fotograflar[0]
                : "/placeholder.png";

            return (
              <div
                key={urun.id}
                className="col-md-4 d-flex align-items-stretch mb-4"
              >
                <div className="card shadow-sm w-100 d-flex flex-column justify-content-between">
                  <Link
                    href={`/urun/${urun.id}`}
                    className="text-center p-3"
                  >
                    <img
                      src={kapakFotograf}
                      onError={(e) => (e.target.src = "/placeholder.png")}
                      alt={urun.urunAdi}
                      className="img-fluid"
                      style={{ maxHeight: "200px", objectFit: "contain" }}
                    />
                  </Link>
                  <div className="card-body d-flex flex-column justify-content-between">
                    <div>
                      <h5 className="card-title">{urun.urunAdi}</h5>
                      <p
                        className="card-text text-muted"
                        style={{ minHeight: "48px" }}
                      >
                        {urun.aciklama || "Açıklama mevcut değil."}
                      </p>
                    </div>
                    <div className="mt-2">
                      <h6 className="text-success fw-bold">{urun.fiyat} TL</h6>
                      <Link
                        href={`/urun/${urun.id}`}
                        className="btn btn-primary btn-sm mt-2"
                      >
                        Detayları Gör
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
