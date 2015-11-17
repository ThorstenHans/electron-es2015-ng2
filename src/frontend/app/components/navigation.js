export var Navigation = ng.Component({
        selector: 'navigation',
        templateUrl: 'app/components/navigation.html'
    })
    .Class({
        constructor: () => {

        },
        doCrash: () => {
            
            
        },
        toggleDevTools: () => {
            var ipc = require('ipc');
            ipc.send('toggleDevTools');
        }
    });