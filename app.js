document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. NAVIGATION AND HEADER MANAGEMENT
       ========================================== */
    const header = document.querySelector('.navbar-wrapper');
    const hamburgerMenu = document.getElementById('hamburgerMenu');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll shift
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        updateActiveLinkOnScroll();
    });

    // Mobile Hamburger toggle
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', () => {
            hamburgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Toggle body scroll when menu is active
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }

    // Close mobile menu on clicking any link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburgerMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Scroll Spy for active nav-link
    function updateActiveLinkOnScroll() {
        const sections = document.querySelectorAll('section, header');
        let currentSectionId = 'hero';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    /* ==========================================
       2. PHILOSOPHY TABS
       ========================================== */
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const targetTab = trigger.getAttribute('data-tab');

            // Remove active states
            tabTriggers.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Set current active
            trigger.classList.add('active');
            const targetContent = document.getElementById(`tab-${targetTab}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    /* ==========================================
       3. MENU CATEGORIES FILTERING
       ========================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');

            // Set active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter items with a smooth fade & scale transition
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'flex';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 350); // Matches transition styling
                }
            });
        });
    });

    /* ==========================================
       4. INTERACTIVE SEATING ZONE CARDS
       ========================================== */
    const zoneCards = document.querySelectorAll('.zone-card');
    const bookingZoneSelect = document.getElementById('bookingZone');

    zoneCards.forEach(card => {
        card.addEventListener('click', () => {
            // Remove active status
            zoneCards.forEach(c => c.classList.remove('active'));
            // Set active
            card.classList.add('active');

            // Sync with reservation form select
            const zoneName = card.querySelector('h4').textContent;
            if (bookingZoneSelect) {
                bookingZoneSelect.value = zoneName;
            }
        });
    });

    // Sync zone select choice back to visual cards
    if (bookingZoneSelect) {
        bookingZoneSelect.addEventListener('change', () => {
            const selectedValue = bookingZoneSelect.value;
            zoneCards.forEach(card => {
                const cardName = card.querySelector('h4').textContent;
                if (cardName === selectedValue) {
                    zoneCards.forEach(c => c.classList.remove('active'));
                    card.classList.add('active');
                }
            });
        });
    }

    /* ==========================================
       5. PREMIUM RESERVATION SYSTEM ENGINE
       ========================================== */
    const bookingForm = document.getElementById('reservationForm');
    const bookingCard = document.getElementById('bookingCard');
    const bookingDateInput = document.getElementById('bookingDate');

    // Force datepicker minimum to be today (can't reserve in the past)
    if (bookingDateInput) {
        const today = new Date().toISOString().split('T')[0];
        bookingDateInput.min = today;
        bookingDateInput.value = today;
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const btnText = document.getElementById('btnText');
            const btnSpinner = document.getElementById('btnSpinner');

            // Loading state animation
            submitBtn.disabled = true;
            btnText.textContent = 'Processing Sanctuary Table...';
            btnSpinner.classList.remove('hide');

            // Simulate high-fidelity booking engine checking layout
            setTimeout(() => {
                // Collect Form Details
                const name = document.getElementById('bookingName').value;
                const email = document.getElementById('bookingEmail').value;
                const date = new Date(bookingDateInput.value).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                const time = document.getElementById('bookingTime').value;
                const guests = document.getElementById('bookingGuests').value;
                const zone = bookingZoneSelect.value;
                const notes = document.getElementById('bookingNotes').value || 'None';

                // Generate booking references
                const refNum = `AZ-2026-${Math.floor(1000 + Math.random() * 9000)}-${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`;

                // Construct Premium Animated Receipt Ticket
                const ticketHTML = `
                    <div class="booking-ticket">
                        <div class="ticket-header">
                            <i class="fa-solid fa-circle-check"></i>
                            <h3>Table Secured!</h3>
                            <p>We look forward to hosting you at Cafeaz</p>
                        </div>
                        <div class="ticket-details">
                            <div class="ticket-field">
                                <span class="label">Guest Host</span>
                                <span class="value">${escapeHTML(name)}</span>
                            </div>
                            <div class="ticket-field">
                                <span class="label">Date</span>
                                <span class="value">${date}</span>
                            </div>
                            <div class="ticket-field">
                                <span class="label">Time Frame</span>
                                <span class="value">${time}</span>
                            </div>
                            <div class="ticket-field">
                                <span class="label">Party Size</span>
                                <span class="value">${guests} ${guests === '1' ? 'Guest' : 'Guests'}</span>
                            </div>
                            <div class="ticket-field">
                                <span class="label">Aesthetic Zone</span>
                                <span class="value">${zone}</span>
                            </div>
                            <div class="ticket-field">
                                <span class="label">Special Notes</span>
                                <span class="value">${escapeHTML(notes)}</span>
                            </div>
                        </div>
                        <div class="ticket-footer">
                            <span class="label">Reservation Code</span>
                            <span class="ticket-ref">${refNum}</span>
                            <span class="ticket-tip">A confirmation receipt has been sent to ${escapeHTML(email)}.</span>
                        </div>
                        <div class="ticket-actions">
                            <button class="btn btn-primary btn-block" onclick="window.print()">
                                <i class="fa-solid fa-print"></i> Print Ticket
                            </button>
                            <button class="btn btn-secondary btn-block" id="newBookingBtn">
                                Book Another Table
                            </button>
                        </div>
                    </div>
                `;

                // Set HTML with smooth flip effect
                bookingCard.style.transform = 'rotateY(90deg)';
                bookingCard.style.opacity = '0';
                
                setTimeout(() => {
                    bookingCard.innerHTML = ticketHTML;
                    bookingCard.style.transform = 'rotateY(0deg)';
                    bookingCard.style.opacity = '1';
                    
                    // Attach reset action
                    const newBookingBtn = document.getElementById('newBookingBtn');
                    if (newBookingBtn) {
                        newBookingBtn.addEventListener('click', () => {
                            location.reload();
                        });
                    }
                }, 400);

            }, 1800); // Luxury loader timing
        });
    }

    // Helper utility to sanitize inputs
    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }

    /* ==========================================
       6. TESTIMONIALS CAROUSEL LAYER
       ========================================== */
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track ? track.children : []);
    const indicators = document.querySelectorAll('.carousel-indicator');
    let currentIndex = 0;
    let carouselInterval;

    function updateCarousel(index) {
        if (!track) return;
        currentIndex = index;
        const width = slides[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${index * 100}%)`;
        
        // Active indicator states
        indicators.forEach(ind => ind.classList.remove('active'));
        if (indicators[index]) {
            indicators[index].classList.add('active');
        }
    }

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            const index = parseInt(indicator.getAttribute('data-index'));
            updateCarousel(index);
            resetAutoPlay();
        });
    });

    // Auto play every 6 seconds
    function startAutoPlay() {
        if (slides.length <= 1) return;
        carouselInterval = setInterval(() => {
            let nextIndex = (currentIndex + 1) % slides.length;
            updateCarousel(nextIndex);
        }, 6000);
    }

    function resetAutoPlay() {
        clearInterval(carouselInterval);
        startAutoPlay();
    }

    if (track && slides.length > 0) {
        startAutoPlay();
        
        // Touch swipe support for mobiles
        let startX = 0;
        let endX = 0;
        
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            const threshold = 50;
            if (startX - endX > threshold) {
                // Swipe Left -> next
                let nextIndex = (currentIndex + 1) % slides.length;
                updateCarousel(nextIndex);
                resetAutoPlay();
            } else if (endX - startX > threshold) {
                // Swipe Right -> prev
                let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
                updateCarousel(prevIndex);
                resetAutoPlay();
            }
        }
    }

    /* ==========================================
       7. INTERSECTION OBSERVER FOR SCROLL REVEALS
       ========================================== */
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is centered
    });

    revealElements.forEach(elem => {
        revealObserver.observe(elem);
    });

    /* ==========================================
       8. NEWSLETTER CONNOISSEUR CLUB DYNAMICS
       ========================================== */
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input');
            const submitBtn = newsletterForm.querySelector('button');

            // Success feedback micro-animation
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Welcome!';
            submitBtn.style.background = '#2ec4b6';
            submitBtn.style.color = '#fff';
            submitBtn.disabled = true;
            input.value = '';

            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                submitBtn.style.color = '';
                submitBtn.disabled = false;
            }, 3000);
        });
    }

});
