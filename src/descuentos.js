function calcularTotal(precio, descuento = 0, tipoCliente = "") {
  if (precio < 0) {
    throw new Error("El precio no puede ser negativo");
  }
  if (tipoCliente === "estudiante") {
    return precio * 0.85;
  }
  
  return precio - descuento;
}

module.exports = { calcularTotal };