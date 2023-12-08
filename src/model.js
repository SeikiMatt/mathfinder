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

    static get modelTypes() {
        return [
            ModelString,
            ModelBoolean,
            ModelInteger,
            ModelStat,
            ModelReference,
            ModelList
        ]
    }

    static isModelTypeInstance(classInstance) {
        const ModelTypes = [
            ModelString,
            ModelBoolean,
            ModelInteger,
            ModelStat,
            ModelReference,
            ModelList
        ]

        return ModelTypes.some(entry => classInstance instanceof entry)
    }

    initialise(obj, parents) {
        for (const [key, value] of Object.entries(obj)) {
            if (!Util.isObject(value))
                throw TypeError("Leaf node \"" + key + "\" of model is not a POJO or Model Type.");

            if (!Model.isModelTypeInstance(value)) {
                Object.defineProperty(obj, key, {writable: false})
                Object.preventExtensions(obj)
            }
            // console.log(parents.join(".") + "." + key + ": ", value)

            Object.defineProperty(obj, key, {
                writable: false
            })
            Object.preventExtensions(obj)
            this.initialise(value, [...parents, key])
        }
    }
}

class ModelBoolean {
    #value = false;

    constructor(value) {
        ModelBoolean.validate(value)
        this.#value = value;
    }

    get value() {
        return this.#value
    }

    set value(newValue) {
        ModelBoolean.validate(newValue)
        this.#value = newValue
    }

    static validate(value) {
        if (typeof value !== "boolean")
            throw new Error(`The only valid type for this property is "boolean".`)
    }
}

class ModelString {
    #value = "";

    constructor(value) {
        value = value ?? ""
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
            throw TypeError(`The only valid type for this property is "string".`)
    }
}

class ModelInteger {
    #integer = 0;

    constructor(value) {
        value = value ?? 0;
        ModelInteger.validateInteger(value)
        this.#integer = value
    }

    get value() {
        return this.#integer
    }

    set value(value) {
        ModelInteger.validateInteger(value)
        this.#integer = value
    }

    static validateInteger(value) {
        if (typeof value !== "number")
            throw new Error(`The only valid type for this property is "number".`)

        if (!Number.isInteger(value))
            throw new Error(`Number is not an integer.`)
    }
}

class ModelStat {
    #score = 0;
    #modifier = "+0"

    constructor(value) {
        switch (typeof value) {
            case "string":
                ModelStat.validateModifier(value)
                this.#modifier = value;
                this.#score = ModelStat.modifierToScore(value)
                break
            case "number":
                ModelStat.validateInteger(value)
                this.#score = value
                this.#modifier = ModelStat.scoreToModifier(value)
        }
    }

    get score() {
        return this.#score
    }

    set score(value) {
        ModelStat.validateInteger(value)
        this.#score = value
        this.#modifier = ModelStat.scoreToModifier(value)
    }

    get modifier() {
        return this.#modifier
    }

    set modifier(value) {
        ModelStat.validateModifier(value)
        this.#modifier = value;
        this.#score = ModelStat.modifierToScore(value)
    }

    static integerToModifier(integer) {
        ModelStat.validateInteger(integer)

        return integer === 0 ? "0" : integer > 0 ? "+" + integer : "" + integer
    }

    static scoreToModifier(score) {
        ModelStat.validateInteger(score)

        const modifier = Math.floor((score - 10) / 2)
        return ModelStat.integerToModifier(modifier);
    }

    static modifierToScore(modifier) {
        ModelStat.validateModifier(modifier)

        return ModelStat.modifierToNumber(modifier) * 2 + 10;
    }

    static modifierToNumber(modifier) {
        ModelStat.validateModifier(modifier)

        const number = Number(modifier.slice(1));
        return modifier[0] === "+" ? Math.abs(number) : -Math.abs(number)
    }

    static validateInteger(value) {
        if (typeof value !== "number")
            throw new Error(`The only valid type for this property is "number".`)

        if (!Number.isInteger(value))
            throw new Error(`Number is not an integer.`)
    }

    static validateModifier(value) {
        if (typeof value !== "string")
            throw new Error(`The only valid type for this property is "string".`)

        if (!value.match(/^([+-])\d+(?!.+)/))
            throw new Error(`Value should be in sign-integer format, e.g. "+5" or "-2".`)
    }
}

class ModelReference {
    #path = [""];
    #parentObject = {};
    #ref = {} || [{}];

    constructor(path) {
        ModelReference.validate(path)
        this.#path = typeof path === "string" ? [path] : path;
    }

    get(index) {
        const references = this.#path.map(str =>
            Util.traverseObjectKeys(this.#parentObject, str.split("."))
        );

        if (index < 0 || index > references.length - 1)
            throw TypeError("Index is out of range.")

        this.#ref = references;

        return this.#ref.length === 1 ? this.#ref[0] : this.#ref[index]
    }

    getAll() {
        return this.#path.map(str =>
            Util.traverseObjectKeys(this.#parentObject, str.split("."))
        );
    }

    get length() {
        return this.#ref.length;
    }

    get isReference() {
        return true;
    }

    initialize(obj) {
        this.#parentObject = obj.data;
    }

    static validate(entry) {
        const pattern = /^[a-zA-Z]+(\.[a-zA-Z]+)*(?!.+)/;

        if (!Array.isArray(entry) && typeof entry !== "string")
            throw TypeError(`Path expected type "string" or "string[]", but got "${typeof entry}".`);

        if (entry.length === 0)
            throw TypeError("Path string or array can not be empty.");

        if (Array.isArray(entry)) {
            if (!entry.every(e => typeof e === "string"))
                throw TypeError(`All strings in path array must be of type "string".`);

            if (entry.every(e => e.length === 0))
                throw TypeError(`All strings in path array must not be empty`);

            if (!entry.every(e => e.match(pattern)))
                throw TypeError(`Path in array does not match "property.dot.notation" format.`);
        }

        if (typeof entry === "string") {
            if (!entry.match(pattern))
                throw TypeError(`Path does not match "property.dot.notation" format.`);
        }
    }
}

class ModelList {
    #list = [];
    #type = {};

    constructor(declaration) {
        this.#list = declaration.list;
        this.#type = declaration.type;
        this.validateType(this.#type);
        this.#list.forEach(obj => this.validate(obj, this.#type));
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
        this.validate(value, this.#type);
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

    validate(obj, type, parents = []) {
        if (obj === undefined)
            throw TypeError("Object is undefined.")

        if (type === undefined)
            throw TypeError("Type is undefined.")

        if (!Util.isObject(obj))
            throw TypeError("Expected type Object.")

        if (parents.length === 0 && Model.modelTypes.some(e => type === e))
            if (obj instanceof type)
                return
            else
                throw TypeError("Root level Object does not match Type.")

        if (Object.keys(obj).length === 0 && !Model.isModelTypeInstance(obj))
            throw TypeError("Object contains no keys.")

        if (Object.keys(obj).length !== Object.keys(type).length)
            throw TypeError("Number of properties don't match between Object and Type.")

        if (!Util.isObject(obj) &&
            !Model.isModelTypeInstance(obj) &&
            !Model.modelTypes.some(e => obj === e
            ))
            throw TypeError("Property is not a POJO or Model Type.");

        for (const [key, objValue] of Object.entries(obj)) {
            if (!Object.hasOwn(type, key))
                throw TypeError("Property does not exist in type.")

            this.validate(objValue, type[key], [...parents, key])
        }
    }

    validateType(obj, parents = []) {
        if (obj === undefined)
            throw TypeError("Object is undefined.")

        if (!Util.isObject(obj) && !Model.modelTypes.some(e => obj === e))
            throw TypeError("Expected Object or Model Type.")

        if (Object.keys(obj).length === 0 &&
            !Model.isModelTypeInstance(obj) &&
            !Model.modelTypes.some(e => obj === e)
        )
            throw TypeError("Object contains no keys.")

        if (parents.length === 0 && Model.modelTypes.some(e => obj === e))
            return

        if (!Util.isObject(obj) &&
            !Model.isModelTypeInstance(obj) &&
            !Model.modelTypes.some(e => obj === e))
            throw TypeError("Property is not a POJO or Model Type.");

        for (const [key, value] of Object.entries(obj)) {
            this.validateType(value, [...parents, key])
        }
    }
}