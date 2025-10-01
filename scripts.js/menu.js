document.addEventListener("DOMContentLoaded", () => {

  //Toma clases del css guardandolas en Variables.
  const carritoIcono = document.querySelector('.Carrito');
  const popup = document.getElementById('popup-carrito');
  const cerrarBtn = document.getElementById('cerrar-popup');
  const comprarBtn = document.getElementById('comprar-popup');
  const listaCarrito = document.getElementById('lista-carrito');
  const totalCarrito = document.getElementById('total-carrito');
  let carrito = [];

  //Muestra la ventana del carrito con las modificaciones del css y el los productos actualizados de la
  // funcion de mas abajo.
  carritoIcono.addEventListener('click', () => {
    popup.classList.toggle('oculto'); 
    renderizarCarrito(); 
  });

  //Al hacer click en el botón de cerrar, se oculta el popup (tambien usando el css)
  cerrarBtn.addEventListener('click', () => {
    popup.classList.add('oculto'); 
  });

  comprarBtn.addEventListener('click', () =>{
    alert("Se ha tramitado la compra");
    popup.classList.add('oculto');
    carrito.length = 0;
  })

  //Recorre todos los productos en pantalla y agregarles el evento de click
  document.querySelectorAll('.pizza-box').forEach(item => {
    item.addEventListener('click', () => {
      //Obteniene los datos del producto desde los atributos personalizados HTML
      const id = item.dataset.id;
      const nombre = item.dataset.nombre;
      const precio = parseInt(item.dataset.precio); //Lo pasa a Int

      //Busca si ese producto ya fue agregado al carrito
      const productoExistente = carrito.find(p => p.id === id);

      if (productoExistente) {
        //Si ya está en el carrito, simplemente se le suma 1 a la cantidad
        productoExistente.cantidad++;
      } else {
        //Si no estaba en el carrito, lo agregamos con cantidad 1
        carrito.push({ id, nombre, precio, cantidad: 1 });
      }

       // ⚡ Aplicar clase de animación visual al producto
      item.classList.add('cambioColor');
      setTimeout(() => item.classList.remove('cambioColor'), 800); // quita la clase luego de animar

      //Actualizar visualmente el carrito
      renderizarCarrito();
    });
  });

  //Esta función se encarga de mostrar los productos en el carrito  (ya usada mas arriba)
  function renderizarCarrito() {
    // Limpiar la lista antes de volver a escribirla
    listaCarrito.innerHTML = '';
    let total = 0;

    //Recorre cada producto del carrito
    carrito.forEach(item => {
      // Crea un <li> para mostrar el producto con el inner html
      const li = document.createElement('li');
      li.innerHTML = `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}
        <button class="eliminar-item" data-id="${item.id}">❌</button>`;
      
      // Agregar el <li> a la lista
      listaCarrito.appendChild(li);

      //Suma al total
      total += item.precio * item.cantidad;
    });

    //Mostrar el total final
    totalCarrito.textContent = `Total: $${total}`;

    //Activar botones de eliminar producto
    document.querySelectorAll('.eliminar-item').forEach(boton => {
      boton.addEventListener('click', e => {
        const idEliminar = e.target.dataset.id;
        // Eliminar el producto del carrito filtrando por ID
        carrito = carrito.filter(item => item.id !== idEliminar);

        //Volver a renderizar el carrito actualizado
        renderizarCarrito();
      });
    });
  }
});
