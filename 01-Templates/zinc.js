'use strict';

/* eslint-env browser */

/*
    0. The problem is loading an HTML file into the renderTemplate function so that
        the template will look the same but it will NOT be the index.html file 
        (instead will be the user.html). So the call for each new user list 
        will look like renderTemplate('user', user).
    1. In order to do this, you have to run a simple server 
        (used python -m SimpleHTTPServer, can also do `npm install -g lite-server`), otherwise you'll get a CORS error.
    2. Remove extraneous information (namely the template string since we don't
        need that anymore!) OR BETTER YET, REMOVE EVERYTHING!
    3. Add in a fetch to get the appropriate HTML file. 
        3a. Since we'll now be dealing with HTML and not the template string, 
            we need to make sure that all references to the template string are 
            instead referencing the HTML file. 
        3b. Instead of using the "normal"/usual method of response.json(), we 
            need to use the .text() method so that it converts the byte stream 
            into plain text which can then be parsed as HTML by the browser.
        3c. Once we have the HTML/data, we want to take that and apply it to the 
            template (this part is pretty much identical to what we did in part 3).

    4. REFACTORING NOTE: I ended up removing the populateList() because it became 
        somewhat unnecessary and I felt as though I could do the same thing with
        the same readability by putting what was in that function into the 
        renderTemplate function. 
*/

(() => {
    const userList = document.getElementById('z-user-list');

    function renderTemplate(template, users) {
        return fetch(`${template}.html`)
            .then(template => template.text())
            .then(template => {
            
              users.forEach((user) => {
                let renderedTemplate = template.replace(/\{\{\s*(.*?)\s*\}\}/g, 
                    (match, p1) => {
                        return p1.split('.').reduce((acc, curr) => acc[curr], user) || '';
                    });
                userList.insertAdjacentHTML('beforeend', renderedTemplate)
              });
            });
    };

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(data => renderTemplate('user', data.results));
    }

    document.addEventListener('DOMContentLoaded', init);

})();