"use strict";

class Util {
    static $(selector) {
        return [...document.querySelectorAll(selector)];
    }

    // https://stackoverflow.com/questions/18749591/encode-html-entities-in-javascript
    static encodeHTML(html) {
        return html.replace(/[\u00A0-\u9999<>&]/g, i => '&#' + i.charCodeAt(0) + ';')
    }

    static nodeArrayToObject(nodeArray) {
        return nodeArray.reduce((agg, element) => ({...agg, [element.id.split(":")[1]]: element}), {});
    }

    static walkObject(obj, parents) {
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'object' && value !== null && !Array.isArray(value))
                Util.walkObject(value, [...parents, key])
            else
                console.log(parents.join(".") + "." + key + ": " + value);
        }
    }

    static traverseObjectKeys(entry, keys) {
        if (keys.length === 0) {
            return entry;
        }

        return Util.traverseObjectKeys(/^\d+$/.test(keys[0]) ? entry.get([Number(keys[0])]) : entry[keys[0]], keys.slice(1));
    }

    static isObject(value) {
        return typeof value === 'object' && !Array.isArray(value) && value !== null;
    }

    static debounce(func, milliseconds, immediate) {
        // https://stackoverflow.com/questions/24004791/what-is-the-debounce-function-in-javascript
        let timeout;

        return function () { // cannot be arrow function, it loses context
            const context = this
            const args = arguments;
            const callNow = immediate && !timeout;

            clearTimeout(timeout);

            timeout = setTimeout(function () {
                timeout = null;
                if (!immediate) {
                    func.apply(context, args);
                }
            }, milliseconds);

            if (callNow) func.apply(context, args);
        }

    }

    // https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
    static setInputFilter(node, inputFilter, errorMessage) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"]
            .forEach(eventType => {
                node.addEventListener(eventType, function (e) {
                    if (inputFilter(node.value)) {
                        // Success
                        if (["keydown", "mousedown", "focusout"].indexOf(e.type) >= 0) {
                            node.classList.remove("error");
                            node.setCustomValidity("");
                        }

                        node.dataset.oldValue = node.value;

                        node.dataset.oldSelectionStart = node.selectionStart;
                        node.dataset.oldSelectionEnd = node.selectionEnd;
                    } else if (node.dataset.oldValue) {
                        // Failure
                        node.value = node.dataset.oldValue;

                        node.setSelectionRange(node.dataset.oldSelectionStart, node.dataset.oldSelectionEnd);

                        node.setCustomValidity(errorMessage);
                        node.reportValidity();

                        node.classList.add("error");
                    } else {
                        // Failure, no rollback
                        node.value = "";
                    }
                });
            });
    }

    static setupIntegerField(e, input, showPositiveSign) {
        const toNumber = Number(input.value)
        const minValue = Number(input.dataset.minvalue)
        const maxValue = Number(input.dataset.maxvalue)

        // Reset validation state and message
        input.classList.remove("error");
        input.setCustomValidity("");

        if (isNaN(toNumber)) {
            if (input.value === "" || input.value === "-" || input.value === "+")
                input.value = 0
            else
                input.value = input.dataset.oldValue;
        } else {
            if (toNumber < minValue ||
                toNumber > maxValue ||
                Number(input.dataset.oldValue) < minValue ||
                Number(input.dataset.oldValue) > maxValue
            ) {
                e.preventDefault()
                input.value = input.dataset.oldValue;
                input.classList.add("error");
                input.setCustomValidity(`Number must be between ${minValue} and ${maxValue}, inclusive.`);
                input.reportValidity();
                return
            }

            input.dataset.oldValue = input.value;

            if (e.key === "-") {
                e.preventDefault()
                input.value = -Math.abs(toNumber)
                return
            }

            if (e.key === "+" && toNumber !== 0) {
                e.preventDefault()
                input.value = "+" + Math.abs(toNumber)
                return
            }

            input.value = toNumber > 0 && showPositiveSign ? "+" + toNumber : toNumber
        }
    }

    static setupIntegerFieldSignPositive(e, input) {
        Util.setupIntegerField(e, input, true)
    }

    static registerInputEvents(node, callbacks) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"]
            .forEach(eventType => {
                node.addEventListener(eventType, function (e) {
                    if (Array.isArray(callbacks)) {
                        callbacks.forEach(func => func(e, node))
                    } else {
                        callbacks(e, node)
                    }
                })
            })
    }
}
