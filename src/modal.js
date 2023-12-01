"use strict";

class Modals {
    #modalMapping = {};
    #modalOpenButtonElements = [];
    #activeModal = "";

    constructor(modalElements, modalOpenButtonElements, activeModal) {
        this.#modalMapping = Util.nodeArrayToObject(modalElements)
        this.#modalOpenButtonElements = modalOpenButtonElements;
        this.#activeModal = activeModal;
    };

    get modalMapping() {
        return this.#modalMapping;
    }

    get modalOpenButtonElements() {
        return [...this.#modalOpenButtonElements];
    }

    get activeModal() {
        return this.#activeModal;
    }

    activateModal(id) {
        if(this.#activeModal)
            this.#modalMapping[this.#activeModal].classList.remove("active")

        this.#modalMapping[id].classList.add("active")

        this.#activeModal = id;
    }

    deactivateModal() {
        this.#modalMapping[this.#activeModal].classList.remove("active")
    }
}







