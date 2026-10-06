# Patch notes

## Summary
Fixed task search so archived tasks stay hidden and the optional status applies to title and description matches. Search now uses database pagination, rejects invalid page values/statuses with a clear 400 response, and no longer adds an artificial delay. The UI resets to page one when filters change and cancels outdated requests so an old response cannot replace newer results.

## What I left unchanged
I left a broader UI redesign, indexing, and structured logging out of this focused patch. Those changes need separate product or performance requirements.

## Biggest remaining risk
Search uses leading-wildcard `LIKE` over title and description, which may become slow as the task table grows; the current schema has no search-oriented index.

## Tools and verification
I used Codex/AI to review the React, Spring, and SQL paths and help draft this patch, then reviewed the request/response flow. `npm run build` and `mvnw.cmd -q -DskipTests package` succeeded. I smoke-checked the API on port 18080 because port 8080 was occupied: active-task/status filtering and invalid-input responses behaved as expected. I still need to add my own handwritten explanation photos before submission.
