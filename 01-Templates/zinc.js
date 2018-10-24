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
        const regEx = /{{\s*([\w.]+)\s*}}/g;

        const matches = markup.match(regEx);

        let completeMarkup = markup; // <-- Copy

        matches.forEach(match => {
            const temp1 = match.replace(/{{\W/g, '');
            const key = temp1.replace(/\W}}/g, '');
            completeMarkup = completeMarkup.replace(match, userObj[key] || '')
        })

        console.warn('completeMarkup', completeMarkup);

        userUl.insertAdjacentHTML('beforeend', completeMarkup);
    };

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);

})();

