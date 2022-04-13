function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");         //modal
const modalSubmit = document.querySelector(".btn-submit");  //modal submit button
const modalBtn = document.querySelectorAll(".modal-btn");  //open modal button
const formData = document.querySelectorAll(".formData");    //modal form
const firstName = document.getElementById("first");         //firtname input
const lastName = document.getElementById("last");           //lastname input
const email = document.getElementById("email");             //email input
const birthdate = document.getElementById("birthdate");     //birthdate input
const quantity = document.getElementById("quantity");       //quantity input


// default messages
const firstNameMessage = "Le prénom doit comporter au moins 2 caractères !";
const lastNameMessage = "Le nom doit comporter au moins 2 caractères !";
const emailMessage = "L'adresse e-mail n'est pas valide !";
const birthdateMessage = "La date de naissace n'est pas valide !";
const quantityMessage = "Merci d'entrer un nombre !";

// Messages initialisation
setValidationMessage(firstName,firstNameMessage);
setValidationMessage(lastName,lastNameMessage);
setValidationMessage(email, emailMessage);
setValidationMessage(birthdate, birthdateMessage);
setValidationMessage(quantity, quantityMessage);

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
/*function disableSubmit(disabled) {
  if (disabled) {
    modalSubmit.setAttribute("disabled", true);
  } else {
    modalSubmit.removeAttribute("disabled");
  }
}*/

// clear validation message
function clearValidationMessage(element) {
  element.setCustomValidity("");
  element.reportValidity();
  console.log("clearValidationMessage " + element.name);
}

// set validation message
function setValidationMessage(element, message) {
  element.setCustomValidity(message);
  element.reportValidity();
  console.log("setValidationMessage " + element.name);
}

//firsname check 2 char
/*firstName.addEventListener('input', function(e) {
  var value = e.target.value;
  if (chart2Min(value)) {
      isValid = true;
  } else {
      isValid = false;
  }
});*/

//lastname check 2 char
/*lastName.addEventListener('input', function(e) {
  var value = e.target.value;
 /* if (chart2Min(value)) {
    disableSubmit(true);
  } else {
    disableSubmit(false);
  }
});*/
//********************* CHECK MESSAGES  ***********************************/
//firstname check message
firstName.addEventListener('focus', function (event) {
  if (firstName.validity.tooShort || firstName === '') {
    setValidationMessage(firstName, firstNameMessage);
  } else {
    clearValidationMessage(firstName);
  }
});

//lastnamecheck message
lastName.addEventListener('focus', function (event) {
  if (lastName.validity.tooShort || lastName === '') {
    setValidationMessage(lastName, lastNameMessage);
  } else {
    clearValidationMessage(lastName);
  }
});

//email check message
email.addEventListener('focus', function (event) {
  if (email.validity.typeMismatch || email === '') {
    setValidationMessage(email, emailMessage);
  } else {
    clearValidationMessage(email);
  }
});

//birthdate check message
birthdate.addEventListener('focus', function (event) {
  today = new Date(Date.now());
  minDate = new Date(Date.parse("1900/01/01"));
  selectedDate = new Date(Date.parse(birthdate.value));

  console.log(today + " - " + selectedDate + " - " + minDate);
 
  if ((selectedDate < today ) && (selectedDate > minDate)) {
    clearValidationMessage(birthdate);
    console.log("1");
  } else {
    console.log(birthdate.value);
    setValidationMessage(birthdate, birthdateMessage);
    console.log("2");
  }
});

//quantity check message
quantity.addEventListener('keyup', function (event) {
  console.log(quantity.validity.typeMismatch)
  if(quantity.validity.typeMismatch) {
    setValidationMessage(quantity, quantityMessage);
  } else {
    clearValidationMessage(quantity);
  }
});

//form fields validation
function formValidation(e) {

  //e.preventDefault();

  selected = 0;
  for (let i = 1; i < 7; i++) {
    console.log(i);
    console.log(document.getElementById("location" + i).checked);
    if (document.getElementById("location" + i).checked) {
      console.log(i);
      selected++;
    }
  }
  if(selected == 0) {
    //setValidationMessage(document.getElementById("location1"), "Vous devez selectionner une ville !");
    console.log(selected);
    console.log("not good");
    return false;
  } else {
    //clearValidationMessage(document.getElementById("location1"));
    console.log(selected);
    console.log("good");
    return true;
  }
  
};

//modalSubmit.addEventListener("click", formValidation);