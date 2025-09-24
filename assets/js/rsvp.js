// RSVP form logic: show extra fields only when "Yes" is selected
(function () {
  const yes = document.getElementById('attending-yes');
  const no = document.getElementById('attending-no');
  const extra = document.getElementById('attending-extra');
  if (!yes || !no || !extra) return;

  const email = document.getElementById('email');
  const count = document.getElementById('guest-count');

  function showExtra(show) {
    if (show) {
      extra.classList.remove('hidden');
      extra.setAttribute('aria-hidden', 'false');
      if (email) email.required = true;
      if (count) count.required = true;
    } else {
      extra.classList.add('hidden');
      extra.setAttribute('aria-hidden', 'true');
      if (email) { email.required = false; email.value = ''; }
      if (count) { count.required = false; count.value = ''; }
      const phone = document.getElementById('phone');
      const notes = document.getElementById('notes');
      if (phone) phone.value = '';
      if (notes) notes.value = '';
    }
  }

  yes.addEventListener('change', () => showExtra(true));
  no.addEventListener('change', () => showExtra(false));

  // If user navigates back with history, reflect current selection
  if (yes.checked) showExtra(true);
})();
