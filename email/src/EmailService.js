const MockEmailProviderA = require("./providers/MockEmailProviderA");
const MockEmailProviderB = require("./providers/MockEmailProviderB");
const retryWithExponentialBackoff = require("./utils/exponentialBackoff");
const RateLimiter = require("./utils/rateLimiter");
const CircuitBreaker = require("./utils/circuitBreaker");
const log = require("./utils/logger");
const Queue = require("./utils/queue");

class EmailService {
  constructor() {
    this.providers = [new MockEmailProviderA(), new MockEmailProviderB()];
    this.currentProviderIndex = 0;
    this.sentEmails = new Set(); // For idempotency
    this.rateLimiter = new RateLimiter(5, 10000); // 5 requests per 10 seconds
    this.circuitBreaker = new CircuitBreaker(3, 30000); // 3 failures, 30 seconds reset
    this.queue = new Queue();
  }

  async sendEmail(emailDetails) {
    if (this.sentEmails.has(emailDetails.id)) {
      log("Duplicate email detected, skipping...");
      return;
    }

    await this.queue.add(async () => {
      await this.rateLimiter.limit(async () => {
        try {
          await this.circuitBreaker.execute(async () => {
            await retryWithExponentialBackoff(() =>
              this.trySendEmail(emailDetails)
            );
          });
          this.sentEmails.add(emailDetails.id);
          log("Email sent successfully");
        } catch (error) {
          log("Failed to send email:", error.message);
        }
      });
    });
  }

  async trySendEmail(emailDetails) {
    try {
      const provider = this.providers[this.currentProviderIndex];
      await provider.sendEmail(emailDetails);
    } catch (error) {
      log(
        `Provider ${
          this.currentProviderIndex + 1
        } failed, switching providers...`
      );
      this.currentProviderIndex =
        (this.currentProviderIndex + 1) % this.providers.length;
      throw error;
    }
  }
}

module.exports = EmailService;
