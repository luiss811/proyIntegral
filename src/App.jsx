import { useEffect, useState } from 'react';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, QuerySnapshot } from 'firebase/firestore';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    setUsers(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const addUser = async () => {
    if (name.trim() && age.trim()) {
      await addDoc(collection(db, "users"), { name, age: Number(age) });
      setName("");
      setAge("");
      fetchUsers();
    }
  };

  const updateUser = async () => {
    if (editingId && name.trim() && age.trim()) {
      await updateDoc(doc(db, "users", editingId), { name, age: Number(age) });
      editingId(null);
      setName("");
      setAge("");
      fetchUsers();
    }
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(db, "users", id));
    fetchUsers();
  };



  const chartData = {
    labels: users.map((user) => user.name),
    datasets: [
      {
        label: "Edad",
        data: users.map((user) => user.age),
        backgroundColor: "blue",
      },
    ],
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>CRUD con Firebase y Reportes</h1>
      <input type='text' value={name} onChange={(e) => setName(e.target.value)} placeholder='Nombre' />
      <input type='number' value={age} onChange={(e) => setAge(e.target.value)} placeholder='Edad' />

      {editingId ? (
        <button onClick={updateUser}>Actualizar</button>
      ) : (
          <button onClick={addUser}>Agregar</button>
      )}

      <ul>
        {users.map((user) => {
          return (
          <li key={user.id}>
              {user.name} - {user.age} años
              <button onClick={() => { setName(user.name); setAge(user.age); setEditingId(user.id); }}>Editar</button>
              <button onClick={() => deleteUser(user.id)}>Eliminar</button>
            </li>
          )
        })}
      </ul>

      <h2>Reporte de Edades</h2>

      <Bar data={chartData} />
    </div>
  );
}

export default App;
