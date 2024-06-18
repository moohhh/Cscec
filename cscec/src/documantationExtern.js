import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './documantationExtern.css';
import Navbar from './component/navbarconnecter'; // Assuming Navbar is correctly defined and exported in its file

const BookCard = ({ id, nom, author, lien_photo, tag, type, lien_telechargement }) => {
  console.log('BookCard:', lien_photo);

  async function handleDownload() {
    try {
      console.log(`Opening the file "${nom}" in the browser`);
      window.open(lien_telechargement,);
    } catch (error) {
      console.error(`Error opening the file "${nom}" in the browser:`, error);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete?')) {
      axios.post('http://localhost:8000/api/supprimer', { id })
        .then(response => {
          alert('Book deleted successfully!');
          window.location.reload();

        })
        .catch(error => {
          console.error('Error deleting book:', error);
        });
    }
  };

  return (
    <div className="book-card" style={{ backgroundImage: `url(${lien_photo})` }}>
      <div className='book-info'>
        <p className='title'>{nom}</p>
        <p className='author'>{author}</p>
        <div className="tags-container">
          <div className="tag">
            {Array.isArray(type) ? type.map((type, index) => (
              <span key={`tag-${index}`} >{type}</span>
            )) : <span >{type}</span>}
          </div>
          <div className="tag">
            {Array.isArray(tag) ? tag.map((tag, index) => (
              <span key={`type-${index}`}>{tag}</span>
            )) : <span className="type">{tag}</span>}
          </div>
        </div>
        <div className='btns'>
          <button className="download-button" onClick={handleDownload}>Telecharger</button>
          <button className="delete-button" onClick={handleDelete}>Supprimer</button>
        </div>
      </div>
    </div>
  );
};

const Appp = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    nom: '',
    author: '',
    tag: '',
    type: '',
    lien_telechargement: ''
  });
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8000/api/afficher')
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('An error occurred:', error);
      });
  }, []);

  const handleChange = (event) => {
    const { name, files } = event.target;
    if (name === "lien_photo" || name === "lien_telechargement") {
      const file = files[0];
      if (!file) {
        alert('Please select a file.');
        return;
      }
      setFormData(prevState => ({ ...prevState, [name]: file }));
    } else {
      setFormData(prevState => ({ ...prevState, [name]: event.target.value }));
    }
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/ajouter', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.message);
      alert('Book added successfully!');
      window.location.reload();

      setIsFormVisible(false); // Hide the form after successful submission
    } catch (error) {
      console.error('There was an error!', error.response);
      alert(error.response.data.message || 'Failed to add book.');
    }
  };

  return (
    <div className="app">
      <Navbar />
      <h1>Liste des documents</h1>
      <div>
        {localStorage.getItem('grade') === 'superieur TC' && (
          <button className='ajouter-btn' onClick={() => setIsFormVisible(true)}>Ajouter</button>
        )}

      </div>
      <div className="book-shelf">
        {books.map(book => (
          <BookCard key={book.id} {...book} />
        ))}
      </div>
      {isFormVisible && (
        <div className="overlay" onClick={() => setIsFormVisible(false)}>
          <div className="input-groupp" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="input-fieldss">
                <div className="input-itemm">
                  <label htmlFor="nom">Nom</label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-itemm">
                  <label htmlFor="author">Auteur</label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-itemm">
                  <label htmlFor="type">Type</label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-itemm">
                  <label htmlFor="tag">Tag</label>
                  <input
                    type="text"
                    id="tag"
                    name="tag"
                    value={formData.tag}
                    onChange={handleChange}
                  />
                </div>
                <div className="input-itemm">
                  <label htmlFor="lien_photo">Lien Photo</label>
                  <input
                    type="file"
                    id="lien_photo"
                    name="lien_photo"
                    onChange={handleChange}
                  />
                </div>
                <div className="input-itemm">
                  <label htmlFor="lien_telechargement">Lien Téléchargement</label>
                  <input
                    type="file"
                    id="lien_telechargement"
                    name="lien_telechargement"
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="add_button">
                  Ajouter
                </button>
              </div>
            </form>
            <button type="button" className="close" onClick={() => setIsFormVisible(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appp;
