start:
	docker compose up -d

down:
	docker compose down

stop:
	docker compose stop

bash:
	docker exec -it $$(docker compose ps -q app) bash

logs:
	docker logs $$(docker compose ps -q app)

pg:
	docker exec -it $$(docker compose ps -q postgres) psql postgresql://postgres:mysecretpassword@postgres:5432/mydb

tests:
	docker exec -it $$(docker compose ps -q app) npm run test