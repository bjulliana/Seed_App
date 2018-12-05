(function () {
    'use strict';

    let inputArea = document.querySelectorAll('.input-field');

    //Check for not-empty Field for Floating Label
    for (let i = 0; i < inputArea.length; i++) {
        inputArea[i].addEventListener('keyup', function () {
            if (inputArea[i].value.length > 0) {
                inputArea[i].classList.add('not-empty');
            } else {
                inputArea[i].classList.remove('not-empty');
            }
        });
    }

    for (let i = 0; i < inputArea.length; i++) {
        inputArea[i].addEventListener('keyup', function () {
            if (inputArea[i].value.length > 0) {
                inputArea[i].classList.add('not-empty');
            } else {
                inputArea[i].classList.remove('not-empty');
            }
        });
    }
})();