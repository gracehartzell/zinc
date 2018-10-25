'use strict';

/* eslint-env browser */

/*
    0. To start off, this is extremely similar to the 4th part of templates
        a. Use the user.js file for things you want on the page and 
           this file (zinc.js) for anything you want to reuse, so put all of 
           the rendering and work into this one. I think?
        b. We still want to use the user.html file and in it, we need to do 
           the same extraction that we'd done with the previous exercise. 
           In order to do this, we need to add in the renderTemplate function
           that we've already created.
    1. Element is 'user-item' (you can see that on the index.html page), content
         is 'user' (AKA the template file, just like how we did it earlier). 
*/


const Zinc = {};

(() => {
    const userData = {
        picture: {
            thumbnail: 'https://f4.bcbits.com/img/0001142378_10.jpg'
        },
        name: {
            first: 'Jack',
            last: 'Burton'
        },
        location: {
            city: 'San Francisco',
            state: 'CA'
        },
        email: 'jack.burton@example.com'
    };

    function renderComponent(element, templateFile, data) {

        return fetch(`${templateFile}.html`)
        .then(res => res.text())
        .then(template => {
            const el = document.querySelector(element);
            
            let renderedTemplate = template.replace(/\{\{\s*(.*?)\s*\}\}/g, 
                (match, p1) => {
                    return p1.split('.').reduce((acc, curr) => acc[curr], data) || '';
                });
            
            el.insertAdjacentHTML('beforeend', renderedTemplate)

        });
    };
    
    function init() {
        renderComponent('user-item', 'user', userData);
    }

    document.addEventListener('DOMContentLoaded', init);
})();
