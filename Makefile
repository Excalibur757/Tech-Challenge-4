dev:
	@echo "🚀 Iniciando todos os serviços..."
	@echo "📡 Backend GraphQL na porta 3000"
	@echo "🔐 Login MF na porta 3001"
	@echo "🏠 Home MF na porta 3002"
	@echo "💰 Extrato MF na porta 3003"
	@echo ""

	cd backend-graphql && npm run dev & \
	cd login && npm run dev -- -p 3001 & \
	cd home && npm run dev -- -p 3002 & \
	cd extrato && npm run dev -- -p 3003 & \
	wait

dev-backend:
	cd backend-graphql && npm run dev

dev-login:
	cd login && npm run dev -- -p 3001

dev-home:
	cd home && npm run dev -- -p 3002

dev-extrato:
	cd extrato && npm run dev -- -p 3003

stop:
	@echo "🛑 Parando todos os serviços..."
	@lsof -ti:3000,3001,3002,3003 | xargs kill -9 || true
	@echo "✅ Todos os serviços parados"

clean:
	@echo "🧹 Limpando processos Node..."
	@pkill -f node || true
	@echo "✅ Processos finalizados"

restart: stop dev

status:
	@echo "📊 Status dos serviços:"
	@echo "Backend (3000):" && curl -s http://localhost:3000/health || echo "  ❌ Offline"
	@echo "Login (3001):" && curl -s http://localhost:3001 || echo "  ❌ Offline"
	@echo "Home (3002):" && curl -s http://localhost:3002 || echo "  ❌ Offline"
	@echo "Extrato (3003):" && curl -s http://localhost:3003 || echo "  ❌ Offline"