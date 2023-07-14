console.log("conectado");


class Carrito {
  constructor() {
    this.productos = new Map();
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




class Producto {
  constructor(id, nombre, precio, cantidad) {
    this.Id = id;
    this.Nombre = nombre;
    this.Precio = precio;
    this.Cantidad = cantidad;
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





