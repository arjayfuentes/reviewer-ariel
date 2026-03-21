import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface InfoItem {
  title: string;
  description: string;
  detail?: string;
  tip?: string;
}

interface InfoSection {
  title: string;
  icon: string;
  color: string;
  expanded: boolean;
  items: InfoItem[];
}

@Component({
  selector: 'app-sdlc-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sdlc-info.component.html',
  styleUrl: './sdlc-info.component.css',
})
export class SdlcInfoComponent {
  sections: InfoSection[] = [
    {
      title: 'What is SDLC?',
      icon: '🔄',
      color: 'section-blue',
      expanded: true,
      items: [
        {
          title: 'Software Development Life Cycle',
          description:
            'SDLC is a structured process that defines the stages involved in building software — from planning to retirement.',
          detail: `Think of SDLC as the blueprint for how a software project is organized and executed. It ensures that teams don't just "start coding" but instead follow a repeatable, predictable process that produces high-quality software.
Every software project — no matter how big or small — goes through some form of SDLC. The specific steps and how strictly they are followed depends on the methodology the team chooses (Waterfall, Agile, Kanban, etc.).`,
          tip: 'As a Medior developer, you are expected to understand where your work fits in the broader SDLC — not just write code, but participate in planning, review, and delivery.',
        },
        {
          title: 'The 6 Core Phases',
          description:
            'Every SDLC model follows these fundamental phases regardless of methodology.',
          detail: `1. Planning — Define scope, timeline, budget, and resources. Who does what and by when?
2. Requirements Analysis — What does the software need to do? Gather requirements from stakeholders.
3. Design — How will the software be built? Architecture, database design, UI/UX wireframes.
4. Implementation (Development) — Actual coding. This is where developers spend most of their time.
5. Testing & QA — Verify the software works correctly. Unit tests, integration tests, UAT.
6. Deployment & Maintenance — Release to production and keep it running. Bug fixes, updates, monitoring.`,
          tip: 'In Agile, these phases happen in short cycles (sprints) rather than one long sequential flow.',
        },
      ],
    },
    {
      title: 'Agile Methodology',
      icon: '⚡',
      color: 'section-purple',
      expanded: true,
      items: [
        {
          title: 'What is Agile?',
          description:
            'Agile is an iterative approach to software development that delivers working software in short cycles called sprints.',
          detail: `Agile was born out of frustration with Waterfall — where you plan everything upfront, build for months, and only discover problems at the end.
Agile flips this: deliver small, working pieces of software frequently and adjust based on feedback. The Agile Manifesto (2001) defines four core values:
1. Individuals and interactions over processes and tools
2. Working software over comprehensive documentation
3. Customer collaboration over contract negotiation
4. Responding to change over following a plan
This does NOT mean "no documentation" or "no planning" — it means these things are balanced with flexibility.`,
          tip: 'Most modern companies use Agile or a hybrid. When you join Experlogix, ask: "Are you doing Scrum or Kanban?" — both are Agile frameworks but work differently.',
        },
        {
          title: 'Agile vs Waterfall',
          description:
            'Waterfall is sequential — each phase must finish before the next starts. Agile is iterative — you deliver continuously.',
          detail: `Waterfall:
→ Plan → Design → Build → Test → Deploy (once, at the end)
→ Good for: projects with fixed, well-understood requirements (e.g., building a bridge)
→ Bad for: software where requirements change frequently

Agile:
→ Plan a little → Build a little → Test a little → Ship a little → Repeat
→ Good for: software products where user needs evolve
→ Bad for: projects with strict regulatory sign-off at each phase

In practice: Most enterprise software teams use Agile with some Waterfall elements (like upfront architecture planning).`,
          tip: 'If someone asks "are you Waterfall or Agile?" — the answer is almost always Agile in modern development.',
        },
      ],
    },
    {
      title: 'Scrum Framework',
      icon: '🏉',
      color: 'section-green',
      expanded: true,
      items: [
        {
          title: 'What is Scrum?',
          description:
            'Scrum is the most popular Agile framework. It organizes work into fixed-length sprints (usually 2 weeks) with defined roles and ceremonies.',
          detail: `Scrum has three key roles:
1. Product Owner (PO) — Owns the product backlog. Decides what gets built and in what order. Represents the business/customer.
2. Scrum Master (SM) — Facilitates the process. Removes blockers. Coaches the team on Scrum. Not a manager.
3. Development Team — Cross-functional team that designs, builds, and tests the software. Usually 5-9 people.

Key artifacts:
- Product Backlog — The prioritized list of everything the product needs (user stories, bugs, tech debt).
- Sprint Backlog — The subset of backlog items the team commits to delivering in the current sprint.
- Increment — The working software produced at the end of each sprint.`,
          tip: 'As a developer, you are part of the Development Team. Your main job is to take items from the Sprint Backlog and deliver them as working, tested software.',
        },
        {
          title: 'What is a Sprint?',
          description:
            'A sprint is a fixed time-box (usually 1-4 weeks) during which the team builds a potentially shippable product increment.',
          detail: `A sprint is like a mini-project with a clear start, end, and goal.

Before the sprint: The team selects items from the Product Backlog during Sprint Planning.
During the sprint: The team works on the selected items, meeting daily in the Daily Standup.
End of sprint: The team demonstrates working software in the Sprint Review, then reflects in the Retrospective.

Sprint rules:
- The sprint goal does not change once it starts
- No new items can be added to the sprint without removing something else
- The team self-organizes — no one tells developers HOW to do their work, only WHAT needs to be done`,
          tip: 'Common sprint lengths: 1 week (fast-paced startups), 2 weeks (most common), 4 weeks (complex enterprise systems). Ask your team what length they use.',
        },
      ],
    },
    {
      title: 'Agile Ceremonies',
      icon: '📅',
      color: 'section-teal',
      expanded: true,
      items: [
        {
          title: 'Sprint Planning',
          description:
            'The team selects work from the Product Backlog and commits to a sprint goal.',
          detail: `When: Start of every sprint
Duration: 2-4 hours for a 2-week sprint
Who: Entire Scrum team (PO, SM, Developers)

What happens:
1. PO presents the top priority items from the backlog
2. Team discusses each item — asks questions, clarifies acceptance criteria
3. Team estimates effort (story points, t-shirt sizes, or hours)
4. Team selects how much they can realistically deliver
5. Team agrees on a Sprint Goal — a single sentence describing what the sprint will achieve

Output: Sprint Backlog — the list of items the team commits to for this sprint`,
          tip: 'During planning, speak up if a requirement is unclear. It is far cheaper to ask questions now than to discover misunderstandings mid-sprint.',
        },
        {
          title: 'Daily Standup (Daily Scrum)',
          description:
            'A 15-minute daily sync where the team coordinates work and surfaces blockers.',
          detail: `When: Every day, same time
Duration: 15 minutes maximum
Who: Development team (PO and SM optional)

Each team member answers:
1. What did I do yesterday?
2. What will I do today?
3. Are there any blockers or impediments?

Common mistakes:
- Turning it into a status report for the manager — it's for the TEAM
- Going over 15 minutes — park detailed discussions for after
- Skipping it because "we're all busy" — it's only 15 minutes and prevents misalignment`,
          tip: 'Keep it short and focused. If a blocker needs a longer conversation, say "let\'s take this offline" and discuss after the standup with just the relevant people.',
        },
        {
          title: 'Sprint Review (Demo)',
          description:
            'The team demonstrates completed work to stakeholders and collects feedback.',
          detail: `When: End of every sprint
Duration: 1-2 hours for a 2-week sprint
Who: Entire Scrum team + stakeholders, customers, management

What happens:
1. Team demos the working software built during the sprint
2. Stakeholders provide feedback
3. PO updates the backlog based on feedback
4. Discussion about what's coming next

Important: Only DONE items are demoed. If something is 90% complete, it does NOT get demoed.
"Done" means: coded, tested, reviewed, and meets the Definition of Done.`,
          tip: 'As a developer, you may be asked to demo your own feature. Practice a brief walkthrough: "Here is the problem we were solving, here is what I built, here is how it works."',
        },
        {
          title: 'Sprint Retrospective',
          description:
            'The team reflects on how they worked together and identifies improvements for the next sprint.',
          detail: `When: After the Sprint Review, before next Sprint Planning
Duration: 1-1.5 hours for a 2-week sprint
Who: Scrum team only (no external stakeholders)

Classic format — the team discusses:
1. What went well? (Keep doing)
2. What didn't go well? (Stop doing)
3. What should we try next sprint? (Start doing)

Output: 1-3 actionable improvements the team commits to in the next sprint.

Why it matters: This is how teams get better over time. Without retrospectives, teams repeat the same mistakes sprint after sprint.`,
          tip: 'Be honest but constructive. Retros are a safe space — the goal is process improvement, not blame. Focus on systems and processes, not people.',
        },
        {
          title: 'Backlog Refinement (Grooming)',
          description:
            'The team reviews and prepares upcoming backlog items so they are ready for future sprints.',
          detail: `When: Mid-sprint (usually once per sprint)
Duration: 1 hour
Who: PO + Development team (SM optional)

What happens:
1. PO presents upcoming backlog items
2. Team asks clarifying questions
3. Items are estimated (story points)
4. Large items are broken down into smaller ones
5. Acceptance criteria are defined or refined

This is NOT a commitment ceremony — the team is just preparing items so Sprint Planning runs smoothly.`,
          tip: 'Refinement prevents Sprint Planning from becoming a 4-hour marathon. Well-refined items have clear acceptance criteria, are estimated, and are small enough to complete in one sprint.',
        },
      ],
    },
    {
      title: 'Story Points & Estimation',
      icon: '📊',
      color: 'section-orange',
      expanded: true,
      items: [
        {
          title: 'What are Story Points?',
          description:
            'Story points are a unit of measurement for estimating the relative effort of completing a user story.',
          detail: `Story points measure effort, complexity, and uncertainty — NOT hours.
Common scales: Fibonacci sequence (1, 2, 3, 5, 8, 13, 21) or T-shirt sizes (XS, S, M, L, XL).

Why Fibonacci? The gaps between numbers represent natural uncertainty — there's a big difference between a 13-point story and a 21-point story, just as complex tasks are hard to estimate precisely.

What 1 point means: The simplest possible thing your team can do. Everything else is estimated relative to that.
3 points: ~3x the effort/complexity of a 1-point story
8 points: Starting to get complex — consider breaking it down
13+ points: Almost certainly needs to be split into smaller stories`,
          tip: 'Story points are relative to YOUR team — a 5-point story for one team might be a 2-point story for another. What matters is internal consistency.',
        },
        {
          title: 'Planning Poker',
          description:
            'A consensus-based estimation technique where team members simultaneously reveal their estimates to avoid anchoring bias.',
          detail: `How it works:
1. PO reads a user story
2. Team members privately select a card (1, 2, 3, 5, 8, 13, 21)
3. Everyone reveals simultaneously
4. If estimates differ widely, discuss — the person with the highest AND lowest estimate explains their reasoning
5. Re-estimate until consensus is reached

Why simultaneous reveal? If one person says "3" first, everyone else anchors to that number — even if they thought "8". Simultaneous reveal prevents this cognitive bias.

Online tools: PlanningPoker.com, Scrum Poker Online, Jira has built-in estimation.`,
          tip: "If you are new to a team, observe 1-2 planning sessions before estimating. You need to understand the team's baseline before your estimates are calibrated.",
        },
        {
          title: 'Velocity',
          description:
            'Velocity is the average number of story points a team completes per sprint — used for forecasting.',
          detail: `Velocity is calculated after each sprint: sum up all the story points of completed (Done) items.

Example:
Sprint 1: 32 points completed
Sprint 2: 28 points completed
Sprint 3: 34 points completed
Average velocity: (32 + 28 + 34) / 3 = 31.3 points/sprint

Usage: If the backlog has 150 points and velocity is 30, the team can forecast roughly 5 sprints to completion.

Important caveats:
- Never use velocity to compare teams — context is everything
- New team members temporarily reduce velocity (onboarding cost)
- Velocity is a forecasting tool, not a performance metric`,
          tip: 'Never commit to a velocity target — it incentivizes inflating story point estimates. Velocity is descriptive (what we did), not prescriptive (what we must do).',
        },
      ],
    },
    {
      title: 'User Stories',
      icon: '📝',
      color: 'section-yellow',
      expanded: true,
      items: [
        {
          title: 'What is a User Story?',
          description:
            'A user story is a short, plain-language description of a feature from the perspective of the end user.',
          detail: `Standard format:
"As a [type of user], I want [some goal] so that [some reason/benefit]."

Examples:
✓ "As a customer, I want to filter products by price so that I can find items within my budget."
✓ "As an admin, I want to see a dashboard of active users so that I can monitor platform usage."
✗ "As a developer, I want to refactor the UserService" — this is a tech task, not a user story.

A good user story has the INVEST properties:
I — Independent (can be developed separately)
N — Negotiable (details can be discussed)
V — Valuable (delivers value to the user or business)
E — Estimable (team can estimate it)
S — Small (fits in one sprint)
T — Testable (clear acceptance criteria)`,
          tip: 'When you receive a ticket, check if it has clear acceptance criteria. If not, ask the PO before you start coding — "done" is impossible to define without them.',
        },
        {
          title: 'Acceptance Criteria',
          description:
            'Acceptance criteria define the conditions a story must meet to be considered complete.',
          detail: `Acceptance criteria answer: "How do we know this story is done?"

Two common formats:

1. Given/When/Then (BDD style):
Given [some context/precondition]
When [some action is taken]
Then [expected outcome]

Example:
Given I am on the login page
When I enter valid credentials and click Login
Then I am redirected to the dashboard

2. Checklist style:
- User can filter by price range (min/max)
- Filter updates product list in real-time
- Filter state persists on page refresh
- Mobile responsive

Both formats work — use whatever your team prefers.`,
          tip: 'Read the acceptance criteria BEFORE writing a single line of code. They define the boundaries of your work — nothing more, nothing less.',
        },
        {
          title: 'Definition of Done (DoD)',
          description:
            'A shared agreement of what "done" means for every single ticket — applied consistently across the team.',
          detail: `The Definition of Done is different from Acceptance Criteria:
- Acceptance Criteria: specific to ONE story ("this button should be blue")
- Definition of Done: applies to ALL stories ("all code must have unit tests")

Typical DoD checklist:
□ Code is written and peer-reviewed (PR approved)
□ Unit tests written and passing
□ Integration tests passing
□ No new linting errors
□ Feature works in all supported browsers
□ Tested on mobile/tablet (if applicable)
□ Deployed to staging environment
□ PO has accepted/signed off

If an item doesn't meet the DoD — it is NOT done, regardless of what the developer thinks.`,
          tip: 'Ask your team for their Definition of Done on your first day. This single document tells you everything about their quality standards.',
        },
      ],
    },
    {
      title: 'Kanban',
      icon: '📋',
      color: 'section-indigo',
      expanded: true,
      items: [
        {
          title: 'What is Kanban?',
          description:
            'Kanban is an Agile framework focused on continuous flow rather than fixed sprints.',
          detail: `Kanban originated in Toyota's manufacturing system. In software, it uses a visual board to manage work in progress.

Key differences from Scrum:
- No sprints — work flows continuously
- No fixed roles (no PO or SM required)
- No sprint planning or retrospectives (though many teams add them)
- Focus on limiting Work In Progress (WIP)

Kanban board columns (typical):
Backlog → To Do → In Progress → In Review → Testing → Done

WIP Limits: Each column has a maximum number of items allowed. If "In Progress" has a WIP limit of 3 and there are already 3 items there — you CANNOT start a new item. You must help finish existing work first.`,
          tip: 'Kanban is popular for support/maintenance teams where work arrives unpredictably. Scrum is better for product teams with planned feature work.',
        },
        {
          title: 'Scrum vs Kanban',
          description: 'Both are Agile — choose based on the nature of your work.',
          detail: `Scrum is better when:
- Work can be planned in advance
- Team builds features with clear goals
- Stakeholders want regular demos
- Team is new and needs structure

Kanban is better when:
- Work arrives unpredictably (support tickets, bugs)
- Continuous delivery is more important than sprints
- Team is experienced and self-directing
- You want less ceremony/overhead

Scrumban: Many teams blend both — using Kanban's visual board and WIP limits with Scrum's sprint cadence and ceremonies.`,
          tip: 'When you join a team, just ask: "Do you do sprints?" If yes — Scrum. If no fixed cadence — Kanban. Both are fine.',
        },
      ],
    },
    {
      title: 'CI/CD & DevOps',
      icon: '🔧',
      color: 'section-red',
      expanded: true,
      items: [
        {
          title: 'Continuous Integration (CI)',
          description:
            'CI is the practice of frequently merging code changes into a shared repository, with automated builds and tests running on every merge.',
          detail: `Before CI: Developers worked on separate branches for weeks, then merged everything at once — "integration hell."

With CI:
- Developers merge to main/develop frequently (at least daily)
- Every push triggers an automated pipeline:
  1. Code is compiled/built
  2. Unit tests run
  3. Linting/code quality checks run
  4. If anything fails — the merge is blocked

Tools: Jenkins, GitHub Actions, GitLab CI, Azure DevOps Pipelines, CircleCI

Benefits:
- Bugs are caught immediately, when they are cheapest to fix
- No "big bang" integration at the end
- Always have a working, tested version of the code`,
          tip: 'Never push code that breaks the build. If your push fails CI — fix it immediately. A broken build blocks the entire team.',
        },
        {
          title: 'Continuous Delivery/Deployment (CD)',
          description:
            'CD extends CI by automatically deploying tested code to environments — staging and/or production.',
          detail: `Continuous Delivery: Every passing build is automatically deployed to staging. A human approves production deployment.
Continuous Deployment: Every passing build is automatically deployed all the way to production — no human approval.

Typical pipeline:
Code push → CI (build + test) → Deploy to Dev → Deploy to Staging → Manual approval → Deploy to Production

Environments:
- Dev/Local: Developer's machine
- Development: Shared dev server (unstable, frequent deployments)
- Staging/UAT: Mirrors production, used for final testing
- Production: Live environment, real users

Azure DevOps: At Experlogix, ask how to trigger a dev build manually — some pipelines require a manual trigger for non-main branches.`,
          tip: 'Always test your changes in staging before asking for a production deployment. Never assume "it works on my machine" means it will work in production.',
        },
        {
          title: 'Branching Strategies',
          description:
            'A branching strategy defines how code changes flow from developer machines into production.',
          detail: `Git Flow (most common in enterprise):
- main: Production-ready code only
- develop: Integration branch — all features merge here
- feature/xxx: One branch per feature/ticket
- release/xxx: Stabilization before production
- hotfix/xxx: Emergency fixes directly from main

GitHub Flow (simpler, popular with CI/CD):
- main: Always deployable
- feature/xxx: Short-lived feature branches, merged directly to main via PR

Trunk-Based Development (advanced):
- Everyone commits to main (trunk) daily
- Feature flags hide incomplete features from users

Naming conventions (common):
feature/TICKET-123-user-login
bugfix/TICKET-456-fix-null-pointer
hotfix/TICKET-789-payment-crash`,
          tip: 'On your first day, ask: "Where do I branch from?" and "Where do I merge back into?" — never assume. Wrong branching can delay your work by days.',
        },
      ],
    },
    {
      title: 'Code Review & Pull Requests',
      icon: '👀',
      color: 'section-teal',
      expanded: true,
      items: [
        {
          title: 'What is a Pull Request (PR)?',
          description:
            'A PR is a request to merge your branch into another branch, with a review process before the merge is allowed.',
          detail: `PR workflow:
1. Developer finishes feature on a branch
2. Opens a Pull Request targeting develop/main
3. Assigns reviewers (usually 1-2 teammates)
4. Reviewers read the code, leave comments
5. Developer addresses comments (fixes or explains)
6. Reviewers approve (or request more changes)
7. PR is merged — usually by the author after approval

A good PR description includes:
- What problem does this solve?
- What approach did you take?
- How to test it (steps to reproduce/verify)
- Screenshots (for UI changes)
- Link to the ticket/story

PR size matters: Smaller PRs (under 400 lines) are reviewed faster and more thoroughly. Large PRs get rubber-stamped.`,
          tip: 'Keep PRs small and focused on one thing. A PR that touches 15 files across 3 features is impossible to review properly.',
        },
        {
          title: 'How to Review Code',
          description:
            "Code review is a skill — focus on correctness, readability, and maintainability, not style (that's what linters are for).",
          detail: `What to look for:
✓ Does this code do what the ticket requires?
✓ Are there edge cases not handled?
✓ Is there a simpler way to do this?
✓ Are there security concerns? (SQL injection, exposed secrets)
✓ Are there performance concerns? (N+1 queries, unnecessary loops)
✓ Is the code readable? (good variable names, clear logic)
✓ Are tests present and meaningful?

What NOT to nitpick:
✗ Formatting/style (use a linter/prettier)
✗ Personal preference ("I would have done it differently")
✗ Things that don't affect behavior

Comment etiquette:
- Be specific: "This could throw a NullPointerException on line 42 if user is null"
- Suggest alternatives: "Consider using Optional here to avoid the null check"
- Distinguish blocking from non-blocking: "nit: rename this variable" vs "blocker: this breaks the existing contract"`,
          tip: 'Approach code review with curiosity, not criticism. "I\'m not sure I understand this — could you explain?" is better than "This is wrong."',
        },
      ],
    },
  ];

  toggleSection(section: InfoSection): void {
    section.expanded = !section.expanded;
  }

  getSectionGradient(color: string): string {
    const map: Record<string, string> = {
      'section-blue': 'linear-gradient(135deg, #1e3a5f, #0f2040)',
      'section-green': 'linear-gradient(135deg, #064e1e, #032e12)',
      'section-purple': 'linear-gradient(135deg, #3b0764, #1e0336)',
      'section-orange': 'linear-gradient(135deg, #7c2d12, #4a1a08)',
      'section-teal': 'linear-gradient(135deg, #134e4a, #062e2b)',
      'section-red': 'linear-gradient(135deg, #5c0a0a, #380606)',
      'section-yellow': 'linear-gradient(135deg, #713f12, #3d2006)',
      'section-indigo': 'linear-gradient(135deg, #1e1b4b, #0f0d2b)',
    };
    return map[color] ?? '#13161e';
  }

  getAccentColor(color: string): string {
    const map: Record<string, string> = {
      'section-blue': '#60a5fa',
      'section-green': '#4ade80',
      'section-purple': '#c084fc',
      'section-orange': '#fb923c',
      'section-teal': '#2dd4bf',
      'section-red': '#f87171',
      'section-yellow': '#fbbf24',
      'section-indigo': '#818cf8',
    };
    return map[color] ?? '#94a3b8';
  }

  getAccentBg(color: string): string {
    const map: Record<string, string> = {
      'section-blue': 'rgba(96,165,250,0.12)',
      'section-green': 'rgba(74,222,128,0.12)',
      'section-purple': 'rgba(192,132,252,0.12)',
      'section-orange': 'rgba(251,146,60,0.12)',
      'section-teal': 'rgba(45,212,191,0.12)',
      'section-red': 'rgba(248,113,113,0.12)',
      'section-yellow': 'rgba(251,191,36,0.12)',
      'section-indigo': 'rgba(129,140,248,0.12)',
    };
    return map[color] ?? 'rgba(148,163,184,0.12)';
  }
}
