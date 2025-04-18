document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const responseMsg = document.getElementById("formResponse");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.name || !data.email || !data.message) {
      responseMsg.style.color = "red";
      responseMsg.textContent = "Name, Email, and Message are required.";
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/contactus", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        responseMsg.style.color = "green";
        responseMsg.textContent =
          result.message || "Form submitted successfully!";
        form.reset();
      } else {
        responseMsg.style.color = "red";
        responseMsg.textContent = result.message || "Failed to submit form.";
      }
    } catch (error) {
      console.error("Form submission error:", error);
      responseMsg.style.color = "red";
      responseMsg.textContent = "Something went wrong. Please try again later.";
    }
  });
});
