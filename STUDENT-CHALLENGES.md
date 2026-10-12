# Your first game remix

## 1. Predict, change, test

Play one round without editing. Record your score. In `game.js`, change one setting under **CHANGE THESE FIRST**, save and refresh.

| Setting | First experiment |
|---|---|
| `ROUND_SECONDS` | Change 30 to 15. How should your score comparison change? |
| `TARGET_RADIUS` | Change 28 to 18. Is it harder to hit? |
| `POINTS_PER_HIT` | Change 1 to 5. Does the game become harder or just score differently? |
| `TARGET_SPEED` | Change 0 to 1. Does the target stay inside the canvas? |
| `TARGET_COLOURS` | Replace or add a colour string. Explain how the array is used. |

Keep predictions and results in `docs/test-log.md`. Change one variable at a time before combining changes.

## 2. Explain the code

Find and explain:

- The Boolean controlling whether clicks can score.
- A function with parameters and a returned value.
- The loop that finds the best completed score.
- The array that stores completed scores.
- Why restarting stops the old timer before starting a new one.

## 3. Choose an extension

With your teacher's approval, try one: count misses, change colour after each hit, add vertical movement, compute an average from `roundScores`, or create a difficulty choice. Add a new function rather than placing every change inside `handleClick`.

## 4. Submit in Google Classroom

Submit your repository link and commit identifier, a Pages game link if publishing is assigned, completed test log, and a short explanation of two changes. Include what you predicted, what happened, and one bug you fixed. Be ready to explain your own code.

Suggested first-remix rubric /20: functioning changes /8, design and explanation /4, useful tests /4, code clarity and credits /4. Your teacher confirms the actual rubric.
