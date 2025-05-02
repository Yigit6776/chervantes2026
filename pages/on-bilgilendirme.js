import Navbar from "@/components/Navbar";

export default function Onbilgilendirmeformu() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-6 text-gray-800 leading-relaxed">
        <h1 className="text-2xl font-bold mb-4">Ön Bilgilendirme Formu </h1>
        <p>
        ÖN BİLGİLENDİRME FORMU

Satıcı Bilgileri:
- Unvan: Yiğit Akdeniz
- Adres: Zonguldak / Türkiye
- Telefon: 0544 375 9482
- E-posta: chervantesholding@gmail.com
- Web: www.chervantes.com

Ürün Bilgileri:
- Ürün Adı, Cinsi, Miktarı ve Fiyatı sipariş ekranında belirtilmektedir.

Teslimat Bilgileri:
- Teslimat, kargo yoluyla Alıcının belirttiği adrese yapılacaktır.
- Teslimat süresi sipariş tarihinden itibaren en geç 7 iş günüdür.

Ödeme Bilgileri:
- Ödeme, kredi kartı veya İyzico altyapısı üzerinden gerçekleştirilecektir.

Cayma Hakkı:
- Alıcı, ürünün tesliminden itibaren 14 gün içinde cayma hakkına sahiptir. Cayma hakkı kapsamındaki iade kargoları alıcıya aittir.

İletişim:
-Tüm soru ve talepleriniz için chervantesholding@gmail.com adresinden bizimle iletişime geçebilirsiniz.

          {/* buraya tüm .txt içeriğini paragraf paragraf yapıştırabilirsin */}
        </p>
      </div>
    </>
  );
}
