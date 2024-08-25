class CircuitBreaker {
  constructor(maxFailures, resetTimeout) {
    this.maxFailures = maxFailures;
    this.resetTimeout = resetTimeout;
    this.failures = 0;
    this.state = "CLOSED";
    this.resetTimer = null;
  }

  async execute(fn) {
    if (this.state === "OPEN") {
      throw new Error("Circuit breaker is open");
    }

    try {
      const result = await fn();
      this.reset();
      return result;
    } catch (error) {
      this.failures++;
      if (this.failures >= this.maxFailures) {
        this.openCircuit();
      }
      throw error;
    }
  }

  openCircuit() {
    this.state = "OPEN";
    this.resetTimer = setTimeout(() => this.reset(), this.resetTimeout);
  }

  reset() {
    this.failures = 0;
    this.state = "CLOSED";
    if (this.resetTimer) {
      clearTimeout(this.resetTimer);
      this.resetTimer = null;
    }
  }
}

module.exports = CircuitBreaker;
