async function submitPayment(event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const paymentMethod = document.getElementById("payment-method").value;
  const pin = document.getElementById("pin").value;
  const flatNum = document.getElementById("flatNum").value;

  if (!name || !email || !amount || !paymentMethod || !pin || !flatNum) {
    alert("Please fill all fields!");
    return;
  }

  const paymentData = {
    name,
    email,
    amount,
    paymentMethod,
    pin,
    flatNum,
  };

  try {
    const response = await fetch("http://localhost:3000/api/maintenance", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(paymentData),
    });

    const result = await response.json();
    console.log("Payment Response: ", result);

    if (result.success) {
      alert(
        "Payment successful! Transaction ID: " + result.newPayment.transactionId
      );
      window.location.reload();
    } else {
      alert("Payment failed: " + result.error);
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again.");
  }
}
