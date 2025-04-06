package repository

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"github.com/kallel-anobom/event_monitoring/api/model"
	"github.com/redis/go-redis/v9"
)

type EventRepository struct {
	redisClient *redis.Client
	ctx         context.Context
}

func NewEventRepository(redisAddr string) *EventRepository {
	client := redis.NewClient(&redis.Options{
		Addr: redisAddr,
	})
	return &EventRepository{
		redisClient: client,
		ctx:         context.Background(),
	}
}

func (r *EventRepository) SaveEvent(event model.Event) error {
	eventJSON, err := json.Marshal(event)
	if err != nil {
		return err
	}

	key := fmt.Sprintf("event:%s", event.ID)
	return r.redisClient.Set(r.ctx, key, eventJSON, time.Hour).Err()
}

func (r *EventRepository) GetRecentEvents(limit int) ([]model.Event, error) {
	keys, err := r.redisClient.Keys(r.ctx, "event:*").Result()
	if err != nil {
		return nil, err
	}

	var events []model.Event
	for _, key := range keys {
		data, err := r.redisClient.Get(r.ctx, key).Result()
		if err != nil {
			continue
		}

		var event model.Event
		if err := json.Unmarshal([]byte(data), &event); err != nil {
			continue
		}
		events = append(events, event)
	}

	if len(events) > limit {
		events = events[len(events)-limit:]
	}

	return events, nil
}
