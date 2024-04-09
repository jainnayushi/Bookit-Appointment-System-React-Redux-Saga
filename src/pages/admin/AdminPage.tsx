import { useState, ReactElement } from 'react';
import CreateQualification from './CreateQualification';
import ViewQualification from './ViewQualification';
import CreateDoctor from './CreateDoctor';
import ViewDoctors from './ViewDoctors';
import ViewAvailability from './ViewAvailability';
import CreateAppointment from './CreateAppointment';
import CreateSchedule from './CreateSchedule';
import CreateAvailability from './CreateAvailability';
import ViewSchedule from '../doctor/ViewSchedule';

const AdminPage: React.FC = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<ReactElement | null>(null);

  const links: { label: string; component: ReactElement }[] = [
    { label: 'Create Qualification', component: <CreateQualification /> },
    { label: 'List Qualifications', component: <ViewQualification /> },
    { label: 'Create Doctor', component: <CreateDoctor /> },
    { label: 'List Doctors', component: <ViewDoctors /> },
    { label: 'Create Schedule', component: <CreateSchedule /> },
    { label: 'List Schedule', component: <ViewSchedule /> },
    { label: 'Create Availability', component: <CreateAvailability /> },
    { label: 'List Availability', component: <ViewAvailability /> },
    { label: 'Create Appointment', component: <CreateAppointment /> },
  ];

  return (
    <div className="wrapper">
      <aside>
        <ul>
          {links.map((link, index) => (
            <button
              className="link-btn"
              key={index}
              onClick={() => setSelectedComponent(link.component)}
            >
              {link.label}
            </button>
          ))}
        </ul>
      </aside>
      <main>
        {selectedComponent ? (
          <div className="wrapper_inner">{selectedComponent}</div>
        ) : (
          <div className="container">Explore Functionalities...</div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;
