"use strict";

class Nav {
    #pageMapping = {};
    #linkMapping = {};
    #activePage = "";

    constructor(pageElements, linkElements, activePage) {
        this.#pageMapping = Util.nodeArrayToObject(pageElements);
        this.#linkMapping = linkElements;
        this.#activePage = activePage;
    }

    get pageMapping() {
        return [...this.#pageMapping];
    }

    get linkMapping() {
        return [...this.#linkMapping];
    }

    get activePage() {
        return this.#activePage;
    }

    switchPage(pageName) {
        this.hidePage(this.#activePage)
        this.disablePage(this.#activePage)

        this.showPage(pageName)
        this.enablePage(pageName)

        this.#activePage = pageName;
    }

    hidePage(page) {
        this.#pageMapping[page].classList.add("hidden");
    }

    showPage(page) {
        this.#pageMapping[page].classList.remove("hidden");
    }

    disableAllPages() {
        for (const key in this.#pageMapping) {
            this.#pageMapping[key].setAttribute("disabled", "disabled");
        }
    }

    disablePage(page) {
        this.#pageMapping[page].setAttribute("disabled", "disabled");
    }

    enablePage(page) {
        this.#pageMapping[page].removeAttribute("disabled");
    }

    enableActivePage (){
        this.#pageMapping[this.#activePage].removeAttribute("disabled");
    }
}

// TODO make nav default to first page and button in map
// TODO check for key and length mismatches between page map and button map