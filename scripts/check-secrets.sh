#!/bin/bash

# Pre-commit hook to check for potential secrets
# This script scans staged files for common secret patterns

set -e

RED='\033[0;31m'
YELLOW='\033[1;33m'
GREEN='\033[0;32m'
NC='\033[0m' # No Color

echo "🔍 Scanning for potential secrets..."

# Get list of staged files
staged_files=$(git diff --cached --name-only --diff-filter=ACM)

if [ -z "$staged_files" ]; then
    echo "${GREEN}✅ No staged files to check${NC}"
    exit 0
fi

# Define secret patterns to check for
declare -a patterns=(
    # Generic API keys (longer, more specific)
    "['\"][a-zA-Z0-9]{40,}['\"]"
    # AWS keys
    "AKIA[0-9A-Z]{16}"
    # Private keys
    "-----BEGIN (RSA |OPENSSH |DSA |EC |PGP )?PRIVATE KEY"
    # Actual secret values (not placeholders)
    "VITE_[A-Z_]*=['\"]?[a-zA-Z0-9_-]{20,}['\"]?"
    # JWT tokens
    "eyJ[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*"
    # Database URLs with credentials
    "postgresql://[^:]+:[^@]+@"
    "mongodb://[^:]+:[^@]+@"
)

found_secrets=0

# Check each staged file
for file in $staged_files; do
    if [ -f "$file" ]; then
        # Skip binary files and specific file types
        if file "$file" | grep -q "text\|empty"; then
            # Check against each pattern
            for pattern in "${patterns[@]}"; do
                matches=$(grep -nE "$pattern" "$file" 2>/dev/null || true)
                if [ -n "$matches" ]; then
                    # Filter out common false positives
                    filtered_matches=$(echo "$matches" | grep -v -E "(your_.*_here|your_github_client|example|placeholder|contact@hartleyleroy\.dev|security@hartleyleroy\.dev|hartley\.leroy1997@gmail\.com|VITE_ENABLE_|VITE_SITE_|postgresql://|mongodb://)" || true)
                    if [ -n "$filtered_matches" ]; then
                        if [ $found_secrets -eq 0 ]; then
                            echo ""
                            echo "${RED}❌ Potential secrets found:${NC}"
                        fi
                        echo "${YELLOW}📄 $file:${NC}"
                        echo "$filtered_matches" | while IFS= read -r line; do
                            echo "   ${RED}🔑 $line${NC}"
                        done
                        echo ""
                        found_secrets=$((found_secrets + 1))
                    fi
                fi
            done
        fi
    fi
done

# Check for specific risky files
risky_files=(".env" ".env.production" ".env.staging" "config/secrets.yml" "secrets.json")
for risky_file in "${risky_files[@]}"; do
    if echo "$staged_files" | grep -q "^$risky_file$"; then
        echo "${RED}❌ Attempting to commit risky file: $risky_file${NC}"
        found_secrets=$((found_secrets + 1))
    fi
done

if [ $found_secrets -gt 0 ]; then
    echo ""
    echo "${RED}🚨 COMMIT BLOCKED: Potential secrets detected!${NC}"
    echo ""
    echo "${YELLOW}If these are not actually secrets:${NC}"
    echo "1. Review the flagged content carefully"
    echo "2. Use placeholder values or move to .env.local"
    echo "3. Add sensitive data to GitHub Secrets instead"
    echo ""
    echo "${YELLOW}To bypass this check (NOT RECOMMENDED):${NC}"
    echo "git commit --no-verify"
    echo ""
    exit 1
else
    echo "${GREEN}✅ No secrets detected. Commit is safe to proceed.${NC}"
    exit 0
fi