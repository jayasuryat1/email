class MockEmailProviderA {
  async sendEmail(emailDetails) {
    console.log("MockEmailProviderA: Sending email...");
    if (Math.random() > 0.5) {
      return { success: true };
    } else {
      throw new Error("Provider A failed");
    }
  }
}

module.exports = MockEmailProviderA;
