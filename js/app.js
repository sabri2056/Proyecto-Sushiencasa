console.log ("conectado")


const listaProductosmEntradas = [
  'Bolitas de salmón con queso saborizado',
  'Langostinos rebozados en pan rallado saborizado',
  'Empanada china'
];

const listaProductosmcombos = [
  'Salmon',
  'Langostinos',
  'Kanikama',
  'Salmon',
  'Langostinos',
  'Todo Tamago',
  'Premiun',
  'Todo Salmon',
  'Vegui'
];

const listaProductosmhotrolls = [
  'New York',
  'Philadelphia',
  'Shrimp',
  'Veggi',
  'Honey'
];

const Menu = [
  { nombre: 'listaProductosmEntradas', disponible: true },
  { nombre: 'listaProductosmcombos', disponible: false },
  { nombre: 'listaProductosmhotrolls', disponible: true }
];

console.log("Lista de productos disponibles:");
for (let i = 0; i < Menu.length; i++) {
  let producto = Menu[i];

  if (producto.disponible) {
    console.log(producto.nombre);
  } else {
    console.log(producto.nombre + ' (No disponible)');
  }
}

//  Prueba
  
  
  
  
  