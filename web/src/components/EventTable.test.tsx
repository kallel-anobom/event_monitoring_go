import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import EventTable from "./EventTable";
import { EventsContext } from "../context/EventsContext";

const mockEvents = [
  { id: "1", message: "Evento 1", type: "info" },
  { id: "2", message: "Evento 2", type: "error" },
];

describe("EventTable", () => {
  it("should renders received events correctly", () => {
    render(
      <EventsContext.Provider
        value={{ events: mockEvents, status: "connected" }}
      >
        <EventTable />
      </EventsContext.Provider>
    );

    expect(screen.getByText("Evento 1")).toBeInTheDocument();
    expect(screen.getByText("Evento 2")).toBeInTheDocument();
    expect(screen.getAllByRole("row")).toHaveLength(3);
  });
});
