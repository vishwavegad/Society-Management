window.onload = function () {
  const items = document.querySelectorAll(".animate-item");
  items.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
  });

  const signInBtn = document.querySelector("#signInBtn");

  if (!signInBtn) {
    console.error("Sign In button not found!");
    return;
  }
  console.log("Sign In button found!");

  signInBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.querySelector(".username input").value.trim();
    const email = document.querySelector(".number input").value.trim();
    // const passwordFields = document.querySelectorAll(".password input");
    const password = document
      .querySelectorAll(".password input")[0]
      .value.trim();
    const confirmPassword = document
      .querySelectorAll(".password input")[1]
      .value.trim();
    const societyName = document.querySelector("#society-names").value;

    if (!username || !email || !password || !confirmPassword || !societyName) {
      alert("All fields are required!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = { username, email, password, societyName };

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      console.log("Server Response:", data); // Debugging

      if (response.ok) {
        alert("Signup successful! Redirecting to login...");
        window.location.href = "../login/login.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  });
};
