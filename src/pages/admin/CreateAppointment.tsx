/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ScheduleDropdown from './ScheduleDropdown';
import useAuthToken from '../../hooks/useAuthToken';
import { URL } from '../../utils/constants';
import DoctorDropdown from './DoctorDropdown';
import AvailabilityDropdown from './AvailabilityDropdown';

interface Availability {
  id: string;
  time: string;
  is_available: boolean;
}

const CreateAppointment: React.FC = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState<string>('');
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');
  const [selectedAvailabilityId, setSelectedAvailabilityId] =
    useState<string>('');
  const [availabilites, setAvailabilities] = useState<Availability[]>([]);
  const [, setLoading] = useState<boolean>(false);

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

  return (
    <div>
      <h1 className="header">Book Appointment</h1>
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
      {selectedScheduleId && (
        <div>
          <label>Select Availability</label>
          <AvailabilityDropdown
            onSelectAvailability={setSelectedAvailabilityId}
            availabilities={availabilites}
          />
        </div>
      )}
      <div>
        {selectedAvailabilityId && (
          <>
            <h3>Appointment Successful</h3>
            <div className="dr-form-container">
              <li>Doctor Id : {selectedDoctorId}</li>
              <li>Schedule Id : {selectedScheduleId}</li>
              <li>Availability Id : {selectedAvailabilityId}</li>
            </div>
          </>
        )}
      </div>
      <br />
    </div>
  );
};

export default CreateAppointment;
