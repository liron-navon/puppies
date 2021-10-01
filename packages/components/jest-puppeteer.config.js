let options = {};

if(process.env.CI === 'true') {
    options = {
        headless: true,
        args: ["--no-sandbox"],
    }
}

module.exports = options