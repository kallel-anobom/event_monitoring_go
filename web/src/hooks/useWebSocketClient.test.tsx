import { act, renderHook } from "@testing-library/react";
import { useWebSocketClient } from "./useWebSocketClient";

(global as any).WebSocket = WebSocket;

describe("useWebSocketClient", () => {
  const url = "ws://test.com";
  let mockWebSocket: any;

  beforeEach(() => {
    mockWebSocket = {
      onopen: jest.fn(),
      onclose: jest.fn(),
      onmessage: jest.fn(),
      close: jest.fn(),
      readyState: 1,
    };

    (global as any).WebSocket = jest.fn(() => mockWebSocket);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should initialize with disconnected status and empty events", () => {
    const { result } = renderHook(() => useWebSocketClient(url));

    expect(result.current.status).toBe("disconnected");
    expect(result.current.events).toEqual([]);
  });

  it("should connect to WebSocket and update status", () => {
    const { result } = renderHook(() => useWebSocketClient(url));

    act(() => {
      mockWebSocket.onopen();
    });

    expect(result.current.status).toBe("connected");
  });

  it("should handle incoming messages", () => {
    const { result } = renderHook(() => useWebSocketClient(url));
    const testEvent = { id: "1", message: "test", type: "info" };

    act(() => {
      mockWebSocket.onmessage({ data: JSON.stringify(testEvent) });
    });

    expect(result.current.events).toEqual([testEvent]);
  });

  it("should close connection on unmount", () => {
    const { unmount } = renderHook(() => useWebSocketClient(url));

    unmount();

    expect(mockWebSocket.close).toHaveBeenCalled();
  });

  it("should handle connection errors", () => {
    const { result } = renderHook(() => useWebSocketClient(url));

    act(() => {
      mockWebSocket.onclose();
    });

    expect(result.current.status).toBe("disconnected");
  });
});
