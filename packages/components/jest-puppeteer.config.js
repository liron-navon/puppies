// module.exports = {
//     launch: {
//       headless: true,
//       ignoreDefaultArgs: ["--disable-extensions"],
//       args: ["--no-sandbox"],
//     //   executablePath: "chrome.exe"
//     }
//   };

let options = {};

if(process.env.CI === 'true') {
    options = {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
        args: ['--use-gl=egl'],
    }
}

module.exports = options