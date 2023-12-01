"use strict";

class Modals {
    #modalMapping = {};
    #modalOpenButtonMapping = [];
    #activeModal = "";

    constructor() {
        this.#modalMapping = [...document.getElementsByClassName("--modal")]
            .reduce((agg, element) => ({...agg, [element.id.split(":")[1]]: element}), {});
        this.#modalOpenButtonMapping = [...document.getElementsByClassName("--modal-open")];
        this.#activeModal = "bio-size";
    };

    get modalMapping() {
        return this.#modalMapping;
    }

    get modalOpenButtonMapping() {
        return [...this.#modalOpenButtonMapping];
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







