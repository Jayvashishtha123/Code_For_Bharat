import { useState } from 'react';
import axios from 'axios';

const DearDiary = () => {
  const [entry, setEntry] = useState('');
  const [response, setResponse] = useState('');

  const handleConfess = async () => {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are a kind, emotional diary that gives loving advice.' },
        { role: 'user', content: `Dear Diary, ${entry}` }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      }
    });
    setResponse(res.data.choices[0].message.content);
  };

  return (
    <div className="p-4 border rounded shadow-md mt-6">
      <h2>📖 Dear Diary</h2>
      <textarea
        rows={4}
        value={entry}
        onChange={e => setEntry(e.target.value)}
        className="w-full border p-2"
        placeholder="Confess your thoughts..."
      />
      <button onClick={handleConfess} className="mt-2 bg-purple-500 text-white px-4 py-2 rounded">
        Confess
      </button>
      {response && <p className="mt-4">{response}</p>}
    </div>
  );
};

export default DearDiary;
