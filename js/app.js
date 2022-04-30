//  BIENVENIDA

let nombreDeUsuario = document.getElementById("nombre-de-usuario");

let datosDelUsuario = document.getElementById("datos-del-usuario");

const abrirRegistro = ()=>{
     $('nombre-de-usuario').slideDown().css({
          "display" : "flex",
          "z-index" : "1"
     });
}

$('#registro').click(abrirRegistro);

const cerrarRegistro = ()=>{
     $('#datos-del-usuario').slideDown(400, function(){
          let nombre = document.getElementById("#").value;
          localStorage.setItem("usuarioActual", JSON.stringify(nombre));
          location.reload();
     }).css("display", "none");
}

$('#cerrar').click(cerrarRegistro);

const nombreRGB = ()=>{
     $('#nombre-de-usuario').css('color', 'blue');
     
     $('#nombre-de-usuario')
     .fadeOut(2000, ()=>{
          $('#nombre-de-usuario').css('color', '#a00')
     }).fadeIn(2000)
}


// CREACION DE PRODUCTOS

class ProductoGeneral {
     constructor(id, nombre, tipo, precio, imagen) {
          this.id = id;
          this.nombre = nombre;
          this.tipo = tipo;
          this.precio = precio;
          this.imagen = imagen;
     }
}

let productos = [{
     id: 1,
     nombre: "AMERICANA",
     tipoDePizza: "Clásica",
     precio: 25.00,
     imagen: "/img/menu/americana.png",
},

{    
     id: 2,
     nombre: "ESPECIAL",
     tipoDePizza: "LA MAXIMA",
     precio: 30.00,
     imagen: "/img/menu/especial.png",
},

{    
     id: 3,
     nombre: "MARGARITA",
     tipoDePizza: "PIZZA DEL PUEBLO",
     precio: 45.00,
     imagen: "/img/menu/margarita.png",
},

{    
     id: 4,
     nombre: "PEPERONI",
     tipoDePizza: "LA FAVORITA DEL BARRIO",
     precio: 50.00,
     imagen: "/img/menu/peperoni.png",
},

{    
     id: 5,
     nombre: "SUPREMA",
     tipoDePizza: "LA RECOMENDADA POR EL CHEF",
     precio: 85.00,
     imagen: "/img/menu/suprema.png",
},

{    
     id: 6,
     nombre: "DOBLE AMERICANA",
     tipoDePizza: "2 X 1",
     precio: 70.00,
     imagen: "/img/menu/americana.png",
},

{    
     id: 7,
     nombre: "INGREDIENTES FRESCOS",
     tipoDePizza: "ENSALADA EXTRA",
     precio: 18.00,
     imagen: "/img/ingredientes2.jpg",
},

{    
     id: 8,
     nombre: "LA CARNIVORA",
     tipoDePizza: "SUPER CARNE EXTRA",
     precio: 12.500,
     imagen: "/img/ingredientes4.jpg",
},

{    
     id: 9,
     nombre: "TRIPLE QUESO",
     tipoDePizza: "QUESO EXTREMO EXTRA",
     precio: 12.60,
     imagen: "/img/ingredientes1.jpg",
},

]

let contenedorDeProductos = document.getElementById("productos");
contenedorDeProductos.innerHTML = "";

productos.forEach( (producto, index) =>{
          let productoIndividual = document.createElement("div");
          productoIndividual.classList.add("producto");
          productoIndividual.innerHTML += `
          <div class="texto">
          <h3><b>${producto.nombre}</b></h3>
          <p>Tipo de Pizza: <br> <b>${producto.tipoDePizza}</b></p>
          <p>Precio: <b class= "precio">$${producto.precio}</b></p>
          </div>
          <div class= "contenedor-de-imagen-principal"> <img src= "${producto.imagen}" class="imagen-del-producto"></div>
               
          <div class= "agregar-al-carro">
          <button type="button" id= "agregar-al-carro" onClick="agregarAlCarro(${index})">Agregar al carrito</button>
          </div>
          <div class= "vacio"></div>`;
               
          contenedorDeProductos.appendChild(productoIndividual);
     })

// CARRITO DE COMPRAS

const carritoDeCompras = [];


const agregarAlCarro = (index)=> {
     const indiceExistenteEnElCarro = carritoDeCompras.findIndex((productoIndividual) =>{
          return productoIndividual.id === productos[index].id;
     });
     if(indiceExistenteEnElCarro === -1){
          const productoAgregado = productos[index];
          productoAgregado.cantidad = 1;
          carritoDeCompras.push(productoAgregado);
          productoMasUno();
          dibujarCarrito();
     } else {
          carritoDeCompras[indiceExistenteEnElCarro].cantidad += 1;
          productoMasUno();
          dibujarCarrito();
     }
}

let mostrarCarrito = document.getElementById("acceso-carrito");

const dibujarCarrito = ()=>{
     let totalProductosAgregados = 0;
     mostrarCarrito.innerHTML = "";
     if(carritoDeCompras.length > 0){      
          carritoDeCompras.forEach((productoEnCarro, index)=>{
               totalProductosAgregados = totalProductosAgregados + productoEnCarro.precio * productoEnCarro.cantidad;
               const nuevoProducto = document.createElement("div");
               nuevoProducto.innerHTML = 
               $('#acceso-carrito').prepend(`<br>
               <p>Producto <b>${productoEnCarro.nombre}</b></p>
               <p>Cantidad = ${productoEnCarro.cantidad}</p>
               <p>Precio <b>$${productoEnCarro.precio}</b></p>
               <p> Subtotal = <b>$${productoEnCarro.precio * productoEnCarro.cantidad}</b></p>
               <div class= "contenedor-de-imagen"> <img src= "${productoEnCarro.imagen}" class="imagen-del-carro"> </div>
               <button type="button" id="eliminar" onClick="borrarDelCarro(${index})">Eliminar</button>
               <hr>`);
               
          })
     }

     mostrarCarrito.innerHTML += `<div id= "contenedor-total-compra"><b>Total: $${totalProductosAgregados} </b>
      <button type= "button" id= "realizar-compra">Comprar</button> </div>`;

      const instanciaFinal = ()=>{
          $('#ultima-instancia').slideDown();
     } 
     
     $('#realizar-compra').click(instanciaFinal);

     $('#volver').click(400, function(){
          $('#ultima-instancia').slideUp();
     })
}


const borrarDelCarro = (index)=>{
     carritoDeCompras.splice(index, 1);
     dibujarCarrito();
}

const interactuarCarro = ()=>{
     $('#acceso-carrito').slideToggle(400, function () {
          $('#foto-carrito').toggleClass('foto-carrito-abierto');
     });
}

// CAMBIO DE MODO DE COLOR

const darkMode = ()=>{
     $('.switch').toggleClass('dark-mode');
     $('ul').toggleClass('dark-background');
     $('ul').toggleClass('light-text');
     $('body').toggleClass('mid-dark');
     $('#foto-carrito').toggleClass('light-cart');
     $('footer').toggleClass('dark-background');
     $('footer').toggleClass('light-text');
     $('.texto').toggleClass('dark-font');
     $('.producto div').toggleClass('mid-light');
     $('.producto div').toggleClass('mid-background');
     $('#productos').toggleClass('dark-border');
}

$('#switch').click(darkMode);

// FORMULARIO DE COMPRA

$('#carrito').click(interactuarCarro);

     $('#proceso-de-compra').append(`
     <form>
          <label for="nombre">Nombre</label>
                    <input type="text" placeholder="Nombre" id= "user-name" required>
          <label for="apellido">Apellido</label>
               <input type="text" placeholder="apellido" id= "last-name" required>
          <label for="email">Email</label>
               <input type="email" placeholder="email" id= "email" required>
          <label for="telefono">Teléfono</label>
               <input type="text" placeholder="Ej: 11 2345 6789" id= "number-phone" required>
          <label for="n-de-identificacion" id= "DNI" required>Cantidad de Pedido</label>
               <input type="number">
          <button type="submit" id="finalizar-compra">Realizar pedido</button>
     </form>`);

let finalizarCompra = document.getElementById('finalizar-compra');
let procesoDeCompra = document.getElementById('proceso-de-compra');

finalizarCompra.addEventListener('click', ()=>{
     procesoDeCompra.innerHTML = '<div id= "mensaje-de-compra"><p>¡Su compra ha sido realizada con exito! <br> Revise su bandeja de correo para más información</p></div>';
})

// GENERAL

window.onload = function () {
     let llamada = JSON.parse(localStorage.getItem("usuarioActual"));
     nombreDeUsuario.innerText = `¡Binvenid@ a WORLD PIZZA!`;

     nombreRGB();
}

const productoMasUno = ()=>{
     $('#masUno').fadeIn(2500).fadeOut();
}