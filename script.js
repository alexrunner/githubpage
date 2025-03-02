document.addEventListener('DOMContentLoaded', function () {
  const corredorForm = document.getElementById('corredorForm');
  const corredoresTable = document.getElementById('corredoresTable').getElementsByTagName('tbody')[0];
  const exportarExcelBtn = document.getElementById('exportarExcel');

  let corredores = [];

  corredorForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const edad = document.getElementById('edad').value;
    const equipo = document.getElementById('equipo').value;
    const distancia = document.getElementById('distancia').value;
    const categoria = document.getElementById('categoria').value;

    const corredor = {
      nombre: nombre,
      edad: edad,
      equipo: equipo,
      distancia: distancia,
      categoria: categoria
    };

    corredores.push(corredor);
    actualizarTabla();
    corredorForm.reset();
  });

  function actualizarTabla() {
    corredoresTable.innerHTML = ''; // Limpiar la tabla

    corredores.forEach(corredor => {
      let row = corredoresTable.insertRow();
      let nombreCell = row.insertCell(0);
      let edadCell = row.insertCell(1);
      let equipoCell = row.insertCell(2);
      let distanciaCell = row.insertCell(3);
      let categoriaCell = row.insertCell(4);

      nombreCell.innerHTML = corredor.nombre;
      edadCell.innerHTML = corredor.edad;
      equipoCell.innerHTML = corredor.equipo;
      distanciaCell.innerHTML = corredor.distancia;
      categoriaCell.innerHTML = corredor.categoria;
    });
  }

  exportarExcelBtn.addEventListener('click', function () {
    if (corredores.length === 0) {
      alert('No hay corredores para exportar.');
      return;
    }

    // Crear un nuevo libro de Excel
    const wb = XLSX.utils.book_new();

    // Convertir los datos JSON a una hoja de cálculo
    const ws = XLSX.utils.json_to_sheet(corredores);

    // Agregar la hoja de cálculo al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Corredores');

    // Escribir el libro a un archivo binario
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Convertir el archivo binario a un Blob
    const blob = new Blob([new Uint8Array(wbout)], { type: 'application/octet-stream' });

    // Crear un enlace de descarga
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'corredores.xlsx';

    // Simular un clic en el enlace para iniciar la descarga
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    // Liberar la URL del objeto Blob
    URL.revokeObjectURL(url);
  });
});