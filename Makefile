compose := docker compose
run := $(compose) run --rm

node_modules/time:
	$(run) -T node yarn
	touch node_modules/time

.PHONY: shell
shell:
	$(run) node /bin/bash

.PHONY: format
format: node_modules/time
	$(run) -T -v ~/.gitconfig:/home/node/.gitconfig node yarn format

.PHONY: lint
lint: node_modules/time
	$(run) -T node yarn lint

.PHONY: serve
serve: node_modules/time
	$(compose) up -d

.PHONY: test
test: node_modules/time
	$(run) node yarn test

.PHONY: test_watch
test_watch: node_modules/time
	$(run) node yarn test:watch

.PHONY: build
build: node_modules/time
	$(run) -T node yarn build

.PHONY: clean
clean:
	$(compose) down --volumes