#!/bin/bash
#
# Startup script for Intelligence Agent Orchestrator
# This script handles starting the orchestrator with proper error checking
#

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
VENV_DIR="${SCRIPT_DIR}/env"
PYTHON="${VENV_DIR}/bin/python3"
ORCHESTRATOR="${SCRIPT_DIR}/orchestrator.py"
ENV_FILE="${SCRIPT_DIR}/.env"
LOG_FILE="${SCRIPT_DIR}/orchestrator.log"
PID_FILE="${SCRIPT_DIR}/orchestrator.pid"

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  Intelligence Agent Orchestrator Startup${NC}"
echo -e "${BLUE}================================================${NC}\n"

# Check if virtual environment exists
if [ ! -d "$VENV_DIR" ]; then
    echo -e "${RED}❌ Virtual environment not found at: $VENV_DIR${NC}"
    echo -e "${YELLOW}💡 Run: python3 -m venv env && source env/bin/activate && pip install -r requirements.txt${NC}"
    exit 1
fi

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
    echo -e "${RED}❌ Environment file not found: $ENV_FILE${NC}"
    echo -e "${YELLOW}💡 Copy .env.example to .env and configure your credentials${NC}"
    exit 1
fi

# Check if orchestrator.py exists
if [ ! -f "$ORCHESTRATOR" ]; then
    echo -e "${RED}❌ Orchestrator script not found: $ORCHESTRATOR${NC}"
    exit 1
fi

# Check if already running
if [ -f "$PID_FILE" ]; then
    OLD_PID=$(cat "$PID_FILE")
    if ps -p "$OLD_PID" > /dev/null 2>&1; then
        echo -e "${YELLOW}⚠️  Orchestrator is already running (PID: $OLD_PID)${NC}"
        echo -e "${YELLOW}   To stop it: kill $OLD_PID${NC}"
        exit 1
    else
        echo -e "${YELLOW}⚠️  Stale PID file found. Removing...${NC}"
        rm -f "$PID_FILE"
    fi
fi

# Check if Ollama is running
if ! curl -s http://localhost:11434/api/tags > /dev/null 2>&1; then
    echo -e "${RED}❌ Ollama is not running${NC}"
    echo -e "${YELLOW}💡 Start Ollama first: ollama serve${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Pre-flight checks passed${NC}\n"

# Run test mode first
echo -e "${BLUE}🧪 Running test cycle...${NC}"
cd "$SCRIPT_DIR"
source "${VENV_DIR}/bin/activate"

if "$PYTHON" "$ORCHESTRATOR" --test; then
    echo -e "\n${GREEN}✅ Test cycle completed successfully${NC}\n"
else
    echo -e "\n${RED}❌ Test cycle failed${NC}"
    echo -e "${YELLOW}💡 Fix the errors above before starting in production mode${NC}"
    exit 1
fi

# Check for --yes flag
FORCE_START=false
if [[ "$*" == *"--yes"* ]]; then
    FORCE_START=true
fi

# Ask user if they want to start in production mode
echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}Ready to start in production mode${NC}"
echo -e "${BLUE}================================================${NC}\n"

if [ "$FORCE_START" = false ]; then
    read -p "Start orchestrator in background? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo -e "${YELLOW}Aborted by user${NC}"
        exit 0
    fi
fi

# Start orchestrator in background
echo -e "\n${BLUE}🚀 Starting orchestrator in background...${NC}"

nohup "$PYTHON" "$ORCHESTRATOR" > "$LOG_FILE" 2>&1 &
PID=$!

# Save PID
echo $PID > "$PID_FILE"

# Wait a moment and check if it's still running
sleep 2
if ps -p $PID > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Orchestrator started successfully${NC}"
    echo -e "${GREEN}   PID: $PID${NC}"
    echo -e "${GREEN}   Log file: $LOG_FILE${NC}"
    echo -e "\n${BLUE}Useful commands:${NC}"
    echo -e "  • View logs: ${YELLOW}tail -f $LOG_FILE${NC}"
    echo -e "  • Check status: ${YELLOW}ps -p $PID${NC}"
    echo -e "  • Stop: ${YELLOW}kill $PID${NC}"
    echo -e "  • Restart: ${YELLOW}kill $PID && ./start-orchestrator.sh${NC}"
else
    echo -e "${RED}❌ Failed to start orchestrator${NC}"
    echo -e "${YELLOW}Check the log file: $LOG_FILE${NC}"
    rm -f "$PID_FILE"
    exit 1
fi

echo -e "\n${GREEN}🎉 All systems operational!${NC}\n"



