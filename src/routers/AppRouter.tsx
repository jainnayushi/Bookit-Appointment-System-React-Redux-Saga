import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import AdminPage from '../pages/admin/AdminPage';
import PatientPage from '../pages/patient/PatientPage';
import DoctorPage from '../pages/doctor/DoctorPage';
import LoginPage from '../pages/auth/LoginPage';
import AdminRoute from './AdminRoute';
import DoctorRoute from './DoctorRoute';
import LogoutPage from '../pages/auth/LogoutPage';
import AddQualification from '../pages/admin/CreateQualification';
import ViewQualification from '../pages/admin/ViewQualification';
import CreateDoctor from '../pages/admin/CreateDoctor';
import ViewDoctors from '../pages/admin/ViewDoctors';
import GetAvailability from '../pages/admin/ViewAvailability';
import GetSchedule from '../pages/doctor/ViewSchedule';
import HomePage from '../pages/HomePage';
import CreateSchedule from '../pages/admin/CreateSchedule';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
      <Route path="/patient" element={<PatientPage />} />
      <Route
        path="/doctor"
        element={
          <DoctorRoute>
            <DoctorPage />
          </DoctorRoute>
        }
      />
      <Route
        path="/addQualification"
        element={
          <AdminRoute>
            <AddQualification />
          </AdminRoute>
        }
      />
      <Route
        path="/viewQualification"
        element={
          <AdminRoute>
            <ViewQualification />
          </AdminRoute>
        }
      />
      <Route
        path="/addDoctor"
        element={
          <AdminRoute>
            <CreateDoctor />
          </AdminRoute>
        }
      />
      <Route
        path="/viewDoctors"
        element={
          <AdminRoute>
            <ViewDoctors />
          </AdminRoute>
        }
      />
      <Route
        path="/getSchedule"
        element={
          <DoctorRoute>
            <GetSchedule />
          </DoctorRoute>
        }
      />
      <Route
        path="/createSchedule"
        element={
          <AdminRoute>
            <CreateSchedule />
          </AdminRoute>
        }
      />
      <Route
        path="/getAvailability"
        element={
          <AdminRoute>
            <GetAvailability />
          </AdminRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/logout" element={<LogoutPage />} />
    </Routes>
  );
};

export default AppRouter;
