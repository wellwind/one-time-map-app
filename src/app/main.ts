// this import should be first in order to load some required settings (like globals and reflect-metadata)
import { platformNativeScriptDynamic } from 'nativescript-angular/platform';
import { AppModule } from './app.module';
import * as platform from 'platform';
const googleMapsApiConfig = require('./google-maps-api-config.json');

declare var GMSServices: any;

if (platform.isIOS) {
  GMSServices.provideAPIKey(googleMapsApiConfig.apiKey);
}

platformNativeScriptDynamic().bootstrapModule(AppModule);
