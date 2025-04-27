import React from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";

export default function Contact() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Bize Ulaşın</h1>
          <p className="text-center text-gray-600 mb-10">
            Her türlü soru ve görüşleriniz için bizimle iletişime geçebilirsiniz.
          </p>

          <div className="flex flex-col items-center space-y-4 text-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-700">İletişim Bilgileri</h2>
            </div>
            <p className="text-gray-600">
              <strong>Telefon:</strong> 0544 375 9482
            </p>
            <p className="text-gray-600">
              <strong>E-Posta:</strong> chervantesholding@gmail.com
            </p>
            <div className="flex space-x-6 mt-4">
              <Link href="#" className="text-green-600 hover:text-green-800 font-medium">
                Instagram
              </Link>
              <Link href="#" className="text-green-600 hover:text-green-800 font-medium">
                WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
