# Fırat Karataşoğlu — Portfolyo

Türkçe / İngilizce / Rusça, animasyonlu, tek sayfalık kişisel portfolyo sitesi. Build aracı yok; saf HTML, CSS ve JavaScript.

## Açma

- `index.html` dosyasına çift tıklayarak doğrudan tarayıcıda açabilirsiniz.
- Yerel sunucu ile: `python -m http.server 5173`, ardından http://localhost:5173

## Yapı

```
index.html          Sayfa iskeleti (metinler data-i18n anahtarlarıyla bağlı)
css/style.css       Tasarım, açık/koyu tema, animasyonlar, responsive kurallar
js/i18n.js          Arayüz metinleri (en / tr / ru)
js/data.js          Projeler, diğer işler ve deneyim/eğitim zaman çizelgesi (en / tr / ru)
js/main.js          Dil değişimi, render, animasyonlar, proje modalı
assets/img/         Optimize edilmiş (WebP) proje görselleri
```

## İçerik düzenleme

- **Yeni proje eklemek:** `js/data.js` içindeki `PROJECTS` dizisine bir nesne ekleyin. Görselleri `assets/img/<proje>/` altına koyup `images` alanına yazın. `cats` alanı filtreleri belirler: `ai`, `fullstack`, `frontend`.
- **Metin değiştirmek:** `js/i18n.js` içinde aynı anahtarı `en`, `tr` ve `ru` bloklarının üçünde de güncelleyin. Başlıklarda `*kelime*` yazımı o kelimeyi gradyan renkle vurgular.

## Yayınlama

Site GitHub Pages üzerinde yayında: https://frat-karatasoglu.github.io/ — `main` dalına her push sonrası otomatik güncellenir.
