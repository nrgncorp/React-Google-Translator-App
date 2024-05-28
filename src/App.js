import './App.css';
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import $ from 'jquery';

function App() {
  const [text, setText] = useState('');
  const [leng1, setLeng1] = useState('none');
  const [leng2, setLeng2] = useState('none');

  const handleTranslate = () => {
    translator(text, leng1, leng2);
  };

  function translator(text, leng1, leng2){
    if(text != null && leng1 != leng2){
      if (text !== null && leng1 !== leng2) {
        $('#alert').attr('class','alert alert-warning mt-4 display-none');
        const settings = {
          async: true,
          crossDomain: true,
          url: 'https://google-translator9.p.rapidapi.com/v2',
          method: 'POST',
          headers: {
            'x-rapidapi-key': '<your-token>',
            'x-rapidapi-host': 'google-translator9.p.rapidapi.com',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            q: text,
            source: leng1,
            target: leng2,
            format: 'text'
          })
        };
      
        fetch(settings.url, {
          method: settings.method,
          headers: settings.headers,
          body: settings.body
        })
          .then(response => response.json())
          .then(data => {
            $('#textresult').text(data.data.translations[0].translatedText);
          })
          .catch(error => console.error('Error:', error));
      }      
    }
    else{
      if(text == "" && leng1 == leng2){
        $('#alert').attr('class','alert alert-warning mt-4');
        $('#alert').text("Metin girmeniz gerekmektedir. | Girilen dil ile çevirilecek dil aynı olamaz ve dil seçimleri boş geçilemez.");
        $('#textresult').text("");
      }
      else if(text == null && leng1 != leng2){
        $('#alert').attr('class','alert alert-warning mt-4');
        $('#alert').text("Metin girmeniz gerekmektedir.");
        $('#textresult').text("");
      }
      else if(text != "" && leng1 == leng2){
        $('#alert').attr('class','alert alert-warning mt-4');
        $('#alert').text("Girilen dil ile çevirilecek dil aynı olamaz ve dil seçimleri boş geçilemez.");
        $('#textresult').text("");
      }
    }
  }

  return (
    <div className="App">
      <div className="card">
        <div className="card-body">
          NRGN Translator
        </div>
      </div>
      <div id='alert' class="alert alert-warning mt-4 display-none" role="alert">
      </div>
      <div className="row g-3 mt-2">
        <div className="col-sm">
          <textarea className="form-control" id='text' placeholder="Metin giriniz..." value={text}
            onChange={(e) => setText(e.target.value)}></textarea>
        </div>
      </div>
      <div className="row g-3 mt-2">
        <div className="col-sm">
          <select id='text-leng1' className="form-select" aria-label="Default select example" value={leng1}
            onChange={(e) => setLeng1(e.target.value)}>
            <option selected value="none">Girilen Dil</option>
            <option value="en-US">English</option>
            <option value="zh-CN">Chinese (Simplified)</option>
            <option value="hi-IN">Hindi</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="ar-SA">Arabic</option>
            <option value="bn-IN">Bengali</option>
            <option value="ru-RU">Russian</option>
            <option value="pt-BR">Portuguese</option>
            <option value="id-ID">Indonesian</option>
            <option value="ur-PK">Urdu</option>
            <option value="de-DE">German</option>
            <option value="ja-JP">Japanese</option>
            <option value="sw-KE">Swahili</option>
            <option value="mr-IN">Marathi</option>
            <option value="te-IN">Telugu</option>
            <option value="ta-IN">Tamil</option>
            <option value="tr-TR">Turkish</option>
            <option value="ko-KR">Korean</option>
            <option value="vi-VN">Vietnamese</option>
          </select>
        </div>
        <div className="col-sm">
          <select id='text-leng2' className="form-select" aria-label="Default select example" value={leng2}
            onChange={(e) => setLeng2(e.target.value)}>
            <option selected value="none">Çevirilecek Dil</option>
            <option value="en-US">English</option>
            <option value="zh-CN">Chinese (Simplified)</option>
            <option value="hi-IN">Hindi</option>
            <option value="es-ES">Spanish</option>
            <option value="fr-FR">French</option>
            <option value="ar-SA">Arabic</option>
            <option value="bn-IN">Bengali</option>
            <option value="ru-RU">Russian</option>
            <option value="pt-BR">Portuguese</option>
            <option value="id-ID">Indonesian</option>
            <option value="ur-PK">Urdu</option>
            <option value="de-DE">German</option>
            <option value="ja-JP">Japanese</option>
            <option value="sw-KE">Swahili</option>
            <option value="mr-IN">Marathi</option>
            <option value="te-IN">Telugu</option>
            <option value="ta-IN">Tamil</option>
            <option value="tr-TR">Turkish</option>
            <option value="ko-KR">Korean</option>
            <option value="vi-VN">Vietnamese</option>
          </select>
        </div>
        <div className="col-sm d-grid">
            <button type="button" onClick={handleTranslate} className="btn btn-primary">Çevir</button>
        </div>
      </div>
      <div className="row g-3 mt-2">
        <div className="col-sm">
          <textarea className="form-control" id='textresult' placeholder=""></textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
