import React, { useState } from "react";
import Link from "next/link";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../src/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Navbar from "@/components/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "",
    gender: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Kullanıcı Authentication'a ekleniyor
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Kullanıcı bilgileri Firestore'a ekleniyor
      await addDoc(collection(db, "forum"), {
        uid: user.uid,
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        phone: formData.phone,
        birthDate: formData.birthDate,
        gender: formData.gender,
        timestamp: serverTimestamp(),
      });

      alert("Kayıt başarıyla tamamlandı!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: "",
        birthDate: "",
        gender: "",
      });

    } catch (error) {
      alert("Kayıt hatası: " + error.message);
    }
  };

  return (
    <>
    <Navbar/>
   
    <div className="d-flex justify-content-center mt-5">
      <div className="card p-3 shadow-sm" style={{ width: "350px" }}>
        <h4 className="text-center mb-3">Üye Kayıt</h4>
        <form onSubmit={handleSubmit}>
          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Ad" required className="form-control mb-2" />
          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Soyad" required className="form-control mb-2" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-posta" required className="form-control mb-2" />
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Şifre" required className="form-control mb-2" />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon" required className="form-control mb-2" />
          <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required className="form-control mb-2" />
          <select name="gender" value={formData.gender} onChange={handleChange} required className="form-select mb-2">
            <option value="">Cinsiyet seç</option>
            <option value="Erkek">Erkek</option>
            <option value="Kadın">Kadın</option>
            <option value="Diğer">Diğer</option>
          </select>
          <button type="submit" className="btn btn-primary w-100">Kayıt Ol</button>
        </form>
        <Link href="/login">
          <button className="btn btn-secondary w-100 mt-2">Zaten üyeyim, giriş yap</button>
        </Link>
      </div>
    </div>
     </>
  );
};

export default Register;
