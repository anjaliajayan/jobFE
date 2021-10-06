// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

let serverURL:any;
if(typeof window!=undefined&&window.location.origin =='http://localhost:4200'){
  serverURL ='http://localhost:3000';
}else{
  serverURL =typeof window!=undefined&&window.location.origin;
}
export const environment = {
  hostname: 'localhost',
  herokuServerURL: typeof window!=undefined&&window.location.origin,
  serverURL:serverURL,
  socketURL: 'http://localhost:3000'
  };
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
