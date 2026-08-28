.PHONY: install build test dev docker-up docker-down loc

install:
	npm install

build:
	npm run build

test:
	npm test -- --runInBand

dev:
	npm run dev:backend

docker-up:
	docker compose up --build

docker-down:
	docker compose down

loc:
	npm run loc