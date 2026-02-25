# Słownik pojęć — Semantic-OS

> Drukuj A5, 1 per uczestnik.

---

## Fundamenty semantyczne

**CE (Central Entity)**
Główna encja serwisu — punkt odniesienia dla wszystkich treści. Jedno pojęcie lub podmiot, wokół którego budujesz autorytet tematyczny.

**SC (Source Context)**
Kontekst źródłowy — nisza i specjalizacja. Odpowiada na pytanie: "dla kogo piszesz i w jakiej dziedzinie jesteś ekspertem?"

**CSI (Central Search Intent)**
Główna intencja = CE + SC. Core query który serwis musi obsłużyć. Jedno zdanie opisujące co szuka idealny czytelnik.

**EAV (Entity-Attribute-Value)**
Trójki faktyczne: _(encja, atrybut, wartość)_. Przykład: _(Google Ads, ROAS, 300–500%)_. Fundamentalny model danych w knowledge graphs.

**URR (Unique / Root / Rare)**
Klasyfikacja atrybutów: UNIQUE = wyróżniki (tylko ty to masz) → ROOT = niezbędne (każdy musi mieć) → RARE = opcjonalne (dodatkowa wartość).

---

## Content Quality

**BLUF (Bottom Line Up Front)**
Odpowiedź najpierw, uzasadnienie potem. Wzorzec wojskowych briefingów. Zły: "Google Ads jest ważne...". Dobry: "Google Ads daje ROAS 300–500%. Aby to osiągnąć..."

**CoR (Cost of Retrieval)**
Koszt obliczeniowy ekstrakcji informacji przez AI. Niski CoR = AI może zacytować bez interpretacji. "ROAS wzrósł o 340%" = niski CoR. "Wyniki były świetne" = CoR nieskończony.

**Information Density**
Stosunek faktów do "puchu" (ogólniki, słowa modalne, puste przymiotniki). Wyższy = lepszy. Puch: "znaczny wzrost", "lepsza jakość", "warto rozważyć".

**TF-IDF**
Miara specjalistyczności terminów. Wysokie IDF = terminy niszowe/specjalistyczne (dobrze). Niskie IDF = terminy ogólne jak "wyniki", "praca", "czas" (zastąp specjalistycznymi).

**CQS (Content Quality Score)**
Zagregowany wynik 0–100 z 4 wymiarów: CoR + Density + SRL Salience + TF-IDF Quality. <40 = pilne zmiany. 40–60 = poniżej średniej. 60–80 = dobry. >80 = gotowy pod AI citability.

---

## AI Search

**Query Fanout**
Mechanizm AI Search: dekompozycja jednego pytania na 5–10 sub-queries wysyłanych do indeksu. Twój artykuł musi odpowiadać na każde sub-query osobno.

**Chunk**
Autonomiczny fragment treści zdolny odpowiedzieć na sub-query bez kontekstu całego artykułu. Każdy H2 powinien być autonomicznym chunkiem.

**Salience**
Prominencja encji w tekście — jak "centralnie" jest traktowana. Twoja CE powinna być Agentem (kto robi), nie Patientem (co jest robione).

**RAG (Retrieval-Augmented Generation)**
Mechanizm AI który pobiera fragmenty z indeksu i na ich podstawie generuje odpowiedź. Twój artykuł = jedno z możliwych źródeł cytowania.

---

## Klasteryzacja

**Topical Map**
Mapa tematyczna: CORE (klastry blisko CE — pillar pages) + OUTER (klastry peryferyjne — supporting pages).

**Silhouette Score**
Miara jakości klasteryzacji 0–1. >0.15 = klasteryzacja ma sens. <0.1 = keywords zbyt podobne lub zbyt różne — dostosuj parametry.

**Content Gap**
Temat pokrywany przez konkurencję, nieobecny w klastrach. Priorytety: P1 = pisz natychmiast, P4 = opcjonalne.

**SERP Coherence**
Spójność klastra — czy keywords w jednym klastrze mają podobne top wyniki Google. Niska coherence = klaster do podziału.
