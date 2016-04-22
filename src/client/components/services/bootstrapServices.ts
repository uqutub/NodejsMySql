import {provide} from 'angular2/core';

import {httpService} from './httpService'
import {authService} from './authService'

export var SERVICE_PROVIDER: Array<any> = [
    provide(httpService, { useClass: httpService }),
    provide(authService, { useClass: authService }),
];