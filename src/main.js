"use strict";

function initializeApp() {
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

    function initializeFieldEvents(className) {
        [...document.getElementsByClassName(className)].forEach(e => {
            const path = e.id.split(":")[1].split("-")
            const field = Util.traverseObjectKeys(modelCharacterSheet.data, path);

            if (field.isReference)
                field.initialize(modelCharacterSheet)

            e.value = field.value;

            e.addEventListener("keyup", event => {
                field.value = event.target.value;
            })
        })
    }

    document.getElementById("--gear:weapon--addbutton")
        .addEventListener("click", () => {
            fetch(`/src/component/weapon.html`)
                .then(res => (res.text()))
                .then(html => {
                    const modelWeapon = modelCharacterSheet.data.gear.weapon;
                    const indexedHTML = html.replaceAll("__INDEX__", modelWeapon.size)
                    try {
                        modelWeapon.add(modelWeapon.type)
                        document.getElementById("--gear:weapon--list")
                            .appendChild(templateFromHTML(indexedHTML))
                    } catch (err) {
                        console.log(err)
                    }
                })
        })

    initializeNavEvents();
    initializeModalEvents();
    initializeFieldEvents("--field");

    navigation.switchPage("gear");
}
