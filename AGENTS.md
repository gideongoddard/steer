<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Git workflow

When implementing a Linear issue:

1. Get the `gitBranchName` from the Linear issue before doing anything else.
2. Create a local branch using that exact name and push it to origin before starting any work: `git checkout -b <branchName> && git push -u origin <branchName>`
3. Do all work and commits on that branch.
4. Ask permission before committing or pushing, as usual.
