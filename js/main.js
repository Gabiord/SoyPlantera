//CARGAR PRODUCTOS AL DOM

let contenedorProductos = document.querySelector("#contenedorProductos");
const contenedorCarrito = document.querySelector('#contenedorCarrito');
const btnCats = document.querySelectorAll("#btnCat")
let btnAgregar = 0;
let inputCantidad = [];
let cantidad =0;
let carrito = JSON.parse(localStorage.getItem("productosCarrito"));




btnCats.forEach(btnCat => {
    btnCat.addEventListener('click', (evt)=>{
        console.log(btnCat.dataset.title)
        let productosElegidos = productos.filter(producto => producto.categoria === btnCat.dataset.title)
        if (btnCat.dataset.title !="Todos"){
            cargarProductos(productosElegidos);
        }
        else{
        cargarProductos(productos);
        }

    });
    
})

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML="";
    productosElegidos.forEach(producto => {

        const div=document.createElement("div");
        div.classList.add("tiendaProducto");
        div.innerHTML= `<ul>
                        <li><img src="${producto.imagen}" alt="${producto.nombre}"></li>
                        <li><span>${producto.nombre}</span></li>
                        <li><span>Precio: $ ${producto.precio}</span></li>
                        <li><button type="submit" id="btnAgregar" data-title="${producto.nombre}" data-price="${producto.precio}" data-image="${producto.imagen}">Agregar al Carrito</button></li>
                        </ul>`;
    
        contenedorProductos.append(div);
    })

    actualizarBtnAgregar();

    actualizarinputsCantidad();

}




//CARGAR PRODUCTOS AL DOM


// CARRITO 


function actualizarBtnAgregar() {

    btnAgregar = document.querySelectorAll("#btnAgregar");
    btnAgregar.forEach(btn => {
        btn.addEventListener("click", agregarProducto)
    })

}

function agregarProducto(evt){

    let title=evt.currentTarget.dataset.title;
    let price=evt.currentTarget.dataset.price;
    let image=evt.currentTarget.dataset.image;
    let qty = 1;

    if(carrito.some(producto => producto.titulo === title)){
        const index = carrito.findIndex(producto => producto.titulo === title)
        
        carrito[index].cantidad+=1;

    }
    else{
        carrito.push({
            titulo: title,
            precio: price,
            cantidad: qty,
            imagen: image
        });
    }

    actualizarCarrito();
    console.log(carrito)

}


actualizarCarrito(carrito);

cargarProductos(productos);


function actualizarCarrito(){
    let renderCarrito="";
    let contenedorCarrito=document.querySelector('#contenedorCarrito')
    
    if (carrito.length>0){
        for(producto of carrito){
            renderCarrito+=` <div class="productoCarrito">
                    <img src="${producto.imagen}" alt="imagen carrito">
                        <div>
                            <p>${producto.titulo}</p>
                            <p>$ ${producto.precio}</p>
                            <p>Cantidad: ${producto.cantidad}
                        </div>
                    <button class="btnBorrar" id="${producto.titulo}" data-price="${producto.precio}" data-image="${producto.imagen}">Borrar</button>
                    </div>`
        }
    }
    else{
            renderCarrito=`<p>Tu carrito esta vacio</p>`
        }
    
    contenedorCarrito.innerHTML=renderCarrito;    

    const btnBorrars=document.querySelectorAll(".btnBorrar");  // Para eliminar productos del Carrito
    btnBorrars.forEach(btnBorrar => {
        btnBorrar.addEventListener('click', ()=>{
            const index=carrito.findIndex(producto => producto.titulo === btnBorrar.id)
            carrito.splice(index,1)
            actualizarCarrito();
        })
    })

    localStorage.setItem("productosCarrito", JSON.stringify(carrito))
}

const btnCarritoCancelar= document.querySelector("#btnCarritoCancelar"); // Para eliminar todo el carrito.

btnCarritoCancelar.addEventListener("click", borrarCarrito);

function borrarCarrito(){
    console.log("borrado carrito")
    carrito=[];
    actualizarCarrito();
}

// CARRITO




