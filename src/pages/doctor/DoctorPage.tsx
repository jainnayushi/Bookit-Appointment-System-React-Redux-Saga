import { useState, ReactElement } from 'react';
import ViewSchedule from './ViewSchedule';

const DoctorPage: React.FC = () => {
  const [selectedComponent, setSelectedComponent] =
    useState<ReactElement | null>(null);

  const links: { label: string; component: ReactElement }[] = [
    { label: 'List Schedules', component: <ViewSchedule /> },
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

export default DoctorPage;
