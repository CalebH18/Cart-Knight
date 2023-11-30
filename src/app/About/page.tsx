// pages/about.js
import React from 'react';

const AboutUs = () => {
  return (
    <div className="container mx-auto p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">About Our Secure E-commerce Website</h1>
      <p className="text-lg mb-6">
        Welcome to Lancelot, where we have crafted a secure and user-friendly online shopping
        experience from the ground up. Our commitment is to provide you with a safe and convenient platform for all
        your shopping needs.
      </p>

      <div className="text-left mb-8">
        <h2 className="text-2xl font-bold mb-3">Security is Our Top Priority</h2>
        <p className="text-lg mb-6">
          At Lancelot, we prioritize the security of your data and transactions. Our
          authentication and authorization system ensures that your information is protected. We use a secure payment
          gateway to handle credit card information with the utmost care.
        </p>

        <h2 className="text-2xl font-bold mb-3">Safe and Convenient Shopping</h2>
        <p className="text-lg mb-6">
          Enjoy a seamless shopping experience with our user-friendly interface and feature-rich shopping cart. We
          strive to make your online shopping journey as enjoyable and hassle-free as possible.
        </p>

        <h2 className="text-2xl font-bold mb-3">SSL Certificates and Encryption</h2>
        <p className="text-lg mb-6">
          Our commitment to security includes the use of SSL certificates and encryption protocols. This ensures that
          all data exchanged between you and our website is encrypted, adding an extra layer of protection to your
          information.
        </p>

        <h2 className="text-2xl font-bold mb-3">Your Security Matters</h2>
        <p className="text-lg mb-6">
          Lancelot is dedicated to providing a trustworthy platform. We continually update our
          security measures to stay ahead of emerging threats, offering you peace of mind during your shopping
          experience.
        </p>
      </div>

      <p className="text-lg">
        Thank you for choosing Lancelot. We appreciate your trust and look forward to serving
        you with a safe, secure, and user-friendly online shopping experience.
      </p>
    </div>
  );
};

export default AboutUs;

