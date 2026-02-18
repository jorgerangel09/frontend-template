import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    console.log("Haciendo GET a /productos/getProductos");
    api.get('/productos/getProductos').then(setProductos);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Productos</h1>
      <table className="w-full border-collapse border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Precio</th>
            <th className="border p-2">Stock</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.id} className="border">
              <td className="border p-2">{p.nombre}</td>
              <td className="border p-2">${p.precio}</td>
              <td className="border p-2">{p.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}