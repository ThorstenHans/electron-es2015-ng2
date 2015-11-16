(function(jQuery, $){
    'use strict';

    var App = ng.Component({
        selector: 'ng2-app',
        template: '<h1>Hey electron, this is ng2</h1>'
    })
    .Class({
        constructor: () => {
            
        }
    });

    document.addEventListener('DOMContentLoaded', () => {
        ng.bootstrap(App);
    });
})();