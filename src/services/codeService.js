import axios from 'axios';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com';
const JUDGE0_API_KEY = 'df41c6bf20msh1d02d7d0d9d4ce7p158717jsn67882a9aedfd';

const headers = {
  'content-type': 'application/json',
  'X-RapidAPI-Key': JUDGE0_API_KEY,
  'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com'
};

// Language IDs for Judge0
const LANGUAGE_IDS = {
  python: 71,  // Python (3.8.1)
  javascript: 63,  // JavaScript (Node.js 12.14.0)
  cpp: 54,  // C++ (GCC 9.2.0)
  java: 62,  // Java (OpenJDK 13.0.1)
};

let currentInputIndex = 0;

// Helper function to extract all input prompts from Python code
const extractInputPrompts = (code) => {
  const prompts = [];
  let match;
  const regex = /input\((["'])(.*?)\1\)/g;
  
  while ((match = regex.exec(code)) !== null) {
    prompts.push(match[2]);
  }
  
  return prompts;
};

// Helper function to get the next input prompt
const getNextPrompt = (code) => {
  const prompts = extractInputPrompts(code);
  if (currentInputIndex < prompts.length) {
    return prompts[currentInputIndex++];
  }
  return 'Enter input: ';
};

// Execute code using Judge0 API
export const executeCode = async (code, input = '') => {
  try {
    // Reset input index when starting fresh (no input provided)
    if (!input) {
      currentInputIndex = 0;
    }

    // Check if code contains input() but no input is provided
    if (code.includes('input(') && !input) {
      const nextPrompt = getNextPrompt(code);
      return {
        waitingForInput: true,
        prompt: nextPrompt
      };
    }

    const response = await axios.post(`${JUDGE0_API_URL}/submissions`, {
      source_code: code,
      language_id: LANGUAGE_IDS.python,
      stdin: input,
      wait: true
    }, { headers });

    const { token } = response.data;
    
    // Get submission result
    const result = await axios.get(`${JUDGE0_API_URL}/submissions/${token}`, { headers });
    
    if (result.data.status.id >= 6) { // Error states start at 6
      return {
        error: result.data.stderr || result.data.compile_output || 'Execution error',
        output: null
      };
    }

    return {
      error: null,
      output: result.data.stdout || '',
      waitingForInput: code.includes('input(') && !input
    };

  } catch (error) {
    console.error('Code execution error:', error);
    return {
      error: error.message || 'Failed to execute code',
      output: null
    };
  }
};
