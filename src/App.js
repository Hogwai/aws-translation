// App.js
import React, { useState } from 'react';
import { translateText } from './service/translationService.ts';
import { Container, Form, FormGroup, Input, Button, ButtonGroup } from 'reactstrap';

function App() {
  const [text, setText] = useState('');
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('fr');
  const [translatedText, setTranslatedText] = useState('');

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  const handleSourceLanguageChange = (language) => {
    setSourceLanguage(language);
  };

  const handleTargetLanguageChange = (language) => {
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
      <h1>Google Traduction Clone</h1>
      <Form className="translation-form" onSubmit={handleSubmit}>
        <FormGroup>
          <Input
            type="textarea"
            placeholder="Saisissez votre texte..."
            value={text}
            onChange={handleTextChange}
          />
        </FormGroup>
        <ButtonGroup>
          <Button
            color={sourceLanguage === 'en' ? 'primary' : 'secondary'}
            onClick={() => handleSourceLanguageChange('en')}
          >
            Anglais
          </Button>
          <Button
            color={sourceLanguage === 'fr' ? 'primary' : 'secondary'}
            onClick={() => handleSourceLanguageChange('fr')}
          >
            Français
          </Button>
          {/* Ajoutez ici d'autres boutons pour les langues source si nécessaire */}
        </ButtonGroup>
        <ButtonGroup>
          <Button
            color={targetLanguage === 'fr' ? 'primary' : 'secondary'}
            onClick={() => handleTargetLanguageChange('fr')}
          >
            Français
          </Button>
          <Button
            color={targetLanguage === 'en' ? 'primary' : 'secondary'}
            onClick={() => handleTargetLanguageChange('en')}
          >
            Anglais
          </Button>
          {/* Ajoutez ici d'autres boutons pour les langues cibles si nécessaire */}
        </ButtonGroup>
        <Button type="submit" color="primary">Traduire</Button>
      </Form>
      {translatedText && (
        <div className="translation-result">
          <h2>Résultat :</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </Container>
  );
}

export default App;
