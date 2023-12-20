"use strict";

class Modals {
    #modalMapping = {};
    #modalOpenButtonElements = [];
    #activeModal = "";

    constructor(modalElements, modalOpenButtonElements, activeModal) {
        this.#modalMapping = modalElements.reduce((agg, element) => ({
            ...agg,
            [element.dataset.modalpath]: element
        }), {})
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
        if (this.#activeModal) {
            this.#modalMapping[this.#activeModal].classList.remove("active")
            this.#modalMapping[this.#activeModal].setAttribute("disabled", "disabled");
        }

        this.#modalMapping[id].classList.add("active")
        this.#modalMapping[id].removeAttribute("disabled");

        this.#activeModal = id;
    }

    deactivateModal() {
        this.#modalMapping[this.#activeModal].classList.remove("active")
        this.#modalMapping[this.#activeModal].setAttribute("disabled", "disabled");
    }
}







