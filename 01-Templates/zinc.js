'use strict';

/* eslint-env browser */

(() => {

    const userTemplate = 
      `<li class="user">
        <img class="user-photo" src="{{ picture.large }}" 
            alt="Photo of {{ name.first }} {{ name.last }}">
        <div class="user-name">{{ name.first }} {{ name.last }}</div>
        <div class="user-location">{{ location.city }}, {{ location.state }}</div>
        <div class="user-email">{{ email }}</div>
      </li>`

    function renderTemplate(templateString, data) {
        return templateString.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (match, p1) => 
            p1.split('.').reduce((acc, curr) => acc[curr], data)
        );
    }

    /*
    renderTemplate explained:
    0. The regex that I used will work; however, when there is a variable name with a 
        non-alphanumeric character, it won't capture it. The better way to do it to 
        fully capture the group would be: (/\{\{\s*(.*?)\s*\}\}/g).
    1. p1 is the captured group (words) within the regex (aka the words)
    2. split('.') returns an array of the values within p1 
        (e.g. p1 = picture.large returns ['picture', 'large'])
    3. reduce is used to apply the function to each element in the array to reduce it to a 
        single value and return something new. This array will give the keys for the 
        object to be applied to the returned data. If the desired data is nested, the 
        function will be able to grab the second keys to get further into the object.
            3a. Passing data in as the starting point for the function. 
            3b. Example case if item were name.first -> 
                The split('.') would first break it into ['name', 'first']
                next, reduce would take over and produce:
                _________acc__|__curr___
                        data  | 'name'
                   data.name  | 'first'
             data.name.first  |  --

    */

    function populateList(results) {

        const userList = document.getElementById('z-user-list');

        results.forEach((user) => {
            const html = renderTemplate(userTemplate, user);
            userList.insertAdjacentHTML('beforeend', html);
        });
    };

    function init() {
        fetch('https://randomuser.me/api/?results=5')
            .then(res => res.json())
            .then(json => populateList(json.results));
    }

    document.addEventListener('DOMContentLoaded', init);

})();

