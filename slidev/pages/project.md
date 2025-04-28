---
layout: section
transition: slide-up
---

# AI binnen IVAGO Waste-App

<div class="flex justify-center">
  <div class="text-center max-w-2xl">
    <p class="text-xl mt-4 opacity-80">
      Computer Vision voor afvalherkenning
    </p>
  </div>
</div>

<style>
h1 {
  background-image: linear-gradient(45deg, #5A32C8, #C6B6FF);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 3rem !important;
}
</style>

---
layout: default
transition: slide-left
---

# Computer Vision voor Afvalherkenning

<div class="grid grid-cols-2 gap-6">
<div>

## Project Overzicht
- **Doel**: Automatisch herkennen van afvaltypes en sluikstort
- **Technologie**: SAP AI Core met Computer Vision Package
- **Dataset**: Getraind op afbeeldingen van verschillende afvaltypes
- **Integratie**: Verbonden met IVAGO's rapportage- en opvolgingssysteem

## Workflow
1. Foto maken van afval/sluikstort
2. Automatische analyse door CV model
3. Classificatie van afvaltype
4. Suggestie van gepaste opvolgingsactie
5. Rapportage aan juiste afdeling

</div>
<div>

## Technische Implementatie
- SAP AI Core voor modelhosting
- SAP HANA Cloud als data-opslag
- UI5-applicatie voor gebruikersinterface
- CAP (Cloud Application Programming) voor backend

<div class="bg-gradient-to-br from-[#5A32C8] to-[#9F89D7] p-4 rounded-lg text-white mt-4">
  <h3 class="text-lg mb-2">Voordelen</h3>
  <ul class="space-y-1 opacity-90">
    <li>⏱️ Snellere verwerking van meldingen</li>
    <li>🎯 Accurate classificatie (>90% nauwkeurigheid)</li>
    <li>📊 Betere data voor trendanalyse</li>
    <li>🔄 Automatisering van routinetaken</li>
  </ul>
</div>

</div>
</div>

---
layout: image-right
image: /assets/todo/8R1Q9XR5ASGS90L25VDY6TRB.jpg
class: 'text-white'
transition: slide-left
---

# Demo: Afvalherkenning

## Model Training & Performance

- Getraind op **2000+ afbeeldingen** van sluikstort
- Onderscheidt **8 verschillende afvaltypes**:
  - Huishoudelijk afval
  - Bouwafval
  - Groenafval
  - Elektronisch afval
  - Plastic
  - Meubels
  - Gevaarlijk afval
  - Gemengd afval

## Uitdagingen
- Variabele lichtomstandigheden
- Gedeeltelijk zichtbaar afval
- Meerdere afvaltypes in één beeld
- Seizoensgebonden variaties

---
layout: default
transition: slide-left
---

# Technische Architectuur

<div class="grid grid-cols-2 gap-6">
<div>

## Frontend Components
- **UI5 Framework** voor gebruikersinterface
- **Camera API** voor afbeeldingscapture
- **Report Service** voor meldingsbeheer
- **Location Service** voor geo-tagging

```typescript
// Voorbeeld: AttachmentService
export class AttachmentService {
  async uploadImage(file: File): Promise<string> {
    // Stuurt afbeelding naar backend voor analyse
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    
    return response.json();
  }
  
  // ...bestaande code...
}
```

</div>
<div>

## Backend Components
- **CAP Service** voor API-endpoints
- **AI Core Connector** voor modelintegratie
- **HANA Persistence** voor dataopslag

```javascript
// Voorbeeld: Computer Vision integratie in service.js
const cds = require('@sap/cds');
const aiCore = require('@sap/ai-core-sdk');

module.exports = cds.service.impl(async function() {
  this.on('analyzeImage', async(req) => {
    const { imageId } = req.data;
    
    // Haal de image data op
    const image = await SELECT.one.from('Images')
      .where({ ID: imageId });
    
    // Stuur naar AI Core voor analyse
    const prediction = await aiCore.predict({
      deploymentId: 'waste-recognition-model',
      data: image.content
    });
    
    // Verwerk resultaten
    return transformPrediction(prediction);
  });
});
```

</div>
</div>

---
layout: section
transition: slide-up
---

# Chat AI Tool: Collega Project

<div class="flex justify-center">
  <div class="text-center max-w-2xl">
    <p class="text-xl mt-4 opacity-80">
      Intelligente assistentie voor klantenservice
    </p>
  </div>
</div>

<style>
h1 {
  background-image: linear-gradient(45deg, #5A32C8, #C6B6FF);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 3rem !important;
}
</style>

---
layout: default
transition: slide-left
---

# Klantenservice Chat AI

<div class="grid grid-cols-2 gap-6">
<div>

## Project Overzicht
- **Doel**: Automatiseren & ondersteunen van klantgesprekken
- **Technologie**: SAP Conversational AI + GPT-integratie
- **Toepassing**: Eerste-lijn support en FAQ's
- **Integratie**: Met IVAGO's klantendatabase

## Kernfunctionaliteiten
- **Meertalige ondersteuning** (NL, FR, EN)
- **Contextbewuste antwoorden**
- **Afvalophaling informatie** (schema's, locaties)
- **Doorverwijzing** naar menselijke agenten indien nodig
- **Integratie** met ticketing-systeem

</div>
<div>

## Voordelen & Resultaten
<div class="bg-gradient-to-br from-[#5A32C8] to-[#9F89D7] p-4 rounded-lg text-white mb-4">
  <h3 class="text-lg mb-2">Business Impact</h3>
  <ul class="space-y-1 opacity-90">
    <li>⬇️ 40% reductie in wachttijd</li>
    <li>⬆️ 24/7 beschikbaarheid</li>
    <li>🔍 Consistente antwoorden</li>
    <li>📊 Verbeterde data-inzichten</li>
  </ul>
</div>

## Technische Implementatie
- **Intent Recognition**: voor gebruikersbedoelingen
- **Entity Extraction**: voor datapunten zoals adressen
- **Dialog Management**: voor natuurlijke gesprekken
- **Knowledge Base**: voor accurate antwoorden
- **SAP BTP**: als cloud-infrastructuur

</div>
</div>

---
layout: center
class: 'text-center'
---

# Toekomstperspectief en Samenvatting

<div class="grid grid-cols-2 gap-x-12 gap-y-6 mt-10">
  <div class="bg-gradient-to-br from-[#5A32C8]/10 to-[#9F89D7]/10 p-6 rounded-lg backdrop-blur-sm">
    <h3 class="text-xl font-bold text-[#5A32C8] mb-2">Waste App</h3>
    <ul class="text-left space-y-2">
      <li>🔮 Uitbreiding naar meerdere afvaltypes</li>
      <li>🔮 Realtime monitoring via drones/camera's</li>
      <li>🔮 Predictieve analyses voor proactieve inzet</li>
    </ul>
  </div>
  
  <div class="bg-gradient-to-br from-[#5A32C8]/10 to-[#9F89D7]/10 p-6 rounded-lg backdrop-blur-sm">
    <h3 class="text-xl font-bold text-[#5A32C8] mb-2">Chat Tool</h3>
    <ul class="text-left space-y-2">
      <li>🔮 Multimodale interactie (spraak, beeld)</li>
      <li>🔮 Persoonlijkere gebruikerservaringen</li>
      <li>🔮 Integratie met waste app voor end-to-end service</li>
    </ul>
  </div>
  
  <div class="col-span-2 bg-gradient-to-br from-[#5A32C8]/10 to-[#9F89D7]/10 p-6 rounded-lg backdrop-blur-sm">
    <h3 class="text-xl font-bold text-[#5A32C8] mb-2">Conclusie</h3>
    <p class="text-left">AI transformeert afvalbeheer door intelligente herkenning, efficiënte verwerking en verbeterde klantenservice. De combinatie van computer vision en natuurlijke taalverwerking biedt IVAGO krachtige tools om duurzaamheid te bevorderen en operationele efficiëntie te verhogen.</p>
  </div>
</div>

---
layout: center
class: text-center
---

# Vragen?

<div class="flex justify-center">
  <div class="text-center max-w-2xl">
    <p class="text-xl mt-4 opacity-80">
      Bedankt voor jullie aandacht!
    </p>
  </div>
</div>