//Declaracion de variables principales.

let cantidad = "";

let precio ="";

let subtotal="";

let tipoProducto="";

let total="";


// Declaración de array vacío donde luego se pushearán los productos construidos a partir de la función.

const productos = [];

function construirObjeto() {

  class Producto {
    constructor(tipoProducto, cantidad, precio,subtotal) {
      this.nombre = tipoProducto;
      this.cantidad = cantidad;
      this.precio = precio;
      this.subtotal = subtotal;
    }
  }
productos.push(new Producto(tipoProducto, cantidad, precio,subtotal));
}


// Función para calcular el precio de cada producto dependiendo la cantidad seleccionada.

function calcularPrecio() {

  tipoProducto = document.getElementById("producto").value;

  cantidad = document.getElementById("cantidad").value;
  
  switch (tipoProducto) {
    case "Aerosol Saphirus":
      if (cantidad < 6) {
        precio = 330;
      } else if (cantidad >= 6 && cantidad <= 11) {
        precio = 243;
      } else if (cantidad > 11 && cantidad <= 24) {
        precio = 225;
      } else {
        precio = 216;
      }
      break;
    case "Aerosol Ambar":
      if (cantidad < 6) {
        precio = 251;
      } else if (cantidad >= 6 && cantidad <= 11) {
        precio = 179;
      } else if (cantidad > 11 && cantidad <= 24) {
        precio = 172;
      } else {
        precio = 165;
      }
      break;
    case "Textil 250 ml":
      if (cantidad < 6) {
        precio = 238;
      } else if (cantidad >= 6 && cantidad <= 11) {
        precio = 180;
      } else if (cantidad > 11 && cantidad <= 24) {
        precio = 164;
      } else {
        precio = 157;
      }
      break;
    case "Difusor a varillas":
      if (cantidad < 6) {
        precio = 340;
      } else if (cantidad >= 6 && cantidad <= 11) {
        precio = 253;
      } else if (cantidad > 11 && cantidad <= 24) {
        precio = 233;
      } else {
        precio = 224;
      }
      break;  
      default:
      precio = "No se pudo calcular el precio";
  }
}

function calcularSubtotal() {
  
  subtotal = Number(cantidad*precio);
  return subtotal;
}

function calcularTotal() {

  total = productos.reduce(
    (counter, item) => counter + item.cantidad * item.precio,
    0
  );
}

//Funciones con métodos jQuery para agregar la fila de total y resetear los campos.

function agregarFilaTotal() {

  if (total === 0) {
    $("#total").css("display", "none");
  } else {
    $("#total").css("display", "block");
    $("#total").text(`El presupuesto total es de: $ ${total}`);
    $("#total").addClass("total");
  }
}

function resetearCampos() {

  $('#producto').val($('#producto > option:first').val());
  $("#cantidad").val('');

}

//En esta función se agrega las filas correspondientes a la selección modificando el DOM y se resetean los campos.

function agregarFilaProducto () {

  document.querySelector("#productosSeleccionados").innerHTML +=`
  <div class="producto">
    <span id="nombreProducto">
    <strong>Producto:</strong> ${tipoProducto}
    </span>
    <span id="cantidadProducto">
    <strong>Cantidad:</strong> ${cantidad}
    </span>
    <span id="precioProducto">
    <strong>Precio:</strong> $ ${precio}
    </span>
    <span name="subtotal">
    <strong>Subtotal:</strong>$ ${subtotal}
    </span>
    <button class="eliminar">
    X
    </button>
  </div>
  `;

  resetearCampos();
  
}


//Almacenamiento en local storage

function guardarObjeto() {
let objetoJSON =  JSON.stringify(productos); 
localStorage.setItem("Datos productos",objetoJSON);
}



// Se define la funcionalidad del botón agregar al hacer click. 
//En caso que los campos estén completos correrán las funciones de lo contrario se mostrará una ventana modal.


let botonAgregar = document.getElementById("agregar");

function agregarProducto() {

  
  calcularPrecio();
  calcularSubtotal();
  construirObjeto();
  calcularTotal();
  guardarObjeto();
  agregarFilaProducto();
  agregarFilaTotal();
  borrarFila();
  }

botonAgregar.addEventListener("click", function(){

  let select = document.getElementById("producto").value

  if ( select != 'Seleccione un producto' && cantidad != ' ') {
    agregarProducto();
  }
  else {

    let modal = document.getElementById("modalContainer")
    modal.classList.replace('hideModal','showModal');
    let container = document.getElementById('containerPrincipal')
    container.classList.replace('container','blurContainer');
    let btnModal = document.getElementById('btn-modal')
    btnModal.addEventListener("click", ()=> {
        
    modal.classList.replace('showModal','hideModal')
    container.classList.replace('blurContainer','container')
    })
    
  }

});


//Funcion para poder eliminar una determinada fila y se se vuelva a calcular el monto total.

function borrarFila() {
  let filasCreadas = document.querySelectorAll(".eliminar");
    for (let i = 0; i< filasCreadas.length; i++) {
      filasCreadas[i].onclick = function () {
            productos.splice(i, 1);
            this.parentNode.remove();
            calcularTotal();
            agregarFilaTotal();
        }
    }  
}



//Funcion para completar el select tomando datos del archivo JSON con una llamada AJAX.

$(() => {



const URLJSON = './data/datos.json';

$.get(URLJSON,function(data){


  for (const datos of data) {

  $('#producto').append(`<option value="${datos.nombre}">${datos.nombre}</option>`);

  }

})


})
