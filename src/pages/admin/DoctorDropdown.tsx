import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { URL } from '../../utils/constants';
import {
  Doctor,
  initialPage,
  DoctorApiResponse,
  PaginationData,
} from '../../utils/types';
import useAuthToken from '../../hooks/useAuthToken';
import '../../styles/addDoctor.css';

interface DoctorDropdownProps {
  onSelectDoctor: (doctorId: string) => void;
}

const DoctorDropdown: React.FC<DoctorDropdownProps> = ({ onSelectDoctor }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [pagination, setPagination] = useState<PaginationData>(initialPage);
  const [loading, setLoading] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const token = useAuthToken();

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/doctors?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: DoctorApiResponse = response.data;
      setDoctors((prevDoctors) => [...prevDoctors, ...data.doctors]);
      setPagination(data.pagination);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      const { scrollTop, clientHeight, scrollHeight } = scrollContainer;
      if (
        scrollTop + clientHeight >= scrollHeight &&
        !loading &&
        pagination.next
      ) {
        fetchData(pagination.next);
      }
    }
  };

  const handleDoctorSelect = (id: string) => {
    onSelectDoctor(id);
  };

  return (
    <div
      className="dr-form-container"
      style={{ maxHeight: '150px', overflowY: 'auto', cursor: 'pointer' }}
      onScroll={handleScroll}
      ref={scrollContainerRef}
    >
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="doctor-item"
          onClick={() => handleDoctorSelect(doctor.id)}
        >
          <span className="dropdown-span">
            {doctor.first_name} {doctor.last_name}
          </span>
        </div>
      ))}
      {loading && <p className="loading-indicator">Loading...</p>}
      {!loading && pagination.next && (
        <p className="load-more">Scroll to load more</p>
      )}
    </div>
  );
};

export default DoctorDropdown;
