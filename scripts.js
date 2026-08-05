document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('form[name="contact"]');
  const alertPlaceholder = document.getElementById('formAlertPlaceholder');

  function showAlert(message, type) {
    alertPlaceholder.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `  <div>${message}</div>`,
      '  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      '</div>'
    ].join('');
  }

  function encode(data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const data = {
      'form-name': form.getAttribute('name'),
      email: form.email.value,
      message: form.message.value,
      'bot-field': form['bot-field'].value
    };

    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode(data)
    })
      .then(() => {
        showAlert("Thanks! Your message has been sent — I'll get back to you soon.", 'success');
        form.reset();
      })
      .catch((error) => {
        showAlert('Something went wrong. Please try again or email me directly.', 'danger');
        console.error(error);
      });
  });
});
