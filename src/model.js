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
        return [ModelString, ModelBoolean, ModelInteger, ModelModifier, ModelReference, ModelList]
    }

    static isModelTypeInstance(classInstance) {
        const ModelTypes = [ModelString, ModelBoolean, ModelInteger, ModelModifier, ModelReference, ModelList]

        return ModelTypes.some(entry => classInstance instanceof entry)
    }

    initialise(obj, parents) {
        for (const [key, value] of Object.entries(obj)) {
            if (!Util.isObject(value)) throw TypeError("Leaf node \"" + key + "\" of model is not a POJO or Model Type.");

            if (!Model.isModelTypeInstance(value)) {
                Object.defineProperty(obj, key, {writable: false})
                Object.preventExtensions(obj)
            }

            Object.defineProperty(obj, key, {
                writable: false
            })
            Object.preventExtensions(obj)
            this.initialise(value, [...parents, key])
        }
    }
}

// noinspection JSUnusedGlobalSymbols
class IModel {
    //////////////////////////////////////////////////////////////////////
    // This is a pretend interface to look at for reference, nothing else.
    #value = undefined

    constructor(value) {
        IModel.validate(value)
        this.#value = value;
    }

    get value() {
        return this.#value
    }

    set value(newValue) {
        IModel.validate(newValue)
        this.#value = newValue
    }

    toString() {
        // serialize ya thing here
    }

    static validate(value) {
        if (typeof value !== "undefined") throw new Error(`Expected type "undefined".`)
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
        if (typeof value !== "boolean") throw new Error(`Expected type "boolean".`)
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
        if (typeof value !== "string") throw TypeError(`Expected type "string".`)
    }
}

class ModelInteger {
    #value = 0;

    constructor(value) {
        value = value ?? 0;
        ModelInteger.validateInteger(value)
        this.#value = value
    }

    get value() {
        return this.#value
    }

    set value(value) {
        ModelInteger.validateInteger(value)
        this.#value = value
    }

    static integerToModifier(integer) {
        ModelInteger.validateInteger(integer)

        return integer === 0 ? "0" : integer > 0 ? "+" + integer : "" + integer
    }

    static scoreToModifier(score) {
        ModelInteger.validateInteger(score)

        const modifier = Math.floor((score - 10) / 2)
        return ModelInteger.integerToModifier(modifier);
    }

    static validateInteger(value) {
        if (typeof value !== "number")
            throw new Error(`Expected type "number".`)

        if (!Number.isInteger(value) && value !== Infinity)
            throw new Error(`Number is not an integer or Infinity.`)
    }
}

class ModelModifier {
    #value = "0"
    constructor(value) {
        value = value ?? "0"
        ModelModifier.validateModifier(value)
        this.#value = value;
    }

    get value() {
        return this.#value
    }

    set value(value) {
        ModelModifier.validateModifier(value)
        this.#value = value;
    }

    static modifierToScore(modifier) {
        ModelModifier.validateModifier(modifier)

        return ModelModifier.modifierToNumber(modifier) * 2 + 10;
    }

    static modifierToNumber(modifier) {
        ModelModifier.validateModifier(modifier)

        const number = Number(modifier.slice(1));
        return modifier === "0" ? 0 : modifier[0] === "+" ? Math.abs(number) : -Math.abs(number)
    }

    static validateModifier(value) {
        if (typeof value !== "string")
            throw new Error(`Expected type "string".`)

        if (!value.match(/^([+-])\d+(?!.+)/) && value !== "0")
            throw new Error(`Value should have a sign if not zero, positive or negative both, e.g. "+5" or "-2".`)
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
        const references = this.#path.map(str => Util.traverseObjectKeys(this.#parentObject, str.split(".")));

        if (index < 0 || index > references.length - 1)
            throw TypeError("Index is out of range.")

        this.#ref = references;

        return this.#ref.length === 1 ? this.#ref[0] : this.#ref[index]
    }

    getAll() {
        return this.#path.map(str => Util.traverseObjectKeys(this.#parentObject, str.split(".")));
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
    #type;
    #subtype;
    #options;

    constructor(declaration) {
        this.#list = declaration.list;
        const type = declaration.type

        if (Array.isArray(type) && type.length === 2 && type[0] === ModelList && Util.isObject(type[1])) {

            this.#type = type[0]
            this.#subtype = type[1].type

            this.validateType(this.#type);
            this.validateType(this.#subtype);
        } else {
            this.#type = type;
            this.validateType(this.#type);
        }

        this.#options = declaration.options;
        this.#list.forEach(obj => this.validate(obj, this.#type));
    }

    get(index) {
        if (this.#list.length === 0)
            throw new Error(`List is empty.`)

        if (index > this.#list.length - 1 || index < 0)
            throw new Error(`Supplied index "${index}" is out of range.`)

        return this.#list[index]
    }

    get all() {
        return [...this.#list]
    }

    get type() {
        return this.#type
    }

    add(value) {
        if (this.isReadonly) return

        this.validate(value, this.#type);
        this.#list = [...this.#list, value];
    }

    set(value, index) {
        if (this.isReadonly) return

        if (this.#list.length === 0)
            throw new Error(`List is empty.`)

        if (index > this.#list.length - 1 || index < 0)
            throw new Error(`Supplied index "${index}" is out of range.`)

        if (!(value instanceof this.#type))
            throw new Error(`Supplied type "${typeof value}" is not allowed.Use one of the following: ${this.#type}.`)

        this.#list[index] = value;
    }

    get size() {
        return this.#list.length;
    }

    get isReadonly() {
        if (!this?.#options?.readonly) return

        return 'readonly' in this.#options && this.#options.readonly === true
    }

    validate(obj, type, parents = []) {
        // console.log(obj)
        if (obj === undefined) throw TypeError("Object is undefined.")

        if (type === undefined) throw TypeError("Type is undefined.")

        if (!Util.isObject(obj)) throw TypeError("Expected type Object.")

        if (this.#subtype)
            this.typesMatch(this.#subtype, obj.#type)

        if (parents.length === 0 && Model.modelTypes.some(e => type === e))
            if (obj instanceof type)
                return
            else
                throw TypeError("Root level Object does not match Type.")

        if (Object.keys(obj).length === 0 && !Model.isModelTypeInstance(obj))
            throw TypeError("Object contains no keys.")

        if (Object.keys(obj).length !== Object.keys(type).length)
            throw TypeError("Number of properties don't match between Object and Type.")

        if (!Util.isObject(obj) && !Model.isModelTypeInstance(obj) && !Model.modelTypes.some(e => obj === e))
            throw TypeError("Property is not a POJO or Model Type.");

        for (const [key, objValue] of Object.entries(obj)) {
            if (!Object.hasOwn(type, key))
                throw TypeError("Property does not exist in type.")

            this.validate(objValue, type[key], [...parents, key])
        }
    }

    validateType(obj, parents = []) {
        if (obj === undefined) throw TypeError("Object is undefined.")

        if (!Util.isObject(obj) && !Model.modelTypes.some(e => obj === e))
            throw TypeError("Expected Object or Model Type.")

        if (Object.keys(obj).length === 0 && !Model.isModelTypeInstance(obj) && !Model.modelTypes.some(e => obj === e))
            throw TypeError("Object contains no keys.")

        if (parents.length === 0 && Model.modelTypes.some(e => obj === e))
            return

        if (!Util.isObject(obj) && !Model.isModelTypeInstance(obj) && !Model.modelTypes.some(e => obj === e))
            throw TypeError("Property is not a POJO or Model Type.");

        for (const [key, value] of Object.entries(obj)) {
            this.validateType(value, [...parents, key])
        }
    }

    typesMatch(firstType, secondType, parents = []) {
        // it probably goes without saying but types are supposed to be validated before using this.

        const firstIsBareClass = Model.modelTypes.some(e => firstType === e);
        const secondIsBareClass = Model.modelTypes.some(e => secondType === e);

        if (firstIsBareClass !== secondIsBareClass)
            throw TypeError("Root types must either both be Class declarations or both be Objects.")

        if (Model.isModelTypeInstance(firstType) || Model.isModelTypeInstance(firstType))
            throw TypeError("Found Instance where Class declaration was expected.")

        if (firstType !== secondType && !Util.isObject(firstType) && !Util.isObject(secondType))
            throw TypeError("Type mismatch.")

        if (firstIsBareClass && secondIsBareClass && firstType === secondType)
            return

        for (const [key, _] of Object.entries(firstType)) {
            if (!Object.hasOwn(secondType, key))
                throw TypeError("Property does not exist in type.")

            this.typesMatch(firstType[key], secondType[key], [...parents, key])
        }
    }
}
