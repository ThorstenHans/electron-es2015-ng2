import {Navigation} from 'components/navigation';

export var App = ng.Component({
    selector: 'approot',
    directives: [Navigation],
    templateUrl: 'app/app.html'
})
.Class({
    constructor: () => {
    },
    doCrash: () => {
        var ipc = require('ipc');
        ipc.send('crash', 'Something bad happened...');
    }
});

export function main(){

    ng.bootstrap(App);
}
