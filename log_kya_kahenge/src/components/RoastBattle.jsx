import { useState } from 'react';
import axios from 'axios';

const RoastBattle = () => {
  const [userLine, setUserLine] = useState('');
  const [chachaRoast, setChachaRoast] = useState('');

  const handleRoast = async () => {
    const res = await axios.post('https://api.openai.com/v1/chat/completions', {
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are Chacha Ji, who sarcastically roasts millennials in a funny Indian tone.' },
        { role: 'user', content: `My response: ${userLine}` }
      ]
    }, {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
      }
    });
    setChachaRoast(res.data.choices[0].message.content);
  };

  return (
    <div className="p-4 border rounded shadow-sm mt-6">
      <h2>🔥 Roast Battle: You vs Chacha Ji</h2>
      <input
        value={userLine}
        onChange={e => setUserLine(e.target.value)}
        placeholder="Type your comeback..."
        className="border p-2 w-full"
      />
      <button onClick={handleRoast} className="mt-2 bg-red-500 text-white px-4 py-2 rounded">
        Roast Me
      </button>
      <p className="mt-4">{chachaRoast}</p>
    </div>
  );
};

export default RoastBattle;
