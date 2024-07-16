# My Email
A Simple UI for Sending Emails via EmailJS API

This project provides a user-friendly interface connected to the EmailJS API, enabling you to send emails to your email lists. These lists can be conveniently added through Excel files.

## Steps to Get Started:
Create an Account:

Register at emailjs.com.
Set Up a Service and Template:

Follow the documentation on EmailJS to create a service and email template.
Download the Project:

Clone or download the project repository.
Configure Environment Variables:

In the .env file, add the following:
env
Kopiera kod
EMAILJS_PUBLIC_KEY="[your public key]"
EMAILJS_TEMPLATE_ID="[your template ID]"
EMAILJS_SERVICE_ID="[your service ID]"
Create a List:

Generate an email list.
Add Emails:

Populate the email list manually or by importing an Excel file.
Select List and Send:

Choose your email list and initiate the email sending process.
Sending Process:

Emails are sent every 3 seconds. Ensure the process is complete before closing the application.
Running the Project Locally
You can run the project locally on your machine without the need for a hosting company. Follow these steps:

Install Dependencies:

Navigate to the project directory and run:
bash
Kopiera kod
npm install
Start the Project:

Start the project by running:
bash
Kopiera kod
npm start
Access the Application:

Open your web browser and go to:
arduino
Kopiera kod
http://localhost:3000
This project streamlines the process of sending emails, making it efficient and easy to manage your email campaigns.






