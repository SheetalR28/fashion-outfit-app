import React from 'react';

const OutfitPreview = ({ clothes }) => {
  return (
    <div className="mt-6">
      <h3>👕 Outfit Preview</h3>
      <div style={{ position: 'relative', width: 200, height: 400 }}>
        <img src="/mannequin.png" style={{ width: '100%', position: 'absolute' }} alt="mannequin" />
        {clothes.slice(0, 3).map((file, idx) => (
          <img
            key={file}
            src={`http://localhost:5000/uploads/${file}`}
            alt="layer"
            style={{
              position: 'absolute',
              top: `${50 + idx * 100}px`,
              left: '20px',
              width: '160px',
              opacity: 0.9,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OutfitPreview;
