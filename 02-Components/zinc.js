'use strict';

/* eslint-env browser */

/*
    0. Zinc.registerComponent should use Zinc to register the component:
        • Identify the element name for insertion
        • template to use
        • where data is coming from
    
 */
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

    function renderComponents() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(res =>
                res.results.forEach(result => {
                    Zinc.registerComponent('user-item', 'user', result)
                })
            )
    }

    function init() {
        renderComponents();
    }

    document.addEventListener('DOMContentLoaded', init);

})();
