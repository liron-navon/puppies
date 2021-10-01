const port = process.env.PORT || 6006;

let options = {
    launch: {
        headless: true
    },
    server: {
        command: `start-storybook -p ${port} --ci --quiet`,
        port: port,
      }
};

if(process.env.CI === 'true') {
    options.launch.args = [
        '--ignore-certificate-errors',
              '--no-sandbox',
              '--disable-setuid-sandbox',
              '--disable-accelerated-2d-canvas',
              '--disable-gpu'
    ]
}

module.exports = options