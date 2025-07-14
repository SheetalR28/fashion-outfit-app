import React, { useState, useEffect } from 'react';
import axios from 'axios';
import OutfitPreview from './OutfitPreview';

const UploadClothes = () => {
  const [clothes, setClothes] = useState([]);
  const [file, setFile] = useState(null);

  const fetchClothes = async () => {
    const res = await axios.get('http://localhost:5000/clothes');
    setClothes(res.data);
  };

  useEffect(() => { fetchClothes(); }, []);

  const upload = async () => {
    const formData = new FormData();
    formData.append('image', file);
    await axios.post('http://localhost:5000/upload', formData);
    fetchClothes();
  };

  const remove = async (filename) => {
    await axios.delete(`http://localhost:5000/clothes/${filename}`);
    fetchClothes();
  };

  return (
    <div className="p-4">
      <h2>Upload Clothes</h2>
      <input type="file" onChange={e => setFile(e.target.files[0])} />
      <button onClick={upload}>Upload</button>

      <h3 className="mt-4">Clothing Gallery</h3>
      <div className="flex flex-wrap gap-4">
        {clothes.map(file => (
          <div key={file}>
            <img src={`http://localhost:5000/uploads/${file}`} width={100} />
            <button onClick={() => remove(file)}>Delete</button>
          </div>
        ))}
      </div>

      <OutfitPreview clothes={clothes} />
    </div>
  );
};

export default UploadClothes;
