import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api'; // Asegúrate de que esta ruta sea correcta

const Login = () => {
  // 1. Estados (Cajitas de memoria) - Exacto como en la foto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // 2. El "GPS" para cambiar de página
  const navigate = useNavigate();

  // 3. La función de tu profe
  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue sola
    setError(null);
    setLoading(true);

    try {
      // Mandamos los datos al backend
      const data = await api.post('/auth/login', { email, password });
      
      // Guardamos la llave que nos dio el backend en el navegador
      localStorage.setItem('token', data.token);
      
      console.log("¡Login exitoso! Token guardado.");
      
      // Nos teletransportamos al dashboard (esta línea no sale en la foto, pero es el paso lógico siguiente)
      navigate('/dashboard'); 

    } catch (err) {
      console.error(err);
      setError("Credenciales incorrectas o error en el servidor");
    } finally {
      // Pase lo que pase, dejamos de cargar
      setLoading(false); 
    }
  };

  // 4. Vista Sencilla y Funcional
  return (
    <div className="p-10 max-w-sm mx-auto mt-20 bg-white border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
      
      {/* Si hay un error, lo mostramos en rojo */}
      {error && <p className="text-red-500 font-bold mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>
        
        <div className="mb-4">
          <label className="block mb-1 font-bold">Correo:</label>
          <input 
            type="email" 
            className="w-full border p-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Contraseña:</label>
          <input 
            type="password" 
            className="w-full border p-2"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button 
          type="submit" 
          disabled={loading} // Si está cargando, se bloquea el botón
          className="bg-blue-600 text-white w-full p-2 font-bold disabled:bg-gray-400"
        >
          {loading ? 'Cargando...' : 'Entrar'}
        </button>

      </form>
    </div>
  );
};

export default Login;