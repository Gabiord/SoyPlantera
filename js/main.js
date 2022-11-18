const contenedorProductos = document.querySelector("#contenedorProductos");
const contenedorCarrito = document.querySelector('#contenedorCarrito');


function cargarProductos() {

    productos.forEach(producto => {

        const div=document.createElement("div");
        div.classList.add("tiendaProducto");
        div.innerHTML= `<ul>
                        <li><img src="${producto.imagen}" alt="${producto.nombre}"></li>
                        <li><span>${producto.nombre}</span></li>
                        <li><span>${producto.precio}</span></li>
                        <li><button id="botonAgregar"  data-title="${producto.nombre}" data-price="${producto.precio}" data-image="${producto.imagen}">Agregar</button></li>
                        </ul>`;
    
        contenedorProductos.append(div);
})

}

cargarProductos();

let carrito=[];

let botonAgregar=document.querySelectorAll("#botonAgregar");

for (let i = 0; i < botonAgregar.length; i+=1) {
    botonAgregar[i].addEventListener('click', agregarProducto);
}

function agregarProducto(evt){
    console.log('se agrego un producto al carrito');
    console.log(evt.currentTarget.dataset.title);
    console.log(evt.currentTarget.dataset.price);

    let title=evt.currentTarget.dataset.title;
    let price=evt.currentTarget.dataset.price;
    let image=evt.currentTarget.dataset.image;

    carrito.push({
        titulo: title,
        precio: price,
        imagen: image
    });
    actualizarCarrito();
    console.log(carrito)
}


function actualizarCarrito(){
    let html="";
    if (carrito.length>0){
        for(producto of carrito){
            html+=` <div class="productoCarrito">
                    <img src="${producto.imagen}" alt="imagen carrito">
                        <div>
                            <p>${producto.titulo}</p>
                            <p>${producto.precio}</p>
                        </div>
                    <button id="botonBorrar" data-title="${producto.nombre}" data-price="${producto.precio}" data-image="${producto.imagen}">Borrar</button>
                    </div>`
        }}
    else{
            html=`<p>Tu carrito esta vacio</p>`
        }

    let div=document.querySelector('#contenedorCarrito')
    div.innerHTML=html
}

const btnCarritoCancelar= document.querySelector("#btnCarritoCancelar");

btnCarritoCancelar.addEventListener("click", borrarCarrito);

function borrarCarrito(){
    console.log("borrado carrito")
    carrito=[];
    actualizarCarrito();
}




