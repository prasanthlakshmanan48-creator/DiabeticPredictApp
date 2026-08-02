import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Mic, MicOff, Sparkles } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import toast from 'react-hot-toast';

const VoiceAssistant = ({ textToRead = "", onVoiceInput = null }) => {
  const { language, t } = useTheme();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) {
      toast.error('Voice output is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    if (!textToRead) {
      toast.info('No text available to read aloud.');
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.lang = language === 'ta' ? 'ta-IN' : 'en-US';
    utterance.rate = 0.9; // Slightly slower pace for elderly listeners

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error('Speech recognition is not supported in this browser.');
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      toast.success(t('listening'));
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setIsListening(false);
      toast.success(`Voice Recognized: "${transcript}"`);
      if (onVoiceInput) {
        onVoiceInput(transcript);
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error('Speech recognition error. Please try again.');
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="flex items-center gap-2">
      {textToRead && (
        <button
          type="button"
          onClick={handleReadAloud}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm ${
            isSpeaking
              ? 'bg-amber-500 text-white animate-pulse'
              : 'bg-primary-600 hover:bg-primary-700 text-white shadow-glow-primary'
          }`}
          title="Read evaluation aloud"
        >
          {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{isSpeaking ? t('stopReading') : t('readAloud')}</span>
        </button>
      )}

      {onVoiceInput && (
        <button
          type="button"
          onClick={handleVoiceInput}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-sm border ${
            isListening
              ? 'bg-red-500 text-white border-red-400 animate-ping'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
          }`}
          title="Speak form inputs"
        >
          {isListening ? <MicOff className="w-4 h-4 text-white" /> : <Mic className="w-4 h-4 text-primary-600" />}
          <span>{isListening ? t('listening') : t('voiceInput')}</span>
        </button>
      )}
    </div>
  );
};

export default VoiceAssistant;
