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
  const deckSlideCount = document.getElementById('deckSlideCount');
  const navLinks = document.querySelectorAll('.nav-link');
  const modeToggleBtn = document.getElementById('modeToggleBtn');
  const modeText = document.getElementById('modeText');
  const deckPrevBtn = document.getElementById('deckPrevBtn');
  const deckNextBtn = document.getElementById('deckNextBtn');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinksContainer = document.getElementById('navLinks');

  // Modal Elements
  const videoModal = document.getElementById('videoModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalVideoTitle = document.getElementById('modalVideoTitle');
  const modalVideoDesc = document.getElementById('modalVideoDesc');
  const modalVideoPoster = document.getElementById('modalVideoPoster');
  const modalPlayBtn = document.getElementById('modalPlayBtn');
  const openReelGalleryBtn = document.getElementById('openReelGalleryBtn');

  // Form and Toast Elements
  const contactForm = document.getElementById('contactForm');
  const toastBox = document.getElementById('toastBox');
  const toastMessage = document.getElementById('toastMessage');
  const downloadMediaKitBtn = document.getElementById('downloadMediaKitBtn');

  let currentSlideIndex = 1;
  const totalSlides = sections.length;
  let isDeckMode = false;

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
    currentSlideIndex = pageNum;
    const formattedPage = pageNum < 10 ? `0${pageNum}` : `${pageNum}`;

    // Update Badge & Deck Counter
    if (pageBadge) pageBadge.textContent = `PAGE ${formattedPage}`;
    if (deckSlideCount) deckSlideCount.textContent = `${formattedPage} / ${totalSlides < 10 ? '0' + totalSlides : totalSlides}`;

    // Update Nav Link Active state
    navLinks.forEach(link => {
      const linkPage = parseInt(link.getAttribute('data-page'), 10);
      if (linkPage === pageNum ||
        (pageNum === 2 && linkPage === 1) ||
        (pageNum === 3 && linkPage === 3) ||
        ((pageNum === 4 || pageNum === 5) && linkPage === 4) ||
        (pageNum >= 6 && linkPage === 6)) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  // ----------------------------------------------------
  // 2. Deck Presentation Mode & Navigation
  // ----------------------------------------------------
  function goToSlide(index) {
    if (index < 1) index = 1;
    if (index > totalSlides) index = totalSlides;

    const targetSection = document.getElementById(`page-${index < 10 ? '0' + index : index}`);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (deckPrevBtn) {
    deckPrevBtn.addEventListener('click', () => goToSlide(currentSlideIndex - 1));
  }

  if (deckNextBtn) {
    deckNextBtn.addEventListener('click', () => goToSlide(currentSlideIndex + 1));
  }

  // Keyboard navigation for presentation
  window.addEventListener('keydown', (e) => {
    if (videoModal && videoModal.classList.contains('open')) {
      if (e.key === 'Escape') closeModal();
      return;
    }

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === 'PageDown') {
      goToSlide(currentSlideIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp' || e.key === 'PageUp') {
      goToSlide(currentSlideIndex - 1);
    }
  });

  // Toggle Presentation / Deck Mode
  if (modeToggleBtn) {
    modeToggleBtn.addEventListener('click', () => {
      isDeckMode = !isDeckMode;
      document.body.classList.toggle('deck-mode-active', isDeckMode);
      if (isDeckMode) {
        modeText.textContent = 'Scroll Mode';
        showToast('Presentation Deck Mode enabled! Use Left/Right Arrow keys.');
      } else {
        modeText.textContent = 'Deck Mode';
        showToast('Continuous Scroll Mode restored.');
      }
    });
  }

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
  const videoSource = document.getElementById('videoSource');
  const vPlayPauseBtn = document.getElementById('vPlayPauseBtn');
  const vPlayIcon = document.getElementById('vPlayIcon');
  const centerPlayIcon = document.getElementById('centerPlayIcon');
  const vProgressContainer = document.getElementById('vProgressContainer');
  const vProgressBar = document.getElementById('vProgressBar');
  const vTimeDisplay = document.getElementById('vTimeDisplay');
  const vMuteBtn = document.getElementById('vMuteBtn');
  const vMuteIcon = document.getElementById('vMuteIcon');
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

  // Bind project card click handlers to load real videos
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const title = card.getAttribute('data-video-title') || 'Featured Brand Video';
      const desc = card.getAttribute('data-video-desc') || 'Cinematic video content designed for client branding.';
      const videoSrc = card.getAttribute('data-video-src') || 'assests/videos/productShowCase.mp4';
      const posterSrc = card.getAttribute('data-video-img') || card.querySelector('img').src;
      openModal(title, desc, videoSrc, posterSrc);
    });
  });

  // Featured Reel Button
  if (openReelGalleryBtn) {
    openReelGalleryBtn.addEventListener('click', () => {
      openModal(
        'Faizan Kadodiya - Video Director & Editor Showreel',
        'A high-energy compilation of viral short-form commercials, UGC hooks, product cinematography, and lifestyle reels.',
        'assests/videos/productShowCase.mp4',
        'assests/thumbnails/productShowcase.png'
      );
    });
  }

  // ----------------------------------------------------
  // 4. Content Portfolio Category Switches
  // ----------------------------------------------------
  const inlinePortfolioVideo = document.getElementById('inlinePortfolioVideo');
  const portfolioItems = document.querySelectorAll('.portfolio-check-item');

  const categoryVideos = {
    'product': {
      title: 'productShowCase',
      src: 'assests/videos/productShowCase.mp4',
      poster: 'assests/thumbnails/productShowcase.png'
    },
    'lifestyle': {
      title: 'lifeStyle',
      src: 'assests/videos/lifeStyle.mp4',
      poster: 'assests/thumbnails/lifeStyle.png'
    },
    'ugc': {
      title: 'UGC stytle content',
      src: 'assests/videos/UGCStyleContent.mp4',
      poster: 'assests/thumbnails/UGCStyleContent.png'
    },
    'promo': {
      title: 'promotionalShort',
      src: 'assests/videos/promotionalShort.mp4',
      poster: 'assests/thumbnails/promotionalShort.png'
    },
    'trend': {
      title: 'trendBasedShort',
      src: 'assests/videos/trendBased.mp4',
      poster: 'assests/thumbnails/trendBasedShort.png'
    }
  };

  portfolioItems.forEach(item => {
    item.addEventListener('click', () => {
      const type = item.getAttribute('data-filter') || 'product';
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
