function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}
 
// DOM Elements
let formContent = document.getElementById("reserve");     //form content
const modalSuccess = document.getElementById("modalSuccess");//modal success
const modalbg = document.querySelector(".bground");         //modal
const modalSubmit = document.querySelector(".btn-submit");  //modal submit button
const modalBtn = document.querySelectorAll(".modal-btn");   //open modal button
const firstName = document.getElementById("first");         //firtname input
const lastName = document.getElementById("last");           //lastname input
const email = document.getElementById("email");             //email input
const birthdate = document.getElementById("birthdate");     //birthdate input
const quantity = document.getElementById("quantity");       //quantity input
const city = document.getElementById("location1");          //city input
const conditionAcceptation = document.getElementById("checkbox1");     //conditions input
 
// default messages
const firstNameMessage = "Le prénom doit comporter au moins 2 caractères alphabétiques";
const lastNameMessage = "Le nom doit comporter au moins 2 caractères alphabétiques";
const emailMessage = "L'adresse e-mail n'est pas valide !";
const birthdateMessage = "La date de naissance n'est pas valide !";
const quantityMessage = "Merci d'entrer un nombre entre 1 et 99 !";
const cityMessage = "Vous devez selectionner une ville !";
const acceptationMessage =  "Vous devez accepter les conditions d'utilisation !";
const requiredFieldsMessage =  "Vous devez compléter tous les champs obligatoires !";
 
// datas validation initialisation
firstName.valid = false;
lastName.valid = false;
email.valid = false;
birthdate.valid = false;
quantity.valid = false;
city.valid = false;
 
// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
 
// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}
 
// close modal
function closeModal() {
  modalbg.style.display = "none";
}
 
// check 2 chart min 
function chart2Min(value) {
  return /^[a-zA-Z]{2,}$/.test(value);
}
 
// clear validation message
function clearValidationMessage(element) {
  element.closest(".formData").setAttribute("data-error-visible", "false");
  element.closest(".formData").setAttribute("data-error", "");
}
 
// set validation message
function setValidationMessage(element, message) {
  element.closest(".formData").setAttribute("data-error-visible", "true");
  element.closest(".formData").setAttribute("data-error", message);
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
 
  if ((selectedDate < today ) && (selectedDate > minDate)) {
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
 
// check city function
function cityCheck(city, message){
  const radios = document.querySelectorAll("input[name='location']:checked");  //radios checkbox
  if(!(radios.length)) {
    setValidationMessage(city, message);
    city.valid = false;
  } else {
    clearValidationMessage(city);
    city.valid = true;
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
 
//quantity event message
quantity.addEventListener('keyup', function (event) {
  quantityCheck(quantity, quantityMessage);
});
 
//********************* FORM VALIDATION  ***********************************/
function formValidation() {
  
  // check 5 first fields
  namesCheck(firstName, firstNameMessage);
  namesCheck(lastName, lastNameMessage);
  emailCheck(email, emailMessage);
  birthdateCheck(birthdate, birthdateMessage);
  quantityCheck(quantity, quantityMessage);
  cityCheck(city, cityMessage);
  // check city selection
  if(firstName.valid && lastName.valid && email.valid && birthdate.valid && quantity.valid && city.valid){
    clearValidationMessage(modalSubmit);
 
    // check Terms Acceptation
    if(checkbox1.checked){
      clearValidationMessage(conditionAcceptation);
      // display json in logs
      const data = new FormData(formContent);
      const value = Object.fromEntries(data.entries());
      value.location = data.getAll("location");
      console.log({ value });
      
      // if all is ok, display success message 
      formContent.style.display="none";
      modalSuccess.style.display="flex";
      return false;
    }else{
      // display terms message
      setValidationMessage(conditionAcceptation, acceptationMessage);
      return false;
    }
  }else{
    // display city selection message
    setValidationMessage(modalSubmit, requiredFieldsMessage);
    return false;
  }
};
 
//clear field
function clearField (element) {
  element.valid = false;
  element.value = '';
}
 
// clear form 
function clearForm () {
  clearField(firstName);
  clearField(lastName);
  clearField(email);
  clearField(birthdate);
  clearField(quantity);
  city.valid = false;
  document.querySelectorAll("input[name='location']:checked")[0].checked = false;
  formContent.style.display="block";
  modalSuccess.style.display="none";
  closeModal();
}
 
