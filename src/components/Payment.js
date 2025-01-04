import { useState } from "react";
import { useParams } from "react-router-dom";
const Payme = () => {
  const [amount, setAmount] = useState("");
  const { roomId } = useParams();
  console.log(roomId);
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please Enter Valid Amount");
      return;
    }

    try {
      const isLoaded = await loadRazorpay();
      if (!isLoaded) {
        alert("Failed to load Razorpay SDK. Please check your connection.");
        return;
      }

      // Call backend to create the Razorpay order
      const response = await fetch("http://localhost:1000/user/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount ,roomId}),
      });

      if (!response.ok) {
        throw new Error("Failed to create order");
      }

      const orderData = await response.json();
      console.log("Order Created:", orderData);

      // Initiate Razorpay Checkout
      const options = {
        key: "rzp_test_Ap6fHdjsJE18Ka", // Replace with your Razorpay API Key
        amount: orderData.amount, // Amount in paise (from Razorpay order)
        currency: "INR",
        name: "Room Service",
        description: "Transaction",
        image: "https://www.shutterstock.com/shutterstock/photos/2235945743/display_1500/stock-vector-for-rent-sign-on-white-background-2235945743.jpg", // Optional
        order_id: orderData.id, // Razorpay Order ID
        handler: function (response) {
          if (
            response.razorpay_payment_id &&
            response.razorpay_order_id &&
            response.razorpay_signature
          ) {
            console.log("Payment ID:", response.razorpay_payment_id);
            console.log("Order ID:", response.razorpay_order_id);
            console.log("Signature:", response.razorpay_signature);
            updatePaymentOnServer(response.razorpay_payment_id,
                response.razorpay_order_id,
                "paid"
            );
            // alert("Payment Successful!");
            Swal.fire({
                title: 'Success!',
                text: 'Your payment was successful.',
                icon: 'success',
                confirmButtonText: 'OK',
              });
              
          } else {
            console.error("Missing Razorpay response fields");
            alert("Payment information is incomplete. Please contact support.");
            Swal.fire({
                title: 'Failed!',
                text: 'Your payment was unsuccessful.',
                icon: 'error',
                confirmButtonText: 'OK',
              });
              
              
          }
        },
        prefill: {
          name: "Your Name", // Optional
          email: "your-email@example.com", // Optional
          contact: "9876543210", // Optional
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error in Payment:", error);
      alert("An error occurred. Please try again.");
    }
  };

 const updatePaymentOnServer= async (paymentId, orderId, status)=>{
   try{
     const response = await fetch("http://localhost:1000/user/update-payment",{
        method:"POST",
        headers:{ "Content-Type": "application/json" },
        body: JSON.stringify({
            paymentId,
            orderId,
            status,
          }),
     });

    if (!response.ok) {
        throw new Error("Failed to update payment on server");
      }
  
      const result = await response.json();
      console.log("Payment status updated on server:", result);
   }
   catch(error){

   }
 };
  return (
    <div className="pay_us">
      <h3 className="my-3">Book Room</h3>
      <input
        type="text"
        className="form-control my-2"
        placeholder="Enter Amount Here"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <div className="container text-center">
        <button className="btn btn-success" onClick={handlePayment}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Payme;
