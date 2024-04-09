import React, { useState, useEffect } from 'react';
import { URL } from '../../utils/constants';
import {
  DoctorApiResponse,
  Doctor,
  PaginationData,
  initialPage,
} from '../../utils/types';
import Pagination from '../../components/Pagination';
import axios from 'axios';
import useAuthToken from '../../hooks/useAuthToken';

const ViewDoctors: React.FC = () => {
  const token = useAuthToken();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [pagination, setPagination] = useState<PaginationData>(initialPage);

  useEffect(() => {
    fetchData(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (page: number) => {
    try {
      const response = await axios.get(`${URL}/doctors?page=${page}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: DoctorApiResponse = response.data;
      setDoctors(data.doctors);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const handlePageChange = (pageNumber: number) => {
    fetchData(pageNumber);
  };

  return (
    <div className="App">
      <h1 className="header">Top Doctors</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Experience</th>
            <th>Contact Number</th>
            <th>Qualifications</th>
          </tr>
        </thead>
        {doctors.map((doctor) => (
          <tr key={doctor.id}>
            <td>
              {doctor.first_name} {doctor.last_name}
            </td>
            <td> {doctor.email} </td>
            <td>{doctor.qualifications.length}</td>
            <td>{doctor.contact_number}</td>
            <td>
              {doctor.qualifications.map((qual) => (
                <p>
                  {qual.degree} : {qual.description}
                </p>
              ))}
            </td>
          </tr>
        ))}
      </table>
      <Pagination
        onPageChange={handlePageChange}
        currentPage={pagination.page}
        totalPages={pagination.pages}
      />
      <br />
    </div>
  );
};

export default ViewDoctors;
