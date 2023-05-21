compose := docker compose
run := $(compose) run --rm

node_modules/time:
	$(run) -T storybook yarn
	touch node_modules/time

.PHONY: shell
shell:
	$(run) storybook /bin/bash

.PHONY: format
format: node_modules/time
	$(run) -T -v ~/.gitconfig:/home/node/.gitconfig storybook yarn format

.PHONY: lint
lint: node_modules/time
	$(run) -T storybook yarn lint

.PHONY: serve
serve: node_modules/time
	$(compose) up -d

.PHONY: test
test: node_modules/time
	$(run) storybook yarn test

.PHONY: test_watch
test_watch: node_modules/time
	$(run) storybook yarn test:watch

.PHONY: build
build: node_modules/time
	$(run) -T storybook yarn build:project

.PHONY: build_documentation
build_documentation: node_modules/time
	$(run) -T storybook yarn build:storybook

.PHONY: clean
clean:
	$(compose) down --volumes