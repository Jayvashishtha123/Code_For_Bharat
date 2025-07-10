import { speakText } from '../utils/speech';

const characters = ['Chacha Ji', 'Kiran Auntie', 'Investor Bro', 'Cool Cousin'];

const PersonaCard = ({ character, message }) => {
  return (
    <div className="border p-3 rounded-lg shadow-sm m-2 bg-white w-full md:w-[45%]">
      <h3 className="font-bold text-lg">{character} says:</h3>
      <p className="mt-2">{message}</p>
      <button onClick={() => speakText(message)} className="mt-2 text-blue-600 underline">
        🔊 Listen
      </button>
    </div>
  );
};

const CanvasPersona = ({ responses }) => {
  return (
    <div className="flex flex-wrap justify-start gap-4 mt-6">
      {responses.map((msg, i) => (
        <PersonaCard key={i} character={characters[i] || `Persona ${i + 1}`} message={msg} />
      ))}
    </div>
  );
};

export default CanvasPersona;
