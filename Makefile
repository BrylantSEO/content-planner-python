.PHONY: setup install run doctor help

help:
	@echo ""
	@echo "Content Planner — available commands:"
	@echo ""
	@echo "  make setup    — first-time setup (install deps + Playwright)"
	@echo "  make run      — start the web UI (http://localhost:5000)"
	@echo "  make doctor   — check crawl4ai installation"
	@echo "  make install  — reinstall Python dependencies only"
	@echo ""

setup:
	bash setup.sh

install:
	pip install -r requirements.txt

run:
	python3 app.py

doctor:
	crawl4ai-doctor
