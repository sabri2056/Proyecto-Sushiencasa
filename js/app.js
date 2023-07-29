const btnBorrarCarrito = document.getElementById("borrar-carrito");
const btnComprarCarrito = document.getElementById("comprar-carrito");

class Carrito {
  constructor() {
    this.productos = new Map();
  }

  Guardar() {
    localStorage.setItem(
      "carrito",
      JSON.stringify(Object.fromEntries(this.productos))
    );
  }

  Cargar() {
    if (localStorage.getItem("carrito") != null) {
      this.productos = new Map(
        Object.entries(JSON.parse(localStorage.getItem("carrito")))
      );
    } else {
      this.productos = new Map();
    }
  }

  Agregar(id, cantidad) {
    let cantidadNew = cantidad;
    if (this.productos.has("" + id)) {
      cantidadNew += this.productos.get("" + id);
    }
    this.productos.set(id, cantidadNew);
  }

  eliminarProducto(id) {
    let borrado = this.productos.delete(id);
    this.Guardar();
  }

  EliminarCantidad(id, cantidad) {
    if (this.productos.has(id)) {
      let cantidadActual = this.productos.get(id);
      if (cantidadActual > cantidad) {
        cantidadActual -= cantidad;
        this.productos.set(id, cantidadActual);
      } else {
        this.productos.delete(id);
      }
      this.Guardar();
    }
  }

  Eliminar() {
    this.productos.clear();
    this.Guardar();
  }
}

let newCarrito = new Carrito();
newCarrito.Cargar();

class Producto {
  constructor(id, nombre, precio, cantidad, imagen) {
    this.Id = id;
    this.Nombre = nombre;
    this.Precio = precio;
    this.Cantidad = cantidad;
    this.Imagen = imagen;
  }

  eliminarDelCarrito(carrito) {
    carrito.eliminarProducto(this.Id);
  }

  estaDisponible() {
    return this.Cantidad > 0;
  }

  mostrar() {
    if (this.estaDisponible()) {
      console.log(
        `%c${this.Nombre} - Precio: %c${this.Precio} - Cantidad: %c${this.Cantidad}`,
        "font-weight: bold;",
        "color: red;",
        "color: salmon;"
      );
    } else {
      console.log(
        `%c${this.Nombre} (No disponible)`,
        "font-weight: bold; color: red;"
      );
    }
  }
}

// Cargar los productos y actualizar los botones "Agregar al carrito" al cargar la página
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const productos = await cargarProductos();
    listaDeProductos = productos.map(
      (prod) =>
        new Producto(
          prod.id,
          prod.nombre,
          prod.precio,
          prod.cantidad,
          prod.imagen
        )
    );
    mostrarProductos(listaDeProductos);
    actualizarBotonesAgregar();
  } catch {
    Swal.fire({
      icon: "Danger",
      text: "Algo salió mal!",
    });

    listaDeProductos = []; // se asigna una lista vacía en caso de error
  }
});

// Cargar los productos desde el archivo data.json utilizando promesas
function cargarProductos() {
  return new Promise((resolve, reject) => {
    fetch("../json/data.json")
      .then((response) => response.json())
      .then((data) => {
        const productos = data.productos;
        resolve(productos);
      })
      .catch((error) => {
        console.error("Error al cargar los productos:", error);
        reject(error);
      });
  });
}

// Mostrar los productos en el carrito
function mostrarCarritoModal() {
  let precioTotal = 0;
  cartItems.innerHTML = "";

  newCarrito.Cargar();
  const carritoArray = [];

  newCarrito.productos.forEach((cantidad, idproducto) => {
    const producto = listaDeProductos.find(
      (prod) => prod.Id === parseInt(idproducto)
    );

    if (producto) {
      carritoArray.push({ ...producto, cantidad: cantidad });
      precioTotal += producto.Precio * cantidad;
    }
  });

  carritoArray.forEach((itemCarrito) => {
    const itemCarritoHTML = document.createElement("div");
    itemCarritoHTML.classList.add("item-carrito");
    itemCarritoHTML.innerHTML = `
      <h5>${itemCarrito.Nombre}</h5>
      <p>Precio: $${itemCarrito.Precio} | Cantidad: ${itemCarrito.cantidad}</p>
      <button class="btn btn-danger remove-btn" data-idproducto="${itemCarrito.Id}">Quitar</button>
    `;

    // Asignar el ID del producto al atributo data-idproducto
    const removeButton = itemCarritoHTML.querySelector(".remove-btn");
    removeButton.setAttribute("data-idproducto", itemCarrito.Id);
    removeButton.addEventListener("click", (e) => {
      const idproducto = removeButton.getAttribute("data-idproducto");
      eliminarProducto(idproducto);
      mostrarCarritoModal();
    });

    cartItems.appendChild(itemCarritoHTML);
    const separador = document.createElement("hr");
    cartItems.appendChild(separador);
  });

  const totalCarrito = document.createElement("div");
  totalCarrito.classList.add("total-carrito");
  totalCarrito.innerHTML = `Total: $${precioTotal.toFixed(2)}`;
  cartItems.appendChild(totalCarrito);

  // Mostrar u ocultar el botón "Comprar" según si hay productos en el carrito

  if (carritoArray.length > 0) {
    btnComprarCarrito.style.display = "block";
  } else {
    btnComprarCarrito.style.display = "none";
  }
}

// Eliminar la función restarProducto
function restarProducto(id) {
  newCarrito.EliminarCantidad(id, 1); //para restar de a uno
  mostrarCarritoModal();
}

// Mantener solo la función eliminarProducto
function eliminarProducto(id) {
  newCarrito.eliminarProducto(id);
  mostrarCarritoModal();
}

// Mostrar los productos en tu HTML
function mostrarProductos(productos) {
  const productosContainer = document.querySelector(".productos-container");
  productos.forEach((prod) => {
    const productoHTML = document.createElement("div");
    productoHTML.classList.add("producto", "product-card");
    productoHTML.innerHTML = `
      <img src="${prod.Imagen}" alt="${prod.Nombre}">
      <h2>${prod.Nombre}</h2>
      <p>Precio: $${prod.Precio}</p>
      <button class="agregar-carrito" data-id="${prod.Id}">Agregar al carrito</button>
    `;
    productosContainer.appendChild(productoHTML);
  });
}

// Actualizar los botones "Agregar al carrito" con el nombre y precio del producto
function actualizarBotonesAgregar() {
  const btnAddToCart = document.querySelectorAll(".agregar-carrito");
  btnAddToCart.forEach((btn) => {
    const id = parseInt(btn.getAttribute("data-id"));
    btn.textContent = "Agregar al carrito"; // Cambiamos el contenido del botón
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      newCarrito.Cargar();
      newCarrito.Agregar(id, 1);
      newCarrito.Guardar();
      Swal.fire({
        text: "Producto agregado al carrito!",
        background: "#f3f3f3",
        timer: 1000,
        imageWidth: 350,
        imageHeight: 300,
        showConfirmButton: false,
      });
      mostrarCarritoModal();
    });
  });
}

// Evento para abrir el modal del carrito al hacer clic en el botón "Ver carrito"
const btnVerCarrito = document.querySelector(
  '.btn.btn-primary[data-bs-target="#modal"]'
);
btnVerCarrito.addEventListener("click", () => {
  mostrarCarritoModal();
});

btnBorrarCarrito.addEventListener("click", () => {
  newCarrito.Eliminar();
  newCarrito.Guardar();
  mostrarCarritoModal();
});

// Evento de clic para el botón "Comprar"
btnComprarCarrito.addEventListener("click", () => {
  newCarrito.Eliminar();
  newCarrito.Guardar();
  mostrarCarritoModal();
  Swal.fire({
    icon: "success",
    title: "Compra realizada",
    background: "crimson",
    timer: 1500,
  });
});
