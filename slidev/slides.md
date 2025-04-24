---
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
author: Stijn Mertens
info: |
  ## Artificiële Intelligentie
  Artificiële Intelligentie binnen SAP
drawings:
  persist: false
transition: slide-left
title: Artificiële Intelligentie binnen SAP
mdc: true
layout: cover
---

<style>
img {
  display: block;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
}

.slidev-page-number {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 0.8em;
  opacity: 0.6;
  z-index: 10;
}

.presentation-title {
  color: #ffffff;
  font-weight: bold;
}
</style>

<PageNumber />

# <CENTER>![Expertum Logo](/theme-expertum/Expertum_Logo_white_rgb.png)</CENTER>

<div class="presentation-title">
  Artificiële Intelligentie binnen SAP
</div>

---
hideInToc: true
---

# Table of contents

<Toc maxDepth="1"></Toc>

---
src: ./pages/intro.md
layout: default
---

---

# Navigation

Hover on the bottom-left corner to see the navigation's controls panel, [learn more](https://sli.dev/guide/navigation.html)

### Keyboard Shortcuts

|                                                    |                             |
| -------------------------------------------------- | --------------------------- |
| <kbd>right</kbd> / <kbd>space</kbd>                | next animation or slide     |
| <kbd>left</kbd> / <kbd>shift</kbd><kbd>space</kbd> | previous animation or slide |
| <kbd>up</kbd>                                      | previous slide              |
| <kbd>down</kbd>                                    | next slide                  |

<!-- https://sli.dev/guide/animations.html#click-animations -->

<img
  v-click
  class="absolute -bottom-9 -left-7 w-80 opacity-50"
  src="https://sli.dev/assets/arrow-bottom-left.svg"
/>

<p v-after class="absolute bottom-23 left-45 opacity-30 transform -rotate-10">Here!</p>

---

layout: image-right
image: https://source.unsplash.com/collection/94734566/1920x1080

---

# Code

Use code snippets and get the highlighting directly![^1]

```ts {all|2|1-6|9|all}
interface User {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
}

function updateUser(id: number, update: User) {
  const user = getUser(id);
  const newUser = { ...user, ...update };
  saveUser(id, newUser);
}
```

<arrow v-click="[3, 4]" x1="400" y1="420" x2="230" y2="330" color="#564" width="3" arrowSize="1" />

[^1]: [Learn More](https://sli.dev/guide/syntax.html#line-highlighting)

<style>
.footnotes-sep {
  @apply mt-20 opacity-10;
}
.footnotes {
  @apply text-sm opacity-75;
}
.footnote-backref {
  display: none;
}
</style>
