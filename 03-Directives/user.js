'use strict';

/* eslint-env browser */
/* globals Zinc */

(() => {
    function userController() {
        this.addEventListener('click', () => {
            this.classList.toggle('hilight');
            this.$state.hilit = !this.$state.hilit;
        });
    }

    Zinc.registerComponent({
        name: 'user-list',
        templateFile: 'user-list',
        controller: userController
    });
    Zinc.registerComponent({
        name: 'user-info',
        templateFile: 'user-item'
    });

    Zinc.renderComponents();

    // fetch('https://randomuser.me/api/?results=5')
    //     .then(res => res.json())
    //     .then(json => populateList(json.results));
})();
