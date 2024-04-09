/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleDropdown from './ScheduleDropdown';
import useAuthToken from '../../hooks/useAuthToken';
import { URL } from '../../utils/constants';
import DoctorDropdown from './DoctorDropdown';

interface Availability {
  id: string;
  time: string;
  is_available: boolean;
}

const ViewAvailability: React.FC = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');
  const [availabilites, setAvailabilities] = useState<Availability[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const token = useAuthToken();

  const createAvailability = async () => {
    try {
      await axios.post(
        `${URL}/availabilities`,
        {
          availabilities: {
            time: ['04:00 pm'],
            schedule_id: '6377bc79-F1d0-4792-9278-Fb9ebf496bd4',
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    createAvailability();
  }, []);
  useEffect(() => {
    if (selectedScheduleId) {
      fetchAvailabilities(selectedScheduleId);
    }
  }, [selectedScheduleId]);

  const fetchAvailabilities = async (scheduleId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/schedules/${scheduleId}/availabilities`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      setAvailabilities(data.schedule.availabilities);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setLoading(false);
    }
  };

  const renderSchedules = () => {
    return availabilites.length ? (
      availabilites.map((availability) => (
        <li
          key={availability.id}
          style={{ color: availability.is_available ? 'green' : 'red' }}
        >
          {availability.time} - {availability.id}
        </li>
      ))
    ) : (
      <p>No Availability yet</p>
    );
  };

  return (
    <div>
      <h1 className="header">Get Availability</h1>
      <div>
        <label>Select Doctor</label>
        <DoctorDropdown onSelectDoctor={setSelectedDoctorId} />
      </div>
      {selectedDoctorId && (
        <div>
          <label>Select Schedule</label>
          <ScheduleDropdown
            onSelectSchedule={setSelectedScheduleId}
            doctorId={selectedDoctorId}
          />
        </div>
      )}
      <div className="schedules-container">
        {loading ? <p>Loading...</p> : renderSchedules()}
      </div>
      <br />
    </div>
  );
};

export default ViewAvailability;
