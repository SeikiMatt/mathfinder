"use strict";

function templateFromHTML(html, trim = true) {
    // https://stackoverflow.com/questions/494143/creating-a-new-dom-element-from-an-html-string-using-built-in-dom-methods-or-pro/35385518#35385518
    html = trim ? html : html.trim();
    if (!html) return null;

    const template = document.createElement('template');
    template.innerHTML = html;
    const result = template.content.children;

    if (result.length === 1) return result[0];
    return result;
}

function replaceElement(before, after) {
    before.parentNode.replaceChild(after, before);
}

const elementsToReplace = [...document.getElementsByClassName("--component-insertion")];
const componentHTML = elementsToReplace.map(
    async e => {
        const pageName = e.id.split(":")[1]
        return (await fetch(`/src/page/${pageName}.html`)).text()
    }
);

Promise.all(componentHTML).then(componentPromises => {
    const templates = componentPromises.map(entry => templateFromHTML(entry))
    // As far as I can tell this order is guaranteed by the document order of elementsToReplace
    for (let i = 0; i < templates.length; i++)
        replaceElement(elementsToReplace[i], templates[i])

    initializeApp()
})