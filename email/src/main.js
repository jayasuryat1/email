const EmailService = require('./EmailService');

const emailService = new EmailService();

const emailDetails = {
  id: 'email1',
  to: 'user@example.com',
  subject: 'Hello World',
  body: 'This is a test email.'
};

emailService.sendEmail(emailDetails);
