import { createContext, useContext } from "react";
import { Event, useWebSocketClient } from "../hooks/useWebSocketClient";

type EventsContextType = {
  events: Event[];
  status: "connected" | "disconnected" | "connecting";
};

export const EventsContext = createContext<EventsContextType | undefined>(
  undefined
);

export const EventsProvider = ({ children }: { children: React.ReactNode }) => {
  const { events, status } = useWebSocketClient("ws://localhost:8080/events");

  return (
    <EventsContext.Provider value={{ events, status }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => {
  const ctx = useContext(EventsContext);
  if (!ctx) throw new Error("useEvents must be used inside EventsProvider");
  return ctx;
};
