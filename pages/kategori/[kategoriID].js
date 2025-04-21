import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { db } from "../../src/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link"; // 🔥 Link bileşeni eklendi!
import Navbar from "@/components/Navbar";

const KategoriSayfasi = () => {
  const router = useRouter();
  const { kategoriID } = router.query;
  const [urunler, setUrunler] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  
    if (!kategoriID) return;

    const fetchUrunler = async () => {
      try {
        const snapshot = await getDocs(collection(db, "urunler"));
        const urunListesi = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(urun => urun.kategoriID === kategoriID);

        setUrunler(urunListesi);
      } catch (error) {
        console.error("❌ Firestore Hatası:", error);
      }
      setLoading(false);
    };

    fetchUrunler();
  }, [kategoriID]);

  return (
<>

<Navbar/>

       
    <div className="container">
      <h1>Ürünler</h1>

      {loading && <p>⏳ Ürünler Yükleniyor...</p>}
      {!loading && urunler.length === 0 && <p>⚠️ Bu kategoride ürün bulunamadı.</p>}

      <div className="row">
        {urunler.map(urun => (
          <div key={urun.id} className="col-md-4 mb-4">
            <div className="card" style={{ width: "18rem", cursor: "pointer" }}>
              {/* 🔥 Link bileşeni eklendi! */}
              <Link href={`/urun/${urun.id}`} passHref>
                <img src={urun.fotograf} className="card-img-top" alt={urun.urunAdi} />
              </Link>
              <div className="card-body">
                <h5 className="card-title">{urun.urunAdi}</h5>
                <p className="card-text">{urun.aciklama || "Açıklama mevcut değil."}</p>
                <h6>{urun.fiyat} TL</h6>
                  <Link href={`/urun/${urun.id}`} className="btn btn-primary">
                    Detayları Gör
                  </Link>
                {/* 🔥 Ürün adına tıklayınca da detay sayfasına gitmesi için buton eklendi */}

              </div>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => router.push("/")} 
        style={{ marginTop: "20px", padding: "10px", background: "gray", cursor: "pointer" }}
      >
        Ana Sayfaya Dön
      </button>
    </div>
    </>
  );
};

export default KategoriSayfasi;
