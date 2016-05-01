import { bootstrap }    from 'angular2/platform/browser';
import { AppComponent } from './app.component';
import { Dispatcher } from './dispatcher/dispatcher';
// Rx operators
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/merge';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/combineLatest';
// Rx observable methods
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/never';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromArray';
import 'rxjs/add/observable/fromPromise';

bootstrap(AppComponent, [Dispatcher]);
