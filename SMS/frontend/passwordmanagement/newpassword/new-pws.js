const password1 = document.getElementById("password1");
const password2 = document.getElementById("password2");
const eyeIcon1 = document.getElementById("eyeicon1");
const eyeIcon2 = document.getElementById("eyeicon2");

const togglePasswordVisibility = (input, icon) => {
  if (input.type === "password") {
    input.type = "text";
    icon.src = "visible.png";
  } else {
    input.type = "password";
    icon.src = "invisible.png";
  }
};

eyeIcon1.addEventListener("click", () =>
  togglePasswordVisibility(password1, eyeIcon1)
);
eyeIcon2.addEventListener("click", () =>
  togglePasswordVisibility(password2, eyeIcon2)
);

document.querySelector(".submit").addEventListener("click", async (e) => {
  e.preventDefault();

  const pass1 = password1.value.trim();
  const pass2 = password2.value.trim();

  if (pass1 !== pass2) {
    alert("Passwords do not match. Please try again.");
    return;
  }

  if (pass1.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  const email = localStorage.getItem("resetEmail");
  if (!email) {
    alert("Missing email info. Please restart the reset process.");
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:3000/api/forgotpassword/resetPassword",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword: pass1 }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert("Password changed successfully!");
      localStorage.removeItem("resetEmail");
      window.location.href = "../../landing/landing.html";
    } else {
      alert(data.message || "Failed to change password");
    }
  } catch (err) {
    alert("Something went wrong. Try again later.");
    console.error(err);
  }
});
