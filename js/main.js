//DECLARACION DE VARIABLES

let contenedorProductos = document.querySelector("#contenedorProductos");
const contenedorCarrito = document.querySelector('#contenedorCarrito');
const btnCats = document.querySelectorAll("#btnCat");
let btnAgregar = 0;
let inputCantidad = [];
let cantidad =0;
let precioTotal = document.querySelector("#precioTotal");
let carrito = [];


// VERIFICANCO EL LOCAL STORAGE 

localStorage.length>0 ? carrito = JSON.parse(localStorage.getItem("productosCarrito")) : localStorage.setItem("productosCarrito", JSON.stringify(carrito));

//  FUNCIONES

async function getProductosDB() {
    const resp = await fetch("../js/db.json");
    const data = await resp.json();
    return data;
    }

async function filtradoProductos(){
    const productos= await getProductosDB();    
    cargarProductos(productos);
    btnCats.forEach(btnCat => {
        btnCat.addEventListener('click', (evt)=>{
            let productosElegidos = productos.filter(producto => producto.categoria === btnCat.dataset.title)
            cargarProductos(btnCat.dataset.title !="Todos" ? productosElegidos : productos);
        });
    })
}

async function cargarProductos(productosElegidos) {
    const productos= await getProductosDB(); 
    contenedorProductos.innerHTML="";
    productosElegidos.forEach(producto => {

        const div=document.createElement("div");
        div.classList.add("col-sm-6");
        div.classList.add("col-md-4");
        div.classList.add("col-lg-3");
        div.innerHTML= `
                    <ul>
                        <li><img src="${producto.imagen}" alt="${producto.nombre}"></li>
                        <li><span>${producto.nombre}</span></li>
                        <li><span>Precio: $ ${producto.precio}</span></li>
                        <li><button class="botonesProductos" type="submit" id="btnAgregar" data-title="${producto.nombre}" data-price="${producto.precio}" data-image="${producto.imagen}" data-info="${producto.informacion}">Agregar al Carrito</button></li>
                    </ul>`;
        contenedorProductos.append(div);
    })

    actualizarBtnAgregar();
}

function actualizarBtnAgregar() {

    btnAgregar = document.querySelectorAll("#btnAgregar");
    btnAgregar.forEach(btn => {
        btn.addEventListener("click", agregarProducto)
    })

}

function agregarProducto(evt){

    let title=evt.currentTarget.dataset.title;
    let price=Number(evt.currentTarget.dataset.price);
    let image=evt.currentTarget.dataset.image;
    let qty = Number(1);
    let informacion=evt.currentTarget.dataset.info;

    if(carrito.some(producto => producto.titulo === title)){
        const index = carrito.findIndex(producto => producto.titulo === title)
        carrito[index].cantidad+=1;
        carrito[index].total=price*carrito[index].cantidad;
    }
    
    else{
        carrito.push({
            titulo: title,
            precio: Number(price),
            cantidad: Number(qty),
            descripcion:informacion,
            imagen: image,
            total:price*qty
        });
    }

    actualizarCarrito();
    
    Toastify({
        text: `${producto.titulo} se ha agregado al carrito`,
        className: "info",
        style: {
          background: "#AC6FE5",
        }
      }).showToast();

}

function actualizarCarrito(){
    let renderCarrito="";
    let contenedorCarrito=document.querySelector('#contenedorCarrito')
    
    if (carrito.length>0){
        for(producto of carrito){
            renderCarrito+=` <div class="productoCarrito parrafos">
                    <img src="${producto.imagen}" alt="imagen carrito">
                        <div>
                            <p>${producto.titulo}</p>
                            <p>$ ${producto.precio}</p>
                            <span>Cantidad: <input class="cantidadModificada" type="number" name="Cantidad" id="${producto.titulo}" value="${producto.cantidad}" min=1></span>
                        </div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash btnBorrar" id="${producto.titulo}" data-title="${producto.precio}" data-image="${producto.imagen}" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>    
                    </div>`
        }
    }

    else{
            renderCarrito=`<p>Tu carrito esta vacio</p>`
    }
    
    contenedorCarrito.innerHTML=renderCarrito;
    
    const total = carrito.reduce((acumulador, producto) => acumulador+(producto.total), 0);
    precioTotal.innerHTML=`Precio Total: $${total}`  
    
    const btnBorrars=document.querySelectorAll(".btnBorrar");  // Para eliminar productos del Carrito
    btnBorrars.forEach(btnBorrar => {
    btnBorrar.addEventListener('click', ()=>{
        const index=carrito.findIndex(producto => producto.titulo === btnBorrar.id)
        carrito.splice(index,1)
        actualizarCarrito();
    })})

    const cantidadModificada=document.querySelectorAll(".cantidadModificada") // Para modificar cantidad en productos en carrito
    cantidadModificada.forEach(valor => valor.addEventListener("input",()=>{
        const index=carrito.findIndex(producto => producto.titulo === valor.id)
        carrito[index].cantidad = valor.value;
        carrito[index].total = carrito[index].precio*carrito[index].cantidad;
        actualizarCarrito();
    }))

    localStorage.setItem("productosCarrito", JSON.stringify(carrito))

    
}

const btnCarritoCancelar= document.querySelector("#btnCarritoCancelar"); // Para eliminar todo el carrito.
btnCarritoCancelar.addEventListener("click", borrarCarrito);

function borrarCarrito(){
    carrito=[];
    actualizarCarrito();
}


// LLAMADO A FUNCIONES

actualizarCarrito(carrito);

filtradoProductos();
