// Select elements
const emailStep = document.getElementById("step-email");
const otpStep = document.getElementById("step-otp");
const emailInput = document.getElementById("email");
const sendOtpButton = document.getElementById("sendOtp");
const verifyOtpButton = document.getElementById("verifyOtp");
const otpInputs = document.querySelectorAll(".otp-input");

let email = "";

// Handle Email Submission
sendOtpButton.addEventListener("click", async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  email = emailInput.value.trim();

  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:3000/api/forgotpassword/sendOtp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert("OTP sent to your email!");
      otpStep.classList.remove("hidden");
      emailStep.classList.add("hidden");
      otpInputs[0].focus();
    } else {
      alert(data.message || "Failed to send OTP");
    }
  } catch (err) {
    alert("Something went wrong. Try again later.");
    console.error(err);
  }
});

// Handle OTP Submission
verifyOtpButton.addEventListener("click", async () => {
  const otp = Array.from(otpInputs)
    .map((input) => input.value)
    .join("");

  if (otp.length !== 4 || isNaN(otp)) {
    alert("Please enter a valid 4-digit OTP.");
    return;
  }

  try {
    const res = await fetch(
      "http://localhost:3000/api/forgotpassword/verifyOtp",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert("OTP verified successfully!");
      localStorage.setItem("resetEmail", email); // store email temporarily
      window.location.href = "../newpassword/new-pws.html";
    } else {
      alert(data.message || "Failed to verify OTP");
    }
  } catch (err) {
    alert("Something went wrong. Try again later.");
    console.error(err);
  }
});

// OTP auto-focus
otpInputs.forEach((input, index) => {
  input.addEventListener("keyup", (e) => {
    if (input.value.length > 1) input.value = input.value[0];

    if (e.key === "Backspace" && index > 0) {
      otpInputs[index - 1].focus();
    } else if (input.value && index < otpInputs.length - 1) {
      otpInputs[index + 1].focus();
    }
    checkOtpFilled();
  });
  input.addEventListener("input", checkOtpFilled);
});

function checkOtpFilled() {
  const allFilled = Array.from(otpInputs).every(
    (input) => input.value.trim().length === 1
  );
  if (allFilled) {
    verifyOtpButton.classList.add("active");
    verifyOtpButton.classList.remove("verify");
  } else {
    verifyOtpButton.classList.remove("active");
    verifyOtpButton.classList.add("verify");
  }
}

window.addEventListener("load", () => otpInputs[0].focus());
