/// <reference path="../../../node_modules/angular2/typings/browser.d.ts"/>

import { bootstrap } from "angular2/platform/browser" ;
import { HTTP_PROVIDERS } from "angular2/http";
import { SERVICE_PROVIDER } from "./services/bootstrapServices"

import {AppComponent} from './app/app'

bootstrap(AppComponent, [
    HTTP_PROVIDERS,
    SERVICE_PROVIDER
]);