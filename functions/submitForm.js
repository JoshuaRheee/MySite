// Import the SendGrid library
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.handler = async (event, context) => {
  try {

    console.log('Raw Request Body:', event.body);
    const params = new URLSearchParams(event.body);
    const name = params.get('name');
    const email = params.get('email');
    const subject = params.get('subject');
    const message = params.get('message');

    
    const msg = {
      to: 'jungurhee@gmail.com',
      from: email,
      subject: subject,
      text: message,
    };

    // Send the email using SendGrid
    await sgMail.send(msg);

    // Return a success response
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Form submitted successfully' }),
    };
  } catch (error) {
    // Handle errors and return an error response
    console.error('Error sending email:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};
