SHELL := /bin/bash
.POSIX:

DATEOF:=$(shell date +%FT%T)
HUGO_VERSION:=$(shell curl -s https://api.github.com/repos/gohugoio/hugo/releases/latest | grep 'tag_name' | cut -d '"' -f 4 | cut -c 2-)

help: ## Show this help
	@egrep -h '\s##\s' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

entry: ## Launch $EDITOR with a new entry
	if ! [ -d "./content/" ]; then mkdir content/; fi
	printf '%b\n' "---\ntitle: $(shell uuidgen) \ndate: $(DATEOF) \ncategories: \ntags: \n---\n\n" > content/$(DATEOF).md
	$(EDITOR) content/$(DATEOF).md

ship: ## One-shot git add all changes, commit and push your updates
	git add .
	git commit -m "📤 Update files"
	git push

gethugo: ## Get and install Hugo static site generator
	mkdir tmp/ && \
	cd tmp/ && \
	curl -sSL https://github.com/gohugoio/hugo/releases/download/v$(HUGO_VERSION)/hugo_extended_$(HUGO_VERSION)_Linux-64bit.tar.gz | tar -xvzf- && \
	sudo mv hugo /usr/local/bin/ && \
	cd .. && \
	rm -rf tmp/
	hugo version

demo: ## Serve this site locally using the exampleSite
	cd exampleSite/ && hugo server --themesDir ../.. -v -t neofeed