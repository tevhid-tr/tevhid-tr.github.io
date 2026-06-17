document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("theme-toggle");
    const currentTheme = localStorage.getItem("theme");
    const themeColorMeta = document.querySelector('meta[name="theme-color"]'); 

    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
        if(themeColorMeta) themeColorMeta.setAttribute('content', '#121212'); 
    } else {
        if(themeColorMeta) themeColorMeta.setAttribute('content', '#f8f9fa'); 
    }

    if (btn) {
        btn.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            let theme = "light";
            
            if (document.body.classList.contains("dark-mode")) {
                theme = "dark";
                if(themeColorMeta) themeColorMeta.setAttribute('content', '#121212'); 
            } else {
                if(themeColorMeta) themeColorMeta.setAttribute('content', '#f8f9fa'); 
            }
            
            localStorage.setItem("theme", theme);
        });
    }

    window.addEventListener("scroll", () => {
        let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (winScroll / height) * 100;
        const pb = document.getElementById("progress-bar");
        if(pb) pb.style.width = scrolled + "%";
    });

    // TEFEKKÜR MODU
    const tefekkurBaslatBtn = document.getElementById('tefekkurBaslat');
    const tefekkurKapatBtn = document.getElementById('tefekkurKapat');
    const body = document.body;

    if (tefekkurBaslatBtn && tefekkurKapatBtn) {
        tefekkurBaslatBtn.addEventListener('click', function() {
            body.classList.add('tefekkur-modu-aktif');
            const anaIcerik = document.getElementById('ana-icerik');
            if(anaIcerik) {
                anaIcerik.setAttribute('tabindex', '-1');
                anaIcerik.focus();
                anaIcerik.style.outline = 'none';
            }
        });

        tefekkurKapatBtn.addEventListener('click', function() {
            body.classList.remove('tefekkur-modu-aktif');
            tefekkurBaslatBtn.focus();
        });
    }
});

// KOPYALA İŞLEMİ VE CANLI BİLDİRİM
document.addEventListener("DOMContentLoaded", () => {
    
    const a11yAnnouncer = document.createElement('div');
    a11yAnnouncer.setAttribute('aria-live', 'polite');
    a11yAnnouncer.setAttribute('class', 'sr-only');
    a11yAnnouncer.style.position = 'absolute';
    a11yAnnouncer.style.left = '-9999px';
    document.body.appendChild(a11yAnnouncer);

    document.querySelectorAll('.copy-btn').forEach(button => {
        button.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-text');
            
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    showCopied(this, a11yAnnouncer);
                });
            } else {
                let textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                textArea.style.position = "fixed";
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                try {
                    document.execCommand('copy');
                    showCopied(this, a11yAnnouncer);
                } catch (err) {
                    console.error('Kopyalama hatası', err);
                }
                document.body.removeChild(textArea);
            }
        });
    });

    function showCopied(button, announcer) {
        const originalText = button.innerHTML;
        button.innerHTML = "Kopyalandı";
        button.classList.add('copied');
        
        announcer.textContent = "Metin panoya kopyalandı.";
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('copied');
            announcer.textContent = ""; 
        }, 2000);
    }
    
    // =========================================================
    // --- WEB SHARE API (NATIVE PAYLAŞIM) ---
    // =========================================================
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const shareTitle = btn.getAttribute('data-title') || document.title;
            const shareUrl = btn.getAttribute('data-url') || window.location.href;
            
            if (navigator.share) {
                try {
                    await navigator.share({
                        title: shareTitle,
                        url: shareUrl
                    });
                } catch (err) {
                    console.log('Paylaşım iptal edildi veya hata:', err);
                }
            } else {
                navigator.clipboard.writeText(shareUrl).then(() => {
                    const originalText = btn.innerHTML;
                    btn.innerHTML = "Link Kopyalandı";
                    setTimeout(() => { btn.innerHTML = originalText; }, 2000);
                });
            }
        });
    });
});

// GÜVENLİ İLETİŞİM
document.querySelectorAll('.guvenli-mail').forEach(function(el) {
    el.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        var user = this.getAttribute('data-kullanici');
        var domain = this.getAttribute('data-uzanti');
        var email = user + '@' + domain;
        
        var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        window.location.href = 'mailto:' + email;

        if (!isMobile && navigator.clipboard) {
            setTimeout(function() {
                navigator.clipboard.writeText(email).then(function() {
                    alert("İletişim adresi kopyalandı:\n" + email + "\n\nCihazınızda otomatik bir mail programı açılmadıysa, kopyalanan bu adresi kendi e-postanıza (Gmail, Hotmail vb.) yapıştırarak bize ulaşabilirsiniz.");
                }).catch(function(err) {
                    console.error('Kopyalama başarısız oldu', err);
                });
            }, 300);
        }
    });
});

setTimeout(function() {
    console.log(
        "%c“Rahman’ın has kulları yeryüzünde vakarla yürürler...” (25/Furkan, 63)\n\nKodların arasına kadar inip arka plandaki hakikati arayan sana da selam olsun! Yolculuğun mübarek, tefekkürün derin olsun.", 
        "color: #5b735f; font-size: 14px; font-style: italic; font-family: 'Lora', serif; padding: 15px 0;"
    );
}, 2000); 

// HAMBURGER MENÜ
document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const overlayMenu = document.getElementById('overlay-menu');

    const iconMenu = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    const iconClose = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;

    if (hamburgerMenu && overlayMenu) {
        hamburgerMenu.addEventListener('click', () => {
            overlayMenu.classList.toggle('open');
            
            const isMenuOpen = overlayMenu.classList.contains('open');
            hamburgerMenu.setAttribute('aria-expanded', isMenuOpen);
            
            if (isMenuOpen) {
                document.body.style.overflow = 'hidden'; 
                hamburgerMenu.innerHTML = iconClose; 
            } else {
                document.body.style.overflow = 'auto'; 
                hamburgerMenu.innerHTML = iconMenu; 
            }
        });
    }
});

// =========================================
// --- AŞAĞI KAYDIRDIKÇA BELİRME (OTOMATİK SCROLL REVEAL - BLUR EFEKTLİ) ---
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    // Sitedeki okunacak elementleri bul ve 'fade-up' sınıfını otomatik ekle
    const autoFadeElements = document.querySelectorAll('.content-block p, .verse-card, .hadith-card, .ne-degiliz-kutusu, .j-card');
    
    autoFadeElements.forEach(el => {
        el.classList.add('fade-up');
    });

    const faders = document.querySelectorAll('.fade-up');
    const appearOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('gorunur');
                observer.unobserve(entry.target); 
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

// =========================================
// --- EDEBİ SATIR OKU (TEFEKKÜR IŞIĞI TAKİBİ) ---
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    // Bilgisayarlar için fare takibi (Sadece tefekkür modu açıkken çalışır)
    document.addEventListener("mousemove", (e) => {
        if (document.body.classList.contains("tefekkur-modu-aktif")) {
            // Farenin ekrandaki Y (dikey) pozisyonunu CSS'e gönderir
            document.body.style.setProperty("--mouse-y", `${e.clientY}px`);
        }
    });

    // Mobil Cihazlar için ekranın tam ortasını aydınlık tutma
    document.addEventListener("scroll", () => {
        if (document.body.classList.contains("tefekkur-modu-aktif") && window.innerWidth <= 768) {
            // Mobilde fare olmadığı için ışık her zaman ekranın dikey tam ortasında (50vh) kalır
            document.body.style.setProperty("--mouse-y", `50vh`);
        }
    });
});

// =========================================
// --- ALT SİS EFEKTİNİ TÜM SAYFALARA OTOMATİK EKLE ---
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    // Sayfada zaten '.alt-sis' yoksa, otomatik olarak oluştur ve body'nin en altına ekle
    if (!document.querySelector('.alt-sis')) {
        const sisKatmani = document.createElement('div');
        sisKatmani.className = 'alt-sis';
        document.body.appendChild(sisKatmani);
    }
});

// =========================================
// --- ZARİF YUKARI ÇIK BUTONU (OTOMATİK EKLE) ---
// =========================================
document.addEventListener("DOMContentLoaded", () => {
    // Sayfada buton yoksa otomatik oluştur
    if (!document.getElementById("basa-don-btn")) {
        const basaDonBtn = document.createElement("button");
        basaDonBtn.id = "basa-don-btn";
        basaDonBtn.setAttribute("aria-label", "Başa Dön");
        // İnce, minimalist bir yukarı ok ikonu (SVG)
        basaDonBtn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
        document.body.appendChild(basaDonBtn);

        // Kullanıcı 500px aşağı kaydırdığında butonu göster
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                basaDonBtn.classList.add("gorunur");
            } else {
                basaDonBtn.classList.remove("gorunur");
            }
        });

        // Butona tıklayınca usulca en üste kaydır
// Butona tıklayınca usulca en üste kaydır (Sinematik Özel Animasyon)
        basaDonBtn.addEventListener("click", () => {
            // 1. SİHİRLİ DOKUNUŞ: Tarayıcının standart CSS kaydırmasını geçici olarak iptal et
            document.documentElement.style.scrollBehavior = "auto";
            
            const baslangic = window.scrollY;
            const sure = 900; // 0.9 saniyede süzülerek çıkar
            let baslangicZamani = null;

            function yumusakKaydir(suan) {
                if (baslangicZamani === null) baslangicZamani = suan;
                const gecenZaman = suan - baslangicZamani;
                const yuzde = Math.min(gecenZaman / sure, 1);
                
                // Sinematik ivme: Yavaş başlar, hızlanır, bitişte yavaşlar
                const ivme = yuzde < 0.5 ? 4 * yuzde * yuzde * yuzde : 1 - Math.pow(-2 * yuzde + 2, 3) / 2;
                
                window.scrollTo(0, baslangic * (1 - ivme));

                if (gecenZaman < sure) {
                    requestAnimationFrame(yumusakKaydir);
                } else {
                    // 2. SİHİRLİ DOKUNUŞ: Zirveye ulaştığımızda CSS standardını geri ver
                    document.documentElement.style.scrollBehavior = "";
                }
            }
            requestAnimationFrame(yumusakKaydir);
        });
    }
});

// Tarayıcı sekme rengini (theme-color) aktif temaya göre güncelleme
const metaThemeColor = document.querySelector('meta[name="theme-color"]');
const themeToggleButton = document.getElementById('theme-toggle');

if (themeToggleButton && metaThemeColor) {
  themeToggleButton.addEventListener('click', () => {
    // Sınıfın değişmesi için milisaniyelik bir pay bırakıyoruz
    setTimeout(() => {
      if (document.body.classList.contains('dark-mode')) {
        metaThemeColor.setAttribute('content', '#121212'); // Karanlık mod rengi
      } else {
        metaThemeColor.setAttribute('content', '#f8f9fa'); // Aydınlık mod rengi
      }
    }, 50);
  });
}