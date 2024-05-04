async function scrapeText() {
    function experiences() {
        const experiences = document.querySelectorAll('#app-container > section.bg-color-background-container.experience-container.py-2.pl-2.mt-1.collapsible-list-container.collapsed > ol > li');
        // const experiences = document.querySelectorAll('span');
        experiences.forEach(element => {
            console.log(element.innerText.trim().replace(/\s/g, " "));
        });
    }
    function education() {
        const education = document.querySelectorAll('#app-container > section.bg-color-background-container.education-container.py-2.pl-2.mt-1.collapsible-list-container > ol > li');
        // const experiences = document.querySelectorAll('span');
        education.forEach(element => {
            console.log(element.innerText.trim().replace(/\s/g, " "));
        });
    }
    experiences();
    education();
}

window.addEventListener("load", scrapeText);