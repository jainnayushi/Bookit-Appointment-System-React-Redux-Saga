import axios from 'axios';
import React, { useState } from 'react';
import { URL } from '../../utils/constants';
import useAuthToken from '../../hooks/useAuthToken';
interface Qualification {
  degree: string;
  description: string;
}

const CreateQualification: React.FC = () => {
  const token = useAuthToken();
  const [degree, setDegree] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleAddQualification = async () => {
    const qualification: Qualification = { degree, description };

    try {
      const response = await axios.post(
        `${URL}/qualifications`,
        qualification,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      response.data.status &&
        alert('Success: Qualification added successfully');
    } catch (error) {
      const message = error?.response?.data?.message;
      if (error.response.status == 422) {
        alert(message);
      } else if (error.response.status == 403) {
        alert(message);
      } else {
        alert('Error adding qualification');
      }
    }
  };

  return (
    <div className="dr-form-container">
      <h1 className="header">Add Qualification Details</h1>
      <label>Degree</label>
      <input
        type="text"
        placeholder="Degree"
        value={degree}
        onChange={(e) => setDegree(e.target.value)}
      />
      <label>Description</label>
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handleAddQualification}>Add</button>
    </div>
  );
};

export default CreateQualification;
