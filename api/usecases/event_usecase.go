package usecases

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/kallel-anobom/event_monitoring/api/model"
	"github.com/kallel-anobom/event_monitoring/api/repository"
)

type EventUseCase struct {
	clients   map[*websocket.Conn]bool
	mu        sync.Mutex
	eventRepo *repository.EventRepository
}

func NewEventUseCase(eventRepo *repository.EventRepository) *EventUseCase {
	return &EventUseCase{
		clients:   make(map[*websocket.Conn]bool),
		eventRepo: eventRepo,
	}
}

func (e *EventUseCase) RegisterClient(conn *websocket.Conn) {
	e.mu.Lock()
	e.clients[conn] = true
	e.mu.Unlock()
}

func (e *EventUseCase) RemoveClient(conn *websocket.Conn) {
	e.mu.Lock()
	delete(e.clients, conn)
	e.mu.Unlock()
}

func (e *EventUseCase) GenerateEvents() {
	eventType := []string{"log", "transaction", "weather"}

	for {
		time.Sleep(time.Second * 2)

		event := model.Event{
			ID:        generateID(),
			Type:      eventType[rand.Intn(len(eventType))],
			Message:   "Eventos gerados",
			Timestamp: time.Now(),
		}

		if err := e.eventRepo.SaveEvent(event); err != nil {
			log.Println("Erro ao salvar evento no Redis:", err)
		}

		e.broadcastEvent(event)
	}
}

func (e *EventUseCase) broadcastEvent(event model.Event) {
	e.mu.Lock()
	defer e.mu.Unlock()

	eventJSON, _ := json.Marshal(event)

	for client := range e.clients {
		if err := client.WriteMessage(websocket.TextMessage, eventJSON); err != nil {
			log.Println("Erro ao enviar evento:", err)
			client.Close()
			delete(e.clients, client)
		}
	}
}

func generateID() string {
	timestamp := time.Now().Format("20060102150405")
	randomNum := rand.Intn(1000)
	return fmt.Sprintf("%s-%03d", timestamp, randomNum)
}
