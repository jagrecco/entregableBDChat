const socket = io();

const input = document.getElementById("inputChat");

document.getElementById("enviarChat").addEventListener("click", () => {

  if (document.getElementById('inputMail').value!==""){
    
    const date = new Date();
    const output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear() + " " +date.toLocaleTimeString("es-ES");
    
    const mensaje = {
      mail: document.getElementById('inputMail').value,
      message: document.getElementById('inputChat').value,
      time: output
    }

    socket.emit("mensaje", mensaje)
    
    limpiaChat()

  } else {
    document.getElementById("inputMail").focus()
  }

});

document.getElementById("productos").addEventListener("click", ()=>{
  
  let prod={name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            thumbnail: document.getElementById("thumbnail").value}
  
  socket.emit("producto", prod)
  
})

function eliminarProducto (idProducto){
  
  let prod={name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            thumbnail: document.getElementById("thumbnail").value,
            id: idProducto}
  
  socket.emit("producto", prod)

}


socket.on("mensajes", (mensajes) => {

  const mensajesInput = mensajes
    .map(
      (mensaje) =>
      `<p class="mailMensaje boxMensajes">${mensaje.mail}</p> <p class="fechaMensaje boxMensajes">[${mensaje.time}]</p> <p class="txtMensaje boxMensajes"> ${mensaje.message}</p>`
    
    )
    .join("<br>");
  document.getElementById("msg").innerHTML = mensajesInput;
});


socket.on("productos", (data) => {

  let tablaHtml=""

  for (let i=0; i<data.length; i++) {

    const rowImpar="table-primary"
    const rowPar="table-secondary"

    if (i%2) {
      tablaHtml +=`<tr class="${rowImpar}">`
      tablaHtml +=`<td>${data[i].name}</td>`
      tablaHtml +=`<td>$${data[i].price}</td>`
      tablaHtml +=`<td class="imagen"><img src=${data[i].thumbnail}></td>` //</tr>
      tablaHtml +=`<td><button onclick="eliminarProducto(${data[i].id})" value=${data[i].id} id="eliminarProducto" type="submit" class="btn btn-primary">Del</button></tr>`

    } else {
      
      tablaHtml+=`<tr class="${rowPar}">`
      tablaHtml+=`<td>${data[i].name}</td>`
      tablaHtml+=`<td>$${data[i].price}</td>`
      tablaHtml+=`<td class="imagen"><img src=${data[i].thumbnail}></td>`
      tablaHtml+=`<td><button onclick="eliminarProducto(${data[i].id})" value=${data[i].id} id="eliminarProducto" type="submit" class="btn btn-primary">Del</button></tr>`
      
    }
  }

  document.getElementById("cuerpoTabla").innerHTML=tablaHtml

  });
  
  function limpiaChat() {  
    document.getElementById("inputChat").value="";
  }

  document.getElementById("inputChat")
    .addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            document.getElementById("enviarChat").click();
        }
    });