#!/usr/bin/env python3
"""
MediCare Connect - Enterprise Healthcare Codebase Generator
Generates comprehensive clinical, interoperability, billing, EHR, hospital ERP,
telehealth, compliance, shared, and UI modules.
"""

import os
import sys

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

def write_ts_file(filepath, content):
    ensure_dir(os.path.dirname(filepath))
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    print(f"Generated: {os.path.relpath(filepath, BASE_DIR)} ({len(content.splitlines())} lines)")

# Generators will be defined and called here
