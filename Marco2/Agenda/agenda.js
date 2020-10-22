"use-strict";
/* * * * * * * * * * * * * * * * * * * * START CLASS * * * * * * * * * * * * * * * * * * * */
class Persona {
    constructor(id, nombre, apellidos, telefono, fecha) {
        this._id = id;
        this._nombre = nombre;
        this._apellidos = apellidos;
        this._telefono = telefono;
        this._fecha = fecha;
    }
    // - - - - - Getter  - - - - - //
    get id() {
        return this._id;
    }
    get nombre() {
        return this._nombre;
    }
    get apellidos() {
        return this._apellidos;
    }
    get telefono() {
        return this._telefono;
    }
    get fecha() {
        return this._fecha;
    }
    // - - - - - Setter  - - - - - //
    set id(value) {
        this._id = value;
    }
    set nombre(value) {
        this._nombre = value;
    }
    set apellidos(value) {
        this._apellidos = value;
    }
    set telefono(value) {
        this._telefono = value;
    }
    set fecha(value) {
        this._fecha = value;
    }
    // - - - - - Métodos - - - - - //
    nombreCompleto() {
        return this._nombre + this._apellidos;
    }
    datos() {
        return this._nombre + this._apellidos + this._telefono + this._fecha;
    }
}
/* * * * * * * * * * * * * * * * * * * * END CLASS * * * * * * * * * * * * * * * * * * * */

/* Variables */
var agenda = [];
var contador = 0;
var contador_registros = contador;
var estado = "editar";

/* Acortamiento de los botones */
btn_nombre = document.getElementById("nombre");
btn_apellidos = document.getElementById("apellidos");
btn_telefono = document.getElementById("telefono");
btn_fecha = document.getElementById("fecha");
btn_guardar = document.getElementById("guardar");
btn_eliminar = document.getElementById("eliminar");
btn_ver = document.getElementById("ver");

/* Añade por defecto una serie de Contactos predefinidos */
function defaultContactos() {

    agenda[contador] = new Persona(contador, "manuel", "jesus", "959014567", "10/10/2020");
    contador++;
    agenda[contador] = new Persona(contador, "lucia", "tello", "959023445", "10/10/2021");
    contador++;
    agenda[contador] = new Persona(contador, "claudia", "gonzalez", "959034567", "10/10/2022");
    contador++;
    agenda[contador] = new Persona(contador, "juan", "marquez", "959056778", "10/10/2023");
    contador++;
    agenda[contador] = new Persona(contador, "enrique", "garcia", "959067843", "10/10/2024");
    contador++;
    cargarResumen();
}

/* Funcion que limpia los valores del Formulario */
function limpiarFormulario() {

    document.getElementById("nombre").value = "";
    document.getElementById("apellidos").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("fecha").value = "";
}

/* Metodo para mostrar los contactos en la seccion 'resumen' creando una tabla
Tambien se usa para actualizar los Contactos mostrados */
function cargarResumen() {
    var resumen = "";
    for (let i = 0; i < agenda.length; i++) {
        let persona = agenda[i];
        resumen += `<tr>
        <th scope='row'>${i}</th>
        <td>${persona.nombre}</td>
        <td>${persona.apellidos}</td>
        <td>${persona.telefono}</td>
        <td>${persona.fecha}</td>
        </tr>`
        persona.id = i;
    }
    document.getElementById("tbody").innerHTML = resumen;
}

/* Requisitos para que se guarden y editen los campos del formulario */
function validarFormulario(nombre, apellidos, telefono, fecha) {

    var expresion_regular_nombre = /^[A-z]+$/; //Caulquier letra desde la A mayuscula a la z minuscula
    var expresion_regular_apellidos = /^[A-z]+$/; //Caulquier letra desde la A mayuscula a la z minuscula
    var expresion_regular_telefono = /^[0-9]{2,3}-? ?[0-9]{6,7}$/; // 3 primeros numeros - opcional o espacio 6 numeros mas
    var expresion_regular_fecha = /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/;

    /*
    Entero: ^(?:\+|-)?\d+$
    Correo: /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/
    URL: ^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)( [a-zA-Z0-9\-\.\?\,\'\/\\\+&%\$#_]*)?$
    Contraseña segura: (?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,10})$
    (Entre 8 y 10 caracteres, por lo menos un digito y un alfanumérico, y no puede contener caracteres espaciales)
    Fecha: ^\d{1,2}\/\d{1,2}\/\d{2,4}$
    (Por ejemplo 01/01/2007)
    Hora: ^(0[1-9]|1\d|2[0-3]):([0-5]\d):([0-5]\d)$
    (Por ejemplo 10:45:23)
    Numero de Telefono: ^[0-9]{2,3}-? ?[0-9]{6,7}$
    Codigo Postal: ^([1-9]{2}|[0-9][1-9]|[1-9][0-9])[0-9]{3}$
    */

    //var expresion_regular_email = /^(.+\@.+\..+)$/;


    // Usaremos el método "test" de las expresiones regulares:
    if (expresion_regular_nombre.test(nombre) == false) {
        return false;
    }
    if (expresion_regular_apellidos.test(apellidos) == false) {
        return false;
    }
    if (expresion_regular_telefono.test(telefono) == false) {
        return false;
    }
    if (expresion_regular_fecha.test(fecha) == false) {
        return false;
    }
    return true;
}

/* Funcion que permite crear un nuevo Contacto activando el boton de guardar */
function nuevoContacto() {

    btn_guardar.disabled = false;
    btn_eliminar.disabled = true;
    limpiarFormulario();
    document.getElementById("ver").value = "";
    estado = "guardar";
}

/* Funcion que guarda un nuevo Contacto en la Agenda */
function guardarContacto() {
    if (estado == "guardar") {

        //Cogemos los valores del formulario  
        var id = contador;
        var nombre = document.getElementById("nombre").value;
        var apellidos = document.getElementById("apellidos").value;
        var telefono = document.getElementById("telefono").value;
        var fecha = document.getElementById("fecha").value;

        /* Si esta funcion devuelve false no se añade el contacto a la agenda */
        if (validarFormulario(nombre, apellidos, telefono, fecha)) {

            //Añadimos los datos a la lista        
            agenda[contador] = new Persona(id, nombre, apellidos, telefono, fecha);
            contador++;
            cargarResumen();
            limpiarFormulario();

            alert('Gracias por rellenar nuestro formulario correctamente');
        } else {
            alert('Campos incorrectos, intentelo de nuevo');
        }
    } else if (estado == "editar") {
        editarContacto();
    }
}

/*  Funcion que permite editar los campos de un Contacto ya existente en la Agenda */
function editarContacto() {

    var id_ver = document.getElementById("ver").value;

    for (let i = 0; i < agenda.length; i++) {

        let persona = agenda[i];

        if (((persona.id) == id_ver) || ((persona.id) == contador_registros)) {

            //Cogemos los valores del formulario  
            var id = persona.id;
            var nombre = document.getElementById("nombre").value;
            var apellidos = document.getElementById("apellidos").value;
            var telefono = document.getElementById("telefono").value;
            var fecha = document.getElementById("fecha").value;

            /* Si esta funcion devuelve false no se edita el contacto en la agenda */
            if (validarFormulario(nombre, apellidos, telefono, fecha)) {

                //Añadimos los datos a la lista        
                agenda[persona.id] = new Persona(id, nombre, apellidos, telefono, fecha);

                cargarResumen();
                limpiarFormulario();
                
                alert('Gracias por editar el contacto correctamente');
            } else {
                alert('Campos incorrectos, intentelo de nuevo');
            }
        }
    }
}

/* Elimina el registro indicado en el Imput 'ver' */
function eliminarContacto() {

    var id_ver = document.getElementById("ver").value;

    for (let i = 0; i < agenda.length; i++) {

        let persona = agenda[i];

        if ((persona.id) == id_ver) {

            agenda.splice(persona.id, 1);
            cargarResumen();
        }
    }
}

/* Muestra en el formulario los campos del registro indicado en el Imput 'ver' al uplsar el boton 'Ver' */
function seleccionarContacto() {

    var ver = document.getElementById("ver").value;

    contador_registros = ver;

    for (let i = 0; i < agenda.length; i++) {

        let persona = agenda[i];

        if ((persona.id) == ver) {
            document.getElementById("nombre").value = persona.nombre;
            document.getElementById("apellidos").value = persona.apellidos;
            document.getElementById("telefono").value = persona.telefono;
            document.getElementById("fecha").value = persona.fecha;

        }
    }
    actualizarRegistos();
}

/* Funcion que actualiza y muestra el registro en el que te encuentras y la totalidad de los Contactos de la Agenda */
function actualizarRegistos() {

    /* Obtiene el texto y lo modifica */
    var registros = document.getElementById("registros").textContent;
    registros = contador_registros + " de " + agenda.length;
    document.getElementById("registros").textContent = registros;

    /* Impide aumentar los registos si no existen en la Agenda */
    var max = document.getElementById("ver");
    max.setAttribute("max", agenda.length);

    /* Si nos movemos entre los diferentes registros, tambien cambiamos el valor del Imput 'ver' */
    ver.value = contador_registros;

    /* Al cargar la Agenda muestra por defecto e contacto indicado en la variable contador, en este caso la posicion 0 */
    document.getElementById("nombre").value = agenda[contador_registros].nombre;
    document.getElementById("apellidos").value = agenda[contador_registros].apellidos;
    document.getElementById("telefono").value = agenda[contador_registros].telefono;
    document.getElementById("fecha").value = agenda[contador_registros].fecha;
}

/* Funcion que controla la navegacion entre los registros segun el boton pulsado, incrementando en 1 o dismiinuyendo segun
Tambien puedes ir al primer o ultimo registro de la Agenda  */
function moverRegistro(x) {

    switch (x) {
        case '≪':
            /* Si se cumple la condicion se mueve al primer registro */
            alert('≪ - Primer registro');
            break;
        case '🡠':
            /* Si se cumple la condicion se mueve un registro a la izquierda */
            if (contador_registros > 0 || contador_registros == agenda.length) {
                contador_registros--;
                actualizarRegistos();
                document.getElementById("nombre").value = agenda[contador_registros].nombre;
                document.getElementById("apellidos").value = agenda[contador_registros].apellidos;
                document.getElementById("telefono").value = agenda[contador_registros].telefono;
                document.getElementById("fecha").value = agenda[contador_registros].fecha;
            }
            break;
        case '🡢':
            /* Si se cumple la condicion se mueve un registro a la derecha */
            if (contador_registros < agenda.length || contador_registros == 0) {
                contador_registros++;
                actualizarRegistos();
                document.getElementById("nombre").value = agenda[contador_registros].nombre;
                document.getElementById("apellidos").value = agenda[contador_registros].apellidos;
                document.getElementById("telefono").value = agenda[contador_registros].telefono;
                document.getElementById("fecha").value = agenda[contador_registros].fecha;
            }
            break;
        case '≫':
            /* Si se cumple la condicion se mueve al ultimo registro */
            alert('≫ - Ultimo registro');
            break;
        default:
            alert('Error - Fuera de rango');
    }
}