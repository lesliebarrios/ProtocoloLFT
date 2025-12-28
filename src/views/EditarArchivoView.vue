<template>
  <h1>Editar archivo</h1>

  <!-- Input para seleccionar archivo a editar -->
  <input type="file" @change="cargarArchivo" accept=".xlsx,.xlsm" />
  <button @click="editarExcel" :disabled="!workbook">Editar Excel</button>

  <h1>Crear archivo</h1>
  <button @click="crearExcel">Crear Excel</button>
</template>

<script setup>
import { ref } from 'vue';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

// Función para crear un Excel simple
const crearExcel = () => {
  const datos = [
    ["Nombre", "Edad", "Ciudad"],
    ["Gaby", 20, "La Paz"],
    ["Bruno", 25, "Cochabamba"]
  ];

  const ws = XLSX.utils.aoa_to_sheet(datos);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Hoja1");

  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
  saveAs(blob, "excel_creado.xlsx");
};

const workbook = ref(null);
const fileName = ref('');   // Nombre del archivo
const fileType = ref('xlsx'); // Tipo de archivo

// Función para cargar archivo
const cargarArchivo = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  fileName.value = file.name;
  fileType.value = fileName.value.split('.').pop().toLowerCase();

  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    // Leer workbook con cellStyles para preservar formato/macros
    workbook.value = XLSX.read(data, { type: 'array', cellStyles: true });
    alert(`Archivo ${fileName.value} cargado correctamente`);
  };
  reader.readAsArrayBuffer(file);
};

// Función para editar Excel
const editarExcel = () => {
  if (!workbook.value) return;

  const sheetName = workbook.value.SheetNames[0];
  const ws = workbook.value.Sheets[sheetName];

  // Modificar solo A6, por ahora
  ws['A6'] = { t: 's', v: 'HOLA, excel editado prueba' };

  // Actualizar rango de la hoja (!ref)
  const range = XLSX.utils.decode_range(ws['!ref'] || 'A1:A1');
  if (range.e.r < 5) range.e.r = 5; // fila 6 = índice 5
  ws['!ref'] = XLSX.utils.encode_range(range);

  // Generar archivo manteniendo el tipo original
  const excelBuffer = XLSX.write(workbook.value, { bookType: fileType.value, type: 'array' });
  const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

  const newFileName = fileName.value.replace(/\.xlsx|\.xlsm/, `_editado.${fileType.value}`);
  saveAs(blob, newFileName);
};

</script>
