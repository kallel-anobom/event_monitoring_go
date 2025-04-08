import { memo } from "react";
import { useEvents } from "../context/EventsContext";

const EventTable = memo(() => {
  const { events } = useEvents();

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Message</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <td>{event.id}</td>
            <td>{event.message}</td>
            <td>{event.type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default EventTable;
