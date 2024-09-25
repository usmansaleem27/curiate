// Global variables for the form
const forms = document.getElementById("p-form"); // Form
const buttons = document.getElementById("p-submit-btn"); // Submit button
const formDivs = document.getElementById("p-form-container"); // Form container
const dots = document.querySelectorAll(".dot"); // Dots at the bottom of the page
const bgImage = 'url("./assets/images/partnerships-bg.jpg")'; // Background image
const bgType = "cover"; // Background size
const bgPosition = "center center"; // Background position
const activeDot = "active-dot"; // Class name for the active dot
const pages = [
  document.getElementById("pg-1"),
  document.getElementById("pg-2"),
  document.getElementById("pg-3"),
  document.getElementById("pg-4"),
  document.getElementById("pg-5"),
]; // Array of all pages
let activePage = 0; // Index of the currently viewed page
let currentPage = 0; // Index of the currently viewed page (used for touch events)
let nextPage = 0; // Index of the next page to be viewed
let deltaY = 0; // Change in Y value of the touch event
let touchStartY = 0; // Y value of the touchstart event
let touchEndY = 0; // Y value of the touchend event
const _ = window._; // Lodash

window.addEventListener("load", () => {
  const form = forms;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const button = buttons;
    button.disabled = true;
    button.textContent = "Submitting...";
    const data = new FormData(form);
    const action = e.target.action;
    fetch(action, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        button.disabled = true;
        button.textContent = "Submitted!";
        setTimeout(() => {
          const formDiv = formDivs;
          formDiv.innerHTML = `
                                <div class="text-center">
                                <i class="bi bi-check-square p-tx-ico"></i>
                                </div>
                                <p class="p-tx-txt">Thank you for providing the requested information!</p>
                                <p class="p-tx-txt">Someone from our team will be in touch with you soon.</p>
                                  `;
        }, 50); // Wait 10 seconds before changing the form
        setTimeout(() => {
          // window.open('https://curiate.youcanbook.me/'); Open Calendly in new tab
          setTimeout(() => {
            window.location.href = "https://curiate.cc"; // Redirect to Curiate
          }, 2000); // Wait 5 seconds before redirecting
        }, 2000); // Wait 5 seconds before opening Calendly
        data.json();
      })
      .catch((error) => console.log("Error:", error));
  });
});

// const setBodyStyle = () => {
//   document.body.style.backgroundImage = bgImage;
//   document.body.style.backgroundSize = bgType;
//   document.body.style.backgroundPosition = bgPosition;
//   document.body.style.backgroundAttachment = "fixed";
// };

// const clearBodyStyle = () => {
//   document.body.style.backgroundImage = "";
//   document.body.style.backgroundSize = "";
//   document.body.style.backgroundPosition = "";
//   document.body.style.backgroundAttachment = "";
// };

// const setActiveDot = (activeIndex) => {
//   dots.forEach((dot, index) => {
//     if (index === activeIndex) {
//       dot.classList.add(activeDot);
//     } else {
//       dot.classList.remove(activeDot);
//     }
//   });
// };

// const scroll = (currentPage, nextPage) => {
//   if (nextPage === 0) setBodyStyle();
//   else clearBodyStyle();
//   pages[currentPage].style.transition = 'opacity 0.050s ease-out';
//   pages[currentPage].style.opacity = 0;
//   setTimeout(() => {
//     pages[currentPage].style.display = 'none';
//   }, 50);
//   pages[nextPage].style.transition = 'opacity 0.050s ease-in';
//   pages[nextPage].style.opacity = '1';
//   setTimeout(() => {
//     pages[nextPage].style.display = 'block';
//   }, 50);
//   setActiveDot(nextPage);
// };

// dots.forEach((dot, index) => {
//   dot.addEventListener("click", () => {
//     currentPage = activePage;
//     nextPage = index;
//     scroll(currentPage, nextPage);
//     activePage = nextPage;
//   });
// });

// document.addEventListener("touchstart", (e) => {
//   touchStartY = e.changedTouches[0].screenY;
// });

// document.addEventListener("touchend", (e) => {
//   touchEndY = e.changedTouches[0].screenY;
//   deltaY = touchEndY - touchStartY;
//   currentPage = activePage;
//   let nextPage = 0;
//   if (deltaY > 100) {
//     nextPage = currentPage - 1;
//     if (nextPage < 0) nextPage = pages.length - 1;
//   } else if (deltaY < -100) {
//     nextPage = (currentPage + 1) % pages.length;
//   }
//   scroll(currentPage, nextPage);
//   activePage = nextPage;
// });

// window.onwheel = _.debounce(
//   (e) => {
//     const currentPage = activePage;
//     let nextPage = 0;
//     if (e.deltaY > 0) {
//       nextPage = (currentPage + 1) % pages.length;
//     } else {
//       nextPage = currentPage - 1;
//       if (nextPage < 0) nextPage = pages.length - 1;
//     }
//     scroll(currentPage, nextPage);
//     activePage = nextPage;
//   },
//   68,
//   { leading: true, trailing: false }
// );
const sendEmailbrands = async () => {
  const email = document.getElementById("input-email").value;
  const endpoint = "https://www.mailer.curiate.cc/api/v1/brands";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.message);
    } else {
      console.error("Failed to send email:", response.statusText);
    }
  } catch (error) {
    console.error("Error sending email:", error.message);
  }
};
