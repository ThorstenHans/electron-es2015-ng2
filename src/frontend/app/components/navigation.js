export var Navigation = ng.Component({
        selector: 'navigation',
        templateUrl: 'app/components/navigation.html'
    })
    .Class({
        constructor: () => {

        },
        doCrash: () => {
            var ipc = require('ipc');
            ipc.send('crash');
            
        },
        toggleDevTools: () => {
            var ipc = require('ipc');
            ipc.send('toggleDevTools');
        }
    });