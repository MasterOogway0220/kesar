/**
 * ============================================================
 * ACCESSIBILITY ENHANCEMENTS - WCAG 2.1 AA Compliance
 * Kesar Securities - Global Accessibility JavaScript
 * ============================================================
 */

(function () {
    'use strict';

    // ===== 1. SKIP LINK MANAGEMENT (WCAG 2.4.1) =====
    function initSkipLink() {
        var skipLink = document.querySelector('.skip-to-main');
        if (!skipLink) return;

        skipLink.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = this.getAttribute('href');
            var target = document.querySelector(targetId);
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
                target.addEventListener('blur', function handler() {
                    target.removeAttribute('tabindex');
                    target.removeEventListener('blur', handler);
                });
            }
        });
    }

    // ===== 2. PRELOADER ACCESSIBILITY =====
    function initPreloader() {
        var preloader = document.querySelector('.preloader');
        if (!preloader) return;

        // Set initial ARIA attributes
        preloader.setAttribute('role', 'alert');
        preloader.setAttribute('aria-label', 'Page is loading');
        preloader.setAttribute('aria-live', 'assertive');

        // Watch for preloader hide
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    var display = window.getComputedStyle(preloader).display;
                    if (display === 'none') {
                        preloader.setAttribute('aria-hidden', 'true');
                        observer.disconnect();
                    }
                }
            });
        });
        observer.observe(preloader, { attributes: true, attributeFilter: ['style', 'class'] });

        // Fallback: force hide after 3 seconds (in case animations are disabled)
        setTimeout(function () {
            preloader.setAttribute('aria-hidden', 'true');
            preloader.style.display = 'none';
        }, 3000);
    }

    // ===== 3. NAVBAR TOGGLER FIX (WCAG 4.1.2) =====
    function fixNavbarToggler() {
        var togglers = document.querySelectorAll('.navbar-toggler');
        togglers.forEach(function (toggler) {
            // If it's an <a> tag, add button role
            if (toggler.tagName.toLowerCase() === 'a') {
                toggler.setAttribute('role', 'button');
                toggler.setAttribute('tabindex', '0');
            }
            // Add aria-label
            if (!toggler.getAttribute('aria-label')) {
                toggler.setAttribute('aria-label', 'Open navigation menu');
            }

            // Keyboard support for Enter/Space on anchor-based togglers
            toggler.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggler.click();
                }
            });
        });
    }

    // ===== 4. ICON-ONLY LINK ARIA LABELS (WCAG 1.1.1, 4.1.2) =====
    function fixIconOnlyLinks() {
        // Social media links
        var socialLinks = document.querySelectorAll('.social a, .social_box');
        socialLinks.forEach(function (link) {
            if (link.getAttribute('aria-label')) return;

            var icon = link.querySelector('i');
            if (!icon) return;

            var iconClass = icon.className;
            var label = '';

            if (iconClass.includes('bi-facebook')) label = 'Facebook';
            else if (iconClass.includes('bi-pinterest')) label = 'Pinterest';
            else if (iconClass.includes('bi-twitch')) label = 'Twitch';
            else if (iconClass.includes('bi-skype')) label = 'Skype';
            else if (iconClass.includes('bi-twitter') || iconClass.includes('bi-twitch')) label = 'Social Media';
            else if (iconClass.includes('bi-instagram')) label = 'Instagram';
            else if (iconClass.includes('bi-linkedin')) label = 'LinkedIn';
            else if (iconClass.includes('bi-youtube')) label = 'YouTube';
            else if (iconClass.includes('bi-whatsapp')) label = 'WhatsApp';
            else if (iconClass.includes('bi-telephone')) label = 'Call us';
            else if (iconClass.includes('bi-envelope')) label = 'Email us';
            else if (iconClass.includes('bi-geo-alt')) label = 'Our location';
            else if (iconClass.includes('bi-arrow-up-right')) return; // Decorative arrow

            if (label) {
                link.setAttribute('aria-label', label);
            }

            // Mark icon as decorative
            icon.setAttribute('aria-hidden', 'true');
        });

        // Scroll to top button
        var scrollToTop = document.querySelector('.scrollToTop');
        if (scrollToTop) {
            scrollToTop.setAttribute('aria-label', 'Scroll to top of page');
            scrollToTop.setAttribute('role', 'button');
            var scrollIcon = scrollToTop.querySelector('i');
            if (scrollIcon) scrollIcon.setAttribute('aria-hidden', 'true');
        }

        // Fix all decorative icons inside buttons and links
        var allIcons = document.querySelectorAll('.bi');
        allIcons.forEach(function (icon) {
            // If parent has text content, icon is decorative
            var parent = icon.parentElement;
            if (parent && parent.textContent.trim().length > icon.textContent.trim().length) {
                icon.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // ===== 5. IMAGE ALT TEXT ENHANCEMENT (WCAG 1.1.1) =====
    function fixImageAltText() {
        var images = document.querySelectorAll('img');
        images.forEach(function (img) {
            var alt = img.getAttribute('alt');
            var src = img.getAttribute('src') || '';

            // Fix missing alt
            if (alt === null) {
                // Check if image is decorative (inside a link with text)
                var parent = img.parentElement;
                if (parent && parent.tagName.toLowerCase() === 'a' && parent.textContent.trim().length > 0) {
                    img.setAttribute('alt', '');
                } else {
                    // Generate alt from filename
                    var filename = src.split('/').pop().split('.')[0].replace(/[-_]/g, ' ');
                    img.setAttribute('alt', filename);
                }
            }

            // Fix generic alt text
            if (alt === 'images' || alt === 'image' || alt === 'img') {
                var section = img.closest('section');
                var heading = section ? section.querySelector('h1, h2, h3') : null;
                if (heading) {
                    img.setAttribute('alt', 'Illustration for ' + heading.textContent.trim());
                }
            }

            // Fix "icon" alt text - these are typically decorative
            if (alt === 'icon') {
                var cardTitle = img.closest('.card');
                if (cardTitle) {
                    var title = cardTitle.querySelector('.card__title, .card--small-title, h4, h5');
                    if (title) {
                        img.setAttribute('alt', title.textContent.trim() + ' icon');
                    }
                }
            }

            // Fix "vector" alt text - decorative badge images
            if (alt === 'vector') {
                img.setAttribute('alt', '');
                img.setAttribute('role', 'presentation');
            }
        });
    }

    // ===== 6. LANDMARK ROLES (WCAG 1.3.1) =====
    function addLandmarkRoles() {
        // Ensure header has banner role
        var header = document.querySelector('header');
        if (header) {
            header.setAttribute('role', 'banner');
        }

        // Ensure nav has navigation role with label
        var navs = document.querySelectorAll('nav.navbar');
        navs.forEach(function (nav) {
            nav.setAttribute('role', 'navigation');
            if (!nav.getAttribute('aria-label')) {
                nav.setAttribute('aria-label', 'Main navigation');
            }
        });

        // Ensure main content area exists
        var main = document.getElementById('main-content');
        if (!main) {
            // Find the main content area (first section after header, excluding offcanvas)
            var sections = document.querySelectorAll('body > section, body > div.container');
            if (sections.length > 0) {
                // Wrap content in main if not already
                var firstSection = null;
                var allChildren = document.body.children;
                for (var i = 0; i < allChildren.length; i++) {
                    var child = allChildren[i];
                    if (child.tagName.toLowerCase() === 'section' ||
                        (child.tagName.toLowerCase() === 'div' && !child.classList.contains('preloader') &&
                            !child.classList.contains('offcanvas'))) {
                        if (!firstSection && child.tagName.toLowerCase() === 'section') {
                            firstSection = child;
                            break;
                        }
                    }
                }
            }
        }

        // Ensure footer has contentinfo role
        var footer = document.querySelector('footer');
        if (footer) {
            footer.setAttribute('role', 'contentinfo');
        }

        // Label the offcanvas nav
        var offcanvasNav = document.querySelector('#offcanvasRight');
        if (offcanvasNav) {
            offcanvasNav.setAttribute('role', 'dialog');
            offcanvasNav.setAttribute('aria-label', 'Mobile navigation menu');
            var offcanvasNavList = offcanvasNav.querySelector('.custom-nevbar__nav');
            if (offcanvasNavList) {
                offcanvasNavList.setAttribute('role', 'navigation');
                offcanvasNavList.setAttribute('aria-label', 'Mobile navigation');
            }
        }
    }

    // ===== 7. FORM ACCESSIBILITY (WCAG 3.3.1, 3.3.2, 1.3.5) =====
    function enhanceForms() {
        // Add autocomplete attributes to form fields
        var nameFields = document.querySelectorAll('input[name="name"], input#name');
        nameFields.forEach(function (field) {
            field.setAttribute('autocomplete', 'name');
        });

        var emailFields = document.querySelectorAll('input[name="email"], input#email, input[type="email"]');
        emailFields.forEach(function (field) {
            field.setAttribute('autocomplete', 'email');
        });

        var phoneFields = document.querySelectorAll('input[name="phone"], input#phone, input[type="tel"]');
        phoneFields.forEach(function (field) {
            field.setAttribute('autocomplete', 'tel');
        });

        // Ensure all form inputs have associated labels
        var inputs = document.querySelectorAll('input, textarea, select');
        inputs.forEach(function (input) {
            if (input.type === 'hidden' || input.type === 'submit') return;

            var id = input.getAttribute('id');
            if (!id) return;

            var label = document.querySelector('label[for="' + id + '"]');
            if (!label) {
                // Check if wrapped in a label
                var parentLabel = input.closest('label');
                if (!parentLabel) {
                    // Use placeholder as aria-label fallback
                    var placeholder = input.getAttribute('placeholder');
                    if (placeholder && !input.getAttribute('aria-label')) {
                        input.setAttribute('aria-label', placeholder);
                    }
                }
            }
        });

        // Mark required fields
        var requiredInputs = document.querySelectorAll('[required]');
        requiredInputs.forEach(function (input) {
            input.setAttribute('aria-required', 'true');
        });

        // Add live region for form error messages
        var msgSpans = document.querySelectorAll('#msg, .error-message, .form-error');
        msgSpans.forEach(function (span) {
            span.setAttribute('role', 'alert');
            span.setAttribute('aria-live', 'assertive');
            span.setAttribute('aria-atomic', 'true');
        });
    }

    // ===== 8. DYNAMIC CONTENT LIVE REGIONS (WCAG 4.1.3) =====
    function initLiveRegions() {
        // Create a global live region for announcements
        if (!document.getElementById('a11y-live-region')) {
            var liveRegion = document.createElement('div');
            liveRegion.id = 'a11y-live-region';
            liveRegion.className = 'aria-live-region';
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.setAttribute('aria-atomic', 'true');
            liveRegion.setAttribute('role', 'status');
            document.body.appendChild(liveRegion);
        }

        // Create an assertive live region for errors
        if (!document.getElementById('a11y-alert-region')) {
            var alertRegion = document.createElement('div');
            alertRegion.id = 'a11y-alert-region';
            alertRegion.className = 'aria-live-region';
            alertRegion.setAttribute('aria-live', 'assertive');
            alertRegion.setAttribute('aria-atomic', 'true');
            alertRegion.setAttribute('role', 'alert');
            document.body.appendChild(alertRegion);
        }
    }

    // Global function to announce messages to screen readers
    window.a11yAnnounce = function (message, priority) {
        var regionId = priority === 'assertive' ? 'a11y-alert-region' : 'a11y-live-region';
        var region = document.getElementById(regionId);
        if (region) {
            region.textContent = '';
            setTimeout(function () {
                region.textContent = message;
            }, 100);
        }
    };

    // ===== 9. TAB PANEL ACCESSIBILITY (WCAG 4.1.2) =====
    function enhanceTabs() {
        var tabButtons = document.querySelectorAll('.tab-button');
        if (tabButtons.length === 0) return;

        var tabContainer = document.querySelector('.tabs-container');
        if (tabContainer) {
            tabContainer.setAttribute('role', 'tablist');
            tabContainer.setAttribute('aria-label', 'News categories');
        }

        tabButtons.forEach(function (tab, index) {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('id', 'tab-' + index);
            tab.setAttribute('aria-selected', tab.classList.contains('active') ? 'true' : 'false');

            // Update aria-selected on click
            tab.addEventListener('click', function () {
                tabButtons.forEach(function (t) {
                    t.setAttribute('aria-selected', 'false');
                });
                tab.setAttribute('aria-selected', 'true');
                window.a11yAnnounce(tab.textContent.trim() + ' news selected');
            });
        });

        // Keyboard navigation for tabs
        if (tabContainer) {
            tabContainer.addEventListener('keydown', function (e) {
                var target = e.target;
                if (!target.classList.contains('tab-button')) return;

                var tabs = Array.from(tabButtons);
                var currentIndex = tabs.indexOf(target);

                switch (e.key) {
                    case 'ArrowRight':
                    case 'ArrowDown':
                        e.preventDefault();
                        var nextIndex = (currentIndex + 1) % tabs.length;
                        tabs[nextIndex].focus();
                        tabs[nextIndex].click();
                        break;
                    case 'ArrowLeft':
                    case 'ArrowUp':
                        e.preventDefault();
                        var prevIndex = (currentIndex - 1 + tabs.length) % tabs.length;
                        tabs[prevIndex].focus();
                        tabs[prevIndex].click();
                        break;
                    case 'Home':
                        e.preventDefault();
                        tabs[0].focus();
                        tabs[0].click();
                        break;
                    case 'End':
                        e.preventDefault();
                        tabs[tabs.length - 1].focus();
                        tabs[tabs.length - 1].click();
                        break;
                }
            });
        }
    }

    // ===== 10. NEWS CARD ACCESSIBILITY (WCAG 4.1.2) =====
    function enhanceNewsCards() {
        // Observe news container for dynamically added cards
        var cardsContainer = document.getElementById('cards-container');
        if (!cardsContainer) return;

        var observer = new MutationObserver(function () {
            var cards = cardsContainer.querySelectorAll('.news-card');
            cards.forEach(function (card) {
                if (card.getAttribute('data-a11y-enhanced')) return;

                card.setAttribute('role', 'article');
                card.setAttribute('tabindex', '0');

                var title = card.querySelector('.news-title');
                if (title) {
                    card.setAttribute('aria-label', title.textContent.trim() + '. Press Enter to read full article.');
                }

                // Keyboard support
                card.addEventListener('keydown', function (e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        card.click();
                    }
                });

                card.setAttribute('data-a11y-enhanced', 'true');
            });

            // Announce results count
            if (cards.length > 0) {
                window.a11yAnnounce(cards.length + ' news articles loaded');
            }
        });

        observer.observe(cardsContainer, { childList: true });

        // Also enhance loading and error states
        var loadingDiv = document.getElementById('loading');
        if (loadingDiv) {
            loadingDiv.setAttribute('role', 'status');
            loadingDiv.setAttribute('aria-live', 'polite');
        }

        var errorDiv = document.getElementById('error');
        if (errorDiv) {
            errorDiv.setAttribute('role', 'alert');
            errorDiv.setAttribute('aria-live', 'assertive');
        }
    }

    // ===== 11. SEARCH INPUT ACCESSIBILITY =====
    function enhanceSearch() {
        var searchInput = document.getElementById('search-text');
        if (searchInput) {
            if (!searchInput.getAttribute('aria-label')) {
                searchInput.setAttribute('aria-label', 'Search for stock news');
            }
            searchInput.setAttribute('role', 'searchbox');
        }

        var searchButton = document.getElementById('search-button');
        if (searchButton && !searchButton.getAttribute('aria-label')) {
            searchButton.setAttribute('aria-label', 'Search news');
        }

        // Wrap search in search landmark
        var searchWrapper = document.querySelector('.search-container');
        if (searchWrapper) {
            searchWrapper.setAttribute('role', 'search');
            searchWrapper.setAttribute('aria-label', 'Search news');
        }
    }

    // ===== 12. HEADING HIERARCHY CHECK (WCAG 1.3.1) =====
    function fixHeadingHierarchy() {
        // Log heading issues for developers (non-destructive)
        var headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        var lastLevel = 0;

        headings.forEach(function (heading) {
            var level = parseInt(heading.tagName.charAt(1));
            if (level > lastLevel + 1 && lastLevel > 0) {
                console.warn('[A11Y] Heading hierarchy skip: <' + heading.tagName + '> follows <h' + lastLevel + '>. Text: "' + heading.textContent.trim().substring(0, 50) + '"');
            }
            lastLevel = level;
        });
    }

    // ===== 13. EXTERNAL LINKS ACCESSIBILITY =====
    function enhanceExternalLinks() {
        var externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(function (link) {
            // Add rel attributes for security
            if (!link.getAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
                link.setAttribute('rel', 'noopener noreferrer');
            }

            // Add screen reader text about opening in new window
            var existingLabel = link.getAttribute('aria-label');
            if (!existingLabel) {
                var linkText = link.textContent.trim();
                if (linkText) {
                    link.setAttribute('aria-label', linkText + ' (opens in new tab)');
                }
            }
        });
    }

    // ===== 14. TABLE ACCESSIBILITY (IF ANY) =====
    function enhanceTables() {
        var tables = document.querySelectorAll('table');
        tables.forEach(function (table) {
            if (!table.getAttribute('role')) {
                // Check if it's a data table or layout table
                var th = table.querySelector('th');
                if (th) {
                    // Data table
                    if (!table.querySelector('caption')) {
                        var section = table.closest('section');
                        var heading = section ? section.querySelector('h1, h2, h3') : null;
                        if (heading) {
                            table.setAttribute('aria-label', heading.textContent.trim());
                        }
                    }
                } else {
                    // Layout table
                    table.setAttribute('role', 'presentation');
                }
            }
        });
    }

    // ===== 15. SLICK SLIDER ACCESSIBILITY =====
    function enhanceSliders() {
        var sliders = document.querySelectorAll('.slick-slider, .feature_slider');
        sliders.forEach(function (slider) {
            slider.setAttribute('role', 'region');
            slider.setAttribute('aria-label', 'Content carousel');
            slider.setAttribute('aria-roledescription', 'carousel');

            // Fix slider dots
            var dots = slider.querySelectorAll('.slick-dots li button');
            dots.forEach(function (dot, index) {
                dot.setAttribute('aria-label', 'Go to slide ' + (index + 1));
            });

            // Fix prev/next buttons
            var prevBtn = slider.querySelector('.slick-prev');
            var nextBtn = slider.querySelector('.slick-next');
            if (prevBtn) prevBtn.setAttribute('aria-label', 'Previous slide');
            if (nextBtn) nextBtn.setAttribute('aria-label', 'Next slide');
        });
    }

    // ===== 16. ACCESSIBILITY WIDGET =====
    var STORAGE_KEY = 'kesarA11yPrefs';

    function getPrefs() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
        } catch (e) {
            return {};
        }
    }

    function savePrefs(prefs) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
        } catch (e) { /* silent */ }
    }

    function initWidget() {
        var trigger = document.querySelector('.a11y-widget-trigger');
        var overlay = document.getElementById('a11y-overlay');
        var panel = document.getElementById('a11y-panel');
        var guide = document.getElementById('a11y-reading-guide');

        if (!trigger || !panel) return;

        // Filter features (only one filter active at a time)
        var filterFeatures = ['high-contrast', 'invert', 'grayscale', 'low-saturation'];
        var bodyToggleMap = {
            'high-contrast': 'a11y-high-contrast',
            'invert': 'a11y-invert',
            'grayscale': 'a11y-grayscale',
            'low-saturation': 'a11y-low-saturation',
            'highlight-links': 'a11y-highlight-links',
            'big-cursor': 'a11y-big-cursor',
            'text-spacing': 'a11y-text-spacing',
            'dyslexia-font': 'a11y-dyslexia-font',
            'stop-animations': 'a11y-stop-animations',
            'hide-images': 'a11y-hide-images',
            'reading-guide': 'a11y-reading-guide-on'
        };

        function openPanel() {
            panel.classList.add('open');
            overlay.classList.add('open');
            trigger.setAttribute('aria-expanded', 'true');
            panel.querySelector('.a11y-panel-close').focus();
            document.body.style.overflow = 'hidden';
        }

        function closePanel() {
            panel.classList.remove('open');
            overlay.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
            trigger.focus();
            document.body.style.overflow = '';
        }

        trigger.addEventListener('click', openPanel);
        overlay.addEventListener('click', closePanel);
        panel.querySelector('.a11y-panel-close').addEventListener('click', closePanel);

        // Trap focus inside panel
        panel.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') { closePanel(); return; }
            if (e.key !== 'Tab') return;
            var focusable = panel.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
            var first = focusable[0];
            var last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); first.focus();
            }
        });

        // Apply a feature
        function applyFeature(feature, active) {
            var cls = bodyToggleMap[feature];
            if (!cls) return;

            // If it's a filter feature, remove other filters first
            if (filterFeatures.indexOf(feature) !== -1 && active) {
                filterFeatures.forEach(function (f) {
                    if (f !== feature) {
                        document.body.classList.remove(bodyToggleMap[f]);
                        var otherBtn = panel.querySelector('[data-feature="' + f + '"]');
                        if (otherBtn) otherBtn.classList.remove('active');
                    }
                });
            }

            if (active) {
                document.body.classList.add(cls);
            } else {
                document.body.classList.remove(cls);
            }
        }

        function applyFontSize(size) {
            for (var i = 1; i <= 4; i++) {
                document.body.classList.remove('a11y-font-' + i);
            }
            if (size && size > 1) {
                document.body.classList.add('a11y-font-' + size);
            }
            // Update button states
            var fontBtns = panel.querySelectorAll('.a11y-font-btn');
            fontBtns.forEach(function (btn) {
                btn.classList.toggle('active', parseInt(btn.getAttribute('data-size')) === size);
            });
        }

        // Load saved preferences
        function loadPrefs() {
            var prefs = getPrefs();
            if (prefs.fontSize) applyFontSize(prefs.fontSize);
            if (prefs.features) {
                Object.keys(prefs.features).forEach(function (feature) {
                    if (prefs.features[feature]) {
                        applyFeature(feature, true);
                        var btn = panel.querySelector('[data-feature="' + feature + '"]');
                        if (btn) btn.classList.add('active');
                    }
                });
            }
        }

        // Save current state
        function saveCurrentPrefs() {
            var prefs = { fontSize: 1, features: {} };
            for (var i = 1; i <= 4; i++) {
                if (document.body.classList.contains('a11y-font-' + i)) {
                    prefs.fontSize = i;
                }
            }
            Object.keys(bodyToggleMap).forEach(function (feature) {
                prefs.features[feature] = document.body.classList.contains(bodyToggleMap[feature]);
            });
            savePrefs(prefs);
        }

        // Feature toggle buttons
        var optionBtns = panel.querySelectorAll('.a11y-option-btn');
        optionBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var feature = btn.getAttribute('data-feature');
                var isActive = btn.classList.contains('active');

                // For filter features, deactivate others
                if (filterFeatures.indexOf(feature) !== -1 && !isActive) {
                    filterFeatures.forEach(function (f) {
                        var otherBtn = panel.querySelector('[data-feature="' + f + '"]');
                        if (otherBtn) otherBtn.classList.remove('active');
                    });
                }

                btn.classList.toggle('active');
                applyFeature(feature, !isActive);
                saveCurrentPrefs();

                var label = btn.querySelector('span:last-child').textContent;
                window.a11yAnnounce(label + (isActive ? ' disabled' : ' enabled'));
            });
        });

        // Font size buttons
        var fontBtns = panel.querySelectorAll('.a11y-font-btn');
        fontBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                var size = parseInt(btn.getAttribute('data-size'));
                applyFontSize(size);
                saveCurrentPrefs();
                var labels = { 1: 'Default', 2: 'Large', 3: 'Larger', 4: 'Largest' };
                window.a11yAnnounce('Font size set to ' + labels[size]);
            });
        });

        // Reading guide - follows mouse
        document.addEventListener('mousemove', function (e) {
            if (document.body.classList.contains('a11y-reading-guide-on')) {
                guide.style.top = (e.clientY - 6) + 'px';
            }
        });

        // Reset button
        panel.querySelector('.a11y-reset-btn').addEventListener('click', function () {
            // Remove all accessibility classes
            Object.keys(bodyToggleMap).forEach(function (feature) {
                document.body.classList.remove(bodyToggleMap[feature]);
            });
            for (var i = 1; i <= 4; i++) {
                document.body.classList.remove('a11y-font-' + i);
            }
            // Reset UI
            panel.querySelectorAll('.a11y-option-btn.active').forEach(function (btn) {
                btn.classList.remove('active');
            });
            panel.querySelectorAll('.a11y-font-btn.active').forEach(function (btn) {
                btn.classList.remove('active');
            });
            // Clear storage
            try { localStorage.removeItem(STORAGE_KEY); } catch (e) { /* silent */ }
            window.a11yAnnounce('All accessibility settings have been reset');
        });

        // Load prefs on start
        loadPrefs();
    }

    // ===== 17. TEXT-TO-SPEECH =====
    function initTTS() {
        var synth = window.speechSynthesis;
        if (!synth) return; // Browser doesn't support Speech API

        var player = document.getElementById('a11y-tts-player');
        var startBtn = document.getElementById('a11y-tts-start');
        var speedSelect = document.getElementById('a11y-tts-speed');
        if (!player || !startBtn) return;

        var playPauseBtn = document.getElementById('a11y-tts-play');
        var rewindBtn = document.getElementById('a11y-tts-rewind');
        var forwardBtn = document.getElementById('a11y-tts-forward');
        var closeBtn = document.getElementById('a11y-tts-close');
        var playerText = document.getElementById('a11y-tts-current');

        var sentences = [];
        var currentIndex = 0;
        var isPaused = false;
        var isPlaying = false;
        var currentHighlight = null;

        // Gather readable text from the page
        function gatherText() {
            var selectors = [
                'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
                'p', 'li', 'td', 'th', 'figcaption',
                'blockquote', '.card__title', '.card--small-title',
                'label', 'a.nav-link'
            ];
            var elements = [];
            var seen = new Set();

            selectors.forEach(function (sel) {
                var nodes = document.querySelectorAll(sel);
                nodes.forEach(function (node) {
                    // Skip hidden elements, widget panel, preloader
                    if (node.closest('.a11y-widget-panel') || node.closest('.a11y-tts-player') ||
                        node.closest('.preloader') || node.closest('.a11y-widget-overlay')) return;
                    if (node.offsetParent === null && window.getComputedStyle(node).position !== 'fixed') return;

                    var text = node.textContent.trim();
                    if (text.length < 2 || seen.has(text)) return;
                    seen.add(text);
                    elements.push({ el: node, text: text });
                });
            });

            return elements;
        }

        function highlightElement(el) {
            clearHighlight();
            if (el) {
                el.classList.add('a11y-tts-highlight');
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                currentHighlight = el;
            }
        }

        function clearHighlight() {
            if (currentHighlight) {
                currentHighlight.classList.remove('a11y-tts-highlight');
                currentHighlight = null;
            }
        }

        function speakCurrent() {
            if (currentIndex >= sentences.length) {
                stopTTS();
                return;
            }

            synth.cancel();
            var item = sentences[currentIndex];
            var utterance = new SpeechSynthesisUtterance(item.text);
            utterance.rate = parseFloat(speedSelect ? speedSelect.value : 1);
            utterance.lang = 'en-IN';

            highlightElement(item.el);
            if (playerText) playerText.textContent = item.text;

            utterance.onend = function () {
                if (!isPaused && isPlaying) {
                    currentIndex++;
                    speakCurrent();
                }
            };

            utterance.onerror = function () {
                if (isPlaying && !isPaused) {
                    currentIndex++;
                    speakCurrent();
                }
            };

            synth.speak(utterance);
            isPlaying = true;
            isPaused = false;
            playPauseBtn.innerHTML = '&#9646;&#9646;';
            playPauseBtn.setAttribute('aria-label', 'Pause reading');
            playPauseBtn.classList.add('playing');
        }

        function stopTTS() {
            synth.cancel();
            isPlaying = false;
            isPaused = false;
            currentIndex = 0;
            clearHighlight();
            player.classList.remove('active');
            if (playerText) playerText.textContent = '';
            playPauseBtn.innerHTML = '&#9654;';
            playPauseBtn.setAttribute('aria-label', 'Play');
            playPauseBtn.classList.remove('playing');
            window.a11yAnnounce('Text to speech stopped');
        }

        // Start button in widget panel
        startBtn.addEventListener('click', function () {
            sentences = gatherText();
            if (sentences.length === 0) {
                window.a11yAnnounce('No readable content found on this page');
                return;
            }
            currentIndex = 0;
            player.classList.add('active');
            // Close the widget panel
            var panelEl = document.getElementById('a11y-panel');
            var overlayEl = document.getElementById('a11y-overlay');
            if (panelEl) panelEl.classList.remove('open');
            if (overlayEl) overlayEl.classList.remove('open');
            document.body.style.overflow = '';
            var triggerBtn = document.querySelector('.a11y-widget-trigger');
            if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'false');

            window.a11yAnnounce('Reading page content aloud. ' + sentences.length + ' items found.');
            speakCurrent();
        });

        // Play / Pause
        playPauseBtn.addEventListener('click', function () {
            if (!isPlaying && !isPaused) {
                // Start from beginning
                speakCurrent();
            } else if (isPaused) {
                synth.resume();
                isPaused = false;
                isPlaying = true;
                playPauseBtn.innerHTML = '&#9646;&#9646;';
                playPauseBtn.setAttribute('aria-label', 'Pause reading');
                playPauseBtn.classList.add('playing');
            } else {
                synth.pause();
                isPaused = true;
                isPlaying = false;
                playPauseBtn.innerHTML = '&#9654;';
                playPauseBtn.setAttribute('aria-label', 'Resume reading');
                playPauseBtn.classList.remove('playing');
            }
        });

        // Rewind (previous sentence)
        rewindBtn.addEventListener('click', function () {
            if (currentIndex > 0) {
                currentIndex--;
                speakCurrent();
            }
        });

        // Forward (next sentence)
        forwardBtn.addEventListener('click', function () {
            if (currentIndex < sentences.length - 1) {
                currentIndex++;
                speakCurrent();
            }
        });

        // Speed change while playing
        if (speedSelect) {
            speedSelect.addEventListener('change', function () {
                if (isPlaying) {
                    speakCurrent(); // Restart current with new speed
                }
            });
        }

        // Close
        closeBtn.addEventListener('click', stopTTS);

        // Cleanup on page unload
        window.addEventListener('beforeunload', function () {
            synth.cancel();
        });
    }

    // ===== INITIALIZE ALL =====
    function init() {
        initSkipLink();
        initPreloader();
        fixNavbarToggler();
        fixIconOnlyLinks();
        fixImageAltText();
        addLandmarkRoles();
        enhanceForms();
        initLiveRegions();
        enhanceTabs();
        enhanceNewsCards();
        enhanceSearch();
        fixHeadingHierarchy();
        enhanceExternalLinks();
        enhanceTables();
        initWidget();
        initTTS();

        // Delay slider enhancement to wait for slick init
        setTimeout(enhanceSliders, 2000);
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();
