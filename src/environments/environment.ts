// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCqAjD28F7L1xnGP4UHwYWvbGjAz3fzUHg',
    authDomain: 'web-app-test-86172.firebaseapp.com',
    databaseURL: 'https://web-app-test-86172.firebaseio.com',
    projectId: 'web-app-test-86172',
    storageBucket: 'web-app-test-86172.appspot.com',
    messagingSenderId: '292312699978'
  },
  fingerPrint: {
    // master: '#base64Key#',
    master: '#DS2L64K0y#',
    shadow: '#Oshx16lVa#'
  }
};
