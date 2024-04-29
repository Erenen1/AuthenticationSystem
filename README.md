# Authentication System Projesi

Bu projede, güvenli ve etkili bir kimlik doğrulama sistemi oluşturmaya çalıştım. Redis ile session yönetimi, in-memory cache yapısını, parola sıfırlama akışını, captcha kullanımını, http parameter pollution'a karşı önlem almayı,istek sınırlamayı(rate limit) öğrendiğim faydalı bir proje oldu. 


## Kullanılan Teknolojiler

- **Redis**: Veri yapıları sunucusu olarak kullanıldı ve oturum yönetimi için tercih edildi.
- **hpp**: HTTP parametre pollution önlemek için kullanıldı.
- **Nodemailer**: E-posta gönderme işlemleri için kullanıldı.
- **express-rate-limit**: API istek sınırlaması için kullanıldı.
- **Helmet**: Express uygulamaları için güvenlik başlıkları eklemek için kullanıldı.
- **svg-captcha**: CAPTCHA oluşturmak için kullanıldı.
- **Authentication & Authorization**: session kullanılarak kimlik doğrulama ve yetkilendirme işlemleri yapıldı.
- **In-Memory Cache**: Uygulama içi önbellekleme için kullanıldı.

## Kurulum ve Kullanım

Projeyi yerel ortamınızda docker ile çalıştırmak için aşağıdaki adımları izleyin:

Öncelikle Docker yüklü olmalı

``git clone https://github.com/Erenen1/AuthenticationSystem.git``

``cd AuthenticationSystem/``

``docker-compose up``

Yazdıktan sonra bu adresler üzerinden servislere ulaşabilirsiniz

``http://localhost:3000``

``mongodb://localhost/AuthSystem``

``redis://localhost:6379``
