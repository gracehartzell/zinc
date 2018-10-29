'use strict';

/* eslint-env browser */

const Zinc = {};

(() => {

    Zinc.registerComponent = function (elementName, templateFile, dataObject) {
        let element = document.querySelector(elementName);

        renderTemplate(templateFile, dataObject)
            .then((result) => {
                element.insertAdjacentHTML('beforeend', result)
            });

    }

    function renderTemplate(templateFile, dataObject) {
        return fetch(`${templateFile}.html`)
            .then(res => res.text())
            .then(template =>  
                template.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, p1) =>
                    p1.split('.').reduce((acc, curr) => acc[curr], dataObject) || '' ));
    }

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(res =>
                res.results.forEach(result => {
                    Zinc.registerComponent('user-item', 'user', result)
                })
            )
    }

    document.addEventListener('DOMContentLoaded', init);

})();
