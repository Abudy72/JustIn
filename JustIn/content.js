async function scrapeText() {
    function experiences() {
        const experiences = document.querySelectorAll('#app-container > section.bg-color-background-container.experience-container.py-2.pl-2.mt-1.collapsible-list-container.collapsed > ol > li')
        experiences.forEach(element => {
            console.log(element.innerText.trim().replace(/\s/g, " "));
        });
    }
    experiences();
}

window.addEventListener("load", scrapeText);