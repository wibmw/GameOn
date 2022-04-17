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

// datas validation
isFirstNameValid = false;
isLastNameValid = false;
isEmailValid = false;
isBirthdateValid = false;
isQuantityValid = false;

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
  console.log(value + "   " + /^[a-zA-Z]{2,}$/.test(value));
  return /^[a-zA-Z]{2,}$/.test(value);
}

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

//********************* CHECK MESSAGES  ***********************************/
//firstname check message
firstName.addEventListener('keyup', function (event) {
  if (!(chart2Min(firstName.value)) || firstName === '') {
    setValidationMessage(firstName, firstNameMessage);
    isFirstNameValid = false;
  } else {
    clearValidationMessage(firstName);
    isFirstNameValid = true;
  }
});

//lastnamecheck message
lastName.addEventListener('keyup', function (event) {
  if (!(chart2Min(lastName.value)) || lastName === '') {
    setValidationMessage(lastName, lastNameMessage);
    isLastNameValid = false;
  } else {
    clearValidationMessage(lastName);
    isLastNameValid = true;
  }
});

//email check message
email.addEventListener('change', function (event) {
  if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email.value)) || email === '') {
    setValidationMessage(email, emailMessage);
    isEmailValid = false;
  } else {
    clearValidationMessage(email);
    isEmailValid = true;
  }
});

//birthdate check message
birthdate.addEventListener('change', function (event) {
  today = new Date(Date.now());
  today.setFullYear( today.getFullYear() - 10 );
  minDate = new Date(Date.parse("1900/01/01"));
  selectedDate = new Date(Date.parse(birthdate.value));
 
  if ((selectedDate < today ) && (selectedDate > minDate)  && (selectedDate > minDate)) {
    clearValidationMessage(birthdate);
    isBirthdateValid = true;
  } else {
    console.log(birthdate.value);
    setValidationMessage(birthdate, birthdateMessage);
    isBirthdateValid = false;
  }
});

//quantity check message
quantity.addEventListener('keyup', function (event) {
  console.log(quantity.validity.typeMismatch)
  if((quantity.value < 1) || (quantity.value > 99)) {
    setValidationMessage(quantity, quantityMessage);
    isQuantityValid = false;
  } else {
    clearValidationMessage(quantity);
    isQuantityValid = true;
  }
});

//form fields validation
function formValidation(e) {
  const radios = document.querySelectorAll("input[name='location']:checked");  //radios checkbox
  if(isFirstNameValid && isLastNameValid && isEmailValid && isBirthdateValid && isQuantityValid){
    if(!(radios.length)) {
      //setValidationMessage(document.getElementById("location1"), "Vous devez selectionner une ville !");
      console.log("not good");
      return false;
  
    } else {
      //clearValidationMessage(document.getElementById("location1"));
      console.log("good");
        //Termes Acceptation
        if(checkbox1.checked){
          console.log("checked");
          return true;
        }else{
          console.log("notchecked");
          return false;
        }
    }
  }else{
    console.log("form not valid");
    return false;
  }
};

//modalSubmit.addEventListener("click", formValidation);