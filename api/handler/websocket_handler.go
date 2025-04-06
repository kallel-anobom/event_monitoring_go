package handler

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
	"github.com/kallel-anobom/event_monitoring/api/usecases"
)

type WebSocketHandler struct {
	eventUseCase *usecases.EventUseCase
}

func NewWebSocketHandler(eventUseCase *usecases.EventUseCase) *WebSocketHandler {
	return &WebSocketHandler{eventUseCase: eventUseCase}
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func (h *WebSocketHandler) HandleConnection(w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Erro ao atualizar para WebSocket:", err)
		return
	}
	defer conn.Close()

	h.eventUseCase.RegisterClient(conn)

	for {
		if _, _, err := conn.ReadMessage(); err != nil {
			log.Println("Cliente desconectado:", err)
			h.eventUseCase.RemoveClient(conn)
			break
		}
	}
}
