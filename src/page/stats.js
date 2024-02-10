function statsInit() {
    //  https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
    const fields = [...document.getElementsByClassName("--field")]
    fields.forEach(node => Util.setInputFilterSignedInteger(node))
}