// PDF to Questions Converter Helper
// This script helps convert PDF questions to the required format

// Example usage:
// 1. Copy questions from your PDF
// 2. Paste them in the rawQuestions array below
// 3. Run this script to get formatted output

const rawQuestions = [
  // Paste your questions here in this format:
  // {
  //   question: "Your question text?",
  //   options: ["A) Option 1", "B) Option 2", "C) Option 3", "D) Option 4"],
  //   correctAnswer: "A", // or B, C, D
  //   explanation: "Explanation text"
  // }
]

// Function to convert raw questions to app format
function convertToAppFormat(rawQuestions, testTitle, testTitleMr, category) {
  const convertedQuestions = rawQuestions.map((q, index) => {
    // Find correct answer index
    const correctIndex = q.options.findIndex(opt => 
      opt.startsWith(q.correctAnswer + ')')
    )
    
    // Clean options (remove A), B), C), D) prefixes)
    const cleanOptions = q.options.map(opt => 
      opt.replace(/^[A-D]\)\s*/, '')
    )
    
    return {
      question: q.question,
      questionMr: q.questionMr || q.question, // Add Marathi translation manually
      options: cleanOptions,
      optionsMr: q.optionsMr || cleanOptions, // Add Marathi options manually
      correct: correctIndex,
      explanation: q.explanation,
      explanationMr: q.explanationMr || q.explanation // Add Marathi explanation manually
    }
  })
  
  return {
    id: `police-test-${Date.now()}`,
    title: testTitle,
    titleMr: testTitleMr,
    category: category,
    price: 10,
    published: true,
    questions: convertedQuestions
  }
}

// Example conversion
const sampleTest = convertToAppFormat(
  rawQuestions,
  "Police Bharti - Sample Test",
  "पोलीस भरती - नमुना चाचणी",
  "gk"
)

console.log(JSON.stringify(sampleTest, null, 2))

// Instructions:
console.log(`
INSTRUCTIONS:
1. Open your test.pdf and Answers.pdf files
2. Copy questions one by one and format them like this:

const rawQuestions = [
  {
    question: "Who is the current Prime Minister of India?",
    options: ["A) Narendra Modi", "B) Rahul Gandhi", "C) Amit Shah", "D) Yogi Adityanath"],
    correctAnswer: "A",
    explanation: "Narendra Modi has been the Prime Minister since 2014."
  },
  // Add more questions...
]

3. Add Marathi translations manually:
   - questionMr: "भारताचे सध्याचे पंतप्रधान कोण आहेत?"
   - optionsMr: ["नरेंद्र मोदी", "राहुल गांधी", "अमित शाह", "योगी आदित्यनाथ"]
   - explanationMr: "नरेंद्र मोदी २०१४ पासून पंतप्रधान आहेत."

4. Run this script to get the formatted output
5. Copy the output to a new file in src/utils/
`)

module.exports = { convertToAppFormat }