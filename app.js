// app.js - Seola Yun's Web App Interactivity

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Theme Toggle (Light / Dark Mode)
    // ==========================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check local storage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.className = 'fa-solid fa-moon';
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        
        if (isDarkMode) {
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'light');
        }
    });


    // ==========================================
    // 2. Lifestyle Tab Navigation
    // ==========================================
    const lifeTabBtns = document.querySelectorAll('.life-tab-btn');
    const lifeTabContents = document.querySelectorAll('.life-tab-content');

    lifeTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-life-tab');
            
            // Toggle Button States
            lifeTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Toggle Content Visibility
            lifeTabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === `life-${targetTab}`) {
                    content.classList.add('active');
                }
            });

            // Initialize animations or scroll updates if needed
            if (targetTab === 'bucketlist') {
                updateBucketProgressBar();
            }
        });
    });


    // ==========================================
    // 3. Text-to-Speech (Speech Synthesis)
    // ==========================================
    const ttsHeroBtn = document.getElementById('tts-hero-btn');
    const introductionText = `Hi, I'm Seola Yun from South Korea! I'm a 22-year-old student studying at JBNU. I absolutely love light pink and fresh fruits. I also enjoy traveling and learning about animals. I have a precious little pet dog, a poodle! One quirky thing about me is that I really hate raw olives. My goal is to become someone who loves their own life and grows into a real adult. Although my future path isn't completely clear yet, I'm a challenging and impressive person who wants to work at what I love and constantly improve myself. I started as a nursing student, but I followed my passion and exchanged my department to Animal Science. I am still eagerly looking forward to achieving my dreams!`;

    let synth = window.speechSynthesis;
    let speechUtterance = null;
    let isSpeaking = false;

    function speakText(text, btnElement) {
        if (!synth) {
            alert('Sorry, your browser does not support text-to-speech.');
            return;
        }

        if (synth.speaking) {
            synth.cancel();
            isSpeaking = false;
            updateTTSButtons(false);
            return;
        }

        speechUtterance = new SpeechSynthesisUtterance(text);
        
        const voices = synth.getVoices();
        const englishVoice = voices.find(voice => voice.lang.startsWith('en-')) || voices[0];
        if (englishVoice) {
            speechUtterance.voice = englishVoice;
        }
        
        speechUtterance.rate = 0.95;
        speechUtterance.pitch = 1.0;

        speechUtterance.onstart = () => {
            isSpeaking = true;
            updateTTSButtons(true);
        };

        speechUtterance.onend = () => {
            isSpeaking = false;
            updateTTSButtons(false);
        };

        speechUtterance.onerror = () => {
            isSpeaking = false;
            updateTTSButtons(false);
        };

        synth.speak(speechUtterance);
    }

    function updateTTSButtons(speaking) {
        if (speaking) {
            ttsHeroBtn.innerHTML = `<i class="fa-solid fa-circle-stop"></i> Stop Audio`;
        } else {
            ttsHeroBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i> Listen to Intro`;
        }
    }

    ttsHeroBtn.addEventListener('click', () => speakText(introductionText, ttsHeroBtn));

    window.addEventListener('beforeunload', () => {
        if (synth && synth.speaking) {
            synth.cancel();
        }
    });

    if (synth && synth.onvoiceschanged !== undefined) {
        synth.onvoiceschanged = () => {};
    }


    // ==========================================
    // 4. Mock Instagram Feed Database & Controller
    // ==========================================
    const instagramPosts = [
        {
            id: 1,
            img: "insta_1.jpg",
            likes: 142,
            likedByUser: false,
            commentsCount: 3,
            location: "Jeju Island, Korea",
            caption: "Sunset walk by the beach. Finding peace in the sound of waves 🌊.",
            date: "May 20, 2026",
            comments: [
                { user: "j.park", text: "Jeju sunset is always magical! 😍" },
                { user: "sooo_hee", text: "This looks so peaceful!" },
                { user: "u0._.n7", text: "@sooo_hee It really is. Highly recommend visiting!" }
            ]
        },
        {
            id: 2,
            img: "insta_2.jpg",
            likes: 218,
            likedByUser: false,
            commentsCount: 3,
            location: "Canola Flower Field",
            caption: "Walking through a sea of yellow! Canola flowers in full bloom 🌼✨.",
            date: "May 14, 2026",
            comments: [
                { user: "flower_fan", text: "Look at all that yellow! 🌼" },
                { user: "u0._.n7", text: "Yes! The field goes on forever." },
                { user: "min_99", text: "Beautiful spring vibes." }
            ]
        },
        {
            id: 3,
            img: "insta_4.jpg",
            likes: 185,
            likedByUser: false,
            commentsCount: 2,
            location: "Gyeongbokgung Palace",
            caption: "Cherry blossoms framing the beautiful Gyeonghoeru Pavilion. Spring is finally here! 🌸🏯",
            date: "April 28, 2026",
            comments: [
                { user: "seoul_life", text: "My favorite spot in Gyeongbokgung! 🌸" },
                { user: "hannah_b", text: "The cherry blossoms look perfect here." }
            ]
        },
        {
            id: 4,
            img: "insta_6.jpg",
            likes: 185,
            likedByUser: false,
            commentsCount: 3,
            location: "Above the Clouds",
            caption: "Looking down at the beautiful winter mountains from the sky ✈️❄️. Traveling always opens my heart to new dreams.",
            date: "April 15, 2026",
            comments: [
                { user: "travel_bug", text: "What a stunning view from the window! ✈️" },
                { user: "u0._.n7", text: "@travel_bug It was absolutely breathtaking!" },
                { user: "sooo_hee", text: "Where are you heading? Safe travels!" }
            ]
        },
        {
            id: 5,
            img: "insta_3.jpg",
            likes: 196,
            likedByUser: false,
            commentsCount: 3,
            location: "Taco & Pasta Dinner",
            caption: "A delicious feast tonight! Tacos and pasta table 🌮🍝 (strictly raw olive-free, of course! 🚫🫒)",
            date: "March 30, 2026",
            comments: [
                { user: "taco_lover", text: "Oh wow, tacos and pasta together? Sign me up!" },
                { user: "funny_guy", text: "Zero olives? That's a win! 😂" },
                { user: "u0._.n7", text: "@funny_guy Absolutely, raw olives are banned in this house!" }
            ]
        },
        {
            id: 6,
            img: "insta_5.jpg",
            likes: 225,
            likedByUser: false,
            commentsCount: 2,
            location: "Sunny Dog Park",
            caption: "Out for a walk with the happiest puppy 🐾. Running around and enjoying the beautiful weather!",
            date: "March 18, 2026",
            comments: [
                { user: "pup_life", text: "Look at that happy face! 🐶" },
                { user: "dog_trainer", text: "What a good boy/girl!" }
            ]
        }
    ];

    const instaGrid = document.getElementById('insta-posts-grid');

    function renderInstagramGrid() {
        instaGrid.innerHTML = '';
        instagramPosts.forEach(post => {
            const card = document.createElement('div');
            card.className = 'insta-post-card';
            card.setAttribute('data-id', post.id);
            card.innerHTML = `
                <img src="${post.img}" alt="Instagram Post" class="insta-post-img">
                <div class="insta-post-overlay">
                    <span><i class="fa-solid fa-heart"></i> <span class="overlay-likes-count">${post.likes}</span></span>
                    <span><i class="fa-solid fa-comment"></i> <span class="overlay-comments-count">${post.commentsCount}</span></span>
                </div>
            `;
            card.addEventListener('click', () => openInstaModal(post.id));
            instaGrid.appendChild(card);
        });
    }

    renderInstagramGrid();


    // ==========================================
    // 5. Poodle Dog Petting Simulator
    // ==========================================
    const petBtn = document.getElementById('pet-btn');
    const petCountSpan = document.getElementById('pet-count');
    const poodleSpeech = document.getElementById('poodle-speech');
    const poodleSvg = document.querySelector('.poodle-avatar');
    const particleContainer = document.querySelector('.pet-heart-particles');
    
    // Load petting happiness count
    let happiness = parseInt(localStorage.getItem('poodle_happiness')) || 0;
    if (happiness > 100) happiness = 100;
    petCountSpan.textContent = happiness;

    const dogQuotes = [
        "Woof! Thank you! *wag wag*",
        "More pets please! *happy poodle noise*",
        "You make me so happy! ❤️",
        "Aww, that's the spot! *pant pant*",
        "I love you, human!",
        "Let's go for a walk! Woof!",
        "*rolls over for belly rubs*"
    ];

    function petPoodle() {
        // Increase happiness level up to 100
        if (happiness < 100) {
            happiness += 10;
            if (happiness > 100) happiness = 100;
            petCountSpan.textContent = happiness;
            localStorage.setItem('poodle_happiness', happiness);
        } else {
            // If already 100, just keep petting
            happiness = 100;
        }

        // Trigger wiggle animation on dog SVG
        poodleSvg.style.transform = 'scale(0.9) translateY(5px)';
        setTimeout(() => {
            poodleSvg.style.transform = 'scale(1.05) translateY(-3px)';
            setTimeout(() => {
                poodleSvg.style.transform = 'scale(1)';
            }, 150);
        }, 100);

        // Change speech text randomly
        const randomIndex = Math.floor(Math.random() * dogQuotes.length);
        poodleSpeech.textContent = dogQuotes[randomIndex];

        // Create floating heart particle
        createHeartParticle();
    }

    function createHeartParticle() {
        const heart = document.createElement('span');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        
        // Random horizontal start within the circle
        const randomX = Math.random() * 80 + 10; // 10% to 90%
        heart.style.left = `${randomX}%`;
        heart.style.bottom = '20px';
        
        particleContainer.appendChild(heart);
        
        // Remove particle after animation completes
        setTimeout(() => {
            heart.remove();
        }, 1200);
    }

    // Attach Pet Listeners
    petBtn.addEventListener('click', petPoodle);
    document.querySelector('.poodle-sprite-container').addEventListener('click', petPoodle);


    // ==========================================
    // 6. Quote Carousel (Philosophy Slider)
    // ==========================================
    const track = document.getElementById('carousel-track');
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById('prev-quote');
    const nextBtn = document.getElementById('next-quote');
    const indicators = document.querySelectorAll('.carousel-indicators .indicator');
    
    let currentSlideIndex = 0;
    let autoSlideInterval = null;

    function updateCarousel(index) {
        // Handle boundaries
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        
        currentSlideIndex = index;

        // Shift Track
        track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
        
        // Update slide states
        slides.forEach((slide, idx) => {
            if (idx === currentSlideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update Indicators
        indicators.forEach((ind, idx) => {
            if (idx === currentSlideIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
    }

    // Controls listeners
    prevBtn.addEventListener('click', () => {
        updateCarousel(currentSlideIndex - 1);
        resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        updateCarousel(currentSlideIndex + 1);
        resetAutoSlide();
    });

    indicators.forEach((indicator, idx) => {
        indicator.addEventListener('click', () => {
            updateCarousel(idx);
            resetAutoSlide();
        });
    });

    // Auto sliding function
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            updateCarousel(currentSlideIndex + 1);
        }, 5000); // changes slides every 5 seconds
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // Start auto slide on init
    startAutoSlide();


    // ==========================================
    // 7. Day in My Life Timeline Controller
    // ==========================================
    const timelineData = {
        weekday: [
            {
                time: "08:00 AM",
                icon: "fa-solid fa-dog",
                title: "Wake Up & Dog Care",
                desc: "Wake up, play with my dog, feed him, and get ready for school."
            },
            {
                time: "09:00 AM",
                icon: "fa-solid fa-school",
                title: "Attend Morning Lectures",
                desc: "Arrive at JBNU lecture halls and focus on attending morning classes."
            },
            {
                time: "01:00 PM",
                icon: "fa-solid fa-mug-hot",
                title: "Free Period Break",
                desc: "Relax and recharge my energy during the free lecture period."
            },
            {
                time: "02:00 PM",
                icon: "fa-solid fa-book",
                title: "Attend Afternoon Lectures",
                desc: "Attend afternoon classes to broaden my major knowledge."
            },
            {
                time: "06:00 PM",
                icon: "fa-solid fa-house-user",
                title: "Class Ends & Go Home",
                desc: "Finish all lectures for the day and head back home."
            },
            {
                time: "07:00 PM",
                icon: "fa-solid fa-bone",
                title: "Dinner & Poodle Walk",
                desc: "Eat a delicious dinner and walk around the neighborhood with my dog."
            },
            {
                time: "11:00 PM",
                icon: "fa-solid fa-bed",
                title: "Bedtime & Sleep",
                desc: "Wrap up the day and go to sleep for a good night's rest."
            }
        ],
        weekend: [
            {
                time: "10:00 AM",
                icon: "fa-solid fa-sun",
                title: "Late Morning Wake Up",
                desc: "Wake up later than usual on the weekend and start the day with nice music."
            },
            {
                time: "01:30 PM",
                icon: "fa-solid fa-gamepad",
                title: "Gaming or Resting",
                desc: "Spend time playing games or just lying down to take a comfortable rest."
            },
            {
                time: "06:00 PM",
                icon: "fa-solid fa-utensils",
                title: "Olive-Free Dinner",
                desc: "Enjoy a delicious home-cooked dinner, strictly excluding raw olives! 🚫🫒"
            },
            {
                time: "09:00 PM",
                icon: "fa-solid fa-pencil",
                title: "Doing Homework",
                desc: "Focus on school assignments, review lecture notes, and get ready for the upcoming week."
            },
            {
                time: "11:30 PM",
                icon: "fa-solid fa-moon",
                title: "Cozy Sleep & Rest",
                desc: "Watch videos or read a book, then fall asleep comfortably."
            }
        ]
    };

    const btnWeekday = document.getElementById('btn-weekday');
    const btnWeekend = document.getElementById('btn-weekend');
    const timelineList = document.getElementById('timeline-flow-list');

    function renderTimeline(type) {
        timelineList.innerHTML = '';
        const steps = timelineData[type];
        
        steps.forEach(step => {
            const stepElement = document.createElement('div');
            stepElement.className = 'timeline-step-v';
            stepElement.innerHTML = `
                <div class="step-marker"><i class="${step.icon}"></i></div>
                <div class="step-content-card">
                    <span class="step-time">${step.time}</span>
                    <h4>${step.title}</h4>
                    <p>${step.desc}</p>
                </div>
            `;
            timelineList.appendChild(stepElement);
        });
    }

    // Toggle Timeline tabs
    btnWeekday.addEventListener('click', () => {
        btnWeekday.classList.add('active');
        btnWeekend.classList.remove('active');
        renderTimeline('weekday');
    });

    btnWeekend.addEventListener('click', () => {
        btnWeekend.classList.add('active');
        btnWeekday.classList.remove('active');
        renderTimeline('weekend');
    });

    // Initial timeline render
    renderTimeline('weekday');


    // ==========================================
    // 8. Bucket List Tracker
    // ==========================================
    const bucketItems = [
        { id: 1, text: "Loving myself truly", category: "Philosophy", checked: true },
        { id: 2, text: "Striving for self-improvement", category: "Self-Growth", checked: true },
        { id: 3, text: "Going abroad to experience and feel diverse things", category: "Travel", checked: false },
        { id: 4, text: "Having multiple different careers instead of just one", category: "Career", checked: false },
        { id: 5, text: "Visiting Italy", category: "Travel", checked: false },
        { id: 6, text: "Traveling alone", category: "Adventure", checked: false },
        { id: 7, text: "Eating foods I must try before I die", category: "Lifestyle", checked: false }
    ];

    const bucketListContainer = document.getElementById('bucket-list-items');
    const bucketProgressBar = document.getElementById('bucket-progress-bar');
    const bucketProgressText = document.getElementById('bucket-progress-text');

    function renderBucketList() {
        bucketListContainer.innerHTML = '';
        bucketItems.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = `bucket-item ${item.checked ? 'checked' : ''}`;
            itemElement.innerHTML = `
                <div class="bucket-checkbox">
                    <i class="fa-solid fa-check"></i>
                </div>
                <div class="bucket-text-col">
                    <span>${item.text}</span>
                    <span class="bucket-badge"><i class="fa-solid fa-tags"></i> ${item.category}</span>
                </div>
            `;
            itemElement.addEventListener('click', () => {
                item.checked = !item.checked;
                itemElement.classList.toggle('checked');
                updateBucketProgressBar();
            });
            bucketListContainer.appendChild(itemElement);
        });
        updateBucketProgressBar();
    }

    function updateBucketProgressBar() {
        const checkedCount = bucketItems.filter(item => item.checked).length;
        const totalCount = bucketItems.length;
        const percentage = Math.round((checkedCount / totalCount) * 100);
        
        bucketProgressBar.style.width = `${percentage}%`;
        bucketProgressText.textContent = `${percentage}% Completed (${checkedCount}/${totalCount} goals)`;
    }

    renderBucketList();


    // ==========================================
    // 9. Instagram Post Detail Modal Controller
    // ==========================================
    const instaModal = document.getElementById('insta-modal');
    const modalImg = document.getElementById('modal-post-img');
    const modalLocation = document.getElementById('modal-post-location');
    const modalCaption = document.getElementById('modal-post-caption');
    const modalCommentsList = document.getElementById('modal-post-comments');
    const modalLikesCount = document.getElementById('modal-likes-count');
    const modalPostDate = document.getElementById('modal-post-date');
    
    const modalLikeBtn = document.getElementById('modal-like-btn');
    const doubleTapHeart = document.getElementById('double-tap-heart');
    const commentInput = document.getElementById('new-comment-input');
    const postCommentBtn = document.getElementById('post-comment-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');

    let activeModalPostId = null;
    let lastTap = 0;

    function openInstaModal(postId) {
        const post = instagramPosts.find(p => p.id === postId);
        if (!post) return;
        
        activeModalPostId = postId;
        
        // Populate modal data
        modalImg.src = post.img;
        modalLocation.textContent = post.location;
        modalCaption.textContent = post.caption;
        modalLikesCount.textContent = `${post.likes} likes`;
        modalPostDate.textContent = post.date;
        
        // Comments rendering
        renderModalComments(post.comments);
        
        // Like button active state
        updateModalLikeBtnState(post.likedByUser);

        // Clear comment input
        commentInput.value = '';
        postCommentBtn.classList.remove('active');

        // Show Modal
        instaModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    }

    function closeInstaModal() {
        instaModal.classList.add('hidden');
        document.body.style.overflow = ''; // Unlock scrolling
        activeModalPostId = null;
    }

    function renderModalComments(comments) {
        modalCommentsList.innerHTML = '';
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment-row';
            commentDiv.innerHTML = `
                <strong class="comment-user">${comment.user}</strong>
                <span class="comment-text">${comment.text}</span>
            `;
            modalCommentsList.appendChild(commentDiv);
        });
    }

    function updateModalLikeBtnState(isLiked) {
        const icon = modalLikeBtn.querySelector('i');
        if (isLiked) {
            icon.className = 'fa-solid fa-heart';
            modalLikeBtn.style.color = 'var(--accent-rose)';
        } else {
            icon.className = 'fa-regular fa-heart';
            modalLikeBtn.style.color = '';
        }
    }

    // Handlers
    closeModalBtn.addEventListener('click', closeInstaModal);
    document.querySelector('.insta-modal-overlay').addEventListener('click', closeInstaModal);

    // Like Action (Single click heart)
    modalLikeBtn.addEventListener('click', () => {
        if (!activeModalPostId) return;
        const post = instagramPosts.find(p => p.id === activeModalPostId);
        
        if (post.likedByUser) {
            post.likes--;
            post.likedByUser = false;
        } else {
            post.likes++;
            post.likedByUser = true;
        }
        
        modalLikesCount.textContent = `${post.likes} likes`;
        updateModalLikeBtnState(post.likedByUser);
        renderInstagramGrid(); // Update the main grid counter
    });

    // Double Tap gesture on post image
    modalImg.parentElement.addEventListener('click', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 300 && tapLength > 0) {
            // Double Tap triggered
            handleDoubleTapLike();
            e.preventDefault();
        }
        lastTap = currentTime;
    });

    function handleDoubleTapLike() {
        if (!activeModalPostId) return;
        const post = instagramPosts.find(p => p.id === activeModalPostId);
        
        // Trigger heart scale animation
        doubleTapHeart.classList.remove('animate');
        void doubleTapHeart.offsetWidth; // Trigger reflow
        doubleTapHeart.classList.add('animate');
        
        // If not already liked, increment
        if (!post.likedByUser) {
            post.likes++;
            post.likedByUser = true;
            modalLikesCount.textContent = `${post.likes} likes`;
            updateModalLikeBtnState(post.likedByUser);
            renderInstagramGrid();
        }
        
        // Remove animation class after finish
        setTimeout(() => {
            doubleTapHeart.classList.remove('animate');
        }, 1000);
    }

    // Comment Input validation
    commentInput.addEventListener('input', () => {
        if (commentInput.value.trim() !== '') {
            postCommentBtn.classList.add('active');
        } else {
            postCommentBtn.classList.remove('active');
        }
    });

    // Comment Post Actions
    function handleAddComment() {
        const commentText = commentInput.value.trim();
        if (commentText === '' || !activeModalPostId) return;
        
        const post = instagramPosts.find(p => p.id === activeModalPostId);
        
        // Add comment to database
        const newComment = { user: "visitor_u", text: commentText };
        post.comments.push(newComment);
        post.commentsCount = post.comments.length;
        
        // Rerender comments
        renderModalComments(post.comments);
        
        // Scroll comment box to bottom
        setTimeout(() => {
            modalCommentsList.scrollTop = modalCommentsList.scrollHeight;
        }, 50);

        // Clear and update main grid counter
        commentInput.value = '';
        postCommentBtn.classList.remove('active');
        renderInstagramGrid();
    }

    postCommentBtn.addEventListener('click', handleAddComment);
    commentInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleAddComment();
        }
    });
});
