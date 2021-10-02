const ci = Boolean(process.env.CI || false);

let options = {
    launch: {
        headless: true,
        args: ci ? [
          '--ignore-certificate-errors',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu'
              ] : []
    }
};

module.exports = options