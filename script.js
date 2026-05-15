const menuButton = document.querySelector('[data-menu]');
const navLinks = document.querySelector('.navlinks');
if (menuButton && navLinks) {
  menuButton.addEventListener('click', () => navLinks.classList.toggle('open'));
}
document.querySelectorAll('form[data-ajax="true"]').forEach((form) => {
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const success = form.parentElement.querySelector('.success');
    const error = form.parentElement.querySelector('.error');
    if (success) success.style.display = 'none';
    if (error) error.style.display = 'none';
    const button = form.querySelector('button[type="submit"]');
    const original = button ? button.textContent : '';
    if (button) {
      button.disabled = true;
      button.textContent = 'Sending...';
    }
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (!response.ok) throw new Error('Form submission failed');
      form.reset();
      if (success) success.style.display = 'block';
    } catch (e) {
      if (error) error.style.display = 'block';
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = original;
      }
    }
  });
});