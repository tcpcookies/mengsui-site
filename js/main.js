// MENGSUI — Agricultural Plant Protection Drones
// ============================================================
// TODO: Replace with the client's real WhatsApp number before handover.
// Format: country code + number, digits only (no "+", spaces or dashes).
const WHATSAPP_NUMBER = '8613800000000';

document.addEventListener('DOMContentLoaded', function () {
  // Mobile navigation
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });
  }

  // Header shadow on scroll
  var header = document.querySelector('.site-header');
  function onScroll() {
    if (header) header.classList.toggle('scrolled', window.scrollY > 8);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Inquiry form -> WhatsApp deep link
  var form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      function val(name) {
        var el = form.querySelector('[name="' + name + '"]');
        return el ? el.value.trim() : '';
      }
      var lines = [
        'Hello MENGSUI team, I would like to inquire about your agricultural drones.',
        '',
        'Name: ' + val('name'),
        'Company: ' + (val('company') || '-'),
        'Country/Region: ' + (val('country') || '-'),
        'Email: ' + val('email'),
        'WhatsApp/Phone: ' + (val('phone') || '-'),
        'Product Interest: ' + (val('product') || '-'),
        'Estimated Quantity: ' + (val('quantity') || '-'),
        '',
        'Message: ' + (val('message') || '-')
      ];
      var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  }

  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
