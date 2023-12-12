class EventEmitter {
    #subscribedFunctions = []

    subscribe(func) {
        if(func.name === "anonymous" && func.name === "")
            throw TypeError("Function not be anonymous.")

        if(this.#subscribedFunctions.indexOf(func) !== -1)
            return

        this.#subscribedFunctions = [...this.#subscribedFunctions, func]
    }

    unsubscribe(func) {
        const index = this.#subscribedFunctions.indexOf(func)
        if(index !== -1)
            this.#subscribedFunctions = this.#subscribedFunctions.toSpliced(index,1)
    }

    dispatch() {
        this.#subscribedFunctions.forEach(func => func())
    }
}