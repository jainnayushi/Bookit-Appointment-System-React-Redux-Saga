import React, { useState } from 'react';
import axios from 'axios';
import { URL } from '../../utils/constants';
import useAuthToken from '../../hooks/useAuthToken';
import ScheduleDropdown from './ScheduleDropdown';
import DoctorDropdown from './DoctorDropdown';

interface AvailabilityData {
  time: string[];
  schedule_id: string;
}

const CreateAvailability: React.FC = () => {
  const [availability, setAvailability] = useState<AvailabilityData>({
    time: [''],
    schedule_id: '',
  });
  const [doctorId, setDoctorId] = useState('');
  const token = useAuthToken();

  const handleScheduleSelect = (scheduleId: string) => {
    setAvailability({ ...availability, schedule_id: scheduleId });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAvailability({ ...availability, [name]: [value] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ availabilities: availability });
    try {
      const response = await axios.post(
        `${URL}/availabilities`,
        { availabilities: availability },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      response.data.status && alert('Success: Availability Added Successfully');
    } catch (error) {
      const message = error?.response?.data?.message;
      if (error.response.status == 422) {
        alert(message);
      } else if (error.response.status == 403) {
        alert(message);
      } else {
        alert('Error adding Availability');
      }
    }
  };

  return (
    <div className="dr-form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Doctor ID:
          <DoctorDropdown onSelectDoctor={setDoctorId} />
        </label>
        {doctorId && (
          <label>
            Schedule ID:
            <ScheduleDropdown
              onSelectSchedule={handleScheduleSelect}
              doctorId={doctorId}
            />
          </label>
        )}
        {availability.schedule_id && (
          <label>
            Time:
            <input
              type="text"
              name="time"
              value={availability.time}
              onChange={handleInputChange}
              placeholder="04:01 pm"
            />
          </label>
        )}
        <button type="submit">Create Availability</button>
      </form>
    </div>
  );
};

export default CreateAvailability;
