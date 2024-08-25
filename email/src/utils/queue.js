class Queue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async add(task) {
    this.queue.push(task);
    if (!this.processing) {
      this.processing = true;
      await this.processQueue();
      this.processing = false;
    }
  }

  async processQueue() {
    while (this.queue.length > 0) {
      const task = this.queue.shift();
      try {
        await task();
      } catch (error) {
        console.error("Task failed:", error);
      }
    }
  }
}

module.exports = Queue;
