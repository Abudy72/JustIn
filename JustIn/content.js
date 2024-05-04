async function scrapeText() {
    // const text = document.querySelectorAll('#app-container > section.bg-color-background-container.experience-container.py-2.pl-2.mt-1.collapsible-list-container.collapsed span');
    const job_title = document.querySelectorAll('#app-container > section.bg-color-background-container.experience-container.py-2.pl-2.mt-1.collapsible-list-container > ol, dt');
    job_title.forEach(element => {
        console.log(element.innerText);
    })
    // console.log(text);
}

window.addEventListener("load", scrapeText);