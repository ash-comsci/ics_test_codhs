# Verification notes

Verified locally on October 12, 2026.

## Real browser and actual library

Ran the included development server and loaded the unmodified bundled CodeHS 0.3.5 library. Checked:

- Initial canvas, target, page layout, controls and scoreboard render.
- Clicking before starting does not score.
- Start begins a round with the configured time.
- Clicking the target adds a point, changes its colour and relocates it.
- The round reaches zero, stops scoring and adds one history entry.
- Clicking after the round does not change the score.
- Play again resets the score/time while retaining the completed history and best.
- Refresh restores the initial state.
- No browser error or warning logs appeared during these checks.

## Automated logic checks

Eight checks pass using Node's built-in test runner. They cover hits/misses, hit boundaries, duplicate-timer prevention, late-click rejection, completed-round history and best, movement bounds, changed settings, and invalid settings. These simulate graphics calls and complement the actual browser check; they do not prove every CodeHS API is supported.

## Deployment limits

The files are prepared for Codespaces and static GitHub Pages hosting. A live Codespaces build and a real GitHub Pages deployment have not been performed for this download, and no GitHub account or repository has been changed. Pilot on a school device/student account before assigning. Copy-back into the CodeHS editor is not verified. This starter uses the public graphics library, not Karel or CodeHS autograding.

## Retest after student changes

Use `docs/test-log.md`. Keep the starter's automated tests only while their expected behaviour matches the student's game. Run an actual browser test of graphics, events, timing and asset loading after changes.
