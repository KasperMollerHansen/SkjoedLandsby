#!/bin/bash

# Auto-generate manifest.json from directory structure
# This script scans for all content.json files and creates manifest.json

cd "$(dirname "$0")" && python3 generate-manifest.py
