# STATUS: THIS PROJECT IS NO LONGER ACTIVITELY MAINTAINED.
---
# Minecraft AI Chatbot

Bu proje, Minecraft sunucularında oyuncularla özel mesaj (`/msg`) üzerinden iletişim kuran, OpenRouter tabanlı bir yapay zeka asistanıdır.

## Özellikler

- **Özel Mesaj (Whisper) Desteği**  
  Yanıtları doğrudan oyuncuya `/msg` komutuyla gönderir, genel sohbeti kirletmez.

- **Sohbet Karışıklığını Önleme**  
  Her mesajın sonuna oyuncu adını ekler: `- [OyuncuAdı]`

- **Akıllı Tetikleme Sistemi**  
  Bot sadece adı geçtiğinde yanıt verir. Admin kullanıcılar için ekstra yetki desteği bulunur.

- **Hata Yönetimi**  
  Bağlantı kopmalarında otomatik yeniden bağlanır ve paket hatalarını (örneğin chunk size) filtreler.

- **Gecikmeli Yanıt Sistemi**  
  Anti-spam korumalarına takılmamak için yanıtlar 1.2 – 2 saniye gecikmeli gönderilir.

---

## Kurulum

### 1. Gereksinimler
- Node.js yüklü olmalıdır

### 2. Bağımlılıkları yükle
Proje klasöründe terminal açıp çalıştır:
```
npm install
```
### 3. Ortam değişkenleri (.env)

Proje dizinine `.env` dosyası oluştur ve API anahtarını ekle:

```
OPENROUTER_KEY=buraya_api_anahtarini_yaz
```


### 4. Bot ayarları

`bot.js` dosyasında aşağıdaki bilgileri kendine göre düzenle:

- Sunucu IP
- Bot kullanıcı adı / şifre
- Tetikleyici isim (örn: `MinePlus_AI`)

### 5. Başlatma
```
node .
```

---

## Yapılandırma

Botun davranışlarını değiştirmek için:

- `bot.on('chat', ...)` kısmını düzenleyebilirsin
- Tetikleyici ismi değiştirebilirsin
- Yasaklı kelime / kullanıcı listesi ekleyebilirsin

---

## Notlar

- Bot varsayılan olarak sadece kendi adı geçtiğinde yanıt verir
- Yoğun sunucularda spam yememek için gecikme sistemi aktif tutulmalıdır

---

## Lisans

MIT
