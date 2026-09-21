// Add or remove gallery entries here. Video files are loaded only when a visitor opens a card.
const galleryVideos = [
  {
    title: 'Product Showcase',
    description: 'A high-converting product edit that puts texture, detail, and brand aesthetics in the spotlight.',
    category: 'Product Film',
    thumbnail: 'assests/thumbnails/productShowcase.png',
    videoUrl: 'assests/videos/productShowCase.mp4',
    duration: 'HD Reel'
  },
  {
    title: 'UGC-Style Content',
    description: 'Authentic, relatable short-form content edited to build trust and hold audience attention.',
    category: 'UGC Content',
    thumbnail: 'assests/thumbnails/UGCStyleContent.png',
    videoUrl: 'assests/videos/UGCStyleContent.mp4',
    duration: 'HD Reel'
  },
  {
    title: 'Promotional Short',
    description: 'A punchy commercial cut with energetic pacing, intentional sound design, and a strong hook.',
    category: 'Promotion',
    thumbnail: 'assests/thumbnails/promotionalShort.png',
    videoUrl: 'assests/videos/promotionalShort.mp4',
    duration: 'HD Reel'
  },
  {
    title: 'Laziz Food Reel',
    description: 'A vibrant food-focused reel with engaging visuals, smooth cuts, and dynamic pacing designed to showcase the dish in an appetizing way.',
    category: 'Food',
    thumbnail: 'assests/thumbnails/lazizFood.png',
    videoUrl: 'assests/videos/lazizFood.mp4',
    duration: 'Food Reel'
  },
  {
    title: 'Pizza Promotional Reel',
    description: 'A mouth-watering promotional reel showcasing the pizza with cinematic food shots, smooth transitions, and engaging visual pacing.',
    category: 'Food',
    thumbnail: 'assests/thumbnails/psPizza.png',
    videoUrl: 'assests/videos/psPizza.mp4',
    duration: 'Food Reel'
  },
  {
    title: 'Wipe Camera Reel',
    description: 'A short creative reel using visual transitions, text overlays, and satisfying camera movement to create an engaging social media edit.',
    category: 'Social Media',
    thumbnail: 'assests/thumbnails/wipeCamera.png',
    videoUrl: 'assests/videos/wipeCamera.mp4',
    duration: 'Short Reel'
  },
  {
    title: 'Trend-Based Reel',
    description: 'Fast-moving trend-led storytelling designed around sharp transitions and high retention.',
    category: 'Social Reel',
    thumbnail: 'assests/thumbnails/trendBasedShort.png',
    videoUrl: 'assests/videos/trendBased.mp4',
    duration: 'HD Reel'
  }
];

// Add or remove Content Portfolio categories here. Each category controls its label and preview media.
const contentPortfolioCategories = [
  {
    id: 'product',
    label: 'Product showcase videos',
    videoUrl: 'assests/videos/productShowCase.mp4',
    thumbnail: 'assests/thumbnails/productShowcase.png'
  },
  {
    id: 'ugc',
    label: 'UGC-style content',
    videoUrl: 'assests/videos/UGCStyleContent.mp4',
    thumbnail: 'assests/thumbnails/UGCStyleContent.png'
  },
  {
    id: 'promo',
    label: 'Promotional short videos',
    videoUrl: 'assests/videos/promotionalShort.mp4',
    thumbnail: 'assests/thumbnails/promotionalShort.png'
  },
  {
    id: 'food',
    label: 'Food videos',
    videoUrl: 'assests/videos/psPizza.mp4',
    thumbnail: 'assests/thumbnails/psPizza.png'
  },
  {
    id: 'trend',
    label: 'Trend-based short videos',
    videoUrl: 'assests/videos/trendBased.mp4',
    thumbnail: 'assests/thumbnails/trendBasedShort.png'
  }
];

// Initialize Lucide Icons
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  initPortfolio();
});

function initPortfolio() {
  const sections = document.querySelectorAll('.page-section');
  const pageBadge = document.getElementById('pageBadge');
  const navLinks = document.querySelectorAll('.nav-link');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.getElementById('navLinks');
  const videoGalleryGrid = document.getElementById('videoGalleryGrid');

  // Gallery UI is intentionally generated from galleryVideos, keeping content separate from markup.
  if (videoGalleryGrid) {
    videoGalleryGrid.innerHTML = galleryVideos.map((video, index) => `
      <article class="gallery-video-card" data-gallery-index="${index}" tabindex="0" role="button" aria-label="Play ${video.title}">
        <div class="gallery-video-preview">
          <img src="${video.thumbnail}" alt="${video.title} video preview" loading="lazy" decoding="async">
          <div class="gallery-preview-overlay"></div>
          <span class="gallery-category">${video.category}</span>
          <span class="gallery-duration">${video.duration}</span>
          <span class="gallery-play-button" aria-hidden="true"><i data-lucide="play" style="width: 20px; height: 20px; fill: currentColor;"></i></span>
        </div>
        <div class="gallery-card-details">
          <h3>${video.title}</h3>
          <p>${video.description}</p>
          <span class="gallery-watch-link">Watch edit <i data-lucide="arrow-up-right" style="width: 16px; height: 16px;"></i></span>
        </div>
      </article>
    `).join('');

    const openGalleryVideo = (index) => {
      const video = galleryVideos[index];
      if (video && window.openModal) {
        window.openModal(video.title, video.description, video.videoUrl, video.thumbnail);
      }
    };

    videoGalleryGrid.addEventListener('click', (event) => {
      const card = event.target.closest('.gallery-video-card');
      if (card) openGalleryVideo(Number(card.dataset.galleryIndex));
    });
    videoGalleryGrid.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const card = event.target.closest('.gallery-video-card');
        if (card) {
          event.preventDefault();
          openGalleryVideo(Number(card.dataset.galleryIndex));
        }
      }
    });
  }

  // Modal Elements
  const videoModal = document.getElementById('videoModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoDesc = document.getElementById('modalVideoDesc');
  const modalPlayBtn = document.getElementById('modalPlayBtn');

  // Form and Toast Elements
  const contactForm = document.getElementById('contactForm');
  const toastBox = document.getElementById('toastBox');
  const toastMessage = document.getElementById('toastMessage');
  const downloadMediaKitBtn = document.getElementById('downloadMediaKitBtn');

  // ----------------------------------------------------
  // 1. Intersection Observer for Scroll Tracking
  // ----------------------------------------------------
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -20% 0px',
    threshold: 0.3
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const pageNum = parseInt(entry.target.getAttribute('data-page-index'), 10);
        updateActivePage(pageNum);
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));

  function updateActivePage(pageNum) {
    const formattedPage = pageNum < 10 ? `0${pageNum}` : `${pageNum}`;

    // Update Badge
    if (pageBadge) pageBadge.textContent = `PAGE ${formattedPage}`;

    // Update Nav Link Active state
    navLinks.forEach(link => {
      const linkPage = parseInt(link.getAttribute('data-page'), 10);
      if (linkPage === pageNum ||
        (pageNum === 2 && linkPage === 1) ||
        (pageNum === 3 && linkPage === 3) ||
        (pageNum === 4 && linkPage === 4) ||
        (pageNum === 5 && linkPage === 5) ||
        (pageNum >= 6 && linkPage === 6)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // Close modal on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && videoModal && videoModal.classList.contains('open')) {
      closeModal();
    }
  });

  // Mobile Menu Toggle
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('mobile-open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('mobile-open');
      });
    });
  }

  // ----------------------------------------------------
  // 3. Video Showcase Player & Lightbox System
  // ----------------------------------------------------
  const mainVideoPlayer = document.getElementById('mainVideoPlayer');
  const vPlayPauseBtn = document.getElementById('vPlayPauseBtn');
  const vPlayIcon = document.getElementById('vPlayIcon');
  const centerPlayIcon = document.getElementById('centerPlayIcon');
  const vProgressContainer = document.getElementById('vProgressContainer');
  const vProgressBar = document.getElementById('vProgressBar');
  const vTimeDisplay = document.getElementById('vTimeDisplay');
  const vMuteBtn = document.getElementById('vMuteBtn');
  const vMuteIcon = document.getElementById('vMuteIcon');
  const vVolumeSlider = document.getElementById('vVolumeSlider');
  const vFullscreenBtn = document.getElementById('vFullscreenBtn');

  function formatTime(seconds) {
    if (isNaN(seconds)) return "00:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins < 10 ? '0' + mins : mins}:${secs < 10 ? '0' + secs : secs}`;
  }

  window.openModal = function (title, desc, videoSrc, posterSrc) {
    if (modalVideoTitle) modalVideoTitle.textContent = title;
    if (modalVideoDesc) modalVideoDesc.textContent = desc;

    if (videoModal) videoModal.classList.add('open');

    if (mainVideoPlayer) {
      if (posterSrc) mainVideoPlayer.poster = posterSrc;

      // Setting mainVideoPlayer.src directly is the standard way to change video sources reliably
      if (videoSrc) {
        mainVideoPlayer.src = videoSrc;
        mainVideoPlayer.load();
      }

      mainVideoPlayer.currentTime = 0;

      // Try to play; if unmuted autoplay is blocked by browser policy, try muted
      const playPromise = mainVideoPlayer.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          if (modalPlayBtn) modalPlayBtn.classList.add('playing');
          updatePlayIcons(true);
        }).catch(error => {
          console.warn('Autoplay blocked, user interaction required:', error);
          // Try playing muted as fallback
          mainVideoPlayer.muted = true;
          mainVideoPlayer.play().then(() => {
            if (modalPlayBtn) modalPlayBtn.classList.add('playing');
            updatePlayIcons(true);
            showToast('▶ Video started (muted). Click speaker icon for sound!');
          }).catch(() => {
            if (modalPlayBtn) modalPlayBtn.classList.remove('playing');
            updatePlayIcons(false);
          });
        });
      }
    }
  };

  window.closeModal = function () {
    if (mainVideoPlayer) {
      mainVideoPlayer.pause();
      mainVideoPlayer.removeAttribute('src'); // Stop buffering
      mainVideoPlayer.load();
      if (modalPlayBtn) modalPlayBtn.classList.remove('playing');
      updatePlayIcons(false);
    }
    if (videoModal) videoModal.classList.remove('open');
  };

  function togglePlayVideo() {
    if (!mainVideoPlayer) return;
    if (mainVideoPlayer.paused) {
      mainVideoPlayer.play().then(() => {
        if (modalPlayBtn) modalPlayBtn.classList.add('playing');
        updatePlayIcons(true);
      }).catch(err => {
        console.error('Play error:', err);
      });
    } else {
      mainVideoPlayer.pause();
      if (modalPlayBtn) modalPlayBtn.classList.remove('playing');
      updatePlayIcons(false);
    }
  }

  function updatePlayIcons(isPlaying) {
    if (vPlayIcon) {
      vPlayIcon.setAttribute('data-lucide', isPlaying ? 'pause' : 'play');
    }
    if (centerPlayIcon) {
      centerPlayIcon.setAttribute('data-lucide', isPlaying ? 'pause' : 'play');
    }
    if (window.lucide) window.lucide.createIcons();
  }

  if (modalPlayBtn) modalPlayBtn.addEventListener('click', togglePlayVideo);
  if (vPlayPauseBtn) vPlayPauseBtn.addEventListener('click', togglePlayVideo);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);

  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeModal();
    });
  }

  // Update time and progress bar
  if (mainVideoPlayer) {
    mainVideoPlayer.addEventListener('timeupdate', () => {
      const current = mainVideoPlayer.currentTime;
      const duration = mainVideoPlayer.duration || 0;
      const percent = duration > 0 ? (current / duration) * 100 : 0;

      if (vProgressBar) vProgressBar.style.width = `${percent}%`;
      if (vTimeDisplay) vTimeDisplay.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
    });

    mainVideoPlayer.addEventListener('ended', () => {
      if (modalPlayBtn) modalPlayBtn.classList.remove('playing');
      updatePlayIcons(false);
    });

    mainVideoPlayer.addEventListener('click', togglePlayVideo);
  }

  // Seek on progress bar click
  if (vProgressContainer && mainVideoPlayer) {
    vProgressContainer.addEventListener('click', (e) => {
      const rect = vProgressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const seekRatio = Math.max(0, Math.min(1, clickX / width));
      if (mainVideoPlayer.duration) {
        mainVideoPlayer.currentTime = seekRatio * mainVideoPlayer.duration;
      }
    });
  }

  // Volume & Mute
  if (vMuteBtn && mainVideoPlayer) {
    vMuteBtn.addEventListener('click', () => {
      mainVideoPlayer.muted = !mainVideoPlayer.muted;
      if (vMuteIcon) {
        vMuteIcon.setAttribute('data-lucide', mainVideoPlayer.muted ? 'volume-x' : 'volume-2');
        if (window.lucide) window.lucide.createIcons();
      }
      showToast(mainVideoPlayer.muted ? '🔇 Video Muted' : '🔊 Audio Enabled');
    });
  }

  if (vVolumeSlider && mainVideoPlayer) {
    vVolumeSlider.addEventListener('input', () => {
      mainVideoPlayer.volume = Number(vVolumeSlider.value);
      mainVideoPlayer.muted = mainVideoPlayer.volume === 0;
      if (vMuteIcon) {
        vMuteIcon.setAttribute('data-lucide', mainVideoPlayer.muted ? 'volume-x' : 'volume-2');
        if (window.lucide) window.lucide.createIcons();
      }
    });
  }

  // Fullscreen
  if (vFullscreenBtn && mainVideoPlayer) {
    vFullscreenBtn.addEventListener('click', () => {
      if (!document.fullscreenElement) {
        mainVideoPlayer.requestFullscreen?.() || mainVideoPlayer.webkitRequestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    });
  }

  // ----------------------------------------------------
  // 4. Content Portfolio Category Switches
  // ----------------------------------------------------
  const inlinePortfolioVideo = document.getElementById('inlinePortfolioVideo');
  const contentPortfolioList = document.getElementById('contentPortfolioList');

  if (contentPortfolioList) {
    contentPortfolioList.innerHTML = contentPortfolioCategories.map(category => `
      <li class="portfolio-check-item" data-category-id="${category.id}" tabindex="0" role="button" aria-label="Preview ${category.label}">
        <span class="check-icon-circle"><i data-lucide="check" style="width: 18px; height: 18px;"></i></span>
        <span>${category.label}</span>
      </li>
    `).join('');
  }

  if (window.lucide) window.lucide.createIcons();
  const portfolioItems = document.querySelectorAll('.portfolio-check-item');

  const categoryVideos = Object.fromEntries(contentPortfolioCategories.map(category => [
    category.id,
    { title: category.label, src: category.videoUrl, poster: category.thumbnail }
  ]));

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const type = item.getAttribute('data-category-id') || contentPortfolioCategories[0]?.id;
      const config = categoryVideos[type];

      portfolioItems.forEach(i => i.style.opacity = '0.6');
      item.style.opacity = '1';

      if (inlinePortfolioVideo && config) {
        inlinePortfolioVideo.src = config.src;
        inlinePortfolioVideo.poster = config.poster;
        inlinePortfolioVideo.load();
        inlinePortfolioVideo.play().catch(e => console.log('Inline play user action:', e));
        showToast(`🎬 Playing: ${config.title}`);
      }
    });
  });

  // Configure the initial preview from the first category without autoplaying it.
  if (inlinePortfolioVideo && portfolioItems.length && contentPortfolioCategories.length) {
    const initialCategory = contentPortfolioCategories[0];
    inlinePortfolioVideo.src = initialCategory.videoUrl;
    inlinePortfolioVideo.poster = initialCategory.thumbnail;
    inlinePortfolioVideo.load();
    portfolioItems[0].style.opacity = '1';
  }

  // ----------------------------------------------------
  // 5. Direct Gmail Dispatch Toast Helper
  // ----------------------------------------------------
  const sendEmailBtn = document.getElementById('sendEmailBtn');
  if (sendEmailBtn) {
    sendEmailBtn.addEventListener('click', () => {
      showToast('✉️ Opening Gmail Compose with pre-filled details...');
    });
  }

  // ----------------------------------------------------
  // 6. Media Kit Download Button
  // ----------------------------------------------------
  if (downloadMediaKitBtn) {
    downloadMediaKitBtn.addEventListener('click', () => {
      showToast('📄 Faizan Kadodiya Media Kit & Rate Card downloaded!');
    });
  }

  // ----------------------------------------------------
  // 7. Toast Helper
  // ----------------------------------------------------
  let toastTimer;
  function showToast(msg) {
    if (!toastBox) return;
    if (toastMessage) toastMessage.textContent = msg;
    toastBox.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastBox.classList.remove('show');
    }, 4000);
  }
}
