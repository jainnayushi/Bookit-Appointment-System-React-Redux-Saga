import React, { useState } from 'react';
import axios from 'axios';
import useAuthToken from '../../hooks/useAuthToken';
import DoctorDropdown from './DoctorDropdown';
import { URL } from '../../utils/constants';

interface ScheduleData {
  doctor: string;
  days: { day: string; time: string[] }[];
}

const CreateSchedule: React.FC = () => {
  const [schedule, setSchedule] = useState<ScheduleData>({
    doctor: '',
    days: [{ day: '', time: [''] }],
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const { name, value } = e.target;
    const updatedDays = schedule.days.map((day, i) =>
      i === index ? { ...day, [name]: value } : day,
    );
    setSchedule({ ...schedule, days: updatedDays });
  };

  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    dayIndex: number,
    timeIndex: number,
  ) => {
    const { value } = e.target;
    const updatedDays = [...schedule.days];
    updatedDays[dayIndex].time[timeIndex] = value;
    setSchedule({ ...schedule, days: updatedDays });
  };

  const handleAddDay = () => {
    setSchedule({
      ...schedule,
      days: [...schedule.days, { day: '', time: [''] }],
    });
  };

  const handleAddTime = (dayIndex: number) => {
    const updatedDays = [...schedule.days];
    updatedDays[dayIndex].time.push('');
    setSchedule({ ...schedule, days: updatedDays });
  };
  const token = useAuthToken();
  const handleDoctorSelect = (doctorId: string) => {
    setSchedule({ ...schedule, doctor: doctorId });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/schedules`,
        { schedule: schedule },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      response.data.status && alert('Success: Schedule Created Successfully');
    } catch (error) {
      const message = error?.response?.data?.message;
      if (error.response.status == 422) {
        alert(message);
      } else if (error.response.status == 403) {
        alert(message);
      } else {
        alert('Error creating Schedule');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="dr-form-container">
      <label>
        Doctor ID:
        <DoctorDropdown onSelectDoctor={handleDoctorSelect} />
      </label>
      {schedule.days.map((day, index) => (
        <div key={index}>
          <label>
            Day:
            <input
              type="text"
              name="day"
              value={day.day}
              placeholder="Sunday"
              onChange={(e) => handleInputChange(e, index)}
            />
          </label>
          {day.time.map((time, timeIndex) => (
            <div key={timeIndex}>
              <label>
                Time:
                <input
                  type="text"
                  value={time}
                  placeholder="9:00 am"
                  onChange={(e) => handleTimeChange(e, index, timeIndex)}
                />
              </label>
            </div>
          ))}
          <button type="button" onClick={() => handleAddTime(index)}>
            Add Time
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddDay}>
        Add Day
      </button>
      <button type="submit">Create Schedule</button>
    </form>
  );
};

export default CreateSchedule;
