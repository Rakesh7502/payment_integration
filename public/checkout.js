
document.addEventListener('DOMContentLoaded', function () {
    const quantities = document.querySelectorAll('.quantity');
    const totalAmountSpan = document.getElementById('totalAmount');

    const updateTotalAmount = () => {
        let totalAmount = 0;
        const products = document.querySelectorAll('.product');
        products.forEach(product => {
            const price = parseInt(product.querySelector('span:nth-child(2)').innerText.replace('Price: ₹', ''), 10);
            const quantity = parseInt(product.querySelector('.quantity').value, 10);
            totalAmount += price * quantity;
        });
        totalAmountSpan.innerText = totalAmount;
    };

    quantities.forEach(quantityInput => {
        quantityInput.addEventListener('input', updateTotalAmount);
    });

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', () => {
            const input = button.previousElementSibling;
            input.value = parseInt(input.value, 10) + 1;
            updateTotalAmount();
        });
    });


document.getElementById('pay-button').onclick = function(e) {
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    const totalAmount = parseInt(totalAmountSpan.innerText, 10) * 100; // Converting to paise

    var options = {
        "key": razorpay_KEY, // Enter the Key ID generated from the Dashboard
        "amount": totalAmount, // Amount is in currency subunits. Default currency is INR. Hence, 50000-> 50000 paise or ₹500.
        "currency": "INR",
        "name": "Sarsachic",
        "description": "Test Transaction",
        "handler": function (response) {
            // Call the server to verify the payment and send email
            fetch('/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    payment_id: response.razorpay_payment_id,
                    name: name,
                    email: email
                })
            }).then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Send email using SMTPJS
                    Email.send({
                        SecureToken: SMTP_SECURE_TOKEN,
                        To: email,
                        From: "your_email@gmail.com",
                        Subject: "Order Confirmation",
                        Body: `Hi ${name},<br><br>Thank you for your purchase! Your payment ID is ${response.razorpay_payment_id}. <br> Total cost:${totalAmount}<br>`
                    }).then(message => {
                        if (message === 'OK') {
                            window.location.href = 'success.html';
                            // alert('Payment successful and email sent');
                        } else {
                            alert('Payment successful but email not sent: ' + message);
                        }
                    });
                } else {
                    alert('Payment verification failed');
                }
            });
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
    e.preventDefault();
}
});