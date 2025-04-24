---
# Layout
theme: seriph
colorSchema: "dark"
background: "#19EB96"
favicon: "./theme-expertum/favicon-32x32-Expertum.png"
fonts:
  # Text
  sans: "Sora Light"
  # Code
  mono: "Victor Mono"
highlighter: shiki
lineNumbers: false

# Metadata
title: Artificiële Intelligentie
author: Darko Boesmans & Lazhar Rezkallah
info: |
  ## Artificiële Intelligentie
  Artificiële Intelligentie binnen SAP

# Extra
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
layout: cover
hideInToc: true
---

<style>
img {
  display: block;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.presentation-title {
  color: #ffffff;
  font-weight: bold;
}
</style>

# <CENTER>![Expertum Logo](/theme-expertum/Expertum_Logo_white_rgb.png)</CENTER>

<div class="mt-5">
  Artificiële Intelligentie binnen SAP
</div>

---
hideInToc: true
transition: slide-left
---

# Table of contents

<Toc maxDepth="1"></Toc>


---
layout: two-cols-header
transition: slide-left
---

# Wat is AI?

- "Intelligence: het vermogen om complexe doelen te bereiken" (Max Tegmark, Life 3.0)
- "Artificiële Intelligentie: intelligentie vertoond door niet-biologische systemen"

::left::

## Weak AI (Narrow AI)
- Vermogen om een beperkte set doelen te bereiken  
- *Voorbeeld: IBM's Deep Blue (1997)*

::right::

## Strong AI (AGI)
- Vermogen om elke intellectuele taak te begrijpen die een mens kan  
- *"Sparks of AGI: Early experiments with GPT-4"*

---
layout: image-right
image: https://www.elcorreo.com/xlsemanal/wp-content/uploads/sites/5/2023/04/alan-turing-inventor-informatica-espia-codigo-enigma-segunda-guerra-mundial.jpg
transition: slide-left
---

# Alan Turing (1912-1954)

- 🧠 Universele Turing Machine (UTM)
- 🔐 Ontcijferde de Enigma-code (WOII)
- ⚠️ Bewees het halting problem
- 🤖 Uitvinder van de Turing Test

---
layout: image
image: https://images.nemokennislink.nl/uploads/02_alan_turing_large.jpg
backgroundSize: cover
transition: slide-left
---

<div class="absolute inset-0 bg-black/50 flex items-center justify-center">
  <div class="text-center max-w-2xl">
    <p class="quote-text text-3xl font-italic">
      "I believe that at the end of the century the use of words and general educated opinion will have altered so much that one will be able to speak of machines thinking without expecting to be contradicted."
    </p>
    <p class="mt-4 text-xl">- Alan Turing</p>
  </div>
</div>

<style>
.quote-text {
  line-height: 1.25;
}
</style>

---
layout: center
class: text-center
---

```mermaid {scale: .9, theme: 'dark'}
flowchart TD
    A["🤖 Artificiële Intelligentie (AI)"] --> B["📊 Machine Learning"]
    B --> C["🧠 Deep Learning"]
    C --> D["✨ Foundation Models & Generatieve AI"]
    
    A1["Machines die intelligent gedrag vertonen"] --- A
    B1["Leren van data zonder expliciete programmering"] --- B
    C1["Neurale netwerken met meerdere lagen"] --- C
    D1["ChatGPT, DALL-E, enz."] --- D
    
    style A fill:#C6B6FF,stroke:#9F89D7,color:black
    style B fill:#9F89D7,stroke:#7B5DC7,color:black
    style C fill:#7B5DC7,stroke:#5A32C8,color:white
    style D fill:#5A32C8,stroke:#4A2BA8,color:white
    
    style A1 fill:none,stroke:none,color:white
    style B1 fill:none,stroke:none,color:white
    style C1 fill:none,stroke:none,color:white
    style D1 fill:none,stroke:none,color:white
```

---
layout: default
transition: slide-up
---

# Limitations van AI

<div class="grid grid-cols-2 gap-6">
  <div>

  ## Technische Beperkingen

  - **Interpretatieprobleem**: Moeite met context begrijpen 
  - **Hallucinations**: Genereren van onjuiste informatie
  - **Bias en Fairness**: Vooroordelen uit trainingsdata
  - **Zwarte doos**: Moeilijk te verklaren besluitvorming

  </div>

  <div>

  ## Praktische Uitdagingen

  - **Datahonger**: Behoefte aan grote hoeveelheden data
  - **Computationele kosten**: Hoge hardware-vereisten
  - **Generalisatie**: Moeite met nieuwe, onbekende situaties
  - **Menselijke interactie**: Mist empathie en sociale intelligentie

  </div>
</div>

<div class="mt-8 border-t pt-4 text-center">
  <p class="italic">"AI is uitstekend in het detecteren van patronen in data, maar heeft moeite met het begrijpen van de wereld zoals mensen dat doen."</p>
</div>

---
layout: section
transition: slide-left
---

# AI binnen SAP

---
layout: default
transition: slide-left
---

# AI Toepassingen binnen SAP

<div class="grid grid-cols-2 gap-6">
<div>

## SAP AI Core

- **Platform** voor ontwikkeling en beheer van AI-modellen
- **Schaalbaarheid** met containerization (Kubernetes)
- **Integratie** met bestaande SAP-oplossingen
- **Governance** met versioning en monitoring

</div>
<div>

## SAP AI Launchpad

- **Centrale hub** voor AI-projecten en modellen
- **Monitoring** van model performance
- **Gebruiksvriendelijke interface** voor modelmanagement
- **Samenwerking** tussen teams faciliteren

</div>
</div>

---
layout: default
transition: slide-left
---

# Generatieve AI in SAP

<div class="grid grid-cols-2 gap-6">
<div>

## Joule (Business AI Assistant)

- **Natural language interface** voor SAP-systemen
- **Context-aware** ondersteuning binnen SAP-applicaties
- **Automatisering** van routinetaken
- **Data-analyse** met natuurlijke taal

</div>
<div>

## SAP Build Code

- **Low-code/No-code** ontwikkeling met AI-ondersteuning
- **Code generatie** voor ABAP, CAP en JavaScript
- **AI-assistentie** bij ontwikkeling
- **Versnelling** van implementatieprocessen

</div>
</div>

---
layout: default
transition: slide-left
---

# Business-specifieke AI-toepassingen

<div class="grid grid-cols-2 gap-6">
<div>

## SAP S/4HANA

- **Predictive analytics** in financiële processen
- **Intelligente automatisering** van workflows
- **Anomaliedetectie** in transacties
- **Smart matching** van facturen en betalingen

</div>
<div>

## SAP Customer Experience

- **Gepersonaliseerde klantervaringen**
- **Voorspellende verkoopanalyses**
- **Sentiment-analyse** van klantfeedback
- **Intelligente product-aanbevelingen**

</div>
</div>



---
transition: fade-out
---

# What is Slidev?

Slidev is a slides maker and presenter designed for developers, consist of the following features

- 📝 **Text-based** - focus on the content with Markdown, and then style them later
- 🎨 **Themable** - themes can be shared and re-used as npm packages
- 🧑‍💻 **Developer Friendly** - code highlighting, live coding with autocompletion
- 🤹 **Interactive** - embed Vue components to enhance your expressions
- 🎥 **Recording** - built-in recording and camera view
- 📤 **Portable** - export to PDF, PPTX, PNGs, or even a hostable SPA
- 🛠 **Hackable** - virtually anything that's possible on a webpage is possible in Slidev
<br>
<br>

Read more about [Why Slidev?](https://sli.dev/guide/why)

---
transition: slide-up
level: 2
---

# Navigation

Hover on the bottom-left corner to see the navigation's controls panel, [learn more](https://sli.dev/guide/ui#navigation-bar)

## Keyboard Shortcuts

|                                                     |                             |
| --------------------------------------------------- | --------------------------- |
| <kbd>right</kbd> / <kbd>space</kbd>                 | next animation or slide     |
| <kbd>left</kbd>  / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd>                                       | previous slide              |
| <kbd>down</kbd>                                     | next slide                  |

<!-- https://sli.dev/guide/animations.html#click-animation -->
<img
  v-click
  class="absolute -bottom-9 -left-7 w-80 opacity-50"
  src="https://sli.dev/assets/arrow-bottom-left.svg"
  alt=""
/>
<p v-after class="absolute bottom-23 left-45 opacity-30 transform -rotate-10">Here!</p>


---
layout: image-right
image: https://cover.sli.dev
---

# Code

Use code snippets and get the highlighting directly, and even types hover!

```ts {all|5|7|7-8|10|all} twoslash
// TwoSlash enables TypeScript hover information
// and errors in markdown code blocks
// More at https://shiki.style/packages/twoslash

import { computed, ref } from 'vue'

const count = ref(0)
const doubled = computed(() => count.value * 2)

doubled.value = 2
```

<arrow v-click="[4, 5]" x1="350" y1="310" x2="195" y2="334" color="#953" width="2" arrowSize="1" />

<!-- This allow you to embed external code blocks -->
<<< @/snippets/external.ts#snippet

<!-- Footer -->

[Learn more](https://sli.dev/features/line-highlighting)

<!-- Inline style -->
<style>
.footnotes-sep {
  @apply mt-5 opacity-10;
}
.footnotes {
  @apply text-sm opacity-75;
}
.footnote-backref {
  display: none;
}
</style>

<!--
Notes can also sync with clicks

[click] This will be highlighted after the first click

[click] Highlighted with `count = ref(0)`

[click:3] Last click (skip two clicks)
-->

---
level: 2
---

# Shiki Magic Move

Powered by [shiki-magic-move](https://shiki-magic-move.netlify.app/), Slidev supports animations across multiple code snippets.

Add multiple code blocks and wrap them with <code>````md magic-move</code> (four backticks) to enable the magic move. For example:

````md magic-move {lines: true}
```ts {*|2|*}
// step 1
const author = reactive({
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
})
```

```ts {*|1-2|3-4|3-4,8}
// step 2
export default {
  data() {
    return {
      author: {
        name: 'John Doe',
        books: [
          'Vue 2 - Advanced Guide',
          'Vue 3 - Basic Guide',
          'Vue 4 - The Mystery'
        ]
      }
    }
  }
}
```

```ts
// step 3
export default {
  data: () => ({
    author: {
      name: 'John Doe',
      books: [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
      ]
    }
  })
}
```

Non-code blocks are ignored.

```vue
<!-- step 4 -->
<script setup>
const author = {
  name: 'John Doe',
  books: [
    'Vue 2 - Advanced Guide',
    'Vue 3 - Basic Guide',
    'Vue 4 - The Mystery'
  ]
}
</script>
```
````

---

# Components

<div grid="~ cols-2 gap-4">
<div>

You can use Vue components directly inside your slides.

We have provided a few built-in components like `<Tweet/>` and `<Youtube/>` that you can use directly. And adding your custom components is also super easy.

Check out [the guides](https://sli.dev/builtin/components.html) for more.

</div>
<div>

```html
<Tweet id="1390115482657726468" />
```

<Tweet id="1390115482657726468" scale="0.65" />

</div>
</div>

<!--
Presenter note with **bold**, *italic*, and ~~striked~~ text.

Also, HTML elements are valid:
<div class="flex w-full">
  <span style="flex-grow: 1;">Left content</span>
  <span>Right content</span>
</div>
-->

---
class: px-20
---

# Themes

Slidev comes with powerful theming support. Themes can provide styles, layouts, components, or even configurations for tools. Switching between themes by just **one edit** in your frontmatter:

<div grid="~ cols-2 gap-2" m="t-2">

```yaml
---
theme: default
---
```

```yaml
---
theme: seriph
---
```

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-default/01.png?raw=true" alt="">

<img border="rounded" src="https://github.com/slidevjs/themes/blob/main/screenshots/theme-seriph/01.png?raw=true" alt="">

</div>

Read more about [How to use a theme](https://sli.dev/guide/theme-addon#use-theme) and
check out the [Awesome Themes Gallery](https://sli.dev/resources/theme-gallery).

---

# Clicks Animations

You can add `v-click` to elements to add a click animation.

<div v-click>

This shows up when you click the slide:

```html
<div v-click>This shows up when you click the slide.</div>
```

</div>

<br>

<v-click>

The <span v-mark.red="3"><code>v-mark</code> directive</span>
also allows you to add
<span v-mark.circle.orange="4">inline marks</span>
, powered by [Rough Notation](https://roughnotation.com/):

```html
<span v-mark.underline.orange>inline markers</span>
```

</v-click>

<div mt-20 v-click>

[Learn more](https://sli.dev/guide/animations#click-animation)

</div>

---

# Motions

Motion animations are powered by [@vueuse/motion](https://motion.vueuse.org/), triggered by `v-motion` directive.

```html
<div
  v-motion
  :initial="{ x: -80 }"
  :enter="{ x: 0 }"
  :click-3="{ x: 80 }"
  :leave="{ x: 1000 }"
>
  Slidev
</div>
```

<div class="w-60 relative">
  <div class="relative w-40 h-40">
    <img
      v-motion
      :initial="{ x: 800, y: -100, scale: 1.5, rotate: -50 }"
      :enter="final"
      class="absolute inset-0"
      src="https://sli.dev/logo-square.png"
      alt=""
    />
    <img
      v-motion
      :initial="{ y: 500, x: -100, scale: 2 }"
      :enter="final"
      class="absolute inset-0"
      src="https://sli.dev/logo-circle.png"
      alt=""
    />
    <img
      v-motion
      :initial="{ x: 600, y: 400, scale: 2, rotate: 100 }"
      :enter="final"
      class="absolute inset-0"
      src="https://sli.dev/logo-triangle.png"
      alt=""
    />
  </div>

  <div
    class="text-5xl absolute top-14 left-40 text-[#2B90B6] -z-1"
    v-motion
    :initial="{ x: -80, opacity: 0}"
    :enter="{ x: 0, opacity: 1, transition: { delay: 2000, duration: 1000 } }">
    Slidev
  </div>
</div>

<!-- vue script setup scripts can be directly used in markdown, and will only affects current page -->
<script setup lang="ts">
const final = {
  x: 0,
  y: 0,
  rotate: 0,
  scale: 1,
  transition: {
    type: 'spring',
    damping: 10,
    stiffness: 20,
    mass: 2
  }
}
</script>

<div
  v-motion
  :initial="{ x:35, y: 30, opacity: 0}"
  :enter="{ y: 0, opacity: 1, transition: { delay: 3500 } }">

[Learn more](https://sli.dev/guide/animations.html#motion)

</div>

---

# LaTeX

LaTeX is supported out-of-box. Powered by [KaTeX](https://katex.org/).

<div h-3 />

Inline $\sqrt{3x-1}+(1+x)^2$

Block
$$ {1|3|all}
\begin{aligned}
\nabla \cdot \vec{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \vec{B} &= 0 \\
\nabla \times \vec{E} &= -\frac{\partial\vec{B}}{\partial t} \\
\nabla \times \vec{B} &= \mu_0\vec{J} + \mu_0\varepsilon_0\frac{\partial\vec{E}}{\partial t}
\end{aligned}
$$

[Learn more](https://sli.dev/features/latex)

---

# Diagrams

You can create diagrams / graphs from textual descriptions, directly in your Markdown.

<div class="grid grid-cols-4 gap-5 pt-4 -mb-6">

```mermaid {scale: 0.5, alt: 'A simple sequence diagram'}
sequenceDiagram
    Alice->John: Hello John, how are you?
    Note over Alice,John: A typical interaction
```

```mermaid {theme: 'neutral', scale: 0.8}
graph TD
B[Text] --> C{Decision}
C -->|One| D[Result 1]
C -->|Two| E[Result 2]
```

```mermaid
mindmap
  root((mindmap))
    Origins
      Long history
      ::icon(fa fa-book)
      Popularisation
        British popular psychology author Tony Buzan
    Research
      On effectiveness<br/>and features
      On Automatic creation
        Uses
            Creative techniques
            Strategic planning
            Argument mapping
    Tools
      Pen and paper
      Mermaid
```

```plantuml {scale: 0.7}
@startuml

package "Some Group" {
  HTTP - [First Component]
  [Another Component]
}

node "Other Groups" {
  FTP - [Second Component]
  [First Component] --> FTP
}

cloud {
  [Example 1]
}

database "MySql" {
  folder "This is my folder" {
    [Folder 3]
  }
  frame "Foo" {
    [Frame 4]
  }
}

[Another Component] --> [Example 1]
[Example 1] --> [Folder 3]
[Folder 3] --> [Frame 4]

@enduml
```

</div>

Learn more: [Mermaid Diagrams](https://sli.dev/features/mermaid) and [PlantUML Diagrams](https://sli.dev/features/plantuml)

---
foo: bar
dragPos:
  square: 657,37,167,_,-16
---

# Draggable Elements

Double-click on the draggable elements to edit their positions.

<br>

###### Directive Usage

```md
<img v-drag="'square'" src="https://sli.dev/logo.png">
```

<br>

###### Component Usage

```md
<v-drag text-3xl>
  <div class="i-carbon:arrow-up" />
  Use the `v-drag` component to have a draggable container!
</v-drag>
```

<v-drag pos="300,332,261,_,-15">
  <div text-center text-3xl border border-main rounded>
    Double-click me!
  </div>
</v-drag>

<img v-drag="'square'" src="https://sli.dev/logo.png">

###### Draggable Arrow

```md
<v-drag-arrow two-way />
```

<v-drag-arrow pos="450,176,253,46" two-way op70 />

---
src: ./pages/imported-slides.md
hide: false
---

---

# Monaco Editor

Slidev provides built-in Monaco Editor support.

Add `{monaco}` to the code block to turn it into an editor:

```ts {monaco}
import { ref } from 'vue'
import { emptyArray } from './external'

const arr = ref(emptyArray(10))
```

Use `{monaco-run}` to create an editor that can execute the code directly in the slide:

```ts {monaco-run}
import { version } from 'vue'
import { emptyArray, sayHello } from './external'

sayHello()
console.log(`vue ${version}`)
console.log(emptyArray<number>(10).reduce(fib => [...fib, fib.at(-1)! + fib.at(-2)!], [1, 1]))
```

---
layout: center
class: text-center
---

# Learn More

[Documentation](https://sli.dev) · [GitHub](https://github.com/slidevjs/slidev) · [Showcases](https://sli.dev/resources/showcases)

<PoweredBySlidev mt-10 />