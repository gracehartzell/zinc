'use strict';

/* eslint-env browser */

/*
    0. Zinc.registerComponent should use Zinc to register the component:
        • Identify the element name for insertion
        • template to use
        • where data is coming from
        ** Take teh stuff you've given me and remember it
    1. (Zinc._components) -> Want to create a registry of all of the components 
        so we can use it later on. Keeping the registry 
    2. init needs to get all of the keys from registerComponent so that it can
        search for all of the things

    ***** ONLY DATA-RELATED THINGS IN THE USER.JS FILE ***** 

    
 */
const Zinc = {
    components: {}
};

(() => {

    function renderTemplate(templateFile, dataObject) { // returns a promise 
        return fetch(`${templateFile}.html`)
            .then(res => res.text())
            .then(template =>
                template.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, p1) =>
                    p1.split('.').reduce((acc, curr) => acc[curr], dataObject) || ''));
    }

    function renderComponent(element, templateFile, dataObject) {
        const nodeList = document.querySelectorAll(element);

        nodeList.forEach(node => 
            renderTemplate(templateFile, dataObject)
                .then(html => node.insertAdjacentHTML('beforeend', html)) 
        );
    }

    Zinc.registerComponent = function (elementName, templateFile, dataObject, controller) {
        Zinc.components[elementName] = {
            elementName,
            templateFile,
            dataObject,
            controller
        };
        renderComponent(elementName, templateFile, dataObject);
    }

    // function renderComponents() {
    //     Object.values(Zinc.components).forEach((component) => {
    //         renderComponent(component.elementName, component.templateFile, component.dataObject);
    //     });
    // }

    function init() {
        renderComponent();
    }

    document.addEventListener('DOMContentLoaded', init);

})();
