"use strict";

class Model {
    #modelDeclaration = {};

    constructor(modelDeclaration) {
        this.#modelDeclaration = modelDeclaration;
        this.initialise(this.#modelDeclaration, []);
        Object.preventExtensions(this.#modelDeclaration)
    }

    get #data() {
        return this.#modelDeclaration
    }

    get data() {
        return this.#data
    }

    static isModelType(classInstance) {
        const ModelTypes = [
            ModelString,
            ModelInteger,
            ModelModifier,
            ModelReference,
            ModelList
        ]

        return ModelTypes.some(entry => classInstance instanceof entry)
    }

    initialise(obj, parents) {
        for (const [key, value] of Object.entries(obj)) {
            if (!Util.isObject(value))
                throw TypeError("Leaf node \"" + key + "\" of model is not a POJO or Model Type.");

            if (!Model.isModelType(value)) {
                Object.defineProperty(obj, key, {writable: false})
                Object.preventExtensions(obj)
            }
            // console.log(parents.join(".") + "." + key + ": ", value)
            this.initialise(value, [...parents, key])
        }
    }
}

class ModelString {
    #value = "";

    constructor(value) {
        value = value ?? "";
        ModelString.validate(value)
        this.#value = value;
    }

    get value() {
        return this.#value
    }

    set value(newValue) {
        ModelString.validate(newValue)

        this.#value = newValue
    }

    static validate(value) {
        if (typeof value !== "string")
            throw new Error(`The only valid type for this property is "string".`)
    }
}

class ModelInteger {
    #value = 0;

    constructor(value) {
        value = value ?? 0;
        ModelInteger.validate(value)
        this.#value = value;
    }

    get value() {
        return this.#value
    }

    set value(newValue) {
        ModelInteger.validate(newValue)
        this.#value = newValue
    }

    static validate(value) {
        if (typeof value !== "number")
            throw new Error(`The only valid type for this property is "number".`)

        if (!Number.isInteger(value))
            throw new Error(`Number is not an integer.`)
    }
}

class ModelModifier {
    #value = "";

    constructor(value) {
        value = value ?? "+0"
        ModelModifier.validate(value)
        this.#value = value;
    }

    get value() {
        return this.#value
    }

    get numericalValue() {
        const number = Number(this.#value.slice(1));
        return this.#value[0] === "+" ? Math.abs(number) : -Math.abs(number)
    }

    set value(newValue) {
        ModelModifier.validate(newValue)
        this.#value = newValue
    }

    static formatModifier(integer) {
        if (!integer)
            return "0"

        return integer === 0 ? "0" : integer > 0 ? "+" + integer : "" + integer
    }

    static validate(value) {
        if (typeof value !== "string")
            throw new Error(`The only valid type for this property is "string".`)

        if (!value.match(/^(\+|\-){1}\d+/))
            throw new Error(`Value should be in sign-integer format, e.g. "+5" or "-2".`)
    }
}

class ModelReference {
    #path = ""
    #parentObject = {}
    #reference = {}

    constructor(path) {
        this.#path = path;
    }

    setParent(obj) {
        this.#parentObject = obj;
    }

    get isReference() {
        return true;
    }

    get reference() {
        return this.#reference
    }

    get value() {
        return this.#reference.value
    }

    initialize(obj) {
        this.#parentObject = obj
        this.#reference = Util.traverseObjectKeys(this.#parentObject, this.#path.split("."))
    }
}

class ModelList {
    #list = [];
    #type = {};

    constructor(declaration) {
        this.#list = declaration.list;
        this.#type = declaration.type;
        this.validateType(this.#type, "");
        this.#list.forEach(obj => this.validate(obj, this.#type, ""));
    }

    get(index) {
        if (this.#list.length === 0)
            throw new Error(
                `List is empty.`
            )

        if (index > this.#list.length - 1 || index < 0)
            throw new Error(
                `Supplied index "${index}" is out of range.`
            )

        return this.#list[index]
    }

    get all() {
        return [...this.#list]
    }

    get type() {
        return structuredClone(this.#type)
    }

    add(value) {
        this.validate(value, this.#type, "");
        this.#list = [...this.#list, value];
    }

    set(value, index) {
        if (this.#list.length === 0)
            throw new Error(
                `List is empty.`
            )

        if (index > this.#list.length - 1 || index < 0)
            throw new Error(
                `Supplied index "${index}" is out of range.`
            )

        if (!(value instanceof this.#type))
            throw new Error(
                `Supplied type "${typeof value}" is not allowed.
                 Use one of the following: ${this.#type}.`
            )

        this.#list[index] = value;
    }

    get size() {
        return this.#list.length;
    }

    validate(obj, type, parents) {
        if(obj === undefined)
            throw TypeError("ModelList entry is undefined.");

        if(type === undefined)
            throw TypeError("ModelList type is undefined.");

        if (Object.keys(obj).length !== Object.keys(type).length)
            throw TypeError("ModelList entry does not match number of properties in its Type.");

        for (const [key, value] of Object.entries(obj)) {
            if(!Object.hasOwn(type, key))
                throw TypeError("Key \"" + key + "\" does not exist in declared Type.");

            if (!Util.isObject(value) && !Model.isModelType(value))
                throw TypeError("Leaf node \"" + key + "\" of model is not a POJO or Model Type.");

            this.validate(obj[key], type[key], [...parents, key])
        }
    }

    validateType(obj, parents) {
        if(obj === undefined)
            throw TypeError("ModelList type is undefined.");

        if (Object.keys(obj).length === 0 && parents.length === 0)
            throw TypeError("ModelList type declaration must have at least one property.");

        for (const [key, value] of Object.entries(obj)) {
            if (!Util.isObject(value) && !Model.isModelType(value))
                throw TypeError("Leaf node \"" + key + "\" of type declaration is not a POJO or Model Type.");

            this.validateType(value, [...parents, key])
        }
    }
}