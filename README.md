# 📝 README - Event Monitoring System

## Visão Geral

Sistema de monitoramento de eventos em tempo real com:

- Backend: API em Go com Redis para streaming de eventos
- Frontend: Painel administrativo em React/Vite
- Infra: Docker-compose para orquestração

## 🚀 Pré-requisitos

- Docker 20.10+
- Docker-compose 2.0+
- Node.js 18+ (apenas para desenvolvimento frontend)

## 🛠 ️Configuração

#### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/event-monitoring.git
cd event-monitoring
```

#### 2. Ambiente de Desenvolvimento

```bash
# Suba todos os serviços
docker-compose up -d

# Verifique os containers
docker-compose ps
```

## 🌐 Acesso aos Serviços

Serviço URL Porta
Frontend http://localhost:5173 5173
API http://localhost:8001 8001
Redis redis://localhost:6379 6379

## 🧑‍💻 Desenvolvimento

#### Frontend (Vite/React)

```bash
cd web

# Instale as dependências (primeira vez)
npm install

# Rode localmente com hot-reload
npm run dev
```

#### Backend (Go)

```bash
cd api

# Para live-reload (instale air primeiro)
go install github.com/cosmtrek/air@latest
```

### 🐳 Comandos Úteis

```bash
# Buildar e subir containers
docker-compose up -d --build

# Parar serviços
docker-compose down

# Ver logs em tempo real
docker-compose logs -f

# Acessar container do frontend
docker exec -it event-monitoring-web-1 sh
```

🏗️ Estrutura do Projeto

```bash
event-monitoring/
├── api/               # Backend Go
│   ├── cmd/           # Main application
│   ├── internal/      # Lógica de negócio
│   └── Dockerfile
├── web/               # Frontend React
│   ├── public/
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```
