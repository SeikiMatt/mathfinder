"use strict";

function mainInit() {
    const navigation = new Nav(
        Util.$(".--page"),
        Util.$(".--link"),
        "gear"
    )

    const modals = new Modals(
        [...document.getElementsByClassName("--modal")],
        [...document.getElementsByClassName("--modal-open")],
        ""
    )

    function initializeNavEvents() {
        navigation.linkMapping.forEach(element => {
            element.addEventListener("click", _ => navigation.switchPage(element.id.split(":")[1]))
        });
    }

    function initializeModalEvents() {
        modals.modalOpenButtonElements.forEach(element => {
            element.addEventListener("click", _ => {
                modals.activateModal(element.dataset.modalpath)
                navigation.disableAllPages()
            })
        })

        for (const key in modals.modalMapping) {
            modals.modalMapping[key].addEventListener("click", (event) => {
                if (
                    event.target.classList.contains("--modal") ||
                    event.target.classList.contains("--modal-closebutton")
                ) {
                    modals.deactivateModal()
                    navigation.enableActivePage()
                }
            })
        }
    }

    const fields = [...document.getElementsByClassName("--field field-number")]
    fields.forEach(node => Util.registerInputEvents(node, [Util.setupIntegerField]))

    initializeNavEvents();
    initializeModalEvents();

    navigation.switchPage("stats");
}