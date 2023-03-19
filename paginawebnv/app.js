// Obtener los elementos del DOM necesarios
const carrito = document.querySelector(".lista-carrito");
const total = document.querySelector(".total");
const cartTableBody = document.querySelector(".cart-table tbody");
const cartTable = document.querySelector(".cart-table");
const cartTotal = document.querySelector(".cart-total");
const emptyCartButton = document.querySelector(".vaciar-carrito");
const checkoutButton = document.querySelector(".finalizar-compra");

// Arreglo que contiene los productos en el carrito de compras
let carritoItems = [];

// Función que agrega un producto al carrito
function agregarProductoAlCarrito(e) {
  // Prevenir la acción por defecto del botón
  e.preventDefault();
  // Obtener la información del producto
  const producto = e.target.parentElement;
  const productoId = producto.querySelector(".addToCart").getAttribute("data-id");
  const productoNombre = producto.querySelector("h2").textContent;
  const productoPrecio = producto.querySelector("p").textContent.slice(9);
  // Crear un objeto para el producto
  const productoEnCarrito = {
    id: productoId,
    nombre: productoNombre,
    precio: productoPrecio,
    cantidad: 1,
  };
  // Revisar si el producto ya está en el carrito
  const productoExistente = carritoItems.find((item) => item.id === productoId);
  if (productoExistente) {
    // Si el producto ya está en el carrito, aumentar la cantidad en 1
    productoExistente.cantidad++;
  } else {
    // Si el producto no está en el carrito, agregarlo al arreglo de productos en el carrito
    carritoItems.push(productoEnCarrito);
  }
  // Actualizar el carrito en la página
  actualizarCarrito();
}

// Función que actualiza el carrito en la página
function actualizarCarrito() {
  // Limpiar el carrito actual
  limpiarCarrito();
  // Actualizar la tabla del carrito con los nuevos productos
  carritoItems.forEach((producto) => {
    // Crear una fila para el producto en la tabla
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${producto.precio}</td>
      <td><input class="cantidad-producto" type="number" min="1" value="${producto.cantidad}"></td>
      <td>$${producto.cantidad * producto.precio}</td>
      <td><button class="eliminar-producto" data-id="${producto.id}">Eliminar</button></td>
      `;
      // Agregar la fila a la tabla
      cartTableBody.appendChild(row);
      });
      // Actualizar el total del carrito
      actualizarTotalCarrito();
      // Guardar el carrito en el almacenamiento local
      localStorage.setItem("carritoItems", JSON.stringify(carritoItems));
      }
      
      // Función que limpia el carrito actual
      function limpiarCarrito() {
      while (cartTableBody.firstChild) {
      cartTableBody.removeChild(cartTableBody.firstChild);
      }
      }
      
      // Función que actualiza el total del carrito
      function actualizarTotalCarrito() {
      // Calcular el total del carrito
      let totalCarrito = 0;
      carritoItems.forEach((producto) => {
      totalCarrito += producto.cantidad * producto.precio;
      });
      // Actualizar el total en la página
      cartTotal.textContent = $$ (totalCarrito.toFixed(2));
      // Actualizar el total en el almacenamiento local
      localStorage.setItem("totalCarrito", totalCarrito.toFixed(2));
      }
      
      // Función que vacía el carrito
      function vaciarCarrito() {
      // Limpiar el arreglo de productos en el carrito
      carritoItems = [];
      // Actualizar el carrito en la página
      actualizarCarrito();
      // Borrar el carrito del almacenamiento local
      localStorage.removeItem("carritoItems");
      localStorage.removeItem("totalCarrito");
      }
      
      // Función que elimina un producto del carrito
      function eliminarProductoDelCarrito(e) {
      // Obtener el ID del producto
      const productoId = e.target.getAttribute("data-id");
      // Obtener el índice del producto en el arreglo de productos en el carrito
      const productoIndex = carritoItems.findIndex((item) => item.id === productoId);
      // Eliminar el producto del arreglo de productos en el carrito
      carritoItems.splice(productoIndex, 1);
      // Actualizar el carrito en la página
      actualizarCarrito();
      // Actualizar el almacenamiento local
      localStorage.setItem("carritoItems", JSON.stringify(carritoItems));
      }
      
      // Función que muestra los productos del carrito guardados en el almacenamiento local
      function mostrarCarritoGuardado() {
      // Obtener los productos del carrito del almacenamiento local
      const carritoItemsGuardado = JSON.parse(localStorage.getItem("carritoItems"));
      if (carritoItemsGuardado) {
      // Agregar los productos del carrito guardados al arreglo de productos en el carrito
      carritoItems = carritoItemsGuardado;
      // Actualizar el carrito en la página
      actualizarCarrito();
      }
      // Obtener el total del carrito del almacenamiento local
      const totalCarritoGuardado = localStorage.getItem("totalCarrito");
      if (totalCarritoGuardado) {
      // Actualizar el total del carrito en la página
      cartTotal.textContent = $$(totalCarritoGuardado);
      }
      }
      
      // Agregar un evento al botón "Agregar al carrito" de cada producto
      document.querySelectorAll(".addToCart").forEach((boton) => {
      boton.addEventListener("click", agregarProductoAlCarrito);
      });
      
      // Agregar un evento al botón "Vaciar carrito"
      emptyCartButton.addEventListener("click", vaciarCarrito);
      
      // Agregar un evento al botón "Eliminar" de cada producto en el carrito
      document.addEventListener("click", (e) => {
      if (e.target.classList.contains("eliminar-producto")) {
      eliminarProductoDelCarrito(e);
      }
      });
      
      //
