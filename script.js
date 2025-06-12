// Formular mit AJAX an Formspree senden und Status anzeigen

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  status.textContent = 'Sende Nachricht…';
  status.style.color = 'black';

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' },
    });

    if (response.ok) {
      status.textContent = 'Danke für deine Nachricht! Ich melde mich bald.';
      status.style.color = 'green';
      form.reset();
    } else {
      const data = await response.json();
      if (data.errors) {
        status.textContent = data.errors.map(err => err.message).join(', ');
      } else {
        status.textContent = 'Fehler beim Senden, bitte versuche es später noch einmal.';
      }
      status.style.color = 'red';
    }
  } catch (error) {
    status.textContent = 'Netzwerkfehler, bitte überprüfe deine Verbindung.';
    status.style.color = 'red';
  }
});
