function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalSubmit = document.querySelector(".btn-submit");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");


// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

//verification 2 chart min
function chart2Min(value) {
  return /a{2,}$/.test(value);
}

//disable submit button
function disableSubmit(disabled) {
  if (disabled) {
    modalSubmit.setAttribute("disabled", true);
  } else {
    modalSubmit.removeAttribute("disabled");
  }
}

//firsname check 2 char
firstName.addEventListener('input', function(e) {
  var value = e.target.value;
  if (chart2Min(value)) {
      isValid = true;
  } else {
      isValid = false;
  }
});

//lastname check 2 char
lastName.addEventListener('input', function(e) {
  var value = e.target.value;
  if (chart2Min(value)) {
    disableSubmit(true);
  } else {
    disableSubmit(false);
  }
});

email.addEventListener('keyup', function (event) {
  if(email.validity.typeMismatch) {
    email.setCustomValidity("J'attend un e-mail, mon cher&nbsp;!");
  } else {
    email.setCustomValidity("");
  }
});