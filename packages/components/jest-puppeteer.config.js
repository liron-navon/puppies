// module.exports = {
//     launch: {
//       headless: true,
//       ignoreDefaultArgs: ["--disable-extensions"],
//       args: ["--no-sandbox"],
//     //   executablePath: "chrome.exe"
//     }
//   };

  module.exports = {
    launch: {
      dumpio: true,
      headless: true
    },
    browser: 'chromium',
    // browserContext: 'default',
    // server: {
    //   command: `npm start`,
    //   port: 3000,
    //   launchTimeout: 10000,
    //   debug: true,
    // },
  }