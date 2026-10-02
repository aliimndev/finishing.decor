---
name: software-engineer-daily
other_names: [se-daily, software-eng, daily-coding]
author: pi-coding-agent
version: 1.0.0
description: Daily software engineering tasks for code review, debugging, refactoring, testing, and CI/CD setup. Available via /skill software-engineer-daily.
---
Use this skill for daily software engineering tasks. Call `/skill software-engineer-daily` to see available tasks and execute them.

## How to use

1. **List tasks:** `/skill software-engineer-daily list tasks`
2. **Pick task:** `/skill software-engineer-daily pick task <task-id>`
3. **Execute task:** `/skill software-engineer-daily execute task <task-id>`

## Available Tasks

### 1. Code Review
**What it does:** Review pull requests and code quality checks
**When to use:** At start of day or when reviewing PRs
**Command:** `git diff HEAD~1` (if reviewing previous PR) or `git log --oneline -10` (for recent changes)
**Expected:** Code quality issues identified, PRs reviewed
**Severity:** High

### 2. Debugging
**What it does:** Identify and fix production issues
**When to use:** When bugs are reported or unexpected behavior occurs
**Command:** `git log --grep="bug" --oneline -20` (search for bug fixes)
**Expected:** Root cause found and fix implemented
**Severity:** Critical

### 3. Refactoring
**What it does:** Improve code structure and readability
**When to use:** When code is hard to maintain or has technical debt
**Command:** `git grep -r "TODO\|FIXME\|HACK" --include="*.js" --include="*.ts" --include="*.py"` (find technical debt)
**Expected:** Code structure improved, documentation updated
**Severity:** Medium

### 4. Testing
**What it does:** Add or improve test coverage
**When to use:** When adding new features or covering edge cases
**Command:** `git diff --name-only HEAD~1` (find changed files for testing)
**Expected:** Tests written, coverage improved
**Severity:** Medium

### 5. CI/CD Setup
**What it does:** Configure continuous integration pipeline
**When to use:** When starting new repos or pipeline improvements
**Command:** `ls -la .github/workflows/` or `ls -la .gitlab-ci.yml` (check existing CI)
**Expected:** CI pipeline configured and working
**Severity:** High

## Daily Workflow

1. **Morning:** Start with code review or debugging
2. **Afternoon:** Refactor technical debt or add tests
3. **Evening:** Setup CI/CD improvements

This skill helps you structure your daily engineering work and stay consistent with good practices.