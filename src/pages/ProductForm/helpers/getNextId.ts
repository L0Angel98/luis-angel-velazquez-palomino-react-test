interface Item {
  id: number;
  // otros campos según sea necesario
}

const getNextId = (items: Item[]): number => {
  if (items.length === 0) {
    return 1; // Si el array está vacío, el próximo ID debería empezar en 1
  }

  // Busca el ID más alto en el array, asegurando que `id` sea un número
  const maxId = items.reduce((max, item) => {
    if (typeof item.id === 'number') {
      return Math.max(max, item.id);
    }
    return max;
  }, -Infinity);

  // Verifica si maxId es -Infinity (lo que significa que no se encontró ningún ID válido)
  if (maxId === -Infinity) {
    return 1; // Si no se encontraron IDs válidos, empieza en 1
  }

  // Retorna el siguiente número mayor
  return maxId + 1;
};

export default getNextId;