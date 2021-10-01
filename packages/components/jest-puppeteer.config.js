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
        headless: true
    }
}

module.exports = options