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

    static setInputFilterSignedInteger(input) {
        ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop", "focusout"].forEach(function (event) {
            input.addEventListener(event, function (e) {
                let value = e.target.value
                const isEmpty = value.length === 0
                const isZero = value === "0" || value === "-0" || value === "+0"
                const isSigned = value[0] === "-" || value[0] === "+"

                // strip zeroes to the left
                value = value.replaceAll(/^([-+]?)0+([0-9]*$)/gm, "$1$2")

                switch (value) {
                    case "":
                    case "-":
                    case "+":
                        value = "0"
                }

                if (!isSigned && !isZero && !isEmpty) {
                    value = "+" + value
                }

                switch (e.key) {
                    case "-":
                        if (value[0] === "+") value = "-" + value.substring(1)
                        break
                    case "+" :
                        if (value[0] === "-") value = "+" + value.substring(1)
                }

                e.target.value = value

                if (/^[+-]?\d*$/gm.test(value)) {
                    e.target.dataset.oldValue = value;
                } else if (e.target.dataset.oldValue) {
                    e.target.value = e.target.dataset.oldValue;
                }
            });
        });
    }
}
