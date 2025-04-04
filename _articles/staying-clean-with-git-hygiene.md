---
title: 'Staying Clean with Git Hygiene'
excerpt: 'Practical tips for better version control that your teammates will thank you for'
date: '2025-04-04'
slug: 'staying-clean-with-git-hygiene'
authors:
  - name: Sean Callan
    github: https://github.com/doomspork
tags:
  - 'Git'
  - 'GitHub'
  - 'Developer Experience'
  - 'Best Practices'
---

# Git Hygiene

Good Git practices aren't just about keeping your repository tidy though that's certainly not a bad thing. Git hygiene is about respecting your teammates' time and making collaboration smoother. Whether you're a Git novice or have been using it for years, these practices will help you and your team work more effectively together.

## Descriptive Commit Messages

It shouldn't be necessary to look through all the changes of a commit to understand the intention. A well-crafted commit message serves as documentation that explains both the what and why of your changes, without having to dive into the code.

**Key principles:**
- Keep subject lines concise (50 characters is ideal, never exceed 72)
- Use imperative tense ("Add feature" not "Added feature")
- Reference your project management ticket (GitHub, Jira, Linear, etc.)
- Wrap commit bodies at 72 characters for better readability in terminals
- Focus on WHY and WHAT, not HOW

Rather than reinventing the wheel, consider adopting [Conventional Commits](https://www.conventionalcommits.org/). Conventional Commits is a lightweight convention that adds structure and consistency to your commit messages making it easy for yourself and others to quickly identify the intent. Another added benefit of Conventional Commit adoption is unlocking cool tooling like [Release-please](https://github.com/googleapis/release-please) and (Semantic-release)[https://github.com/semantic-release/semantic-release].

### Examples

**Bad Commit**

```bash
Modified user authentication system by updating the authentication service class and adding a new middleware component that intercepts requests, checks for session tokens in cookies or headers, validates them against our database, and then either allows the request to continue or redirects to login page, also updated the login form component to handle the new error messages that might be returned from the backend and fixed several CSS issues with the form on mobile devices

I spent several hours debugging why the token validation was failing and discovered that we needed to check for token expiration. I implemented this by adding a new utility function that handles JWT decoding and validation. Then I had to update the tests to mock the token validation. I also noticed the CSS was broken on mobile so I changed the media queries to fix that issue. The login form wasn't handling errors correctly so I added some error message handling to display validation errors to the user.
```

**Why it's problematic:**
- The subject line is extremely long and not concise
- It focuses on HOW the changes were made, not WHY
- It combines multiple unrelated changes in one commit
- It includes personal details about debugging time
- It lacks structure and is difficult to scan

**Good Commit**

```bash
fix(auth): implement proper token validation and expiration checking

BREAKING CHANGE: Auth middleware now requires valid JWT tokens with expiration dates

Problem:
- User sessions remained active indefinitely
- Authentication tokens weren't properly validated
- Security vulnerability allowed bypassing authentication

Solution:
- Add token expiration validation
- Implement proper error handling for invalid tokens
- Return clear error messages to the frontend

Resolves: #423
```

**Why it's effective:**
- Uses conventional commit format with type and scope (`fix(auth)`)
- Has a concise subject line that explains WHAT was done
- Marks breaking changes clearly
- Separates the body with a blank line
- Structures content with problem/solution sections that explain WHY
- References the related issue number
- Is scannable and focused on a single logical change

## Atomic Commits

Each commit should represent one logical change: fix a bug, add a feature, update documentation, etc. Think of commits as units of work that can stand on their own.

**Benefits of atomic commits:**
- **Easier code reviews** - Reviewers can understand one change at a time
- **Simpler debugging** - When tracking down issues with `git bisect`
- **Clean reverts** - Undo specific changes without affecting others
- **Cherry-picking** - Apply specific changes to other branches seamlessly

For example, if you're working on a feature that requires both API changes and UI updates, consider separating them into distinct commits:

```bash
feat(api): add new endpoint for user preferences
feat(ui): create settings page for user preferences
```

This approach makes it clear which parts of the system were changed and why. Even better, if you need to `git cherrypick` a piece here or there, no problem!

## Avoid Committing Generated/Built Files

Source control should focus on source code, not artifacts that can be regenerated. Use `.gitignore` to exclude:

- Build outputs (compiled code, minified assets)
- Dependency directories (node_modules, vendor)
- Local environment files (.env)
- Log files and databases
- IDE-specific files

Keeping these files out of your repository helps:
- Reduce repository bloat
- Prevent unnecessary merge conflicts
- Maintain cleaner diffs

GitHub provides excellent [starter templates](https://github.com/github/gitignore) for language-specific `.gitignore` files or checkout [gitignore.io](https://gitignore.io/).

## Rebase Locally Before Pushing (When Appropriate)

Using `git rebase` keeps your commit history clean and linear, making it easier to follow. It's particularly useful when:

- Incorporating upstream changes into your feature branch
- Cleaning up work-in-progress commits before sharing
- Resolving conflicts with the main branch before opening a PR

```bash
git checkout main
git pull

git checkout feature-branch
git rebase main
```

Rebasing is an incredibly powerful feature of git and worth getting familiar and comfortable with. Once you're comfortable explore interactive rebasing, fixup commits, autosquashing, and other capabilities of rebase to really level up your git game.

## Squash Commits Before Merging

When developing a feature, you'll often make multiple small, iterative commits:

```
wip: start implementing login form
fix: handle input validation
fix: typo in error message
feat: complete login form with tests
```

These incremental steps are helpful during development but create noise in the project's history. Squashing these commits before merging ensures a cleaner, more meaningful history.

Most Git platforms offer a "Squash and merge" option for PRs, or you can do it manually:

```bash
# Squash the last 4 commits
git rebase -i HEAD~4
```

## Keep Branches Focused and Short-Lived

Branches should represent a single unit of work:
- One feature, bugfix, or improvement
- A reasonable scope that can be completed quickly
- A clear connection to a project management ticket

Long-lived branches tend to:
- Accumulate merge conflicts
- Become difficult to review
- Delay feedback on your work

Try to keep branches alive for days, not weeks or months, and aim for regular integration with the main branch.

## Pull Request (PR) Etiquette

Pull requests are a communication tool as much as a code review mechanism:

- **Keep them small** - Aim for under 500 lines when possible
- **Write clear descriptions** - Explain the purpose, approach, and testing
- **Use templates** - Create PR templates to standardize information
- **Request reviewers early** - Get feedback before spending too much time
- **Be responsive** - Address comments promptly and thoughtfully
- **Use draft PRs** - Signal work in progress that's not ready for merge

A good PR description might include:
- What problem it solves
- How it was tested
- Any performance considerations
- Screenshots for UI changes
- Potential risks or trade-offs

## Pre-commit Hooks

We've all worked with someone who uses CI to test and lint their code, we've all probably complained about that person. Do yourself a favor and catch issues before they enter your repository by automating checks at commit time. The [pre-commit framework](https://pre-commit.com/) makes it easy to set up hooks for:

- Linting
- Formatting
- Running tests
- Checking for secrets or credentials
- Validating commit messages

By catching these issues early, you can reduce feedback cycles and avoid burdening teammates with trivial fixes.

Don't rely solely on CI pipelines to catch issues that could be found locally. This creates unnecessary delays and additional work for the entire team.

## Final Thoughts

Good Git hygiene is about more than just keeping your repository clean, by adopting these practices you'll create a more collaborative, efficient development process where everyone can focus on building great software instead of fighting with version control.