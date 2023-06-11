// App.js
import React, { useState, useEffect } from 'react';
import { translateText } from './service/translationService.ts';
import { Container, Form, FormGroup, Input, Button, ButtonGroup } from 'reactstrap';

const languages = [
  { code: 'fr', name: 'Français' },
  { code: 'en', name: 'Anglais' },
  { code: 'de', name: 'Allemand' },
  { code: 'es', name: 'Espagnol' },
  { code: 'pt', name: 'Portugais' },
  { code: 'uk', name: 'Ukrainien' }
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
      setCurrentTargetLanguage(language.name.toLowerCase());
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
      const sanitizedText = encodeURIComponent(text);
      const decodedSanitizedText = decodeURIComponent(sanitizedText);
      const translation = await translateText(decodedSanitizedText, sourceLanguage, targetLanguage);
      setTranslatedText(translation);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h1 >AWS Translation</h1>
      <Form className="translation-form mb-3" onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="textarea"
            placeholder="Saisissez votre texte..."
            value={text}
            onChange={handleTextChange}
            required
            className="w-100"
          />
        </FormGroup>
        <div className="d-flex flex-wrap justify-content-center">
          <ButtonGroup className="mb-2 mb-md-0 mx-1">
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
          <ButtonGroup className="mb-2 mb-md-0 mx-1">
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
        </div>
        <div className="text-center mt-2">
          <Button type="submit" color="primary">Traduire</Button>
        </div>
      </Form>
      <div className="translation-result w-100">
        <h2>Traduction en {currentTargetLanguage} :</h2>
        <FormGroup>
          <Input type="textarea" value={translatedText} disabled />
        </FormGroup>
      </div>
    </Container>
  );
}

export default App;
