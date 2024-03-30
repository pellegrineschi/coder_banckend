const socket = io();

socket.on('newProduct',()=>{
  location.reload();  
})


