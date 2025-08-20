# QuickQuiz

A simple quiz app built with HTML, CSS, and JavaScript.  
Based on a tutorial by [Codesistency], with extra features added by me:
- Two different button layouts (CSS)
- Questions loaded from a JSON file

## How to Run
1. Clone or download this repository.
2. Open `index.html` in your browser.
3. Play the quiz and see your score at the end.

## Files
- `index.html` — main page
- `style.css` — styling (two button layouts)
- `script.js` — quiz logic
- `question.json` — quiz questions

## Example question format
```json
[
  {
    "question": "What is the capital of France?",
    "answers": [
      { "text": "London", "correct": false },
      { "text": "Berlin", "correct": false },
      { "text": "Paris", "correct": true },
      { "text": "Madrid", "correct": false }
    ]
  },
  {
    "question": "Which planet is known as the Red Planet?",
    "answers": [
      { "text": "Venus", "correct": false },
      { "text": "Mars", "correct": true },
      { "text": "Jupiter", "correct": false },
      { "text": "Saturn", "correct": false }
    ]
  }
]
