// App.js
import React, { useState, useEffect } from 'react';
import { translateText } from './service/translationService.ts';
import { Container, Form, FormGroup, Input, Button, ButtonGroup } from 'reactstrap';

const languages = [
  { code: 'en', name: 'Anglais' },
  { code: 'fr', name: 'Français' },
];

function App() {
  const [text, setText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState(languages[0].code);
  const [targetLanguage, setTargetLanguage] = useState(languages[1].code);
  const [translatedText, setTranslatedText] = useState('');
  var [currentTargetLanguage, setCurrentTargetLanguage] = useState('');

  useEffect(() => {
    const language = languages.find(lang => lang.code === targetLanguage);
    if (language) {
      setCurrentTargetLanguage(language.name);
    }
  }, [targetLanguage]);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSourceLanguageChange = (language) => {
    if (language === targetLanguage) {
      setTargetLanguage(sourceLanguage);
    }
    setSourceLanguage(language);
  };

  const handleTargetLanguageChange = (language) => {
    if (language === sourceLanguage) {
      setSourceLanguage(targetLanguage);
    }
    setTargetLanguage(language);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const translation = await translateText(text, sourceLanguage, targetLanguage);
      setTranslatedText(translation);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1>AWS Translation</h1>
      <Form className="translation-form mb-3" onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="textarea"
            placeholder="Saisissez votre texte..."
            value={text}
            onChange={handleTextChange}
          />
        </FormGroup>
        <ButtonGroup className='mr-2'>
          {languages.map((lang) => (
            <Button
              key={lang.code}
              color={sourceLanguage === lang.code ? 'primary' : 'secondary'}
              onClick={() => handleSourceLanguageChange(lang.code)}
            >
              {lang.name}
            </Button>
          ))}
        </ButtonGroup>
        <ButtonGroup className='mr-2'>
          {languages.map((lang) => (
            <Button
              key={lang.code}
              color={targetLanguage === lang.code ? 'primary' : 'secondary'}
              onClick={() => handleTargetLanguageChange(lang.code)}
            >
              {lang.name}
            </Button>
          ))}
        </ButtonGroup>
        <Button type="submit" color="primary">Traduire</Button>
      </Form>
      <div className="translation-result">
        <h2>Traduction en {currentTargetLanguage}:</h2>
        <p>{translatedText}
          <Input
            type="textarea"
            value={translatedText}
            readOnly
          />
        </p>
      </div>

    </Container>
  );
}

export default App;
