const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..',
    'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
};

const reverseMorseCode = Object.fromEntries(Object.entries(morseCode).map(([key, value]) => [value, key]));

const textoEntrada = document.getElementById('textoEntrada');
const btnConvertirMorse = document.getElementById('btnConvertirMorse');
const btnConvertirTexto = document.getElementById('btnConvertirTexto');
const resultadoMorseDiv = document.getElementById('resultadoMorse');
const resultadoTextoDiv = document.getElementById('resultadoTexto');


const validarEntrada = (texto) => {
    if (!texto.trim()) {
        Swal.fire('Error', 'El campo no puede estar vacío', 'error');
        return false;
    }
    return true;
};

const validarCaracteres = (texto) => {
    const regex = /^[A-Z0-9\s]+$/; 
    return regex.test(texto);
};


const validarMorse = (morse) => {
    const regex = /^([.-]+\s?)+$/; 
    return regex.test(morse) || morse.split(' / ').every(p => regex.test(p.trim()));
};


btnConvertirMorse.addEventListener('click', () => {
    const texto = textoEntrada.value.toUpperCase();
    if (!validarEntrada(texto) || !validarCaracteres(texto)) {
        Swal.fire('Error', 'El texto contiene caracteres inválidos', 'error');
        return;
    }

    const morse = texto.split('').map(char => morseCode[char] || '').join(' ');
    resultadoMorseDiv.textContent = morse; 
    Swal.fire('Código Morse Generado', morse, 'success');
});


btnConvertirTexto.addEventListener('click', () => {
    const morse = textoEntrada.value.trim(); 
    if (!validarEntrada(morse) || !validarMorse(morse)) {
        Swal.fire('Error', 'El código morse contiene caracteres inválidos', 'error');
        return;
    }

    const palabras = morse.split(' / ');
    const resultado = palabras.map(palabra => palabra.split(' ').map(codigo => reverseMorseCode[codigo] || '').join('')).join(' ');
    
    if (!resultado.trim()) {
        Swal.fire('Error', 'El código morse contiene caracteres inválidos', 'error');
    } else {
        resultadoTextoDiv.textContent = resultado; 
        Swal.fire('Texto Generado', resultado, 'success');
    }
});
