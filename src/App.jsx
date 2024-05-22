import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [mark, setMark] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('https://testtt-three-roan.vercel.app/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const addStudent = async () => {
    try {
      const response = await axios.post('https://testtt-three-roan.vercel.app/students', { name, age: Number(age), mark: Number(mark) });
      fetchStudents()
      setName('');
      setAge('');
      setMark('');
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const updateStudent = async () => {
    try {
      const response = await axios.patch(`https://testtt-three-roan.vercel.app/students/${editId}`, { name, age: Number(age), mark: Number(mark) });
      setStudents(students.map(student => student.id === editId ? response.data : student));
      setName('');
      setAge('');
      setMark('');
      setEditId(null);
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://testtt-three-roan.vercel.app/students/${id}`);
      setStudents(students.filter(student => student.id !== id));
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateStudent();
    } else {
      addStudent();
    }
  };

  const handleEdit = (student) => {
    setName(student.name);
    setAge(student.age);
    setMark(student.mark);
    setEditId(student.id);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Student Management</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 mr-2 mb-2"
        />
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
          className="border p-2 mr-2 mb-2"
        />
        <input
          type="number"
          placeholder="Mark"
          value={mark}
          onChange={(e) => setMark(e.target.value)}
          required
          className="border p-2 mr-2 mb-2"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          {editId ? 'Update' : 'Add'} Student
        </button>
      </form>
      <ul>
        {students.map(student => (
          <li key={student.id} className="mb-2">
            {student.name} - Age: {student.age} - Mark: {student.mark}
            <button onClick={() => handleEdit(student)} className="bg-yellow-500 text-white p-2 rounded ml-2">
              Edit
            </button>
            <button onClick={() => deleteStudent(student.id)} className="bg-red-500 text-white p-2 rounded ml-2">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
