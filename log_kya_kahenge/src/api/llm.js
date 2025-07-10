import axios from 'axios';

export const getPersonaResponse = async (prompt, mode = 'judgy') => {
  const personas = mode === 'judgy'
    ? ['Chacha Ji', 'Kiran Auntie', 'Investor Roommate']
    : ['Motivational Uncle', 'Cool Cousin', 'Empathy Bot'];

  const messages = personas.map(p => ({
    role: 'user',
    content: `As ${p}, what would you say about: ${prompt}?`
  }));

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4',
        messages,
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
    );

    return response.data.choices.map(choice => choice.message.content);
  } catch (error) {
    console.error('Error fetching LLM response:', error);
    return ['Oops! Something went wrong. Try again later.'];
  }
};
