'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '../src/firebaseConfig';
import { auth } from '../src/firebaseConfig';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const SepetContext = createContext();

export const SepetProvider = ({ children }) => {
  const [sepet, setSepet] = useState([]);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        sepetiFirestoredanCek(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  const sepetiFirestoredanCek = async (userId) => {
    const ref = collection(db, 'sepetler', userId, 'urunler');
    const snapshot = await getDocs(ref);
    const urunler = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setSepet(urunler);
  };

  const sepeteEkle = async (urun) => {
    if (!uid) return;
    const ref = doc(db, 'sepetler', uid, 'urunler', urun.id);
    const mevcut = sepet.find((item) => item.id === urun.id);
    const yeniAdet = mevcut ? mevcut.adet + 1 : 1;

    await setDoc(ref, { ...urun, adet: yeniAdet });
    sepetiFirestoredanCek(uid);
  };

  const sepettenCikar = async (urunId) => {
    if (!uid) return;
    const ref = doc(db, 'sepetler', uid, 'urunler', urunId);
    const mevcut = sepet.find((item) => item.id === urunId);

    if (!mevcut) return;

    if (mevcut.adet <= 1) {
      await deleteDoc(ref);
    } else {
      await updateDoc(ref, { adet: mevcut.adet - 1 });
    }

    sepetiFirestoredanCek(uid);
  };

  return (
    <SepetContext.Provider value={{ sepet, sepeteEkle, sepettenCikar }}>
      {children}
    </SepetContext.Provider>
  );
};

export const useSepet = () => useContext(SepetContext);
