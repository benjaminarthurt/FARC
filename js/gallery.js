(function () {
  'use strict';

  var dialog = null;
  var images = [];
  var currentIndex = 0;

  function createDialog() {
    if (dialog) return;
    dialog = document.createElement('dialog');
    dialog.className = 'lightbox';
    dialog.setAttribute('aria-label', 'Image viewer');
    dialog.innerHTML =
      '<div class="lightbox-inner">' +
        '<button class="lightbox-close" aria-label="Close">&times;</button>' +
        '<button class="lightbox-prev" aria-label="Previous">&#8249;</button>' +
        '<img src="" alt="">' +
        '<button class="lightbox-next" aria-label="Next">&#8250;</button>' +
      '</div>';
    document.body.appendChild(dialog);

    dialog.querySelector('.lightbox-close').addEventListener('click', closeDialog);
    dialog.querySelector('.lightbox-prev').addEventListener('click', function () { navigate(-1); });
    dialog.querySelector('.lightbox-next').addEventListener('click', function () { navigate(1); });

    dialog.addEventListener('click', function (e) {
      if (e.target === dialog) closeDialog();
    });

    document.addEventListener('keydown', function (e) {
      if (!dialog.open) return;
      if (e.key === 'Escape') closeDialog();
      if (e.key === 'ArrowLeft') navigate(-1);
      if (e.key === 'ArrowRight') navigate(1);
    });
  }

  function openDialog(index) {
    createDialog();
    currentIndex = index;
    updateImage();
    dialog.showModal();
  }

  function closeDialog() {
    if (dialog) dialog.close();
  }

  function navigate(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    updateImage();
  }

  function updateImage() {
    var img = dialog.querySelector('img');
    var item = images[currentIndex];
    img.src = item.src;
    img.alt = item.alt || '';
    var prev = dialog.querySelector('.lightbox-prev');
    var next = dialog.querySelector('.lightbox-next');
    prev.style.display = images.length > 1 ? '' : 'none';
    next.style.display = images.length > 1 ? '' : 'none';
  }

  function initGallery() {
    var grids = document.querySelectorAll('.gallery-grid');
    grids.forEach(function (grid) {
      var imgs = grid.querySelectorAll('img');
      var startIndex = images.length;
      imgs.forEach(function (img, i) {
        var idx = startIndex + i;
        images.push({ src: img.src, alt: img.alt });
        img.setAttribute('tabindex', '0');
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', 'View larger: ' + (img.alt || 'photo'));
        img.addEventListener('click', function () { openDialog(idx); });
        img.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDialog(idx); }
        });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGallery);
  } else {
    initGallery();
  }
})();
