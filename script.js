(function () {
  var menuButton = document.querySelector('[data-menu-toggle]');
  var mobileMenu = document.querySelector('[data-mobile-menu]');
  var yearElements = document.querySelectorAll('[data-year]');

  yearElements.forEach(function (element) {
    element.textContent = new Date().getFullYear();
  });

  var dropdownButton = document.querySelector("#dropdownBtn");
  var dropdownMenu = document.querySelector("#dropdownMenu");
  var dropdownArrow = document.querySelector("#dropdownArrow");
  var dropdown = document.querySelector(".dropdown");

  function closeDropdown() {
    if (dropdownButton && dropdownMenu && dropdownArrow) {
      dropdownMenu.classList.remove("show");
      dropdownArrow.classList.remove("is-open");
      dropdownButton.setAttribute("aria-expanded", "false");
    }
  }

  if (dropdownButton && dropdownMenu && dropdownArrow && dropdown) {
    dropdownButton.addEventListener("click", function (event) {
      event.stopPropagation();
      var isOpen = dropdownMenu.classList.toggle("show");
      dropdownArrow.classList.toggle("is-open", isOpen);
      dropdownButton.setAttribute("aria-expanded", String(isOpen));
    });

    dropdownMenu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  var mobileDropdownButton = document.querySelector("#mobileDropdownBtn");
  var mobileDropdownMenu = document.querySelector("#mobileDropdownMenu");
  var mobileDropdownArrow = document.querySelector("#mobileDropdownArrow");
  var mobileDropdown = document.querySelector(".mobile-dropdown");

  function closeMobileDropdown() {
    if (mobileDropdownButton && mobileDropdownMenu && mobileDropdownArrow) {
      mobileDropdownMenu.classList.remove("show");
      mobileDropdownArrow.classList.remove("is-open");
      mobileDropdownButton.setAttribute("aria-expanded", "false");
    }
  }

  if (mobileDropdownButton && mobileDropdownMenu && mobileDropdownArrow && mobileDropdown) {
    mobileDropdownButton.addEventListener("click", function (event) {
      event.stopPropagation();
      var isOpen = mobileDropdownMenu.classList.toggle("show");
      mobileDropdownArrow.classList.toggle("is-open", isOpen);
      mobileDropdownButton.setAttribute("aria-expanded", String(isOpen));
    });

    mobileDropdownMenu.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }

  document.addEventListener("click", function (event) {
    if (dropdown && !dropdown.contains(event.target)) closeDropdown();
    if (mobileDropdown && !mobileDropdown.contains(event.target)) closeMobileDropdown();
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeDropdown();
      closeMobileDropdown();
    }
  });

  if (menuButton && mobileMenu) {
    menuButton.addEventListener('click', function () {
      var isOpen = mobileMenu.classList.toggle('is-open');
      document.body.classList.toggle('menu-open', isOpen);
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
      menuButton.textContent = isOpen ? '×' : '☰';
      if (!isOpen) closeMobileDropdown();
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenu.classList.remove('is-open');
        document.body.classList.remove('menu-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation menu');
        menuButton.textContent = '☰';
        closeMobileDropdown();
      });
    });
  }

  var lightbox = document.querySelector('[data-lightbox]');
  if (lightbox) {
    var lightboxImage = lightbox.querySelector('img');
    var lightboxCaption = lightbox.querySelector('[data-lightbox-caption]');
    var closeButton = lightbox.querySelector('[data-lightbox-close]');

    function closeLightbox() {
      lightbox.hidden = true;
      document.body.classList.remove('menu-open');
    }

    document.querySelectorAll('[data-gallery-image]').forEach(function (trigger) {
      trigger.addEventListener('click', function () {
        lightboxImage.src = trigger.dataset.image;
        lightboxImage.alt = trigger.dataset.alt || '';
        lightboxCaption.textContent = trigger.dataset.label || 'Image preview';
        lightbox.hidden = false;
        document.body.classList.add('menu-open');
      });
    });

    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (event) {
      if (event.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !lightbox.hidden) closeLightbox();
    });
  }
}());
