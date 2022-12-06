const contenedorResumenCarrito=document.querySelector("#resumenCarrito")

function cargarResumenCarrito(){
    
    contenedorResumenCarrito.innerHTML=""
    carrito.forEach(producto => {
        const li=document.createElement("li");
        li.classList.add("list-group-item");
        li.classList.add("d-flex");
        li.classList.add("justify-content-between");
        li.classList.add("lh-condensed");
        li.innerHTML=`
                <div>
                    <h6 class="my-0">${producto.titulo}</h6>
                    <small class="text-muted">Tamaño: ${producto.descripcion}</small>
                </div>
                <span class="text-muted">${producto.total}</span>`;
        contenedorResumenCarrito.append(li)        
    })
}

cargarResumenCarrito();


const contenedorTotalCarrito=document.querySelector("#totalCarrito")

function cargarTotalCarrito(){

    const total = carrito.reduce((acumulador, producto) => acumulador+(producto.total), 0);
    precioTotal.innerHTML=`Precio Total: $${total}` 

    contenedorTotalCarrito.innerHTML="";
    const li=document.createElement("li");
    li.classList.add("list-group-item");
    li.classList.add("d-flex");
    li.classList.add("justify-content-between");
    li.innerHTML=`
            <span>Total ($UY)</span>
            <strong>$ ${total}</strong>`
    contenedorTotalCarrito.append(li)
}

cargarTotalCarrito();

let nuevaVenta=[];

const formularioCliente = document.querySelector("#formularioCliente")
const nombreCliente = document.querySelector("#firstName");
const apellidoCliente = document.querySelector("#lastName");
const direccionCliente = document.querySelector("#address");
const direccion2Cliente = document.querySelector("#address-2");
const paisCliente = document.querySelector("#country");
const departamentoCliente = document.querySelector("#state");
const zipCodeCliente = document.querySelector("#zip");
const creditoMP = document.querySelector("#credit");
const debitoMP = document.querySelector("#debit");
const mercadopagoMP = document.querySelector("#mercadopago");
const titularTarjetaMP = document.querySelector("#cc-name");
const numeroTarjetaMP = document.querySelector("#cc-number");
const fechaTarjetaMP = document.querySelector("#cc-expiration");
const codigoValMP = document.querySelector("#cc-cvv");

const procesarPedido = document.querySelector("#procesarpedido");


procesarPedido.addEventListener("click",cargarpedido);


function cargarpedido(evt){

    if (carrito.length>0){
        evt.preventDefault();
        nuevaVenta.push(
            {
            carrito,
            nombreCliente:nombreCliente.value,
            apellidoCliente:apellidoCliente.value,
            direccionCliente:direccionCliente.value,
            direccion2Cliente:direccion2Cliente.value,
            paisCliente:paisCliente.value,
            departamentoCliente:departamentoCliente.value,
            ZipCodeCliente:zipCodeCliente.value,
            }
        )

        formularioCliente.reset();
        borrarCarrito();
        cargarResumenCarrito();
        cargarTotalCarrito();
        
        Swal.fire(
            'Gracias por tu compra!',
            'En breve nos comunicaremos contigo',
            'success'
          )
    }    
    else{ 
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El carrito esta Vacio!',
          footer: '<a href="../pages/tienda.html">Ve a llenarlo en la tienda</a>'
        })
    }  
}


