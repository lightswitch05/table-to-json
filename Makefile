.PHONY: test

setup:
	@docker-compose pull
	@docker-compose run --rm node npm install

build: lint
	@docker-compose run --rm node ./node_modules/grunt-cli/bin/grunt build

lint:
	@docker-compose run --rm node ./node_modules/grunt-cli/bin/grunt lint
