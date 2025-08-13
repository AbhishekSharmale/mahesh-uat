# PDF Question Extractor Guide

## How to Extract Questions from test.pdf and Answers.pdf

### Step 1: Manual Extraction
1. Open `test.pdf` and `Answers.pdf`
2. Copy questions and answers
3. Format them according to the structure below

### Step 2: Question Format Structure
```javascript
{
  question: "Your question text here?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correct: 0, // Index of correct answer (0-3)
  explanation: "Detailed explanation of the correct answer"
}
```

### Step 3: Create New Test Files
Create files like `policeQuestions1.js`, `policeQuestions2.js` etc. in the `src/utils/` directory.

### Example Template:
```javascript
// src/utils/policeQuestions1.js
export const policeTest1 = {
  id: 'police-test-1',
  title: 'Police Bharti - Set 1',
  titleMr: 'पोलीस भरती - संच १',
  category: 'gk',
  price: 10,
  published: true,
  questions: [
    {
      question: "Who is the current Chief Minister of Maharashtra?",
      questionMr: "महाराष्ट्राचे सध्याचे मुख्यमंत्री कोण आहेत?",
      options: ["Eknath Shinde", "Uddhav Thackeray", "Devendra Fadnavis", "Sharad Pawar"],
      optionsMr: ["एकनाथ शिंदे", "उद्धव ठाकरे", "देवेंद्र फडणवीस", "शरद पवार"],
      correct: 0,
      explanation: "Eknath Shinde is the current Chief Minister of Maharashtra.",
      explanationMr: "एकनाथ शिंदे हे महाराष्ट्राचे सध्याचे मुख्यमंत्री आहेत."
    }
    // Add more questions...
  ]
}
```

### Step 4: Integration
Once you have the questions formatted, I can help you integrate them into the main app.

## Tools You Can Use:
1. **PDF to Text converters** online
2. **Copy-paste** from PDF viewer
3. **OCR tools** if PDF has images

## Next Steps:
1. Extract 10-15 questions from your PDFs
2. Format them using the template above
3. I'll help integrate them into the app with bilingual support