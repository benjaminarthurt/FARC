(function () {
  'use strict';

  function initCallsignLookup() {
    var forms = document.querySelectorAll('.callsign-lookup-form');
    forms.forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var input = form.querySelector('input[name="callsign"]');
        if (!input) return;
        var callsign = input.value.trim().toUpperCase();
        if (!callsign) return;
        window.open('https://www.qrz.com/lookup/' + encodeURIComponent(callsign), '_blank', 'noopener,noreferrer');
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCallsignLookup);
  } else {
    initCallsignLookup();
  }
})();
