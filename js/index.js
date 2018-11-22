(function () {
    'use strict';

    let sidebarTrigger     = document.querySelectorAll('.sidebar-toggle'),
        app                = document.querySelector('.app'),
        dropdownToggle     = document.querySelector('.dropdown-toggle'),
        dropdown           = document.querySelector('.dropdown'),
        dropdownToggleUser = document.querySelector('.dropdown-toggle-usr'),
        dropdownUser       = document.querySelector('.dropdown-usr'),
        readMore           = document.querySelector('.read-more'),
        plantInfo          = document.querySelector('.plant-information');

    //Toggle Sidebar
    for (let i = 0; i < sidebarTrigger.length; i++) {
        sidebarTrigger[i].addEventListener('click', function () {
            app.classList.toggle('sidebar-open');
        });
    }

    //Toggle Dropdown
    dropdownToggle.addEventListener('click', function () {
        dropdown.classList.toggle('is-open');
    });

    //Toggle Dropdown User
    dropdownToggleUser.addEventListener('click', function () {
        dropdownUser.classList.toggle('is-open');
    });

    //Toggle Read More
    readMore.addEventListener('click', function () {
        if (plantInfo.classList.contains('short')) {
            plantInfo.style.maxHeight = '100%';
            readMore.innerHTML        = 'Read Less';
            plantInfo.classList.remove('short');
        } else {
            plantInfo.classList.add('short');
            plantInfo.style.maxHeight = '100px';
            readMore.innerHTML        = 'Read More';
        }
    });

})();
