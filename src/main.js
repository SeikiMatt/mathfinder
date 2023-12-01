"use strict";

const modelCharacterSheet = new Model({
    bio: {
        name: new ModelString(),
        alignment: new ModelString(),
        level: new ModelString(),
        deity: new ModelString(),
        homeland: new ModelString(),
        race: new ModelString(),
        gender: new ModelString(),
        height: new ModelString(),
        weight: new ModelString(),
        hair: new ModelString(),
        eyes: new ModelString(),
        age: new ModelString(),
        size: {
            name: new ModelString(),
            modifier: new ModelModifier("-99")
        },
        player: new ModelString(),
        campaign: new ModelString(),
    },
    stats: {
        health: {
            current: new ModelInteger(),
            maximum: new ModelInteger(),
            resistance: new ModelInteger(),
            nonlethal: new ModelInteger(),
        },
        armorclass: {
            base: new ModelModifier(),
            items: new ModelModifier(),
            dex: new ModelModifier(),
            size: new ModelReference("bio.size.modifier"),
            natural: new ModelModifier(),
            deflection: new ModelModifier(),
            misc: new ModelInteger(),
        },
    },
    gear: {
        weapon: new ModelList(
            {
                list: [],
                type: {
                    name: new ModelString(),
                    bonus: new ModelString(),
                    damage: new ModelString(),
                    crit: new ModelString(),
                    type: new ModelString(),
                    range: new ModelString(),
                    ammo: new ModelString(),
                }
            }
        )
    }
})

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
)

Promise.all(componentHTML).then(componentPromises => {
    const templates = componentPromises.map(entry => templateFromHTML(entry))

    // As far as I can tell this order is guaranteed by the document order of elementsToReplace
    for (let i = 0; i < templates.length; i++)
        replaceElement(elementsToReplace[i], templates[i])

    const navigation = new Nav("gear")
    const modals = new Modals()

    function initializeNavEvents() {
        navigation.linkMapping.forEach(element => {
            element.addEventListener("click", _ => navigation.switchPage(element.id.split(":")[1]))
        });
    }

    function initializeModalEvents() {
        modals.modalOpenButtonMapping.forEach(element => {
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
                field.initialize(modelCharacterSheet.data)

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
})