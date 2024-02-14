"use strict";

class Util {
    static $(selector) {
        return [...document.querySelectorAll(selector)];
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

        return Util.traverseObjectKeys(
            /^\d+$/.test(keys[0]) ? entry.get([Number(keys[0])]) : entry[keys[0]],
            keys.slice(1)
        );
    }

    static isObject(value) {
        return typeof value === 'object' &&
            !Array.isArray(value) &&
            value !== null;
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
                    }
                )
                ;
            });
    }

    static setupIntegerField(e, input, showPositiveSign) {
        let value = input.value
        const minValue = Number(input.dataset.minvalue)
        const maxValue = Number(input.dataset.maxvalue)

        // Reset validation state and message
        input.classList.remove("error");
        input.setCustomValidity("");

        if (e.key === "-") {
            e.preventDefault()
            value = value[0] === "+" ? "-" + value.substring(1) : "-" + value
        }

        if (e.key === "+") {
            e.preventDefault()
            if (showPositiveSign) {
                value = value[0] === "-" ? "+" + value.substring(1) : "+" + value
            } else {
                value = value[0] === "-" ? value.substring(1) : value
            }
        }

        switch (value) {
            case "-":
            case "+":
                value = "0"
        }

        const toNumber = Number(value)
        if (!isNaN(toNumber)) {
            input.dataset.oldValue = value;

            if (toNumber < minValue || toNumber > maxValue) {
                input.classList.add("error");
                input.setCustomValidity(`Number must be between ${minValue} and ${maxValue}, inclusive.`);
                input.reportValidity();
            }

            // strip zeroes to the left
            value = value.replaceAll(/^([-+]?)0+([0-9]*$)/gm, "$1$2")

            switch (value) {
                case "":
                case "-":
                case "+":
                    value = "0"
            }

            if(toNumber > 0 && value[0] !== "+" && showPositiveSign) {
                value = "+" + value
            }

            input.value = value
        } else if (input.dataset.oldValue) {
            input.value = input.dataset.oldValue;
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
