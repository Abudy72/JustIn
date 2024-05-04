document.addEventListener('DOMContentLoaded', function() {
    var tab = document.getElementById('expandable-tab');

    tab.addEventListener('click', function() {
        tab.classList.toggle('hidden');
    });
});
