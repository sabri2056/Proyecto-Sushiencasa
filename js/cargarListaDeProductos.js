

async function cargarListaDeProductos() {
  try {
    const response = await fetch("../json.data.json");
    const data = await response.json();
    Producto = data.productos;
    mostrarProductos(Producto, "todos");
  } catch {
    Swal.fire({
      icon: "error",
      title: "Ups...",
      text: "Algo salió mal!",
      footer: "Intentelo nuevamente en unos instantes.",
    });
  }
}
