module.exports = (cpf) => {
    const aux = cpf.split('').reverse();

    const checkList = {
        elevenDigits: {
            valid: false,
            message: "O CPF deve Conter 11 Dígitos"
        },
        allNumbers: {
            valid: false,
            message: "Insira apenas números"
        },
        isValid: {
            valid: false,
            message: "CPF Incorreto/Invalido"
        },
    }

    checkList.elevenDigits.valid = aux.length == 11;
    checkList.allNumbers.valid = !aux.some(num => isNaN(parseInt(num)))


    if (checkList.elevenDigits.valid && checkList.allNumbers.valid) {
        let base = cpf.split('').slice(0, 9).reverse()
        let digits = cpf.substring(9, 11);

        checkList.isValid.valid = isItValid(base, digits);
    }

    //Retorna um array com as propriedades que contem erro
    const errors = Object.keys(checkList).filter(prop => !checkList[prop].valid);
    var errorsList = {};
    for (i of errors) {
        errorsList[i] = checkList[i]
    }

    return errors.length == 0 ? { status: 200 } : { status: 400, ...errorsList }
}

//Verifica se o digito é válido
const isItValid = (base, digits) => {

    //transforma para inteiro para poder trabalhar com os números do cpf
    const intBase = base.map(num => parseInt(num));

    var v1 = 0, v2 = 0
    for (i = 0; i < intBase.length; i++) {
        v1 = v1 + base[i] * (9 - (i % 10))
        v2 = v2 + base[i] * (9 - ((i + 1) % 10))
    }

    v1 = (v1 % 11) % 10
    v2 = v2 + v1 * 9
    v2 = (v2 % 11) % 10

    return (v1 == digits[0] && v2 == digits[1]);
}