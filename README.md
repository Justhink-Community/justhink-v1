


# justhink-v1

Justhink, insanların günlük olarak belirlenen bir konu hakkında fikirlerini paylaşarak sosyalleşmelerini amaçlayan bir platformdur. Bu platform, dijital çağda insanların birbirleriyle bağlantı kurmalarını ve iletişim kurmalarını kolaylaştırmak için tasarlanmıştır.

İçerisinde bulunduğunuz depo ise bu projenin v1 geliştirilme sürecinin yürütüldüğü ana depo. 




## Özellikler

- Açık/koyu mod geçişi
- Canlı ön izleme
- Tam ekran modu
- Tüm platformlara destek

  
## Kullanılan Teknolojiler

**İstemci:** SCSS, Parcel, ES6+ Javascript

**Sunucu:** Django, GoLang


  
## Belgelendirme

Proje belgelendirme işlemlerinin hepsi [JSDocs](https://jsdoc.app/) modeline uygun olarak yapılmaktadır. 

  
## Yol haritası

- Ek tarayıcı desteği

- Daha fazla entegrasyon ekleme

- Duyarlılık İyileştirmesi

- SEO İyileştirmesi

- Optimizasyon  

## Renk Referansı

| Renk             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| ana renk | ![#4e1c60](https://via.placeholder.com/10/4e1c60?text=+) #4e1c60 |
| ana renk (açık - 1) | ![#5a2a76](https://via.placeholder.com/10/5a2a76?text=+) #5a2a76 |
| ana renk (açık - 2) | ![#5c346b](https://via.placeholder.com/10/5c346b?text=+) #5c346b |
| ana renk (koyu) | ![#400556](https://via.placeholder.com/10/400556?text=+) #400556 | 
| ana renk (yumuşak) | ![#b35159](https://via.placeholder.com/10/b35159?text=+) #b35159 | 

## Geri Bildirim & Destek

Herhangi bir geri bildiriminiz varsa, lütfen iletisim@justhink.net adresinden bize ulaşın.

Eğer herhangi bir sorunuz ya sorununuz varsa Slack kanalından ulaşabilirsiniz.

  
## Bilgisayarınızda Çalıştırın

Projeyi klonlayın

```bash
  git clone https://github.com/Justhink-Community/justhink-v1
```

Proje dizinine gidin

```bash
  cd justhink-v1/dev
```

Gerekli paketleri yükleyin

```bash
  npm install
```

Sunucuyu çalıştırın

```bash
  npm run start
```

## Sıkça Yaşanan Sorunlar

### Yeni eklediğim SCSS dosyası çalışmıyor:
main.scss içerisinde dosyanızı import edin.

```scss
  @import "foldername/filename"; // Eklenti adı vermenize gerek yok.
```
### Svg dosyasını nasıl eklerim:
İlgili dosyayı src/assets/sprite.svg içerisine ekleyin. Daha sonra svg dosyanızı şu şekilde olduğu gibi kullanın:
```html
<svg class="footer__icon">
  <use xlink:href="assets/sprite.svg#icon-id"></use>
</svg>
```
NOT: public/assets/sprite.svg dosyasına da svg'yi koymayı unutmayın.

### HTML dosyasını açamıyorum, FileNotFoundError:
Dosyanın o konumda olduğuna emin olun, eğer dosya varsa, dosya adına `.html` ekleyin.

## Yazarlar ve Teşekkür

- [@furkanesenn](https://www.github.com/furkanesenn) tasarım, geliştirme ve koordinasyon için.
- [@K4MiK4ZE7](https://github.com/K4MiK4ZE7) tasarım ve geliştirme için.
- [@wearus](https://github.com/wearus) tasarım ve geliştirme için.
- [@12Froggo](https://github.com/12Froggo) tasarım ve geliştirme için.
- [@Notenlish](https://github.com/Notenlish) tasarım ve geliştirme için.

- Özel teşekkürler: [@asikLEMMY](https://github.com/asikLEMMY), [@ogulcan-dev](https://github.com/ogulcan-dev)
