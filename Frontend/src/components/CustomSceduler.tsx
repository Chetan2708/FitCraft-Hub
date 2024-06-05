import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '../utils/components/ui/dialog';
import { Button } from '../utils/components/ui/button';
import { Calendar, momentLocalizer, SlotInfo } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Swal from 'sweetalert2';

const localizer = momentLocalizer(moment);

interface Event {
  title: string;
  description?: string;
  start: Date;
  end: Date;
}

interface EventModalProps {
  events: Event[];
  setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  selectedSlot: SlotInfo | null;
  setSelectedSlot: React.Dispatch<React.SetStateAction<SlotInfo | null>>;
}

interface FormData {
  title: string;
  description?: string;
  start: string;
  end: string;
}

const EventModal: React.FC<EventModalProps> = ({ events, setEvents, selectedSlot, setSelectedSlot }) => {
  const { register, handleSubmit, reset, setValue } = useForm<FormData>();

  useEffect(() => {
    if (selectedSlot) {
      setValue('start', moment(selectedSlot.start).format('YYYY-MM-DDTHH:mm'));
      setValue('end', moment(selectedSlot.end).format('YYYY-MM-DDTHH:mm'));
    }
  }, [selectedSlot, setValue]);

  const onSubmit = (data: FormData) => {
    const { title, description, start, end } = data;
    if (title && start && end) {
      setEvents([...events, { title, description, start: new Date(start), end: new Date(end) }]);
      reset();
      setSelectedSlot(null); // Close the modal after submission
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
    }
  };

  const handleCloseModal = () => {
    reset();
    setSelectedSlot(null);
  };

  return (
    <Dialog open={!!selectedSlot} onOpenChange={handleCloseModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-between mt-6">
            <h1 className="text-2xl text-red-500 font-bold">Add New Event</h1>
          </DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <label className="text-lg">
              Title:
              <input
                type="text"
                {...register('title', { required: true })}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
            </label>
            <label className="text-lg">
              Description:
              <input
                type="text"
                {...register('description')}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
            </label>
            <label className="text-lg">
              Start Time:
              <input
                type="datetime-local"
                {...register('start', { required: true })}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
            </label>
            <label className="text-lg">
              End Time:
              <input
                type="datetime-local"
                {...register('end', { required: true })}
                className="w-full p-2 mt-2 border border-gray-300 rounded"
              />
            </label>
            <DialogFooter className="flex justify-end gap-2 mt-4">
              <DialogClose onClick={handleCloseModal}>
                <Button className="w-full">Cancel</Button>
              </DialogClose>
              <Button type="submit" className="w-full">
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

const CustomScheduler: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<SlotInfo | null>(null);

  const handleSelectSlot = ({ start, end }: SlotInfo) => {
    setSelectedSlot({ start, end, slots: [], action: 'select' });
  };

  const handleDeleteEvent = (event: Event) => {
    setEvents(events.filter(e => e !== event));
  };

  const EventComponent: React.FC<{ event: Event }> = ({ event }) => (
    <div>
      <span>{event.title}</span>
      <button
        onClick={() => handleDeleteEvent(event)}
        className="ml-2 text-red-500"
      >
        Delete
      </button>
    </div>
  );

  return (
    <div style={{ height: 500 }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        components={{
          event: EventComponent,
        }}
        style={{ margin: '50px' }}
      />
      <EventModal events={events} setEvents={setEvents} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
    </div>
  );
};

export default CustomScheduler;
