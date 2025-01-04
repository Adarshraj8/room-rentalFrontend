import React, { useState } from 'react';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch("http://localhost:1000/api/feedback", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            const result = await response.text(); // or `response.json()` if the backend sends a JSON response
            alert('Feedback submitted successfully: ' + result);
          } else {
            alert('Error submitting feedback');
          }
        } catch (error) {
          console.error('Error:', error);
          alert('Error submitting feedback');
        }
      };

    return (
        <div className="contact-us-container">
          <div className='contact-us'>
            <h1>Contact Us</h1>
           <form onSubmit={handleSubmit}>
         <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button className='btn' type="submit">Submit</button>
    </form>
        </div>
        </div>
    );
};

export default ContactUs;
