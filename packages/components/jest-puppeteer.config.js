// module.exports = {
//     launch: {
//       headless: true,
//       ignoreDefaultArgs: ["--disable-extensions"],
//       args: ["--no-sandbox"],
//     //   executablePath: "chrome.exe"
//     }
//   };

let options = {};

// if(process.env.CI === 'true') {
//     options.browser = 'chromium'
//     options.launch = {
//         headless: true,
//         args: ["--no-sandbox"],
//         // executablePath: '/usr/bin/chromium-browser'
//     }
// }

module.exports = options