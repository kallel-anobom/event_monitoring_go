import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { EventsContext } from "../context/EventsContext";
import { ConnectionStatus } from "./ConnectionStatus";

describe("ConnectionStatus", () => {
  it("should Connected when status is connected", () => {
    render(
      <EventsContext.Provider value={{ events: [], status: "connected" }}>
        <ConnectionStatus />
      </EventsContext.Provider>
    );

    expect(screen.getByText("Conectado")).toBeInTheDocument();
  });

  it("should Disconnected when status is disconnected", () => {
    render(
      <EventsContext.Provider value={{ events: [], status: "disconnected" }}>
        <ConnectionStatus />
      </EventsContext.Provider>
    );

    expect(screen.getByText("Desconectado")).toBeInTheDocument();
  });
});
