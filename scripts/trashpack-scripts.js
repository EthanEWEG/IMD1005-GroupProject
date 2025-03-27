function toggleTheme() {
    const body = document.body;
    const themeBtn = document.querySelector('.theme-toggle-btn');
    
    body.classList.toggle('dark-mode');
    
    // Update button text
    if (themeBtn) {
      const isDarkMode = body.classList.contains('dark-mode');
      themeBtn.innerHTML = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    }
    
    // Save preference
    localStorage.setItem('darkMode', body.classList.contains('dark-mode'));
  }
  
  // Initialize theme from localStorage
  function initializeTheme() {
    const savedTheme = localStorage.getItem('darkMode');
    const themeBtn = document.querySelector('.theme-toggle-btn');
    
    if (savedTheme === 'true') {
      document.body.classList.add('dark-mode');
      if (themeBtn) {
        themeBtn.innerHTML = '☀️ Light Mode';
      }
    }
  }
  
  // Header Animation
  function animateHeader() {
    const header = document.getElementById('mainHeader');
    header.style.animation = 'none';
    void header.offsetWidth; // Trigger reflow
    header.style.animation = 'header-shake 0.5s';
    setTimeout(() => {
      header.style.animation = '';
    }, 500);
  }
  
  // Particle Effect
  function addParticles(element) {
    for (let i = 0; i < 10; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.backgroundColor = `hsl(${Math.random() * 60 + 80}, 70%, 50%)`;
      particle.style.width = `${Math.random() * 10 + 5}px`;
      particle.style.height = particle.style.width;
      particle.style.position = 'absolute';
      particle.style.borderRadius = '50%';
      particle.style.pointerEvents = 'none';
      particle.style.zIndex = '10';
      particle.style.animation = 'particle-fall 1s linear forwards';
      
      element.style.position = 'relative';
      element.style.overflow = 'hidden';
      element.appendChild(particle);
      
      setTimeout(() => {
        particle.remove();
      }, 1000);
    }
  }
  
  // Music Player
  let currentTrack = 0;
  const tracks = [
    { title: "♫ Trash Rock Anthem ♫", src: "sound.mp3" },
    { title: "♫ Garbage Groove ♫", src: "sound2.mp3" },
    { title: "♫ Rubbish Rhythm ♫", src: "sound3.mp3" }
  ];
  
  function skipTrack() {
    const player = document.getElementById('player');
    const songTitle = document.getElementById('songTitle');
    
    if (player) {
      currentTrack = (currentTrack + 1) % tracks.length;
      player.src = tracks[currentTrack].src;
      songTitle.textContent = tracks[currentTrack].title;
      player.play();
    }
  }
  
  // Carousel functionality
  let currentSlideIndex = 0;
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  
  function showSlide(index) {
    const track = document.querySelector('.carousel-track');
    if (!track) return;
    
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
    slides.forEach((slide, i) => slide.classList.toggle('active', i === index));
    currentSlideIndex = index;
  }
  
  function moveSlide(n) {
    showSlide(currentSlideIndex + n);
  }
  
  function currentSlide(n) {
    showSlide(n - 1);
  }
  
  // Gallery Modal
  function setupGallery() {
    const gridItems = document.querySelectorAll('.grid-item');
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
      <div class="modal-content">
        <span class="close">&times;</span>
        <img class="modal-image" src="" alt="">
        <div class="modal-caption"></div>
      </div>
    `;
    document.body.appendChild(modal);
  
    gridItems.forEach(item => {
      item.addEventListener('click', () => {
        const imgSrc = item.querySelector('img').src;
        const caption = item.querySelector('.grid-caption').textContent;
        modal.querySelector('.modal-image').src = imgSrc;
        modal.querySelector('.modal-image').alt = caption;
        modal.querySelector('.modal-caption').textContent = caption;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
      });
    });
  
    modal.querySelector('.close').addEventListener('click', () => {
      modal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  // Visitor Counter
  function updateCounter() {
    const counter = document.getElementById('visitorCounter');
    if (!counter) return;
    
    let count = localStorage.getItem('visitorCount') || 1000;
    count = parseInt(count) + 1;
    localStorage.setItem('visitorCount', count);
    counter.textContent = count.toString().padStart(4, '0');
  }
  
  // Trash Collector Game
  let gameInterval;
  let score = 0;
  let timeLeft = 30;
  let isGameRunning = false;
  
  function startGame() {
    const gameArea = document.getElementById('gameArea');
    const startBtn = document.getElementById('startBtn');
    
    if (!gameArea || !startBtn || isGameRunning) return;
    
    isGameRunning = true;
    score = 0;
    timeLeft = 30;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = timeLeft;
    gameArea.innerHTML = '';
    startBtn.disabled = true;
    
    gameInterval = setInterval(() => {
      timeLeft--;
      document.getElementById('timer').textContent = timeLeft;
      
      if (timeLeft <= 0) {
        endGame();
        return;
      }
      
      if (Math.random() > 0.7) {
        createTrashItem();
      }
    }, 1000);
  }
  
  function createTrashItem() {
    const gameArea = document.getElementById('gameArea');
    if (!gameArea) return;
    
    const trashTypes = ['🗑️', '🍌', '🍕', '🥫', '📰', '🧦'];
    const trash = document.createElement('div');
    trash.className = 'trash-item';
    trash.textContent = trashTypes[Math.floor(Math.random() * trashTypes.length)];
    trash.style.left = `${Math.random() * 90}%`;
    trash.style.position = 'absolute';
    trash.style.cursor = 'pointer';
    trash.style.fontSize = '2em';
    trash.style.transition = 'transform 0.1s';
    
    trash.addEventListener('click', () => {
      score++;
      document.getElementById('score').textContent = score;
      trash.style.transform = 'scale(1.5)';
      setTimeout(() => trash.remove(), 100);
    });
    
    gameArea.appendChild(trash);
    setTimeout(() => trash.parentNode && trash.remove(), 3000);
  }
  
  function endGame() {
    clearInterval(gameInterval);
    isGameRunning = false;
    const startBtn = document.getElementById('startBtn');
    if (startBtn) startBtn.disabled = false;
    const gameArea = document.getElementById('gameArea');
    if (gameArea) gameArea.innerHTML = '';
    alert(`Game Over! Your score: ${score}`);
  }
  
  // Initialize everything
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme first
    initializeTheme();
    
    // Set up theme toggle button
    const themeBtn = document.querySelector('.theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', toggleTheme);
    }
    
    // Other initializations
    const mainHeader = document.getElementById('mainHeader');
    if (mainHeader) mainHeader.addEventListener('click', animateHeader);
    
    const player = document.getElementById('player');
    if (player) player.src = tracks[currentTrack].src;
    
    const skipBtn = document.querySelector('button[onclick="skipTrack()"]');
    if (skipBtn) skipBtn.addEventListener('click', skipTrack);
    
    if (slides.length > 0) {
      const prevBtn = document.querySelector('.carousel-btn.prev');
      const nextBtn = document.querySelector('.carousel-btn.next');
      if (prevBtn) prevBtn.addEventListener('click', () => moveSlide(-1));
      if (nextBtn) nextBtn.addEventListener('click', () => moveSlide(1));
      dots.forEach((dot, i) => dot.addEventListener('click', () => currentSlide(i + 1)));
      setInterval(() => moveSlide(1), 10000);
    }
    
    setupGallery();
    updateCounter();
    
    const gameStartBtn = document.getElementById('startBtn');
    if (gameStartBtn) gameStartBtn.addEventListener('click', startGame);
    
    document.querySelectorAll('.navbar a').forEach(link => {
      link.addEventListener('mouseenter', function() {
        addParticles(this);
      });
    });
  });