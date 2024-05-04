async function scrapeText() {
    function selectText(selector) {
        const experiences = document.querySelectorAll(selector);
        experiences.forEach(element => {
            console.log(element.innerText.trim().replace(/\s/g, " "));
        });
    }
    // experiences
    console.log("experiences");
    selectText('#app-container > section.bg-color-background-container.experience-container.py-2.pl-2.mt-1.collapsible-list-container.collapsed > ol > li');
    // education
    console.log("education");
    selectText('#app-container > section.bg-color-background-container.education-container.py-2.pl-2.mt-1.collapsible-list-container > ol > li');
    // activity
    console.log("activity");
    selectText('#app-container > section.activity-section.bg-color-background-container.mt-1');
    // about
    console.log("about");
    selectText('#app-container > section.relative.about-section.bg-color-background-container.p-2.pr-0.mt-1');
}

window.addEventListener("load", scrapeText);