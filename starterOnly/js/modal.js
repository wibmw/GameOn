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
const modalBtn = document.querySelectorAll(".modal-btn");   //open modal button
//const formData = document.querySelectorAll(".formData");    //modal form
const firstName = document.getElementById("first");         //firtname input
const lastName = document.getElementById("last");           //lastname input
const email = document.getElementById("email");             //email input
const birthdate = document.getElementById("birthdate");     //birthdate input
const quantity = document.getElementById("quantity");       //quantity input
const city = document.getElementById("location1");          //city input
const conditionAcceptation = document.getElementById("checkbox1");     //conditions input

// default messages
const firstNameMessage = "Le prénom doit comporter au moins 2 caractères !";
const lastNameMessage = "Le nom doit comporter au moins 2 caractères !";
const emailMessage = "L'adresse e-mail n'est pas valide !";
const birthdateMessage = "La date de naissance n'est pas valide !";
const quantityMessage = "Merci d'entrer un nombre entre 1 et 99 !";
const cityMessage = "Vous devez selectionner une ville !";
const acceptationMessage =  "Vous devez accepter les conditions d'utilisation !";
const requiredFieldsMessage =  "Vous devez compléter tous les champs obligatoires !";

// datas validation initialisation
/*isFirstNameValid = false;
isLastNameValid = false;
isEmailValid = false;
isBirthdateValid = false;
isQuantityValid = false;
*/
firstName.valid = false;
lastName.valid = false;
email.valid = false;
birthdate.valid = false;
quantity.valid = false;

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

// 2 chart min verification
function chart2Min(value) {
  console.log(value + "   " + /^[a-zA-Z]{2,}$/.test(value));
  return /^[a-zA-Z]{2,}$/.test(value);
}

// clear validation message
function clearValidationMessage(element) {
  element.closest(".formData").setAttribute("data-error-visible", "false");
  element.closest(".formData").setAttribute("data-error", "");
  console.log("clearValidationMessage " + element.name);
}

// set validation message
function setValidationMessage(element, message) {
  element.closest(".formData").setAttribute("data-error-visible", "true");
  element.closest(".formData").setAttribute("data-error", message);
  console.log("setValidationMessage " + element.name);
}

//********************* CHECK FUNCTIONS  ***********************************/
// check names function
function namesCheck(name, message){
  if (!(chart2Min(name.value)) || name === '') {
    setValidationMessage(name, message);
    name.valid = false;
  } else {
    clearValidationMessage(name);
    name.valid = true;
  }
}

// check email function
function emailCheck(email, message){
  if (!(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/.test(email.value)) || email === '') {
    setValidationMessage(email, message);
    email.valid = false;
  } else {
    clearValidationMessage(email);
    email.valid = true;
  }
}

// check birthdate function
function birthdateCheck(birthdate, message){
  today = new Date(Date.now());
  today.setFullYear( today.getFullYear() - 10 );
  minDate = new Date(Date.parse("1900/01/01"));
  selectedDate = new Date(Date.parse(birthdate.value));
 
  if ((selectedDate < today ) && (selectedDate > minDate)  && (selectedDate > minDate)) {
    clearValidationMessage(birthdate);
    birthdate.valid = true;
  } else {
    setValidationMessage(birthdate, message);
    birthdate.valid = false;
  }
}

// check quantity function
function quantityCheck(quantity, message){
  if((quantity.value < 1) || (quantity.value > 99)) {
    setValidationMessage(quantity, message);
    quantity.valid = false;
  } else {
    clearValidationMessage(quantity);
    quantity.valid = true;
  }
}

//********************* EVENT CHECK MESSAGES  ***********************************/
//firstname event message
firstName.addEventListener('keyup', function (event) {
  namesCheck(firstName, firstNameMessage);
});

//lastname event message
lastName.addEventListener('keyup', function (event) {
  namesCheck(lastName, lastNameMessage);
});

//email event message
email.addEventListener('change', function (event) {
  emailCheck(email, emailMessage);
});

//birthdate event message
birthdate.addEventListener('change', function (event) {
  birthdateCheck(birthdate, birthdateMessage);
});

//quantitye event message
quantity.addEventListener('keyup', function (event) {
  quantityCheck(quantity, quantityMessage);
});

//********************* FORM VALIDATION  ***********************************/
function formValidation(e) {
  const radios = document.querySelectorAll("input[name='location']:checked");  //radios checkbox
  // fields check
  namesCheck(firstName, firstNameMessage);
  namesCheck(lastName, lastNameMessage);
  emailCheck(email, emailMessage);
  birthdateCheck(birthdate, birthdateMessage);
  quantityCheck(quantity, quantityMessage);

  if(firstName.valid && lastName.valid && email.valid && birthdate.valid && quantity.valid){
    clearValidationMessage(modalSubmit);
    if(!(radios.length)) {
      setValidationMessage(city, cityMessage);
      return false;
    } else {
      clearValidationMessage(city);
        //Termes Acceptation
        if(checkbox1.checked){
          clearValidationMessage(conditionAcceptation);
          return true;
        }else{
          setValidationMessage(conditionAcceptation, acceptationMessage);
          return false;
        }
    }
  }else{
    setValidationMessage(modalSubmit, requiredFieldsMessage);
    return false;
  }
};

//modalSubmit.addEventListener("click", formValidation);