document.addEventListener("DOMContentLoaded", () => {
  const loginBtn = document.querySelector(".loginbutton button");
  const emailInput = document.querySelector(".email input");
  const passwordInput = document.querySelector(".password input");

  loginBtn.addEventListener("click", async (e) => {
    e.preventDefault(); // Prevent default page reload

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    if (!email || !password) {
      alert("Please enter both username and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful");
        window.location.href = "../../members/homepage/homepage.html"; // Redirect to homepage
      } else {
        alert(data.msg || "Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Please try again.");
    }
  });
});
