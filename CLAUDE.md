# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a colorectal cancer symptom self-assessment questionnaire (结直肠癌症状自测问卷). It's a standalone web application that runs entirely in the browser without requiring a network connection. The questionnaire helps users determine whether they should seek medical consultation based on their symptoms and lifestyle factors.

## Technology Stack

- Pure HTML, CSS, and JavaScript (no frameworks or dependencies)
- No backend server required
- No external API calls
- Runs entirely offline in the browser

## How to Run

Simply double-click `index.html` to open the application in your default web browser. No installation or server setup required.

## Project Structure

- `index.html` - Main HTML structure with 10 questionnaire questions
- `style.css` - Styling with gradient backgrounds and responsive design
- `script.js` - Logic for form validation, scoring, and risk assessment
- `问题列表.docx` - Source document containing the original questionnaire questions
- `CLAUDE.md` - This documentation file

## Architecture

### Question Structure
The application contains 10 yes/no questions covering:
1. Irregular bowel movements (chronic constipation or diarrhea)
2. Blood in stool
3. Abdominal discomfort or bloating after eating
4. Unexplained weight loss
5. Loss of appetite, nausea, or vomiting
6. Changes in complexion (pale or jaundiced)
7. Unusual fatigue or lack of energy
8. Family history of colorectal cancer or inflammatory bowel diseases
9. Unhealthy lifestyle factors (smoking, alcohol, poor diet, lack of exercise)
10. Age 50 and above

Each question includes:
- Question number (e.g., "问题 1/10")
- Main question text (`<h4>`)
- Detailed description explaining the symptom (`<p class="question-desc">`)
- Two radio button options: "是" (Yes, value=1) and "否" (No, value=0)

### Assessment Logic
The evaluation is based on the number of "Yes" answers:

- **0 "Yes" answers** (Low Risk):
  - No obvious high-risk factors for colorectal cancer
  - Recommendation: Continue healthy lifestyle, regular checkups

- **1-5 "Yes" answers** (Medium Risk):
  - Some symptoms/habits that may be related to bowel diseases
  - Recommendation: Schedule doctor appointment for evaluation

- **6+ "Yes" answers** (High Risk):
  - Multiple symptoms/habits indicating elevated risk
  - Recommendation: Urgently schedule doctor appointment for thorough examination

### JavaScript Functions
- `calculateRisk(yesCount)` - Determines risk level based on number of "Yes" answers
- `displayResult(result)` - Shows assessment results with color-coded display
- `resetQuiz()` - Clears form and returns to questionnaire view

### CSS Styling
- `.question-number` - Styling for question numbering
- `.question-desc` - Styling for question descriptions
- `.options` - Flex container for Yes/No options
- `.risk-low`, `.risk-medium`, `.risk-high` - Color-coded risk level displays
- Selected radio button's parent label gets highlighted background

## Customizing Questions

To modify questions, edit the question blocks in `index.html`:
1. Update the question text in the `<h4>` tag
2. Modify the descriptions in `<p class="question-desc">` tags
3. Keep radio button values as 1 (Yes) and 0 (No)
4. Adjust the assessment thresholds in `script.js` `calculateRisk()` function if needed

## Important Notes

- This assessment is for reference only and cannot replace professional medical diagnosis
- All user data stays in the browser (no data collection or transmission)
- The application is fully self-contained and requires no external resources
- Content is based on colorectal cancer symptom screening guidelines
