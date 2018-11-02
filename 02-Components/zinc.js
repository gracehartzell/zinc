'use strict';

/* eslint-env browser */

/*
    0. We want to add a controller to be able to manipulate the behavior of an item within the 
    user file; therefore, the actual specs (adding the event listener, etc.) of the controller 
    must go into the user.js file.
    1. renderTemplate doesn't need to change since there isn't anything that we're doing to 
    change how we render the template/ prepare it for insertion
    2. renderComponent:
        • const el -> doc.firstChild will just give the body of the list item (outer part, nothing
        on the inside of it.)
    3. Extras: 
        • adding the `Zinc.` in front of function names makes it accessible to the global 
        Zinc object. This should be done sparingly since you aren't always going to want to 
        have all functions accessible to everyone in the 'outside world'.
        • Left in a couple of console.logs just to keep in the notes for later. ** I KNOW that 
        this is not a good practice to do ** 



 */
const Zinc = {
    components: {}
};

(() => {
    const domParser = new DOMParser();

    function renderTemplate(templateFile, data) { // returns a promise 
        console.log(`rendering template`)
        return fetch(`${templateFile}.html`)
            .then(res => res.text())
            .then(template => template.replace(/\{\{\s*(.*?)\s*\}\}/g, (match, p1) =>
                p1.split('.').reduce((acc, curr) => acc[curr], data) || ''));
    }

    Zinc.renderComponent = (componentName) => {
        const component = Zinc.components[componentName];
        const nodeList = document.querySelectorAll(componentName);

        nodeList.forEach((node) => {
            renderTemplate(component.templateFile, component.data)
            console.log(`in this render function`)
                .then((html) => {
                    console.log(typeof html) // need to convert string to DOM HTML element
                    const doc = domParser.parseFromString(html, 'text/html'); // converting HTML string to "proper" HTML
                    const element = node.insertAdjacentElement('beforeend', doc.firstChild.children[1].firstChild);
                    element.$state = {};
                    if (component.controller) {
                        element.$controller = component.controller;
                        element.$controller();
                    }
                    Zinc.components[componentName].element = element;
                });
        });
    }

    Zinc.renderComponents = () => {
        Object.values(Zinc.components).forEach((component) => {
            Zinc.renderComponent(component.componentName);
        });
    };

    Zinc.registerComponent = ({
        componentName,
        templateFile,
        data,
        controller
    }) => {
        Zinc.components[componentName] = {
            componentName,
            templateFile,
            data,
            controller
        };
    };

    function init() {
        Zinc.renderComponents();
    }

    document.addEventListener('DOMContentLoaded', init);

})();