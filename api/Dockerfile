FROM golang:1.22.2-alpine

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download
RUN go mod tidy

COPY . .

RUN go build -o main ./cmd/main.go

EXPOSE 8080

CMD ["/app/main"]