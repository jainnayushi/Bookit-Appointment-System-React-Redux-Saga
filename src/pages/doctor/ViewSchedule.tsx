import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DoctorDropdown from '../admin/DoctorDropdown';
import useAuthToken from '../../hooks/useAuthToken';
import { URL } from '../../utils/constants';

interface Schedule {
  id: string;
  date: string;
  is_holiday: boolean;
}

const ViewSchedule: React.FC = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const token = useAuthToken();

  const createSchedule = async () => {
    try {
      await axios.post(
        `${URL}/schedules`,
        {
          schedule: {
            doctor: '8ddf07cf-50b5-48ce-aba0-7887b26208d5',
            days: [
              {
                day: 'Sunday',
                time: ['10:00 am', '1:00 pm'],
              },
              {
                day: 'monday',
                time: ['9:00 am', '11:00 am'],
              },
            ],
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
    createSchedule();
    if (selectedDoctorId) {
      fetchSchedules(selectedDoctorId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDoctorId]);

  const fetchSchedules = async (doctorId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${URL}/doctors/${doctorId}/schedules/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = response.data;
      setSchedules(data.schedules);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setLoading(false);
    }
  };

  const renderSchedules = () => {
    return schedules.length ? (
      schedules.map((schedule) => (
        <li
          key={schedule.id}
          style={{ color: schedule.is_holiday ? 'red' : 'green' }}
        >
          {schedule.date} : {schedule.id}
        </li>
      ))
    ) : (
      <p>No schedule created yet</p>
    );
  };

  return (
    <div>
      <h1 className="header">Get Schedule</h1>
      <div>
        <label>Select Doctor</label>
        <DoctorDropdown onSelectDoctor={setSelectedDoctorId} />
      </div>
      <div className="schedules-container">
        {loading ? <p>Loading...</p> : renderSchedules()}
      </div>
      <br />
    </div>
  );
};

export default ViewSchedule;
