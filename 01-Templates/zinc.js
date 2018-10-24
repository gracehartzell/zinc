'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {
        results.forEach(user => {
            const userObj = {
                photo: user.picture.large,
                firstName: user.name.first,
                lastName: user.name.last,
                city: user.location.city,
                state: user.location.state,
                email: user.email
            };
            renderTemplate(userObj);
        });
    };

    function renderTemplate(userObj) {
        let userUl = document.getElementById('z-user-list');

        const markup = `
          <li class="user">
            <img class="user-photo" src="{{ photo }}" alt="Photo of {{ firstName }} {{ lastName }}">
            <div class="user-name">{{ firstName }} {{ lastName }}</div>
            <div class="user-location">{{ city }}, {{ state }}</div>
            <div class="user-email">{{ email }}</div>
          </li>
        `
        const regEx = /{{\s*([\w.]+)\s*}}/g; // matches all '{{ x }}' patterns

        const matches = markup.match(regEx);

        let completeMarkup = markup; // <-- Copy of markup

        matches.forEach(match => { // find all instances that match the regex 
            const temp1 = match.replace(/{{\W/g, ''); // removing both opening brackets
            const key = temp1.replace(/\W}}/g, ''); // removing both closing brackets
            completeMarkup = completeMarkup.replace(match, userObj[key] || '') // apply leftover match to the userObj or leave it empty in case there's no input
        });

        userUl.insertAdjacentHTML('beforeend', completeMarkup); 
    };

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);

})();

