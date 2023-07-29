console.log("conectado");

<<<<<<< HEAD
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
    if (this.productos.has(""+id)) {
      cantidadNew += this.productos.get(""+id);
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
=======

class Carrito {
  constructor() {
    this.productos = new Map();
>>>>>>> 660ffce3fa5db0efea2174802fee95b4079f8d61
  }
  Eliminar() {
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
    if (this.productos.has(id)) {
      cantidadNew += this.productos.get(id);
    }
    this.productos.set(id, cantidadNew);
  }
   
}
let newCarrit = new Carrito ()
newCarrit.Cargar();

<<<<<<< HEAD
let newCarrito = new Carrito();
newCarrito.Cargar();

class Producto {
  constructor(id, nombre, precio, cantidad, imagen) {
=======



class Producto {
  constructor(id, nombre, precio, cantidad) {
>>>>>>> 660ffce3fa5db0efea2174802fee95b4079f8d61
    this.Id = id;
    this.Nombre = nombre;
    this.Precio = precio;
    this.Cantidad = cantidad;
<<<<<<< HEAD
    this.Imagen = imagen;
  }

  eliminarDelCarrito(carrito) {
    carrito.eliminarProducto(this.Id);
  }


  estaDisponible() {
    return this.Cantidad > 0;
  }

=======
  }

  estaDisponible() {
    return this.Cantidad > 0;
  }
>>>>>>> 660ffce3fa5db0efea2174802fee95b4079f8d61
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
<<<<<<< HEAD
 }

// Cargar los productos y actualizar los botones "Agregar al carrito" al cargar la página
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const productos = await cargarProductos();
    listaDeProductos = productos.map(
      (prod) => new Producto(prod.id, prod.nombre, prod.precio, prod.cantidad, prod.imagen)
    );
    mostrarProductos(listaDeProductos);
    actualizarBotonesAgregar();
  } catch {
    Swal.fire({
      icon: "Danger",
      text: "Algo salió mal!"
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
    const producto = listaDeProductos.find((prod) => prod.Id === parseInt(idproducto));

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
    });

    cartItems.appendChild(itemCarritoHTML);
    const separador = document.createElement("hr");
    cartItems.appendChild(separador);
  });

  // Mostrar u ocultar el botón "Comprar" según si hay productos en el carrito
  const btnComprarCarrito = document.getElementById("comprar-carrito");
  if (carritoArray.length > 0) {
    btnComprarCarrito.style.display = "block";
  } else {
    btnComprarCarrito.style.display = "none";
  }

  const totalCarrito = document.createElement("div");
  totalCarrito.classList.add("total-carrito");
  totalCarrito.innerHTML = `Total: $${precioTotal.toFixed(2)}`;
  cartItems.appendChild(totalCarrito);

  // Evento de clic para el botón "Comprar"
  btnComprarCarrito.addEventListener("click", () => {
    Swal.fire({
      icon: "success",
      title: "Compra realizada",
      background: "crimson",
      timer: 1500,
  })
});

  const btnBorrarCarrito = document.getElementById("borrar-carrito");
  btnBorrarCarrito.addEventListener("click", () => {
    newCarrito.Eliminar();
    newCarrito.Guardar();
    mostrarCarritoModal();
  });
}




// Eliminar la función restarProducto
function restarProducto(id) {
  newCarrito.EliminarCantidad(id, 1);  //para restar de a uno
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
const btnVerCarrito = document.querySelector('.btn.btn-primary[data-bs-target="#modal"]');
btnVerCarrito.addEventListener("click", () => {
  mostrarCarritoModal();
});

const btnBorrarCarrito = document.getElementById('borrar-carrito');
btnBorrarCarrito.addEventListener("click", () => {
  newCarrito.Eliminar();
  newCarrito.Guardar();
  mostrarCarritoModal();
});
=======
}

//Array
const listaDeProductos = [
  new Producto(1, "Bolitas de salmón con queso saborizado", 1500, 100),
  new Producto(2, "Langostinos rebozados", 600, 100),
  new Producto(3, "Empanada china", 300, 100),
  new Producto(4, "Hot Rolls - New York", 3500, 10),
  new Producto(5, "Hot Rolls - Philadelphia", 2500, 60),
  // new Producto(6, "Hot Rolls - Shrimp", 4500, 100),
  // new Producto(7, "Hot Rolls - Veggi", 2500, 50),
  // new Producto(8, "Hot Rolls - Honey", 3200, 80),
  // new Producto(9, "Viandas - Personalizada", 1500, 75),
  // new Producto(10, "Viandas - Ejecutivo", 1500, 5),
  // new Producto(11, "Viandas - Tradicional", 1500, 35),
  // new Producto(12, "Viandas - Opcion del dia", 1500, 100),
  // new Producto(13, "Combos - Salmon, Langostinos, Kanikama", 5500, 100),
  // new Producto(14, "Combos - Salmon, Langostinos", 6500, 90),
  // new Producto(15, "Combos - Todo Tamago", 7500, 25),
  // new Producto(15, "Combos - Premiun", 8500, 65),
  // new Producto(16, "Combos - Todo Salmon", 7500, 28),
  // new Producto(17, "Combos - Vegui", 6500, 0),
];


// Obtén la lista de productos del DOM
document.addEventListener("DOMContentLoaded", function () {
  // Obtén la lista de botones "Agregar al carrito"
  const btnAddToCart = document.querySelectorAll(".btn-add-cart");

  // Agrega un evento click a cada botón
  btnAddToCart.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      newCarrit.Cargar();
      

      const id = btn.getAttribute("data-id");
    newCarrit.Agregar(id,1 );
    newCarrit.Guardar();

      console.log("Producto agregado al carrito:", newCarrit);
    });
  });
});



// Mostrar los productos en el carrito
function mostrarCarritoModal() {
  const cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  newCarrit.productos.forEach(idproducto => 

  {
    const producto = listaDeProductos.find(prod => prod.Id === idproducto)
    
    const itemCarrito = document.createElement("div");
    itemCarrito.classList.add("item-carrito");
    itemCarrito.innerHTML = `
      <h5>${producto.Nombre}</h5>
      <p>Precio: $${producto.Precio} | Cantidad: ${newCarrit.productos.get(idproducto.toString())}</p>
    `;
    cartItems.appendChild(itemCarrito);
    const separador = document.createElement("hr");
    cartItems.appendChild(separador);
  });
}

//Evento para abrir el modal del carrito al hacer clic en el botón "Ver carrito"
const btnVerCarrito = document.querySelector(
'.btn.btn-primary[data-bs-target="#modal"]'
);
btnVerCarrito.addEventListener("click", () => {
  mostrarCarritoModal();
});

const btnborrarCarrito = document.getElementById(
  'borrar'
  );
  btnborrarCarrito.addEventListener("click", () => {
   newCarrit.Eliminar()
   newCarrit.Guardar()
    mostrarCarritoModal();
  });





>>>>>>> 660ffce3fa5db0efea2174802fee95b4079f8d61
