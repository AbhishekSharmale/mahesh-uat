// Demo data for testing without Supabase
import { policeTests } from './policeQuestions'

export const demoTests = [
  ...policeTests,
  {
    id: 'demo-test-1',
    title: 'General Knowledge - Demo Test',
    titleMr: 'सामान्य ज्ञान - डेमो चाचणी',
    category: 'gk',
    price: 10,
    published: true,
    questions: [
      {
        question: "Who is the current Prime Minister of India?",
        questionMr: "भारताचे सध्याचे पंतप्रधान कोण आहेत?",
        options: ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Yogi Adityanath"],
        optionsMr: ["नरेंद्र मोदी", "राहुल गांधी", "अमित शाह", "योगी आदित्यनाथ"],
        correct: 0,
        explanation: "Narendra Modi has been the Prime Minister of India since 2014.",
        explanationMr: "नरेंद्र मोदी २०१४ पासून भारताचे पंतप्रधान आहेत."
      },
      {
        question: "What is the capital of Maharashtra?",
        options: ["Pune", "Nagpur", "Mumbai", "Nashik"],
        correct: 2,
        explanation: "Mumbai is the capital and largest city of Maharashtra."
      },
      {
        question: "The Quit India Movement was launched in which year?",
        options: ["1940", "1942", "1944", "1946"],
        correct: 1,
        explanation: "The Quit India Movement was launched by Mahatma Gandhi on August 8, 1942."
      },
      {
        question: "Who built the Red Fort in Delhi?",
        options: ["Akbar", "Shah Jahan", "Aurangzeb", "Humayun"],
        correct: 1,
        explanation: "The Red Fort was built by the Mughal Emperor Shah Jahan in the 17th century."
      },
      {
        question: "The Battle of Plassey was fought in which year?",
        options: ["1757", "1764", "1771", "1780"],
        correct: 0,
        explanation: "The Battle of Plassey was fought on June 23, 1757."
      },
      {
        question: "Who founded the Mauryan Empire?",
        options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Bimbisara"],
        correct: 1,
        explanation: "Chandragupta Maurya founded the Mauryan Empire around 321 BCE."
      },
      {
        question: "The Indian National Congress was founded in which year?",
        options: ["1885", "1887", "1890", "1892"],
        correct: 0,
        explanation: "The Indian National Congress was founded in 1885."
      },
      {
        question: "Who was known as the Iron Man of India?",
        options: ["Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Subhas Chandra Bose", "Bhagat Singh"],
        correct: 1,
        explanation: "Sardar Vallabhbhai Patel was known as the Iron Man of India."
      },
      {
        question: "The Sepoy Mutiny started from which place?",
        options: ["Delhi", "Meerut", "Lucknow", "Kanpur"],
        correct: 1,
        explanation: "The Sepoy Mutiny of 1857 started from Meerut on May 10, 1857."
      },
      {
        question: "Who wrote the book Discovery of India?",
        options: ["Mahatma Gandhi", "Jawaharlal Nehru", "Rabindranath Tagore", "Dr. A.P.J. Abdul Kalam"],
        correct: 1,
        explanation: "The Discovery of India was written by Jawaharlal Nehru."
      }
    ]
  },
  {
    id: 'demo-test-2',
    title: 'Mathematics - Basic Arithmetic',
    titleMr: 'गणित - मूलभूत अंकगणित',
    category: 'math',
    price: 10,
    published: true,
    questions: [
      {
        question: "What is 15% of 200?",
        options: ["25", "30", "35", "40"],
        correct: 1,
        explanation: "15% of 200 = (15/100) × 200 = 30"
      },
      {
        question: "If a train travels 60 km in 45 minutes, what is its speed in km/hr?",
        options: ["75", "80", "85", "90"],
        correct: 1,
        explanation: "Speed = Distance/Time = 60 km / (45/60) hr = 80 km/hr"
      },
      {
        question: "The average of 5, 10, 15, 20, 25 is:",
        options: ["12", "15", "18", "20"],
        correct: 1,
        explanation: "Average = (5+10+15+20+25)/5 = 75/5 = 15"
      },
      {
        question: "What is the compound interest on ₹1000 for 2 years at 10% per annum?",
        options: ["₹200", "₹210", "₹220", "₹230"],
        correct: 1,
        explanation: "CI = P(1+r/100)^n - P = 1000(1.1)^2 - 1000 = ₹210"
      },
      {
        question: "If 3x + 5 = 20, then x = ?",
        options: ["3", "4", "5", "6"],
        correct: 2,
        explanation: "3x + 5 = 20, so 3x = 15, therefore x = 5"
      },
      {
        question: "The area of a rectangle with length 12 cm and breadth 8 cm is:",
        options: ["96 sq cm", "40 sq cm", "20 sq cm", "48 sq cm"],
        correct: 0,
        explanation: "Area of rectangle = length × breadth = 12 × 8 = 96 sq cm"
      },
      {
        question: "What is the next number in the series: 2, 6, 12, 20, ?",
        options: ["28", "30", "32", "36"],
        correct: 1,
        explanation: "The differences are 4, 6, 8, so next difference is 10. 20 + 10 = 30"
      },
      {
        question: "If 20% of a number is 40, what is the number?",
        options: ["160", "180", "200", "220"],
        correct: 2,
        explanation: "Let the number be x. 20% of x = 40, so x/5 = 40, therefore x = 200"
      },
      {
        question: "The LCM of 12 and 18 is:",
        options: ["36", "54", "72", "108"],
        correct: 0,
        explanation: "LCM of 12 and 18 = (12 × 18) / GCD(12,18) = 216 / 6 = 36"
      },
      {
        question: "What is 2^5?",
        options: ["16", "25", "32", "64"],
        correct: 2,
        explanation: "2^5 = 2 × 2 × 2 × 2 × 2 = 32"
      }
    ]
  }
]

export const demoProfile = {
  id: 'demo-user-123',
  email: 'demo@test.com',
  name: 'Demo User',
  wallet_balance: 100,
  tests_taken: 2
}