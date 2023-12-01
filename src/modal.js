"use strict";

class Modals {
    #modalMapping = {};
    #modalOpenButtonElements = [];
    #activeModal = "";

    constructor(modalElements, modalOpenButtonElements) {
        this.#modalMapping = modalElements
            .reduce((agg, element) => ({...agg, [element.id.split(":")[1]]: element}), {});
        this.#modalOpenButtonElements = modalOpenButtonElements;
        this.#activeModal = "bio-size";
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
        this.#modalMapping[this.#activeModal].classList.remove("active")
        this.#modalMapping[id].classList.add("active")

        this.#activeModal = id;
    }

    deactivateModal() {
        this.#modalMapping[this.#activeModal].classList.remove("active")
    }
}







