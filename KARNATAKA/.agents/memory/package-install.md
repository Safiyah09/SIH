---
name: Workspace package installation
description: Environment-specific package-manager behavior encountered while verifying this project
---

The workspace package firewall can reject an older pinned framework tarball, and the Replit pnpm wrapper can repeatedly bootstrap a different pnpm version when invoked from a project with packageManager metadata. Checking the registry’s current safe version and running pnpm from a temporary directory avoids both blockers.

**Why:** Verification otherwise looks like a source failure even though the application code is valid.

**How to apply:** If install hangs before logging, test the package directly with the configured registry; if pnpm self-bootstrap loops, invoke it from outside the workspace and pass the workspace with `--dir`, or regenerate the lockfile in a temporary copy.