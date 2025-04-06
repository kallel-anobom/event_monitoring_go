package main

import (
	"log"
	"net/http"

	"github.com/kallel-anobom/event_monitoring/api/handler"
	"github.com/kallel-anobom/event_monitoring/api/repository"
	"github.com/kallel-anobom/event_monitoring/api/usecases"
)

func main() {
	eventRepo := repository.NewEventRepository("redis:6379")
	eventUseCase := usecases.NewEventUseCase(eventRepo)
	wsHandler := handler.NewWebSocketHandler(eventUseCase)

	go eventUseCase.GenerateEvents()

	http.HandleFunc("/ws", wsHandler.HandleConnection)
	http.HandleFunc("/health", handler.HealthHandler)

	log.Println("Servidor rodando na porta 8001...")
	if err := http.ListenAndServe(":8001", nil); err != nil {
		log.Fatal("Erro ao iniciar servidor:", err)
	}
}
