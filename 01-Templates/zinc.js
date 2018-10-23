'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {

        for (let result in results) {
            const user = {
                photo: results[result].picture.large,
                firstName: results[result].name.first,
                lastName: results[result].name.last,
                city: results[result].location.city,
                state: results[result].location.state,
                email: results[result].email
            };
            renderTemplate(user);
        }
        console.log(results); // eslint-disable-line no-console
    }

    


    function renderTemplate(user) {
        let userUl = document.getElementById('z-user-list');

        const markup = `
          <li class="user">
            <img class="user-photo" src="${ user.photo }" alt="Photo of ${ user.firstName } ${ user.lastName }">
            <div class="user-name">${ user.firstName } ${ user.lastName }</div>
            <div class="user-location">${ user.city }, ${ user.state }</div>
            <div class="user-email">${ user.email }</div>
          </li>
        `
        userUl.insertAdjacentHTML('beforeend', markup);
    }


    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);


})();
