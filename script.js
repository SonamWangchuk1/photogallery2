document.addEventListener('DOMContentLoaded', function() {
    const photoItems = document.querySelectorAll('.photo-item');
    const lightbox = document.querySelector('.lightbox');
    const lightboxImage = document.querySelector('.lightbox-image');
    const closeBtn = document.querySelector('.close');
    const prevButton = document.createElement('button');
    const nextButton = document.createElement('button');

    // Configure previous button
    prevButton.innerHTML = '&lt;'; // Left arrow HTML entity
    prevButton.classList.add('lightbox-prev');
    lightbox.appendChild(prevButton);

    // Configure next button
    nextButton.innerHTML = '&gt;'; // Right arrow HTML entity
    nextButton.classList.add('lightbox-next');
    lightbox.appendChild(nextButton);

    // Function to open lightbox with clicked image
    function openLightbox(imageSrc) {
        lightboxImage.src = imageSrc;
        lightbox.style.display = 'flex'; // Display lightbox as flex container
        document.body.style.overflow = 'hidden'; // Disable scrolling on body
    }

    // Event listener for each photo item
    photoItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            openLightbox(imgSrc);
        });
    });

    // Close lightbox modal
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Enable scrolling on body
    }

    // Event listener for close button
    closeBtn.addEventListener('click', closeLightbox);

    // Event listener to close lightbox when clicking outside the image
    lightbox.addEventListener('click', (event) => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    // Keyboard navigation for lightbox (Left/Right arrow keys)
    document.addEventListener('keydown', (event) => {
        if (lightbox.style.display === 'flex') {
            if (event.key === 'ArrowLeft') {
                // Navigate to previous image
                navigateLightbox(-1);
            } else if (event.key === 'ArrowRight') {
                // Navigate to next image
                navigateLightbox(1);
            }
        }
    });

    // Event listener for previous button
    prevButton.addEventListener('click', () => {
        navigateLightbox(-1); // Navigate to previous image
    });

    // Event listener for next button
    nextButton.addEventListener('click', () => {
        navigateLightbox(1); // Navigate to next image
    });

    // Function to navigate between images in lightbox
    function navigateLightbox(direction) {
        const currentSrc = lightboxImage.src;
        const currentIndex = Array.from(photoItems).findIndex(item => {
            return item.querySelector('img').src === currentSrc;
        });

        let newIndex = (currentIndex + direction + photoItems.length) % photoItems.length;
        const newImgSrc = photoItems[newIndex].querySelector('img').src;
        lightboxImage.src = newImgSrc;
    }
});
