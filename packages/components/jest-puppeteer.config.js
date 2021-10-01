let options = {
    headless: true,
    args: ["--no-sandbox"],
    server: {
        command: 'yarn start:ci',
        port: 6006,
      },
};

module.exports = options