// src/api/faqService.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/ask/';

export const askQuestion = (question) => axios.post(API_URL, { question });

