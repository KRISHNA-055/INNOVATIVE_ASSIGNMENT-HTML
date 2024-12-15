// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const headerOffset = 60;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// Form submission handling
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would typically send the form data to a server
    // For this example, we'll just log it to the console
    console.log('Form submitted!');
    console.log('Name:', this.name.value);
    console.log('Email:', this.email.value);
    console.log('Message:', this.message.value);

    // Clear the form
    this.reset();

    // Show a success message (you can replace this with a more user-friendly notification)
    alert('Thank you for your message! I\'ll get back to you soon.');
});

// Add a scroll-triggered animation for skill items
window.addEventListener('scroll', function() {
    const skillItems = document.querySelectorAll('.skill-list li');
    skillItems.forEach(item => {
        const itemTop = item.getBoundingClientRect().top;
        if (itemTop < window.innerHeight - 50) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
});

// Initialize skill items with initial state
document.querySelectorAll('.skill-list li').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

// Music Player
const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const progress = document.getElementById('progress');
const timeDisplay = document.getElementById('time-display');

const favoriteSong = {
    title: 'Beiraada',
    artist: 'Bhool Bhulaiyaa 3',
    file: 'path_to_beiraada.mp3',
    cover: '/placeholder.svg?height=300&width=300'
};

function loadFavoriteSong() {
    audioPlayer.src = favoriteSong.file;
    document.getElementById('album-cover').src = favoriteSong.cover;
    document.getElementById('track-title').textContent = favoriteSong.title;
    document.getElementById('track-artist').textContent = favoriteSong.artist;
}

function togglePlayPause() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audioPlayer.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

function updateProgress() {
    const percent = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progress.style.width = `${percent}%`;
    
    const currentMinutes = Math.floor(audioPlayer.currentTime / 60);
    const currentSeconds = Math.floor(audioPlayer.currentTime % 60);
    const durationMinutes = Math.floor(audioPlayer.duration / 60);
    const durationSeconds = Math.floor(audioPlayer.duration % 60);
    
    timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${durationMinutes}:${durationSeconds.toString().padStart(2, '0')}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audioPlayer.duration;
    audioPlayer.currentTime = (clickX / width) * duration;
}

// Event Listeners
playPauseBtn.addEventListener('click', togglePlayPause);
audioPlayer.addEventListener('timeupdate', updateProgress);
progressBar.addEventListener('click', setProgress);

// Auto-start the song when the page loads
window.addEventListener('load', () => {
    loadFavoriteSong();
    audioPlayer.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

// Disable previous and next buttons (since we only have one song)
prevBtn.disabled = true;
nextBtn.disabled = true;
