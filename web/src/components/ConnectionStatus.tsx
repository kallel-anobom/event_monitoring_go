import { useEvents } from "../context/EventsContext";

export const ConnectionStatus = () => {
  const { status } = useEvents();
  return (
    <div>
      Status:
      <strong style={{ color: status === "connected" ? "green" : "red" }}>
        {status === "connected" ? "Conectado" : "Desconectado"}
      </strong>
    </div>
  );
};
