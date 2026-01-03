#!/bin/bash
#
# Stop script for Intelligence Agent Orchestrator
#

set -e

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PID_FILE="${SCRIPT_DIR}/orchestrator.pid"

echo -e "${YELLOW}🛑 Stopping Intelligence Agent Orchestrator...${NC}\n"

# Check if PID file exists
if [ ! -f "$PID_FILE" ]; then
    echo -e "${RED}❌ PID file not found: $PID_FILE${NC}"
    echo -e "${YELLOW}The orchestrator may not be running, or it was started differently.${NC}"
    echo -e "${YELLOW}Try: ps aux | grep orchestrator.py${NC}"
    exit 1
fi

# Read PID
PID=$(cat "$PID_FILE")

# Check if process is running
if ! ps -p "$PID" > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Process $PID is not running${NC}"
    echo -e "${YELLOW}Cleaning up stale PID file...${NC}"
    rm -f "$PID_FILE"
    exit 0
fi

# Get process info
PROCESS_INFO=$(ps -p "$PID" -o comm=)

# Stop the process
echo -e "${YELLOW}Stopping process $PID ($PROCESS_INFO)...${NC}"
kill "$PID"

# Wait for process to stop
MAX_WAIT=10
WAITED=0
while ps -p "$PID" > /dev/null 2>&1; do
    if [ $WAITED -ge $MAX_WAIT ]; then
        echo -e "${RED}❌ Process did not stop gracefully. Force killing...${NC}"
        kill -9 "$PID"
        sleep 1
        break
    fi
    sleep 1
    WAITED=$((WAITED + 1))
    echo -n "."
done

echo

# Verify it stopped
if ps -p "$PID" > /dev/null 2>&1; then
    echo -e "${RED}❌ Failed to stop process${NC}"
    exit 1
else
    echo -e "${GREEN}✅ Orchestrator stopped successfully${NC}"
    rm -f "$PID_FILE"
fi

echo -e "\n${GREEN}To restart: ./start-orchestrator.sh${NC}"



