#!/bin/bash
# Usage: ./pdf2jpg.sh <pdf-file> [output-dir]
# Converts the first page of a PDF to a JPG with the same basename.

set -e

if ! command -v pdftoppm >/dev/null 2>&1; then
  echo "Error: pdftoppm (from poppler-utils) is required. Install with: sudo apt install poppler-utils"
  exit 1
fi

PDF="$1"
OUTDIR="${2:-$(dirname "$PDF")}" # Default to same dir as PDF
BASENAME="$(basename "$PDF" .pdf)"

# Output path
OUTJPG="$OUTDIR/$BASENAME.jpg"

# Convert first page to JPG
pdftoppm -jpeg -f 1 -singlefile "$PDF" "$OUTDIR/$BASENAME"

# Rename to .jpg if needed
if [ -f "$OUTDIR/$BASENAME-1.jpg" ]; then
  mv "$OUTDIR/$BASENAME-1.jpg" "$OUTJPG"
fi

echo "Created: $OUTJPG"
