# Domain Concepts — Semantic SEO

Słownik kluczowych pojęć używanych w Semantic-OS.

---

## Fundamentalne pojęcia

| Pojęcie | Definicja |
|---------|-----------|
| **CE** (Central Entity) | Główna encja serwisu/biznesu — punkt odniesienia dla wszystkich treści |
| **SC** (Source Context) | Kontekst źródłowy — nisza i specjalizacja serwisu |
| **CSI** (Central Search Intent) | Główna intencja = CE + SC; core query, który serwis musi obsłużyć |
| **EAV** (Entity-Attribute-Value) | Trójki faktyczne: (encja, atrybut, wartość) — fundamentalny model danych KG |
| **URR** (Unique / Root / Rare) | Klasyfikacja atrybutów: UNIQUE (wyróżniki) > ROOT (niezbędne) > RARE (opcjonalne) |

## Content Quality

| Pojęcie | Definicja |
|---------|-----------|
| **BLUF** (Bottom Line Up Front) | Format: odpowiedź na górze, kontekst po — zoptymalizowany pod cytowanie przez AI |
| **Information Density** | Stosunek faktów do "puchu" (ogólniki, słowa modalne) — wyższy = lepszy |
| **CoR** (Cost of Retrieval) | Koszt obliczeniowy ekstrakcji wartości z strony przez wyszukiwarki / AI |
| **TF-IDF** | Identyfikacja terminów specjalistycznych (wysokie IDF) vs generycznych (niskie IDF) |
| **CQS** (Content Quality Score) | Zagregowany wynik 0–100 z 4 wymiarów: CoR + Density + SRL + TF-IDF |

## AI Search

| Pojęcie | Definicja |
|---------|-----------|
| **Query Fanout** | Mechanizm AI Search: dekompozycja pytania na 5–10 sub-queries do indeksu |
| **Chunk** | Autonomiczny fragment treści zdolny odpowiedzieć na sub-query bez kontekstu |
| **Semantic Roles** | Role w zdaniu: Agent, Predicate, Patient, Beneficiary, Instrument, Location |
| **Salience** | Prominencja encji w tekście — jak "centralnie" jest ona traktowana |
| **Frame Semantics** | Rama pojęciowa tematu mapująca elementy na potencjalne sub-queries |

## Klasteryzacja

| Pojęcie | Definicja |
|---------|-----------|
| **Topical Map** | Mapa tematyczna: CORE (blisko CE) + OUTER (peryferyjne) klastry |
| **SERP Coherence** | Spójność klastra: czy keywords w klastrze mają podobne top wyniki Google |
| **SERP Overlap** | Nakładanie się wyników między klastrami — sygnał do merge |
| **Content Gap** | Temat pokrywany przez konkurencję, nieobecny w klastrach (COVERED/GAP/UNIQUE) |
