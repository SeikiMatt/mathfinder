"use strict";

class Util {
    static $(selector) {
        return [...document.querySelectorAll(selector)];
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
}
