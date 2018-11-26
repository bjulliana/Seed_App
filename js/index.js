(function () {
    'use strict';

    let sidebarTrigger     = document.querySelectorAll('.sidebar-toggle'),
        app                = document.querySelector('.app'),
        dropdownToggle     = document.querySelector('.dropdown-toggle'),
        dropdown           = document.querySelector('.dropdown'),
        dropdownToggleUser = document.querySelector('.dropdown-toggle-usr'),
        dropdownUser       = document.querySelector('.dropdown-usr'),
        readMore           = document.querySelector('.read-more'),
        plantInfo          = document.querySelector('.plant-information'),
        weatherCard        = document.querySelector('.weather-card'),
        frontCard          = document.querySelector('.weather-front'),
        backCard           = document.querySelector('.weather-back');

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

    //Toggle Dropdown
    weatherCard.addEventListener('click', function () {
        if (frontCard.classList.contains('active')) {
            console.log('clicked');
            frontCard.classList.remove('active');
            backCard.classList.add('active');
        } else if (!frontCard.classList.contains('active')) {
            frontCard.classList.add('active');
            backCard.classList.remove('active');
        }
    });

    //Toggle Read More
    if(readMore) {
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
    }


})();
