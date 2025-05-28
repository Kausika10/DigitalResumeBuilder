import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import axios from 'axios';

const ResumeBuilderPage = () => {
  const location = useLocation();
  const templateId = new URLSearchParams(location.search).get('template');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    experience: '',
    education: '',
    skills: '',
    certificates: '',
    projects: ''
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    for (const field of ['name', 'email', 'phone', 'experience', 'education', 'skills', 'certificates']) {
      if (!formData[field]) {
        setError('All fields are required.');
        return;
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/api/resumes/add', formData);
      console.log('Resume saved:', response.data);
      alert('Resume saved successfully!');
    } catch (err) {
      console.error('Error saving resume:', err);
      setError('Failed to save resume. Please try again.');
    }
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    let y = 10;
    const spacing = 10;

    doc.text(`Resume - Template ${templateId}`, 20, y); y += spacing;
    Object.entries(formData).forEach(([key, value]) => {
      doc.text(`${key.charAt(0).toUpperCase() + key.slice(1)}:`, 20, y);
      y += spacing;
      value.split('\n').forEach(line => {
        doc.text(line, 25, y);
        y += spacing;
      });
    });

    const fileName = `${formData.name}_resume.pdf`.replace(/\s+/g, '_');
    doc.save(fileName);
  };

  return (
    <div className="resume-builder">
      <h1>Resume {formData.name}</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleFormSubmit}>
        {Object.keys(formData).map((field) => (
          <label key={field}>
            {field.charAt(0).toUpperCase() + field.slice(1)}:
            {field === 'experience' || field === 'education' || field === 'skills' || field === 'certificates' || field === 'projects' ? (
              <textarea name={field} value={formData[field]} onChange={handleInputChange} />
            ) : (
              <input type={field === 'email' ? 'email' : 'text'} name={field} value={formData[field]} onChange={handleInputChange} />
            )}
          </label>
        ))}
        <button type="submit">Save and Preview</button>
      </form>

      <button onClick={exportToPDF}>Export to PDF</button>

      <div className="resume-preview">
        <h2>Preview</h2>
        <div className="preview-content">
          <h3>{formData.name}</h3>
          <p>Email: {formData.email}</p>
          <p>Phone: {formData.phone}</p>
          <h4>Experience</h4>
          <p>{formData.experience}</p>
          <h4>Education</h4>
          <p>{formData.education}</p>
          <h4>Skills</h4>
          <p>{formData.skills}</p>
          <h4>Certificates</h4>
          <p>{formData.certificates}</p>
          <h4>Projects</h4>
          <p>{formData.projects}</p>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;