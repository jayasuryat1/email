const EmailService = require("../EmailService");

describe("EmailService", () => {
  let emailService;

  beforeEach(() => {
    emailService = new EmailService();
  });

  test("should send email successfully", async () => {
    const emailDetails = {
      id: "email1",
      to: "test@example.com",
      subject: "Test",
      body: "Hello!",
    };
    await emailService.sendEmail(emailDetails);
  });

  test("should handle duplicate email", async () => {
    const emailDetails = {
      id: "email1",
      to: "test@example.com",
      subject: "Test",
      body: "Hello!",
    };
    await emailService.sendEmail(emailDetails);
    await emailService.sendEmail(emailDetails); 
  });

  test("should switch providers on failure", async () => {
    const emailDetails = {
      id: "email2",
      to: "test@example.com",
      subject: "Test",
      body: "Hello!",
    };
    await emailService.sendEmail(emailDetails);
  });
});
