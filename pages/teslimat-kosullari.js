import Navbar from "@/components/Navbar";

export default function Teslimatkosulları() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 text-gray-800 leading-relaxed">
        <h1 className="text-2xl font-bold mb-4">Teslimat Koşulları</h1>
        <p>
        TESLİMAT KOŞULLARI

1. Sipariş onayı alındıktan sonra ürünler en geç 3 iş günü içerisinde kargoya verilir.

2. Teslimat, Alıcının sipariş sırasında belirttiği adrese yapılır.

3. Teslimat süresi, kargo firmasına ve teslimat adresinin bulunduğu bölgeye bağlı olarak değişiklik gösterebilir.

4. Kargo firması kaynaklı gecikmelerden Satıcı sorumlu değildir.

5. Alıcı, teslimat sırasında ürün paketini kontrol etmeli, hasarlı ambalajlı ürünleri teslim almamalı ve durumu kargo görevlisine tutanakla bildirmelidir.

          {/* buraya tüm .txt içeriğini paragraf paragraf yapıştırabilirsin */}
        </p>
      </div>
    </>
  );
}
