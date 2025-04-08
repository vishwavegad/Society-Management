document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".loginbutton button");
  const emailInput = document.querySelector(".email input");
  const passwordInput = document.querySelector(".password input");
  const roleSelect = document.getElementById("user-role"); 

  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent default page reload

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const selectedRole = roleSelect.value; 

    if (!email || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: selectedRole })
      });
      console.log({ email, password, role: selectedRole });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful");
        if (data.role !== selectedRole) {
          alert("Incorrect role selected");
          return;
        }
        if(data.role==="admin"){
          window.location.href = "../../admin/homepage/homepage.html";
        }
        else if(data.role==="security")
        {
          window.location.href = "../../security/visitorsLog.html";
        }
        else
        {
          window.location.href = "../../members/homepage/homepage.html";
        }
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    }
  });
});
