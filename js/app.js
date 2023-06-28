console.log("conectado");

function saludarYPromos() {
  let respuesta = prompt("Bienvenido!!! ¿Deseas saber las promos del mes? (Responde 'Sí' o 'No')");

  if (respuesta == "si") {
    console.log("%cAquí están las promos del mes: Con la compra de Combos recibes una bebida gratis!!", "color: red");
    console.log("%c- Descuento del 10% si retiras el pedido", "color: red");
  } else {
    console.log("%cGracias Que tengas un buen día", "color: blue");
  }
}



saludarYPromos();


class Producto {
  constructor(nombre, precio, cantidad) {
    this.Nombre = nombre;
    this.Precio = precio;
    this.Cantidad = cantidad;
    this.disponible = true;
  }
  estaDisponible(){
    return this.Cantidad > 0;
    
  }
  mostrar(){
    if (this.estaDisponible ()) {
      console.log(`%c${this.Nombre} - Precio: %c${this.Precio} - Cantidad: %c${this.Cantidad}`, "font-weight: bold;", "color: red;", "color: salmon;");
    } else {
      console.log(`%c${this.Nombre} (No disponible)`, "font-weight: bold; color: red;");
    }
  }
}

const listaDeProductos = [];

listaDeProductos.push(new Producto("Bolitas de salmón con queso saborizado", 1500, 100));
listaDeProductos.push(new Producto("Langostinos rebozados", 600, 100));
listaDeProductos.push(new Producto("Empanada china", 300, 100));
listaDeProductos.push(new Producto("Hot Rolls - New York", 3500, 10));
listaDeProductos.push(new Producto("Hot Rolls - Philadelphia", 2500, 60));
listaDeProductos.push(new Producto("Hot Rolls - Shrimp", 4500, 100));
listaDeProductos.push(new Producto("Hot Rolls - Veggi", 2500, 50));
listaDeProductos.push(new Producto("Hot Rolls - Honey", 3200, 80));
listaDeProductos.push(new Producto("Viandas - Personalizada", 1500, 75));
listaDeProductos.push(new Producto("Viandas - Ejecutivo", 1500, 5));
listaDeProductos.push(new Producto("Viandas - Tradicional", 1500, 35));
listaDeProductos.push(new Producto("Viandas - Opcion del dia", 1500, 100));
listaDeProductos.push(new Producto("Combos - Salmon, Langostinos, Kanikama", 5500, 100));
listaDeProductos.push(new Producto("Combos - Salmon, Langostinos", 6500, 90));
listaDeProductos.push(new Producto("Combos - Todo Tamago", 7500, 25));
listaDeProductos.push(new Producto("Combos - Premiun", 8500, 65));
listaDeProductos.push(new Producto("Combos - Todo Salmon", 7500, 28));
listaDeProductos.push(new Producto("Combos - Vegui", 6500, 0));

console.log("%cLista de productos disponibles:", "color: green; font-weight: bold;");

for (let i = 0; i < listaDeProductos.length; i++) {
  let producto = listaDeProductos[i];
  producto.mostrar();

}


function buscarProducto() {
  let buscar = prompt("¿Cuál es tu antojo del día?");

  if (buscar.length > 0) {
    let encontrados = listaDeProductos.filter(prod => prod.Nombre.includes(buscar));
    if (encontrados.length > 0) {
      console.log("Encontramos los siguientes productos:");
      encontrados.forEach(producto => {
        console.log(producto.Nombre);
      });
    } else {
      console.log("Producto no encontrado");
    }
  }
}

buscarProducto();
  
  
  
  
  