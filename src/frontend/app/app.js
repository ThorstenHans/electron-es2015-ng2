(function(jQuery, $){
    'use strict';

    var App = ng.Component({
        selector: 'ng2-app',
        template: `<h1>Hey electron, this is ng2</h1>
            <button (click)="doCrash()">Send crash</button>
        `
    })
    .Class({
        constructor: () => {
            
        },
        doCrash: () => {
            var ipc = require('ipc');
            ipc.send('crash', 'Something bad happened...');
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        ng.bootstrap(App);
    });
})();