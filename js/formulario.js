// FORMULARIO DE CONTACTO

datosClientes=[];

const datosNombreyApellido=document.querySelector("#datosNombreyApellido");
const datosTelefono=document.querySelector("#datosTelefono");
const datosEmail=document.querySelector("#datosEmail");
const datosMensaje=document.querySelector("#datosMensaje");
const datosNotificaciones=document.querySelector("#datosNotificaciones");
const submitFormulario=document.querySelector("#submitFormulario");


submitFormulario.addEventListener("click",guardarDatosContacto)

function guardarDatosContacto(evt){

    evt.preventDefault()
    // const nombreApellido = datosNombreyApellido.value
    
    datosClientes.push(
        {
            nombreApellido: datosNombreyApellido.value,
            telefono: datosTelefono.value,
            email:datosEmail.value,
            preguntaNotificacion:datosNotificaciones.checked
        }
    )
    console.log(datosClientes);

}
