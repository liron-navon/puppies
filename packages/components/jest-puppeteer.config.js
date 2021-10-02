const port = process.env.PORT || 6006;

let options = {
    launch: {
        headless: true,
        args: process.env.CI ? [
          '--ignore-certificate-errors',
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-accelerated-2d-canvas',
          '--disable-gpu'
              ] : []
    },
    server: {
        command: `start-storybook -p ${port} --ci --quiet`,
        port: port,
      },
};

module.exports = options