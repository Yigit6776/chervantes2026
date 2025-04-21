import React from "react";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../src/firebaseConfig";
import { useRouter } from "next/router";
import Navbar from "../src/components/Navbar";

const Profil = () => {
  const { currentUser } = useAuth();
  const router = useRouter();

  // Kullanıcı adı: displayName varsa onu al, yoksa email’in @ öncesi
  const displayName = currentUser
    ? currentUser.displayName || currentUser.email.split("@")[0]
    : "Profil";

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Çıkış başarılı!");
      router.push("/uyegiris");
    } catch (error) {
      alert("Çıkış yaparken hata oluştu: " + error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>👤 {displayName}</h1>   {/* ← Başlık artık isim oluyor */}
        {currentUser ? (
          <div className="card p-4 shadow-sm">
            <p><strong>E‑Posta:</strong> {currentUser.email}</p>
            <p><strong>Kullanıcı ID:</strong> {currentUser.uid}</p>

            <button onClick={handleLogout} className="btn btn-danger w-100">
              🚪 Çıkış Yap
            </button>
          </div>
        ) : (
          <p>Kullanıcı bulunamadı, lütfen giriş yapın.</p>
        )}
      </div>
    </>
  );
};

export default Profil;
