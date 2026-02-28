#!/bin/bash
# Content Planner — One-command setup
# Usage: ./setup.sh

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo ""
echo "╔══════════════════════════════════════════════╗"
echo "  Content Planner — Setup"
echo "╚══════════════════════════════════════════════╝"
echo ""

# 1. Python version check
PYTHON=$(command -v python3 || command -v python)
if [ -z "$PYTHON" ]; then
    echo -e "${RED}ERROR: Python 3 not found. Install from https://python.org${NC}"
    exit 1
fi

PY_VERSION=$($PYTHON -c "import sys; print(f'{sys.version_info.major}.{sys.version_info.minor}')")
echo -e "${GREEN}✓ Python $PY_VERSION${NC}"

# 2. Install Python dependencies
echo ""
echo "→ Installing Python dependencies..."
$PYTHON -m pip install -r requirements.txt --quiet
echo -e "${GREEN}✓ Dependencies installed${NC}"

# 3. crawl4ai-setup (downloads Playwright browsers)
echo ""
echo "→ Setting up crawl4ai (downloading Playwright browsers ~100MB)..."
crawl4ai-setup
echo -e "${GREEN}✓ crawl4ai ready${NC}"

# 4. Copy .env if not exists
if [ ! -f ".env" ]; then
    if [ -f ".env.example" ]; then
        cp .env.example .env
        echo -e "${YELLOW}→ Created .env from .env.example — add your API keys!${NC}"
    fi
else
    echo -e "${GREEN}✓ .env exists${NC}"
fi

echo ""
echo "╔══════════════════════════════════════════════╗"
echo -e "  ${GREEN}Setup complete!${NC}"
echo ""
echo "  Next steps:"
echo "  1. Add API keys to .env (or via UI ⚙ Settings)"
echo "  2. Run:  python3 app.py"
echo "  3. Open: http://localhost:5000"
echo "╚══════════════════════════════════════════════╝"
echo ""
