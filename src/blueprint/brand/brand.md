# Brand Memo: Protoflow

**To:** Anyone shipping, writing, or designing anything that says "Protoflow"
**From:** Brand
**Date:** 2026-05-13
**Status:** v1 — source of truth in `src/blueprint/brand/brand.ts`

---

## TL;DR

Protoflow is an opinionated harness that turns Claude Code into a disciplined product development partner. The brand should feel the same way the product feels: engineer-built, gate-protected, reuse-obsessed, allergic to ceremony.

Tagline: **Prototype with discipline.**

---

## What Protoflow is (in one sentence per audience)

- **Engineers:** A 9-phase SDLC harness that won't let you write code before phase 8 and won't let you rebuild what already exists in `shared/`.
- **Founders/CTOs:** A way to run 500+ prototypes without your codebase turning into an archaeological dig.
- **Skeptics:** Guardrails, not gatekeeping. The rules exist to protect future-you.

## What Protoflow is not

- Not a no-code tool.
- Not a productivity app.
- Not a magic AI agent that "does it all for you."
- Not a framework you bolt onto an existing repo — it's the repo.

---

## Brand promise

Turn AI-assisted prototyping from a chaotic sprint into a repeatable, reusable, production-track workflow — without slowing the builder down. Every prototype either ships, gets reused, or is killed cleanly. Nothing rots in `/tmp`.

## Brand personality

Opinionated. Engineering-first. Founder-empathetic. Direct. Reuse-obsessed. Allergic to ceremony that doesn't earn its keep. Velocity through structure, not in spite of it.

## Brand voice

The senior staff engineer who has watched a hundred prototypes rot in `/tmp` and built the system so it stops happening. Speaks engineer-to-engineer: terse, technical, plainspoken, skeptical of hype. Treats the user as a capable builder, not a customer to be onboarded.

## Tone of voice

| Situation | Tone |
|---|---|
| Default copy (docs, UI, READMEs) | Matter-of-fact, instructive, terse. |
| Gate violation / guardrail trip | Firm, non-negotiable. Explain the rule, not the feeling. |
| Reuse win | Briefly celebratory. "Reused 3 of 4 modules — nice." |
| Onboarding | Show the receipts: numbers, file paths, real commands. |
| Marketing | Same as docs. If it would feel weird in a README, cut it. |

**Never:** cute, mascot-y, fearmongering, or salesy. No exclamation marks unless something actually exclaimed.

---

## Writing rules

1. **Imperative over descriptive.** "Run `protoflow init`" beats "You can run `protoflow init` to get started."
2. **Numbers over adjectives.** "9 phases, 14 golden repos, 82 commands" beats "comprehensive."
3. **Verbs over nouns.** "Ship," "reuse," "kill," "gate," "stage."
4. **No hype words.** Banned: *revolutionary, seamless, magical, effortless, world-class, AI-powered* (Protoflow uses AI; it isn't a feature to brag about).
5. **Show the path.** Reference real files (`shared/`, `.guardrails/`, `phases/8-IMPL/`) when possible.
6. **One idea per sentence.** Short sentences. Read like docs, not ads.
7. **Lowercase product names where natural.** `protoflow` in code/CLI; `Protoflow` in prose.

### Example: same idea, three voices

- **Off-brand (salesy):** "Protoflow revolutionizes AI prototyping with magical guardrails that empower teams to ship 10× faster!"
- **Off-brand (academic):** "Protoflow is a methodological framework for the structured orchestration of AI-assisted prototyping workflows."
- **On-brand:** "Protoflow stops you from writing code in phase 1. It also stops you from rebuilding what's already in `shared/`. Both rules have saved more time than they cost."

---

## Visual identity

Source of truth: `src/blueprint/brand/brand.ts` (`protoflowBrandStyleGuide`).

### Color palette

| Role | Name | Hex |
|---|---|---|
| Primary text, blueprint borders | Ink Black | `#0A0E14` |
| Primary brand color, surfaces | Blueprint Blue | `#0B1F3A` |
| Interactive, links, primary CTA | Signal Blue | `#1E5BFF` |
| Success, in-flow state, completed phases | Flow Teal | `#00D4A4` |
| Guardrail warnings, gate checks | Gate Amber | `#F4B400` |
| Protected files, hard stops | Halt Red | `#E5484D` |
| Background, canvas | Paper | `#F5F7FA` |
| Secondary text, muted UI | Graphite | `#6B7280` |
| — | Pure White | `#FFFFFF` |

**Usage rule:** Blueprint Blue dominates. Signal Blue is for one thing per screen. Flow Teal, Gate Amber, and Halt Red are state signals, not decoration — never use them where they don't mean "good," "warn," or "stop."

### Typography (recommendation)

- **Display / code:** JetBrains Mono or IBM Plex Mono.
- **Body:** Inter.
- Engineers read more mono than sans. Lean into it; don't fight it.

### Logo system

Five variants live in `protoflowLogoLibrary`:

1. **Wordmark — light** (`light_background`): `proto` in mono + `flow` in sans, joined by a phase-tick.
2. **Wordmark — dark** (`dark_background`): inverse, phase-tick rendered in Flow Teal.
3. **Phase mark — square** (`square`): nine ticks of the SDLC arranged into a rounded square. App icons, favicons.
4. **Social avatar** (`social`): phase mark on a Blueprint Blue field, circular-crop safe.
5. **Lockup — rectangle** (`rectangle`): mark + wordmark + tagline. Headers, README banners, title slides.

**Don't:** rotate the mark, recolor it outside the palette, drop-shadow it, or place it on a busy photo. If a developer can't paste it into a terminal screenshot without it looking weird, it's wrong.

---

## Naming & spelling

- Product: **Protoflow** (one word, capital P in prose).
- CLI / package / repo: `protoflow` (lowercase).
- The phases are written in `CAPS`: SEED, RESEARCH, EXPANSION, ANALYSIS, SELECTION, DESIGN, TEST, IMPL, REFINE.
- "Golden repos," "guardrails," "gates," "overwatch" are common nouns — lowercase in prose.
- Avoid: "Proto-Flow," "ProtoFlow," "proto flow," "PF."

---

## What "on-brand" looks like in the wild

- A README that opens with a command, not a paragraph.
- An error message that names the violated rule and the file path to fix it.
- A landing page that shows the 9 phases as a diagram before it shows a hero image.
- A demo video that's 90 seconds and ends with a `git diff`.
- A tweet that's a screenshot of a terminal.

## What "off-brand" looks like

- Stock photos of laptops on minimalist desks.
- A mascot.
- "10x your productivity" anywhere, ever.
- Hero copy that doesn't mention phases, gates, reuse, or shared code.
- A pricing page before a docs page.

---

## Open questions (v2 candidates)

- Motion / animation language for phase transitions.
- Sound design for the CLI (terminal bell on gate violations?).
- Long-form voice — does the brand have a manifesto, or is the README the manifesto?
- Mascot decision (current answer: no, but worth revisiting if a community forms).

---

*Anything in this memo conflicts with `src/blueprint/brand/brand.ts`? The code wins. Open a PR against both.*
