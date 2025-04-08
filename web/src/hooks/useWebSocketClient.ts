import { useEffect, useRef, useState } from "react";

export type Event = {
  id: string;
  message: string;
  type: string;
};

export type WebSocketStatus = "connecting" | "connected" | "disconnected";

export function useWebSocketClient(url: string) {
  const [events, setEvents] = useState<Event[]>([]);
  const [status, setStatus] = useState<WebSocketStatus>("disconnected");
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(url);
    ws.current.onopen = () => setStatus("connected");
    ws.current.onclose = () => setStatus("disconnected");
    ws.current.onmessage = (msg) => {
      const data: Event = JSON.parse(msg.data);
      setEvents((prev) => [...prev, data]);
    };

    return () => ws.current?.close();
  }, [url]);

  return { events, status };
}
