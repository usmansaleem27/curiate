window.addEventListener('load', () => {
  const form = document.getElementById('email-form');
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const button = document.getElementById('input-button');
    button.disabled = true;
    button.textContent = 'Submitting...';
    const data = new FormData(form);
    const action = e.target.action;
    await fetch(action, {
      method: 'POST',
      body: data
    })
      .then(response => response.json())
      .then(data => {
        if (data.result === 'success') {
          const formDiv = document.getElementById('email-form-container');
          formDiv.innerHTML = `
                                <div class="text-center">
                                    <i class="bi bi-check-square user-tx-ico"></i>
                                </div>
                                <p class="user-tx-txt">Thank you for signing up!</p>
                                <p class="user-tx-txt">We will be in touch soon.</p>
                            `;
        } else {
          button.disabled = false;
          button.textContent = 'SIGNUP';
          console.log(data.result);
        }
      })
      .catch(error => {
        button.disabled = false;
        button.textContent = 'SIGNUP';
        console.log(error);
      });
  });
});
async function sendEmail() {
  const email = document.getElementById('input-email').value;
  const endpoint = 'https://www.mailer.curiate.cc/api/v1/signup'; 

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      console.error('Failed to send email:', response.statusText);
    }
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
}
