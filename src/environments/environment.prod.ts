import { truncate } from "fs-extra";

// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  // URL: 'http://192.168.94.102:8090/orb2/api',
   URL: 'https://orbapidev.cfapps.io/orb2/api',
  //  URL: 'https://orbapiqa.cfapps.io/orb2/api',
  // URL: 'http://192.168.94.142:8090/orb2/api/',
  ADFSURL : 'https://fd-usr-sso.login.sys-pcf02.cf.ford.com/oauth/authorize',
  RESOURCE : 'hhttps://orb2-ui-dev.apps-pcf02i.cf.ford.com',
  CLIENTID : 'c8282bab-4cde-43f9-a6fe-aced446d6a26',
   REDIRECTURI : 'https://www.orb.ford.com/adfs',
  production: false,
  loginneeded: true
};