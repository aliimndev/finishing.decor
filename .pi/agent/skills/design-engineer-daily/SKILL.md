---
name: design-engineer-daily
other_names: [design-eng, design-daily, ui-engineer, ux-engineer]
author: pi-coding-agent
version: 1.0.0
description: Daily design engineering tasks for UI design, visual design, prototyping, and design critique. Available via /skill design-engineer-daily.
---
Use this skill for daily design engineering tasks. Call `/skill design-engineer-daily` to see available tasks and execute them.

## How to use

1. **List tasks:** `/skill design-engineer-daily list tasks`
2. **Pick task:** `/skill design-engineer-daily pick task <task-id>`
3. **Execute task:** `/skill design-engineer-daily execute task <task-id>`

## Available Tasks

### 1. UI Design
**What it does:** Create or refine UI components and layouts
**When to use:** When building new features or improving existing UI
**Command:** `find src -name "*.tsx" -o -name "*.vue" -o -name "*.jsx" | head -20` (find UI components)
**Expected:** New or improved UI components with proper design
**Severity:** High

### 2. Visual Design
**What it does:** Apply visual style, branding, and design system consistency
**When to use:** When implementing design specs or updating visual language
**Command:** `grep -r "theme\|style\|color" --include="*.css" --include="*.scss" --include="*.tsx" | head -10` (find design tokens)
**Expected:** Consistent visual design applied across components
**Severity:** Medium

### 3. Prototyping
**What it does:** Build interactive prototypes for user testing
**When to use:** Before implementing complex features or for stakeholder review
**Command:** `find . -name "*.figma" -o -name "*.sketch" -o -name "*.html" | head -5` (find prototype files)
**Expected:** Interactive prototype ready for review
**Severity:** High

### 4. Design Critique
**What it does:** Review and iterate on designs with peers
**When to use:** After completing design work or before handoff
**Command:** `git diff --name-only HEAD~1 | grep -E "\.(figma|sketch|png|jpg|svg|css|scss)$"` (find design changes)
**Expected:** Feedback incorporated, design improved
**Severity:** Medium

### 5. Design System Maintenance
**What it does:** Update and maintain design system components
**When to use:** When design tokens change or new components needed
**Command:** `ls -la src/components/ui/ 2>/dev/null || ls -la components/ 2>/dev/null` (find UI component library)
**Expected:** Design system updated and documented
**Severity:** Medium

### 6. Accessibility Audit
**What it does:** Check and improve accessibility compliance
**When to use:** Before releases or when adding new interactive elements
**Command:** `npx axe-cli . 2>/dev/null || echo "axe not installed - run: npm install -g @axe-core/cli"` (run accessibility check)
**Expected:** Accessibility issues identified and fixed
**Severity:** High

## Daily Workflow

1. **Morning:** UI design or visual design work
2. **Afternoon:** Prototyping or design system work
3. **Evening:** Design critique or accessibility audit

This skill helps you structure your daily design engineering work and ensures consistent quality across all design outputs.

## Integration with Existing Skills

This skill complements your existing design skills:
- `design-taste-frontend` — for taste-driven frontend design
- `high-end-visual-design` — for premium visual design
- `stitch-design-taste` — for Google Stitch design system
- `image-to-code` — for image-to-code conversion
- `redesign-existing-projects` — for redesigning existing projects

Use these alongside `design-engineer-daily` for comprehensive design engineering workflows.