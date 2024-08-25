function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function retryWithExponentialBackoff(fn, retries = 5, delay = 1000) {
  let attempt = 0;
  while (attempt < retries) {
    try {
      return await fn();
    } catch (error) {
      attempt++;
      if (attempt === retries) throw error;
      await sleep(delay * 2 ** attempt);
    }
  }
}

module.exports = retryWithExponentialBackoff;
