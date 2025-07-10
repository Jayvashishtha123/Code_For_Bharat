export const speakText = (text, voiceName = 'Google UK English Male') => {
  const synth = window.speechSynthesis;
  const utter = new SpeechSynthesisUtterance(text);
  const voice = synth.getVoices().find(v => v.name === voiceName);
  if (voice) utter.voice = voice;
  synth.speak(utter);
};
