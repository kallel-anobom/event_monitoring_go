import { EventsProvider } from "./context/EventsContext";
import { ConnectionStatus } from "./components/ConnectionStatus";
import EventTable from "./components/EventTable";
import "./App.css";

function App() {
  return (
    <>
      <EventsProvider>
        <h1>Eventos</h1>
        <ConnectionStatus />
        <EventTable />
      </EventsProvider>
    </>
  );
}

export default App;
