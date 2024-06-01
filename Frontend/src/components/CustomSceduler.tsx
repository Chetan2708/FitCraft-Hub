import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const CustomScheduler = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([...events, { start, end, title }]);
    }
  };

  return (
    <div style={{ height: 500 }}>

      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        onSelectSlot={handleSelect}
        selectable
        style={{ margin: '50px' }}
      />
    </div>
  );
};

export default CustomScheduler;
