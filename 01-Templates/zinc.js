'use strict';

/* eslint-env browser */

(() => {
    function populateList(results) {

        const container = document.createElement('div');
        document.body.appendChild(container);
        container.setAttribute('class', 'container');
       
        const h1 = document.createElement('h1');
        container.appendChild(h1);
        h1.innerHTML = 'User List';

        const userUl = document.createElement('ul');
        container.appendChild(userUl);
        userUl.setAttribute('id', 'z-user-list');
        
        for (let result in results) {

            const newUser = document.createElement('li');
            newUser.setAttribute('class', 'user');
            userUl.appendChild(newUser);
    
            const userPhoto = document.createElement('img');
            userPhoto.setAttribute('class', 'user-photo');
            userPhoto.setAttribute('src', results[result].picture.large)
            newUser.appendChild(userPhoto);
    
            const userName = document.createElement('div');
            userName.setAttribute('class', 'user-name');
            userName.innerHTML = `${results[result].name.first} ${results[result].name.last}`
            newUser.appendChild(userName);
    
            const userLocation = document.createElement('div');
            userLocation.setAttribute('class', 'user-location');
            userLocation.innerHTML = `${results[result].location.city}, ${results[result].location.state}`
            newUser.appendChild(userLocation);
    
            const userEmail = document.createElement('div');
            userEmail.setAttribute('class', 'user-email');
            userEmail.innerHTML = `${results[result].email}`
            newUser.appendChild(userEmail);
        }

        console.log(results); // eslint-disable-line no-console
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);


})();
