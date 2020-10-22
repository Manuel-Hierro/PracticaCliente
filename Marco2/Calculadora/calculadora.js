/*
ADVERTENCIA
Para que funcione el teclado numerico bien, se debe hacer click 
dentro del espacio de la calculadora, preferentemente en la linea blanca de abajo
*/

/* Acciones tras cargar la pagina */
window.onload = function () {
  pantalla = document.getElementById("total"); //Elementos de la pantalla
  document.onkeydown = teclado; //Cpatura la tecla pulsada por teclado
}
x = "0"; //Valor por defecto en la pantalla
xi = "si"; //Iniciar numero en pantalla, para poder introducir un numero
punto = "no"; //Estado del punto decimal

ni = 0; //Numero en espera u oculto
op = "no"; //Operación actual, el "no" indica que esta sin operacion

/* Mostrar numero en pantalla segun vamos escribiendo */
/* Le pasamos el valor del numero pulsado */
function numero(xx) {

  if (x == "0" || xi == "si") { //Si hay un 0 no hemos escrito nada, lo inicializamos
    pantalla.innerHTML = xx; //Mostramos en pantalla el numero
    x = xx; //Guardamos el numero

    /* Si pulsamos el . escribimos directamente un 0. */
    if (xx == ".") {
      pantalla.innerHTML = "0.";
      x = xx; //Guardamos el numero
      punto = "si"; //Activamos el uso del punto
    }
  } else {
    if (xx == "." && punto == "no") { //Si escribimos un punto por primera vez
      pantalla.innerHTML += xx;
      x += xx;
      punto = "si"; //Activamos el uso del punto 
    }
    /* Si intentamos escribir un 2º punto no podremos */
    else if (xx == "." && punto == "si") {}
    /* En el resto de casos: escribiremos un número del 0 al 9 */
    else {
      pantalla.innerHTML += xx;
      x += xx
    }
  }
  xi = "no" //El numero esta inicializado y continuaremos operando
}

function operar(signo) {

  igualar() //Si hay alguna operacion pendiente, se realizara

  ni = x //Guardamos el 1º número, para poder escribir el segundo
  op = signo; //Guardamos el tipo de operación
  xi = "si"; //Iniciar numero en pantalla, para poder introducir un numero
}

function igualar() {

  if (op == "no") { //No hay operacion activa

    pantalla.innerHTML = x; //Mostramos el mismo numero

  } else { //Si hay operaciones pendientes las realizamos

    sl = ni + op + x; //Escribimos la operacion en una cadena
    sol = eval(sl) //Convertimos la cadena a codigo y resolvemos
    pantalla.innerHTML = sol //Mostramos la solucion
    x = sol; //Guardamos la solucion
    op = "no"; //Ya no hay mas operaciones, el "no" indica que esta sin operacion
    xi = "si"; //Volvemos a iniciar el numero en pantalla, para poder introducir un numero
  }
}

function raizCuadrada() {
  x = Math.sqrt(x) //Resolvemos la Raiz Cuadrada

  pantalla.innerHTML = x; //Mostramos el resultado

  op = "no"; //Ya no hay mas operaciones, el "no" indica que esta sin operacion
  xi = "si"; //Volvemos a iniciar el numero en pantalla, para poder introducir un numero 
}

function porcentaje() {
  x = x / 100 //Dividimos el numero por 100
  pantalla.innerHTML = x; //Mostramos el resultado
  igualar() //Si hay alguna operacion pendiente, se realizara
  xi = "si" //Volvemos a iniciar el numero en pantalla, para poder introducir un numero
}

function opuesto() {
  nx = Number(x); //Convertimos el numero
  nx = -nx; //Le cambiamos el signo
  x = String(nx); //Volvemos a convertir a cadena
  pantalla.innerHTML = x; //Mostramos en pantalla el resultado
}

function inverso() {
  nx = Number(x); //Convertimos el numero
  nx = (1 / nx); //Hacemos la inversa
  x = String(nx); //Volvemos a convertir a cadena
  pantalla.innerHTML = x; //Mostramos en pantalla el resultado
  xi = "si"; //Volvemos a iniciar el numero en pantalla, para poder introducir un numero
}

/* Borrar solo el ultimo numero escrito */
function retroceder() {
  cifras = x.length; //Guardar longitud del numero introducido
  br = x.substr(cifras - 1, cifras) //Determinar el ultimo caracter
  x = x.substr(0, cifras - 1) //Eliminar el ultimo caracter

  /* Si ya no quedan caracteres, pondremos el 0 */
  if (x == "") {
    x = "0";
  }
  /* Si el caracter eliminado es el punto, se permite escribirla de nuevo */
  if (br == ".") {
    coma = "no";
  }
  pantalla.innerHTML = x; //Mostramos en pantalla el resultado 
}

function borradoParcial() {
  pantalla.innerHTML = 0; //Borramos la pantalla
  x = 0; //Borramos el numero guardado
  punto = "no"; //Reiniciamos tambien el punto		
}

/* Borramos toda la Calculadora y sus variables u operaciones */
function borradoTotal() {
  pantalla.innerHTML = 0; //Dejamos la pantalla a 0
  x = "0"; //Reiniciamos el numero en pantalla
  punto = "no"; //Reiniciamos tambien el punto
  ni = 0 //Borramos el numero oculto
  op = "no" //Borramos la operacion en curso
}

function teclado(elEvento) {
  evento = elEvento || window.event;
  k = evento.keyCode; //Guarda el codigo de la tecla pulsada

  //En este rango de codigos se encuentran las teclas que necesitamos
  if (k > 47 && k < 58) {
    p = k - 48; //Resta 48 al codigo de la tecla pulsada para obtener el valor de los numeros
    p = String(p) //Lo convertimos a cadena
    numero(p); //Llamamos a la funcion numero para mostrarlo por pantalla
  }

  //Captura las teclas del teclado numerico
  /*
    El mismo procedimiento pero con el teclado numerico 
  */
  if (k > 95 && k < 106) {
    p = k - 96;
    p = String(p);
    numero(p);
  }
  if (k == 110 || k == 190) {
    numero(".")
  }
  if (k == 106) {
    operar('*')
  }
  if (k == 107) {
    operar('+')
  }
  if (k == 109) {
    operar('-')
  }
  if (k == 111) {
    operar('/')
  }
  if (k == 32 || k == 13) {
    igualar()
  }
  if (k == 46) {
    borradoTotal()
  }
  if (k == 8) {
    retroceder()
  }
  if (k == 36) {
    borradoParcial()
  }
}