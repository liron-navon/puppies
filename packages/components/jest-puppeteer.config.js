const port = process.env.PORT || 6006;

let options = {
    headless: true,
    args: ["--no-sandbox"],
    server: {
        command: `start-storybook -p ${port} --ci --quiet`,
        port: port,
      },
};

module.exports = options