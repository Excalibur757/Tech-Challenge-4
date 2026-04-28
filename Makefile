dev:
	@echo "🚀 Iniciando..."
	cd backend && npm run dev & \
	cd login && npm run dev & -- -p 3001 &\
	cd home && npm run dev -- -p 3002 & \
	cd extrato && npm run dev -- -p 3003 & \
	wait