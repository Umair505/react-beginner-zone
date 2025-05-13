const form = document.getElementById("login-form");
const nameInput = document.getElementById("name");
const codeInput = document.getElementById("code");

form.addEventListener("submit", (event) => {
  event.preventDefault(); 
  if (codeInput.value === "123456") {
    document.getElementById("login-form").classList.add("hidden");
    const elements = document.querySelectorAll(".hid")
    elements.forEach((element) =>{
        element.classList.remove("hidden");
    })
    Swal.fire({
      title: "Login Successful!",
      text: `Welcome, ${nameInput.value}!`,
      icon: "success",
      confirmButtonText: "OK",
  });

} else {
  Swal.fire({
    title: "Login Failed!",
    text: "Please enter a valid name and correct code.",
    icon: "error",
    confirmButtonText: "Try Again",
});
  }
});


const logout = () =>{
    document.getElementById("login-form").classList.remove("hidden");
    const elements = document.querySelectorAll(".hid");
    elements.forEach(element =>{
        element.classList.add("hidden");
    }) 
    Swal.fire({
      title: "Logged Out!",
      text: "You have been logged out successfully.",
      icon: "success",
      confirmButtonText: "OK",
  });
}