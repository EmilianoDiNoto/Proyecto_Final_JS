// He aquí mi proyecto final. Muchas gracias por la paciencia. No he tenido mucho tiempo para poder dedicarle al proyecto debido a algunas circunstancias que estuve pasando.
// De todas formas pude terminarlo minimamente y cumplir con los requisitos minimos aunque me hubiera gustado hacerlo con muchos mas detalles.
// Gracias por el apoyo este tiempo. Muy lindo curso. Saludos =).

let monedaUno = document.getElementById('moneda-uno');
let monedaDos = document.getElementById('moneda-dos');
let cantidadUno = document.getElementById('cantidad-uno');
let cantidadDos = document.getElementById('cantidad-dos');
let cambioMoneda = document.getElementById('cambio');
let tazaMoneda = document.getElementById('taza');
let conversionn = document.getElementById("Conv");

let conversiones = [];


const toastAlert = (mensaje, icono, posicion) => {
    Swal.fire({
        toast: true,
        position: posicion,
        text: 'Canversion realizada correctamente',
        icon: icono,
        showConfirmButton: false,
        timer: 3000,
        text: mensaje,
    })
}

const calculate = async() => {
    const moneda_uno_valor = monedaUno.value;
    const moneda_dos_valor = monedaDos.value;
    await fetch(`https://v6.exchangerate-api.com/v6/759fa54e4c77bd4a322ffb08/latest/${moneda_uno_valor}`)
        .then((resultado) => resultado.json())
        .then((data) => {
            let taza = data.conversion_rates[moneda_dos_valor];
            cambioMoneda.innerText = `1${moneda_uno_valor} = ${taza} ${moneda_dos_valor}`;
            cantidadDos.value = (cantidadUno.value * taza).toFixed(2);
        })
}

monedaUno.addEventListener("change", calculate);
cantidadUno.addEventListener("input", calculate);
monedaDos.addEventListener("change", calculate);
cantidadDos.addEventListener("input", calculate);

taza.addEventListener("click", () => {
    const temp = monedaUno.value;
    monedaUno.value = monedaDos.value;
    monedaDos.value = temp;
    calculate();
});

calculate();

conversionn.addEventListener("click" , DispararAlert);


function DispararAlert() 
{
cantidadUno.value == "0" && cantidadDos.value == "0.00" ? toastAlert("Por favor, asegurese de completar todos los campos", "warning", "top-start") : toastAlert("Conversion Realizada Exitosamente!", "success", "top-end");
}