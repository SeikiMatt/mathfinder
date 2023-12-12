"use strict";

const pagesLoaded = new EventEmitter()

function mainInit() {
    const navigation = new Nav(
        Util.$(".--page"),
        Util.$(".--link"),
        "gear"
    )

    const modals = new Modals(
        Util.$(".--modal"),
        Util.$(".--modal-open"),
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
                modals.activateModal(element.id.split(":")[1])
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

    initializeNavEvents();
    initializeModalEvents();

    navigation.switchPage("stats");
}

pagesLoaded.subscribe(mainInit)