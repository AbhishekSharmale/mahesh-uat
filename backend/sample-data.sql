-- Sample test data for Police Bharti Test Series

-- General Knowledge Tests
INSERT INTO tests (title, category, questions, price, published) VALUES
(
  'General Knowledge - Indian History',
  'gk',
  '[
    {
      "question": "Who was the first President of India?",
      "options": ["Dr. Rajendra Prasad", "Dr. A.P.J. Abdul Kalam", "Dr. Sarvepalli Radhakrishnan", "Zakir Hussain"],
      "correct": 0,
      "explanation": "Dr. Rajendra Prasad was the first President of India, serving from 1950 to 1962."
    },
    {
      "question": "The Quit India Movement was launched in which year?",
      "options": ["1940", "1942", "1944", "1946"],
      "correct": 1,
      "explanation": "The Quit India Movement was launched by Mahatma Gandhi on August 8, 1942."
    },
    {
      "question": "Who built the Red Fort in Delhi?",
      "options": ["Akbar", "Shah Jahan", "Aurangzeb", "Humayun"],
      "correct": 1,
      "explanation": "The Red Fort was built by the Mughal Emperor Shah Jahan in the 17th century."
    },
    {
      "question": "The Battle of Plassey was fought in which year?",
      "options": ["1757", "1764", "1771", "1780"],
      "correct": 0,
      "explanation": "The Battle of Plassey was fought on June 23, 1757, between the British East India Company and the Nawab of Bengal."
    },
    {
      "question": "Who founded the Mauryan Empire?",
      "options": ["Ashoka", "Chandragupta Maurya", "Bindusara", "Bimbisara"],
      "correct": 1,
      "explanation": "Chandragupta Maurya founded the Mauryan Empire around 321 BCE."
    },
    {
      "question": "The Indian National Congress was founded in which year?",
      "options": ["1885", "1887", "1890", "1892"],
      "correct": 0,
      "explanation": "The Indian National Congress was founded in 1885 by Allan Octavian Hume."
    },
    {
      "question": "Who was known as the Iron Man of India?",
      "options": ["Jawaharlal Nehru", "Sardar Vallabhbhai Patel", "Subhas Chandra Bose", "Bhagat Singh"],
      "correct": 1,
      "explanation": "Sardar Vallabhbhai Patel was known as the Iron Man of India for his role in uniting the country."
    },
    {
      "question": "The Sepoy Mutiny started from which place?",
      "options": ["Delhi", "Meerut", "Lucknow", "Kanpur"],
      "correct": 1,
      "explanation": "The Sepoy Mutiny of 1857 started from Meerut on May 10, 1857."
    },
    {
      "question": "Who wrote the book Discovery of India?",
      "options": ["Mahatma Gandhi", "Jawaharlal Nehru", "Rabindranath Tagore", "Dr. A.P.J. Abdul Kalam"],
      "correct": 1,
      "explanation": "The Discovery of India was written by Jawaharlal Nehru while he was in prison."
    },
    {
      "question": "The Harappan Civilization belonged to which age?",
      "options": ["Stone Age", "Bronze Age", "Iron Age", "Copper Age"],
      "correct": 1,
      "explanation": "The Harappan Civilization belonged to the Bronze Age (3300-1300 BCE)."
    }
  ]'::jsonb,
  10,
  true
),
(
  'Mathematics - Basic Arithmetic',
  'math',
  '[
    {
      "question": "What is 15% of 200?",
      "options": ["25", "30", "35", "40"],
      "correct": 1,
      "explanation": "15% of 200 = (15/100) × 200 = 30"
    },
    {
      "question": "If a train travels 60 km in 45 minutes, what is its speed in km/hr?",
      "options": ["75", "80", "85", "90"],
      "correct": 1,
      "explanation": "Speed = Distance/Time = 60 km / (45/60) hr = 60 × (60/45) = 80 km/hr"
    },
    {
      "question": "The average of 5, 10, 15, 20, 25 is:",
      "options": ["12", "15", "18", "20"],
      "correct": 1,
      "explanation": "Average = (5+10+15+20+25)/5 = 75/5 = 15"
    },
    {
      "question": "What is the compound interest on ₹1000 for 2 years at 10% per annum?",
      "options": ["₹200", "₹210", "₹220", "₹230"],
      "correct": 1,
      "explanation": "CI = P(1+r/100)^n - P = 1000(1.1)^2 - 1000 = 1210 - 1000 = ₹210"
    },
    {
      "question": "If 3x + 5 = 20, then x = ?",
      "options": ["3", "4", "5", "6"],
      "correct": 2,
      "explanation": "3x + 5 = 20, so 3x = 15, therefore x = 5"
    },
    {
      "question": "The area of a rectangle with length 12 cm and breadth 8 cm is:",
      "options": ["96 sq cm", "40 sq cm", "20 sq cm", "48 sq cm"],
      "correct": 0,
      "explanation": "Area of rectangle = length × breadth = 12 × 8 = 96 sq cm"
    },
    {
      "question": "What is the next number in the series: 2, 6, 12, 20, ?",
      "options": ["28", "30", "32", "36"],
      "correct": 1,
      "explanation": "The differences are 4, 6, 8, so next difference is 10. 20 + 10 = 30"
    },
    {
      "question": "If 20% of a number is 40, what is the number?",
      "options": ["160", "180", "200", "220"],
      "correct": 2,
      "explanation": "Let the number be x. 20% of x = 40, so x/5 = 40, therefore x = 200"
    },
    {
      "question": "The LCM of 12 and 18 is:",
      "options": ["36", "54", "72", "108"],
      "correct": 0,
      "explanation": "LCM of 12 and 18 = (12 × 18) / GCD(12,18) = 216 / 6 = 36"
    },
    {
      "question": "What is 2^5?",
      "options": ["16", "25", "32", "64"],
      "correct": 2,
      "explanation": "2^5 = 2 × 2 × 2 × 2 × 2 = 32"
    }
  ]'::jsonb,
  10,
  true
),
(
  'Reasoning - Logical Thinking',
  'reasoning',
  '[
    {
      "question": "If BOOK is coded as CPPL, then WORD is coded as:",
      "options": ["XPSE", "XQSE", "YPSE", "XPSD"],
      "correct": 0,
      "explanation": "Each letter is shifted by +1 in the alphabet. W→X, O→P, R→S, D→E"
    },
    {
      "question": "Find the odd one out: 3, 7, 11, 14, 17",
      "options": ["3", "7", "14", "17"],
      "correct": 2,
      "explanation": "All numbers except 14 are prime numbers."
    },
    {
      "question": "If Monday is the 1st day, what day will be the 15th?",
      "options": ["Sunday", "Monday", "Tuesday", "Wednesday"],
      "correct": 1,
      "explanation": "15 ÷ 7 = 2 remainder 1. So 15th day will be Monday (same as 1st day)."
    },
    {
      "question": "Complete the series: A, D, G, J, ?",
      "options": ["K", "L", "M", "N"],
      "correct": 2,
      "explanation": "Each letter is +3 positions: A(+3)→D(+3)→G(+3)→J(+3)→M"
    },
    {
      "question": "If all roses are flowers and some flowers are red, then:",
      "options": ["All roses are red", "Some roses are red", "No roses are red", "Cannot be determined"],
      "correct": 3,
      "explanation": "We cannot determine the relationship between roses and red color from given information."
    },
    {
      "question": "What comes next: 1, 4, 9, 16, ?",
      "options": ["20", "25", "30", "36"],
      "correct": 1,
      "explanation": "These are perfect squares: 1², 2², 3², 4², 5² = 25"
    },
    {
      "question": "If CAT = 312, then DOG = ?",
      "options": ["415", "426", "437", "448"],
      "correct": 2,
      "explanation": "C=3, A=1, T=20→3+1+20=24→3+1+2=6→312. D=4, O=15, G=7→4+15+7=26→4+3+7=14→437"
    },
    {
      "question": "Mirror image of AMBULANCE:",
      "options": ["ƎƆИA⅃UᗡMA", "ƎƆИA⅃UᗡMᗄ", "ƎƆИA⅃UᗡMᗄ", "ƎƆИA⅃UᗡMA"],
      "correct": 0,
      "explanation": "Mirror image reverses the word: AMBULANCE → ƎƆИA⅃UᗡMA"
    },
    {
      "question": "If FRIEND is coded as GSJFOE, then MOTHER is coded as:",
      "options": ["NPUIFS", "NPUIFS", "NPUIFS", "OPUIFS"],
      "correct": 0,
      "explanation": "Each letter is shifted by +1: M→N, O→P, T→U, H→I, E→F, R→S"
    },
    {
      "question": "Find the missing number: 2, 6, 12, 20, 30, ?",
      "options": ["40", "42", "44", "46"],
      "correct": 1,
      "explanation": "Pattern: n(n+1) where n=1,2,3,4,5,6. For n=6: 6×7=42"
    }
  ]'::jsonb,
  10,
  true
),
(
  'Marathi Language Basics',
  'marathi',
  '[
    {
      "question": "महाराष्ट्राची राजधानी कोणती?",
      "options": ["पुणे", "नागपूर", "मुंबई", "नाशिक"],
      "correct": 2,
      "explanation": "मुंबई ही महाराष्ट्राची राजधानी आहे."
    },
    {
      "question": "छत्रपती शिवाजी महाराजांचा जन्म कुठे झाला?",
      "options": ["शिवनेरी", "रायगड", "सिंहगड", "पुरंदर"],
      "correct": 0,
      "explanation": "छत्रपती शिवाजी महाराजांचा जन्म शिवनेरी किल्ल्यावर झाला."
    },
    {
      "question": "महाराष्ट्राचा राज्य पक्षी कोणता?",
      "options": ["मोर", "हरियाळ", "कोकिळा", "पोपट"],
      "correct": 1,
      "explanation": "हरियाळ हा महाराष्ट्राचा राज्य पक्षी आहे."
    },
    {
      "question": "संत तुकाराम यांचे समाधी कुठे आहे?",
      "options": ["पंढरपूर", "देहू", "आळंदी", "तुळजापूर"],
      "correct": 1,
      "explanation": "संत तुकाराम यांचे समाधी देहू येथे आहे."
    },
    {
      "question": "महाराष्ट्राचा सर्वात मोठा जिल्हा कोणता?",
      "options": ["अहमदनगर", "पुणे", "नागपूर", "सोलापूर"],
      "correct": 0,
      "explanation": "अहमदनगर हा महाराष्ट्राचा सर्वात मोठा जिल्हा आहे."
    },
    {
      "question": "गोदावरी नदीचा उगम कुठे आहे?",
      "options": ["नाशिक", "त्र्यंबकेश्वर", "अहमदनगर", "औरंगाबाद"],
      "correct": 1,
      "explanation": "गोदावरी नदीचा उगम त्र्यंबकेश्वर येथे आहे."
    },
    {
      "question": "महाराष्ट्र दिन कधी साजरा केला जातो?",
      "options": ["१ मे", "१५ ऑगस्ट", "२६ जानेवारी", "२ ऑक्टोबर"],
      "correct": 0,
      "explanation": "महाराष्ट्र दिन १ मे रोजी साजरा केला जातो."
    },
    {
      "question": "वारकरी संप्रदायाचे मुख्य केंद्र कोणते?",
      "options": ["आळंदी", "देहू", "पंढरपूर", "तुळजापूर"],
      "correct": 2,
      "explanation": "पंढरपूर हे वारकरी संप्रदायाचे मुख्य केंद्र आहे."
    },
    {
      "question": "महाराष्ट्राचे राज्यगीत कोणते?",
      "options": ["वंदे मातरम्", "जय जय महाराष्ट्र माझा", "अभंग", "पोवाडा"],
      "correct": 1,
      "explanation": "जय जय महाराष्ट्र माझा हे महाराष्ट्राचे राज्यगीत आहे."
    },
    {
      "question": "छत्रपती शिवाजी महाराजांची आई कोण होती?",
      "options": ["जिजाबाई", "तारा बाई", "सई बाई", "सोया बाई"],
      "correct": 0,
      "explanation": "जिजाबाई या छत्रपती शिवाजी महाराजांची आई होती."
    }
  ]'::jsonb,
  10,
  true
);

-- Create admin profile (run after first admin login)
-- INSERT INTO profiles (id, email, name, wallet_balance, tests_taken) 
-- VALUES ('admin-uuid-here', 'admin@maheshsharmale.in', 'Admin User', 0, 0);