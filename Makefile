install:
	lerna bootstrap

local:
	@docker-compose stop && docker-compose up --build -d --remove-orphans
