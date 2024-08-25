class MockEmailProviderB {
  async sendEmail(emailDetails) {
    console.log("MockEmailProviderB: Sending email...");
    if (Math.random() > 0.5) {
      return { success: true };
    } else {
      throw new Error("Provider B failed");
    }
  }
}

module.exports = MockEmailProviderB;
