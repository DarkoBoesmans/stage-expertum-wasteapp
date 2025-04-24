---
layout: default
transition: slide-left
---

# Limitations van Generatieve AI

<div class="grid grid-cols-2 gap-6">
<div>

## Hallucinations
- AI genereert plausibele maar onjuiste informatie
- Voorbeeld: ChatGPT maakt foutieve samenvatting van een boek

```text
Prompt: Maak een korte samenvatting van het boek 
'Het verdriet van België' door Louis-Paul Boon.

ChatGPT 3.5: "Het verdriet van België" ("The Sorrow 
of Belgium") door Louis-Paul Boon is een 
semi-autobiografische roman...
```

- **Belangrijk**: Foundation Models weten niets, ze berekenen alleen waarschijnlijkheden

</div>
<div>

## Kennisbeperkingen
- Kennis bevroren op trainingsmoment
- Geen besef van actualiteit na trainingsdatum

```text
Prompt: Ik wil The Crooked House bezoeken, een 
historische 18e-eeuwse pub in Staffordshire. 
Wat moet ik weten?

ChatGPT 3.5: Een bezoek aan The Crooked House 
klinkt fantastisch! Hier is wat je moet weten: ...
```

- The Crooked House brandde af in 2023, maar ChatGPT 3.5 werd getraind tot januari 2022

</div>
</div>

---
layout: default
transition: slide-left
---

# Meer Beperkingen van AI

<div class="grid grid-cols-2 gap-6">
<div>

## Inconsistente Wiskundige Vaardigheden
- Moeite met eenvoudige berekeningen
- Verwarrende tijdsperceptie

```text
Prompt: Geef een woord met precies 3 b's, 2 a's en een e.

ChatGPT 3.5: Het woord "beanbag" voldoet aan je criteria: 
het heeft 3 b's, 2 a's en een e.
```

```text
Prompt: Wat gebeurde eerder: het zinken van The Herald 
of Free Enterprise of het 'Heizeldrama'?

ChatGPT 3.5: Het zinken van de Herald of Free Enterprise 
vond plaats op 6 maart 1987, terwijl het Heizeldrama 
plaatsvond op 29 mei 1985.
```

</div>
<div>

## Sterk in Standaardproblemen
- Goed in het oplossen van bekende vraagstukken
- Volgt aangeleerde methodieken

```text
Prompt: Twee auto's rijden noordwaarts. De eerste rijdt 
40 km/u, de tweede vertrekt 3 uur later en rijdt 60 km/u. 
Hoe lang na het vertrek van de tweede auto haalt deze 
de eerste in?

Bing Copilot: 
Laat T de tijd voorstellen die de eerste auto rijdt.
De tweede auto start 3 uur later, dus zijn tijd is (T - 3).
Afstand eerste auto: 40T kilometer.
Afstand tweede auto: 60(T - 3) kilometer.
40T = 60(T - 3)
40T = 60T - 180
-20T = -180
T = 9
Antwoord: 6 uur na vertrek tweede auto.
```

</div>
</div>

---
layout: image-right
image: https://images.unsplash.com/photo-1633409361618-c73427e4e206?q=80&w=1000&auto=format&fit=crop
transition: slide-left
---

# Prompt Engineering

- De kunst van het formuleren van effectieve prompts
- Essentiële vaardigheid voor optimaal AI-gebruik
- Structuur, context en specificiteit zijn cruciaal

## Belangrijke Technieken
- **Chain-of-Thought**: leid het model door complexe redeneringen
- **Few-Shot Learning**: geef voorbeelden in de prompt
- **System Prompts**: stel de rol en gedrag van de AI in
- **Temperature-instelling**: controle over creativiteit vs precisie

---
layout: image-left
image: https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1000&auto=format&fit=crop
transition: slide-left
---

# Retrieval Augmented Generation (RAG)

- Combineert LLMs met externe kennisbronnen
- Vermindert hallucinaties
- Houdt informatie up-to-date

## Werking
1. **Embeddings**: vectorrepresentaties van tekst
2. **Retrieval**: zoek relevante informatie in kennisbank
3. **Generation**: antwoord genereren met gevonden context
4. **Orchestration**: het hele proces beheren

## Voordelen voor SAP
- Integratie met bedrijfsspecifieke data
- Nauwkeurigere en betrouwbaardere antwoorden
- Verminderd risico op foutieve informatie

---
layout: default
transition: slide-left
---

# Orchestration Tools: "Agents"

<div class="grid grid-cols-2 gap-6">
<div>

## Wat zijn AI Agents?
- Autonome AI-systemen die taken uitvoeren
- Kunnen beslissingen nemen en acties ondernemen
- Aaneenschakeling van verschillende AI-modellen
- Interactie met externe systemen en APIs

## Agent Frameworks
- **LangChain**: flexibel framework voor AI-workflows
- **AutoGPT**: zelfstandige, doelgerichte agents
- **BabyAGI**: taakbeheer en prioritering

</div>
<div>

## Toepassingen in SAP
- **Procesautomatisering**: complexe workflows automatiseren
- **Beslissingsondersteuning**: data-analyse en aanbevelingen
- **Anomaliedetectie**: proactieve controle en melding
- **Klantenservice**: geautomatiseerde probleemoplossing

## Uitdagingen
- Betrouwbaarheid en consistentie
- Security en toegangscontrole
- Menselijke supervisie
- Ethische overwegingen

</div>
</div>

---
layout: image-right
image: https://www.sap.com/content/dam/marketing/commerce/images/joule/joule-purple-chip-1216x684.jpg/_jcr_content/renditions/original.transform/dam-image-tablet/joule-purple-chip-1216x684.jpg
transition: slide-left
---

# SAP Copilot Joule

SAP's AI-assistent die natuurlijke taal gebruikt om SAP-systemen toegankelijker te maken.

## Kernfunctionaliteiten
- **Conversatie-interface** voor SAP-toepassingen
- **Contextbewuste** ondersteuning en analyses
- **Multi-modale interactie**: tekst, spraak, afbeeldingen
- **Workflow-automatisering** en procesversnelling

## Integratie
- S/4HANA, SAP SuccessFactors, SAP Customer Experience
- SAP Business Technology Platform
- Verbinding met externe AI-diensten via SAP AI Core

---
layout: image-left
image: https://www.sap.com/dam/application/shared/images/images/sapcom-page-banner-70-30.jpg
transition: slide-left
---

# Just Ask & Document Processing

## Natuurlijke Taal Verwerking
- Documenten begrijpen en interpreteren
- Automatische extractie van informatie
- Intelligente classificatie en verwerking

## Voordelen
- **Tijdsbesparing**: automatisering van handmatige processen
- **Nauwkeurigheid**: vermindering van verwerkingsfouten
- **Schaalbaarheid**: verwerking van grote documentvolumes
- **Inzicht**: betere data-extractie voor besluitvorming

## Use Cases
- Factuurverwerking
- Contractanalyse
- Compliance-documentatie
- Klantcorrespondentie

---
layout: default
transition: slide-left
---

# Domains voor Use Cases

<div class="grid grid-cols-3 gap-6">
<div class="bg-gradient-to-br from-[#7B5DC7] to-[#9F89D7] p-6 rounded-lg text-white">
  <h3 class="text-xl mb-2">Finance & Accounting</h3>
  <ul class="space-y-2 opacity-90">
    <li>Automatische factuurverwerking</li>
    <li>Fraude-detectie met ML</li>
    <li>Cash flow-voorspellingen</li>
    <li>Uitgavenanalyse en -optimalisatie</li>
  </ul>
</div>

<div class="bg-gradient-to-br from-[#5A32C8] to-[#7B5DC7] p-6 rounded-lg text-white">
  <h3 class="text-xl mb-2">Supply Chain</h3>
  <ul class="space-y-2 opacity-90">
    <li>Vraagvoorspelling</li>
    <li>Inventarisoptimalisatie</li>
    <li>Logistieke routeplanning</li>
    <li>Leveranciersevaluatie</li>
  </ul>
</div>

<div class="bg-gradient-to-br from-[#9F89D7] to-[#C6B6FF] p-6 rounded-lg text-white">
  <h3 class="text-xl mb-2">Human Resources</h3>
  <ul class="space-y-2 opacity-90">
    <li>Intelligente werving en selectie</li>
    <li>Employee engagement analyse</li>
    <li>Gepersonaliseerde training</li>
    <li>Werkbelastingbeheer</li>
  </ul>
</div>
</div>

<div class="mt-8 grid grid-cols-2 gap-6">
<div class="bg-gradient-to-br from-[#4A2BA8] to-[#5A32C8] p-6 rounded-lg text-white">
  <h3 class="text-xl mb-2">Sales & Marketing</h3>
  <ul class="space-y-2 opacity-90">
    <li>Klantgedraganalyse</li>
    <li>Gepersonaliseerde marketing</li>
    <li>Verkoopkansvoorspelling</li>
    <li>Sentimentanalyse</li>
  </ul>
</div>

<div class="bg-gradient-to-br from-[#C6B6FF] to-[#9F89D7] p-6 rounded-lg text-white">
  <h3 class="text-xl mb-2">IT & Development</h3>
  <ul class="space-y-2 opacity-90">
    <li>Codeanalyse en -suggesties</li>
    <li>Automatische testgeneratie</li>
    <li>Incident response-automatisering</li>
    <li>Infrastructuuroptimalisatie</li>
  </ul>
</div>
</div>

---
layout: image-right
image: https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop
transition: slide-left
---

# Ethische & Sociale Aspecten van AI

## Kernuitdagingen
- **Bias & Fairness**: oneerlijke vooroordelen tegengaan
- **Transparantie**: begrijpelijke AI-besluitvorming
- **Privacy**: bescherming van persoonlijke gegevens
- **Verantwoordelijkheid**: wie is aansprakelijk?

## SAP's Aanpak
- **Ethische richtlijnen** voor AI-ontwikkeling
- **Diverse trainingsdatasets** om bias te verminderen
- **Explainable AI** voor transparantie
- **Data governance** en privacybescherming

## Toekomstperspectief
- Balans tussen innovatie en ethische overwegingen
- Mensgerichte AI-ontwikkeling
- Samenwerking met stakeholders
- Aanpassingsvermogen aan evoluerende normen

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