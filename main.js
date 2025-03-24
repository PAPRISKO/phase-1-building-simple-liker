// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!
document.addEventListener("DOMContentLoaded", () => {
  const hearts = document.querySelectorAll(".like-glyph");
  const errorModal = document.querySelector("#modal");

  // Ensure the modal exists and is hidden by default
  if (errorModal) {
    errorModal.classList.add("hidden");
  } else {
    console.error("Modal element not found in the document!");
    return;
  }

  hearts.forEach((heart) => {
    heart.addEventListener("click", () => {
      mimicServerCall()
        .then(() => {
          if (heart.textContent === EMPTY_HEART) {
            heart.textContent = FULL_HEART;
            heart.classList.add("activated-heart");
          } else {
            heart.textContent = EMPTY_HEART;
            heart.classList.remove("activated-heart");
          }
        })
        .catch((error) => {
          // Display error message in modal
          errorModal.classList.remove("hidden");
          const modalMessage = errorModal.querySelector("#modal-message");
          if (modalMessage) {
            modalMessage.textContent = error;
          } else {
            console.error("Modal message element not found!");
          }

          // Hide error after 3 seconds
          setTimeout(() => {
            errorModal.classList.add("hidden");
          }, 3000);
        });
    });
  });
});

//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < 0.2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
