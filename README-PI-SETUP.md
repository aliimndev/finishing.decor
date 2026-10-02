# Daily Engineering Setup for Pi

This project provides a comprehensive setup for both Software Engineer and Design Engineer roles using Pi (pi-coding-agent).

## Setup Summary

### Automatically Loaded Skills

**Software Engineer Daily:**
- `/skill software-engineer-daily` - Daily SE tasks (review, debug, refactor, test, CI/CD)

**Design Engineer Daily:**
- `/skill design-engineer-daily` - Daily design tasks (UI, visual, prototype, critique, accessibility)

**All existing design skills are also available:**
- `design-taste-frontend`, `high-end-visual-design`, `minimalist-ui`, `industrial-brutalist-ui`
- `brandkit`, `image-to-code`, `redesign-existing-projects`, and many more

### Project Configuration

- **Auto-loaded:** `AGENTS.md` context file
- **Skills directory:** `.pi/agent/skills/` (for SE + Design daily tasks)
- **Existing skills:** `.agents/skills/` (for design work)

## Usage Examples

### Daily Software Engineering Workflow

```bash
# Use /skill software-engineer-daily to see daily tasks
/skill software-engineer-daily list tasks

# Pick and execute a task for the day
/skill software-engineer-daily execute task code-review
# Or: /skill software-engineer-daily pick task debugging
```

### Daily Design Engineering Workflow

```bash
# Use /skill design-engineer-daily to see daily tasks
/skill design-engineer-daily list tasks

# Execute a design task
/skill design-engineer-daily execute task ui-design
# Or: /skill design-engineer-daily pick task prototyping
```

### Combined Workflow

```bash
"Help me with today's software engineering work"
# Will auto-load both SE and Design skills, use appropriate ones
```

"Design a new dashboard"
# Will use design skills + SE capabilities
```

## Integration with Ponytail

This setup references:
```bash
pi install git:github.com/DietrichGebert/ponytail
```

Use Ponytail for:
- Task management
- Project structure planning
- Workflow coordination

## Rules Applied by Skills

### Software Engineer Rules
- Code review against documented coding standards
- Technical debt detection (TODO, FIXME, HACK)
- Accessibility compliance
- CI/CD pipeline setup
- Test coverage requirements

### Design Engineer Rules  
- Editorial typography and bento grids
- No gradients/heavy shadows
- Premium design standards
- Accessibility checks
- Design system consistency

## Starting Your First Session

```bash
pi --name "Daily Engineering" "Show me today's software engineering tasks"
pi --name "Design Session" "Help me create a new UI component"
```

## Quick Reference Commands

| Command | Purpose |
|---|---|
| `/skill software-engineer-daily` | Daily SE tasks |
| `/skill design-engineer-daily` | Daily design tasks |
| `/skill design-taste-frontend` | Premium frontend design |
| `/skill high-end-visual-design` | Premium visual design |
| `/skill brandkit` | Brand kit creation |
| `/skill image-to-code` | Image to code conversion |

## Project Structure

```
Decorar/
├── .pi/agent/skills/software-engineer-daily/SKILL.md
├── .pi/agent/skills/design-engineer-daily/SKILL.md
├── .agents/skills/ (18+ existing design skills)
├── AGENTS.md (project context)
└── Your work...
```

You now have a complete setup for both Software Engineer and Design Engineer work with Pi!