class RateLimiter {
  constructor(maxRequests, interval) {
    this.maxRequests = maxRequests;
    this.interval = interval;
    this.requests = 0;
    this.queue = [];
    setInterval(() => this.processQueue(), this.interval);
  }

  async processQueue() {
    while (this.requests < this.maxRequests && this.queue.length > 0) {
      const { resolve, reject, fn } = this.queue.shift();
      this.requests++;
      try {
        const result = await fn();
        resolve(result);
      } catch (error) {
        reject(error);
      } finally {
        this.requests--;
      }
    }
  }

  async limit(fn) {
    return new Promise((resolve, reject) => {
      this.queue.push({ resolve, reject, fn });
    });
  }
}

module.exports = RateLimiter;
