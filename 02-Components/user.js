'use strict';

/* eslint-env browser */
/* globals Zinc */

(() => {
    
    fetch('https://randomuser.me/api/?results=5')
        .then(res => res.json())
        .then(json =>
            json.results.forEach(result => {
                Zinc.registerComponent('user-item', 'user', result)
            })
        );


    /*
        • Get the element
        • Get the template
        • Render template with data
        • Insert template into element
     */

})();