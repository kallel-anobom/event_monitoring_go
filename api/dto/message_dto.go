package dto

type MessageRequest struct {
	User    string `json:"user"`
	Content string `json:"content"`
}

type MessageResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}
