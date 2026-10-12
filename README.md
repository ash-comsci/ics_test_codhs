# Target Lab - ICS3U JavaScript starter

A small target-clicking game using **the real CodeHS graphics library**, packaged for a GitHub repository, Codespaces, desktop VS Code and GitHub Pages. Start by editing **game.js**.

## Teacher: put this into a repository

1. Extract the ZIP. Open the `codehs-game-starter` folder.
2. Create a GitHub repository and add **the contents of that folder to the repository root**. `index.html` and `package.json` must be at the top level, not inside another folder.
3. Include the hidden `.devcontainer` folder, `.gitignore` and `.nojekyll`. File pickers may hide them; using Git to push the whole extracted folder is the most reliable option.
4. In repository Settings, enable **Template repository** if you want each student to create their own copy. Keep the bundled `vendor` folder.
5. Ask students to use **Use this template > Create a new repository**. Each student edits their own copy. Alternatively, use this as starter content in GitHub Classroom.
6. Confirm that a student account on a school device can open Codespaces and port previews before the first lesson. Codespaces allowances and school access rules vary.

No repository is created or published by this download.

## Student: run in Codespaces

1. Open your repository. Choose **Code > Codespaces > Create codespace on main** (or your default branch).
2. Wait for the editor to finish opening.
3. Open **Terminal > New Terminal** and run:

```sh
npm start
```

4. Use **Open in Browser** in the port notification. If it does not appear, open the **Ports** panel, find **8000**, and choose its browser icon. Add/forward port 8000 if necessary. Keep the preview port private for normal development.
5. Click **Start round**. Click the coloured target. Try **R** to restart.
6. Open `game.js`, change one setting, save, and **refresh the game tab**. This starter does not auto-refresh.
7. Commit your work using Source Control and sync/push it to GitHub. Saving a file in Codespaces is not the same as committing and pushing it. Stop the codespace when finished.

**No `npm install` is needed.** The local server uses only Node's built-in modules. An internet connection is needed for Codespaces, but the game itself loads its library from this repository, not a CDN.

## Desktop VS Code

With Node.js 18 or later installed, open the extracted folder in VS Code and run `npm start`. Visit `http://localhost:8000`. You may also open `index.html` directly in a browser for this starter; a server is preferable once you add features/assets. GitHub Pages does not run `server.cjs`.

## What to edit

| File | Purpose |
|---|---|
| `game.js` | Game rules, settings, functions, arrays and events. Start here. |
| `index.html` | Page title, instructions and structure. |
| `style.css` | Page colours and layout. |
| `assets/` | Optional images and sounds. |
| `browser.js` | Page buttons, score display and error reporting; normally leave alone. |
| `vendor/` | Fixed copy of CodeHS graphics and notices; do not edit. |
| `.devcontainer/` | Codespaces setup. |
| `tests/` | Logic checks for the supplied starter; optional for students. |

## Publish a playable game with GitHub Pages

When your teacher says it is appropriate to publish:

1. Commit and push all game files.
2. Open repository **Settings > Pages**.
3. Choose **Deploy from a branch**, select your default branch and **/(root)**, then save.
4. Wait for deployment and use the site address GitHub displays. It normally looks like `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.
5. Test that address in a new browser tab. Share the Pages link, not the temporary Codespaces preview.

GitHub Free normally requires a public repository for Pages. Other plans support private source repositories; private source does not automatically make the published site private. Use your teacher's sharing instructions. All starter asset links are relative so they work under a repository name. No build step or backend is needed.

## CodeHS compatibility: what this means

The included **chs-js-lib 0.3.5** is CodeHS's public standalone graphics library. `game.js` uses familiar CodeHS APIs such as `Circle`, `Text`, `add()`, `setPosition()`, `Randomizer`, `mouseClickMethod()`, `setTimer()` and `stopTimer()`.

This is a **graphics-game starter**, not a complete clone of the CodeHS classroom editor. Karel, platform quizzes, autograding and all console/input behaviours are not reproduced. Arbitrary course programs may need adjustments. The standalone library is a fixed public release, which may differ from the library in the current CodeHS editor.

The browser wrapper calls `main()` once. If moving `game.js` into a CodeHS JavaScript Graphics program, follow that environment's entry-point convention: call `main()` once if it does not do so automatically; do not accidentally call it twice. The page's HTML buttons and DOM scoreboard belong to this repository, not the CodeHS editor. Inside CodeHS, use R to start/restart and the canvas for results. Copy-back into a signed-in CodeHS assignment has not been tested.

The canvas keeps its actual pixel dimensions rather than being scaled with CSS: the bundled library uses canvas-relative mouse coordinates. On narrow screens the canvas area scrolls horizontally. This starter is designed first for a laptop/desktop with a mouse or trackpad.

## Troubleshooting

- **Blank or error message:** check the error below the game and the browser developer console. Confirm `vendor/chs-0.3.5.js` exists and script order has not changed.
- **My edit did nothing:** save and refresh the game tab. Confirm you edited your copy of `game.js`.
- **Port already in use:** another preview is running; use it or stop it with Ctrl+C before starting another.
- **404 on Pages:** check that `index.html` is in the selected branch's root, deployment has completed, and file names match capitalization.
- **New image fails to load:** put it in `assets/` and use a relative path such as `assets/star.png`; avoid a leading slash.
- **Restart erased my score:** unfinished rounds are intentionally discarded. Completed rounds stay in the array until refresh; no scores are saved to a server.
- **Changed task breaks a test:** the supplied tests describe the original game's rules. Update the tests when your teacher intentionally changes those rules.

## Checks

```sh
npm test
```

These tests check game logic with simulated graphics. See `TESTING.md` for browser verification and practical limits.

## Sources and notices

- [CodeHS standalone graphics documentation](https://codehs.github.io/chs-js-lib/)
- [CodeHS library source](https://github.com/codehs/chs-js-lib)
- [GitHub Codespaces port previews](https://docs.github.com/en/codespaces/developing-in-a-codespace/forwarding-ports-in-your-codespace)
- [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages)

See `THIRD-PARTY-NOTICES.md`. Starter-authored code and teaching files are under the MIT license; third-party code retains its own terms. Not an official CodeHS product.
