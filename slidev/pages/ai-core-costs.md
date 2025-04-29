---
layout: default
transition: slide-left
---

# SAP AI Core: Capacity Units

<div class="flex flex-col justify-center">
  <p class="mb-4">SAP AI Core werkt met een Capacity Unit (CU) model voor kostenberekening en resourcetoewijzing.</p>
</div>

<div class="grid grid-cols-1 gap-6">
<div>

## Kostencomponenten: Instances

- Computationele kracht voor model training en inferentie
- Berekend per Node Hours per Month
- Kosten variëren op basis van CPU/GPU configuratie

</div>
</div>

---
layout: default
transition: slide-left
hideInToc: true
---

# SAP AI Core: Storage Costs

<div class="grid grid-cols-1 gap-6">
<div>

## Storage

- Standard SSD Volumes voor data en modelopslag
- Berekend als **0.0003 CU / GB / Hour**
- Belangrijk voor:
  - Trainingsdata
  - Model artifacts
  - Resultaten en logs

</div>
</div>

---
layout: default
transition: slide-left
hideInToc: true
---

# SAP AI Core: Baseline kosten

<div class="grid grid-cols-1 gap-6">
<div>

## Vaste clusterresources

- **1.2241 CU / Hour** voor basisinfrastructuur
- Onafhankelijk van workload en gebruik
- Benodigd voor orchestratie en beheer
- Wordt gedeeld over alle workloads in het cluster

</div>
</div>

---
layout: default
transition: slide-left
hideInToc: true
---

# SAP AI Core: Kostenoptimalisatie

<div class="grid grid-cols-1 gap-6">
<div>

## Strategieën voor optimaal gebruik

- Schaalbaarheid op basis van projectbehoeften
- Training versus inferentie resources
- Levenscyclusbeheer voor ongebruikte resources
- Gedeelde resources binnen subaccounts
- Batch processing voor efficiënt gebruik

</div>
</div>