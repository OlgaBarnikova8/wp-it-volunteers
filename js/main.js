const form = document.forms["form-message"];
const { name, phone, message } = form;
const buttonSubmit = document.getElementById("submit-btn");

form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const formData = new FormData(form); 
    const info = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        message: formData.get("message"),
    }    
    console.log(info);

    form.reset();  
});

