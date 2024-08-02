import { useState, ChangeEvent, FormEvent } from 'react';
import './index.css';
import { askQuestion } from './api/assistant';

function App() {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setQuestion(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await askQuestion(question);
      const fetchedAnswer = response.data.answer;
      setAnswer(fetchedAnswer);
    } catch (error) {
      console.error('Error fetching answer:', error);
      setAnswer("Error fetching answer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-black p-8 w-screen h-screen">
        <div className="flex flex-col bg-black p-8 border-0 w-full h-full">
          <nav className="bg-red-900/0 flex w-full justify-between ">
            <div className="flex flex-col items-center">
              <p>STEREOSCOPE</p>
              <p>Portal</p>
            </div>
            <ul className="flex items-center justify-end cursor-pointer [&>li]:border-r [&>li]:p-2 [&>li:hover]:bg-white [&>li:hover]:text-black [&>li:hover]:transition-all [&>li:hover]:ease-in [&>li:hover]:delay-50">
              <li>HOME</li>
              <li>FILES</li>
            </ul>
          </nav>
          <div className="flex flex-col justify-center items-center p-8 bg-green-900/0 w-full h-full">
            <form onSubmit={handleSubmit} className="flex flex-col items-end">
              <textarea
                className="flex border bg-black p-2 w-96 h-10 resize-none text-white"
                value={question}
                onChange={handleInputChange}
                placeholder="Ask your question"
              />
              <button type="submit" className="mt-4 p-2 bg-black text-white">
                {loading ? 'SUBMITTING...' : 'SUBMIT'}
              </button>
            </form>
            {answer && (
              <div className="mt-8 p-4 bg-black text-white w-96 text-center">
                <strong>Answer: </strong> {answer}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

