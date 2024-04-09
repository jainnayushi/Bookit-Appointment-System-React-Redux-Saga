interface Availability {
  id: string;
  time: string;
  is_available: boolean;
}

interface AvailabilityDropdownProps {
  onSelectAvailability: (id: string) => void;
  availabilities: Availability[];
}
const AvailabilityDropdown: React.FC<AvailabilityDropdownProps> = ({
  onSelectAvailability,
  availabilities,
}) => {
  const handleScheduleSelect = (id: string) => {
    onSelectAvailability(id);
  };

  return (
    <div
      className="dr-form-container"
      style={{ maxHeight: '150px', overflowY: 'auto', cursor: 'pointer' }}
    >
      {availabilities.map((availability) => (
        <div
          key={availability.id}
          onClick={() => handleScheduleSelect(availability.id)}
        >
          <span className="dropdown-span">{availability.time}</span>
        </div>
      ))}
    </div>
  );
};

export default AvailabilityDropdown;
