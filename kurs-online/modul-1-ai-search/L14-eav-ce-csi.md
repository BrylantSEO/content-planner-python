# L14 — EAV, CE, CSI — fundamenty semantyczne

**Moduł:** 1 — Jak działa AI Search
**Czas:** ~35 min
**Format:** Teoria + hands-on z `/csi-definition-helper`

---

## Cel lekcji

Definiujesz CE, SC i CSI dla własnego projektu. Klasyfikujesz atrybuty przez URR. Rozumiesz jak te fundamenty wpływają na każdy pipeline.

---

## Entity-Attribute-Value (EAV)

**EAV** = model danych Knowledge Graph. Każdy fakt to trójka:

```
(Encja, Atrybut, Wartość)
```

**Przykłady:**

| Encja | Atrybut | Wartość |
|-------|---------|---------|
| Double Digital | typ | agencja performance marketingu |
| Double Digital | lokalizacja | Polska, 25+ krajów |
| Double Digital | ROAS | 1066% (rekordowy wynik) |
| Double Digital | usługi | Google Ads, Meta Ads, SEO AI, GA4 |
| Double Digital | certyfikat | Google Partner |

**Dlaczego to ważne:** Google buduje Knowledge Graph z takich trójek. Im więcej kompletnych, potwierdzonych trójek o Twojej encji — tym silniejszy autorytet tematyczny.

**W praktyce:** Każdy artykuł powinien dodawać nowe atrybuty do Knowledge Graph Twojej CE lub potwierdzać istniejące.

---

## Central Entity (CE)

**CE** = jeden podmiot wokół którego budujesz cały autorytet tematyczny.

Zasada: **jeden serwis = jedna CE**.

| Typ projektu | CE |
|-------------|-----|
| Sklep internetowy | SportowySklep.pl — sklep z odzieżą sportową |
| Agencja | Double Digital — agencja performance marketingu |
| SaaS | InvoiceFlow — oprogramowanie do fakturowania |
| Lokalny biznes | Stomatologia Uśmiech — gabinet w Krakowie |
| Blog eksperta | Jan Kowalski — ekspert Google Ads |

**Błąd:** Definiowanie CE zbyt ogólnie ("e-commerce" zamiast "sklep z odzieżą sportową") lub zbyt wąsko ("sklep z bluzami z kapturem z bawełny ekologicznej 350g").

---

## Source Context (SC)

**SC** = nisza + specjalizacja = "dla kogo i w czym".

**Wzór:** `SC = [typ podmiotu] + [specjalizacja] + [rynek/kraj]`

**Przykłady:**

| CE | SC |
|----|-----|
| Double Digital | Agencja performance marketingu dla e-commerce i leadgen B2B w Polsce |
| SportowySklep.pl | E-commerce z odzieżą i obuwiem sportowym dla aktywnych Polaków 25-45 |
| InvoiceFlow | SaaS do automatycznego fakturowania dla MŚP w Polsce i UE |
| Stomatologia Uśmiech | Prywatny gabinet stomatologiczny w centrum Krakowa — specjalizacja estetyczna |

---

## Central Search Intent (CSI)

**CSI** = jedno zdanie opisujące idealnego użytkownika i co chce znaleźć.

**Wzór:** `CSI = [persona] szukający [czego] z naciskiem na [korzyść] zamiast [bólu/alternatywy]`

**Dobry CSI (Double Digital):**
> Właściciele e-commerce i marketerzy B2B szukający agencji digital marketingu,
> która dostarcza mierzalne wyniki (ROAS, wzrost sprzedaży) poprzez performance
> marketing oparty na danych — zamiast ogólnych usług bez gwarancji efektów.

**Zły CSI (zbyt ogólny):**
> Firmy szukające dobrej agencji marketingowej.

Różnica: dobry CSI zawiera **persona** ("właściciele e-commerce"), **konkrety** ("ROAS, wzrost sprzedaży") i **kontrast** ("zamiast ogólnych usług").

---

## URR — Unique / Root / Rare

**URR** = klasyfikacja atrybutów encji według ważności dla contentu.

| Klasa | Definicja | Priorytet | Miejsce w artykule |
|-------|-----------|-----------|-------------------|
| **UNIQUE** | Wyróżniki — czego nie ma konkurencja | Najwyższy | H2, pierwsze sekcje, title |
| **ROOT** | Fundamenty — co musi być, bo inaczej temat niekompletny | Wysoki | H2, H3 |
| **RARE** | Opcjonalne — detale dla zaawansowanych | Niski | H3, sidebar, FAQ |

**Przykład — artykuł "jak wybrać agencję SEO":**

| Atrybut | Klasa URR | Uzasadnienie |
|---------|-----------|-------------|
| Google Partner status | UNIQUE | Nie każda agencja go ma — wyróżnik |
| ROAS z case studies | UNIQUE | Konkretne liczby = wyróżnik |
| Modele rozliczeń | ROOT | Każdy artykuł o agencjach to musi mieć |
| Certyfikaty Google Ads | ROOT | Podstawowa kwalifikacja |
| Historia firmy | RARE | Mało istotne przy wyborze |
| Liczba pracowników | RARE | Opcjonalne |

**Zasada:** UNIQUE idą do H2 i title. ROOT do H2/H3. RARE tylko jeśli jest miejsce.

---

## Hands-on: `/csi-definition-helper`

W Claude Code:

```
> /csi-definition-helper
```

Skill poprowadzi Cię przez pytania:
1. Jak się nazywa Twoja firma/serwis?
2. Co dokładnie sprzedajesz/oferujesz?
3. Komu? Opisz idealnego klienta.
4. Jaki jest jego główny ból / problem?
5. Co osiąga po skorzystaniu z Twojej oferty?

Na końcu otrzymasz gotowy CE, SC i CSI do wklejenia do CLAUDE.md.

---

## Jak CE, SC, CSI wpływają na pipeline'y

**Content Planning Pipeline:**
- Temat artykułu jest oceniany pod kątem CSI — czy pasuje do głównej intencji serwisu?
- EAV z researchu konkurencji jest klasyfikowany przez URR
- H2 są tworzone na podstawie UNIQUE → ROOT → RARE

**Content Audit Pipeline:**
- CSI Alignment Score — czy artykuł odpowiada na CSI serwisu?
- SRL Salience — czy CE jest "bohaterem" zdań (Agent), czy jest "w tle" (Patient)?

**Keyword Clustering Pipeline:**
- CORE klastry = bezpośrednio związane z CE i SC
- OUTER klastry = peryferyjne, dla długiego ogona

---

## Ćwiczenie

1. Otwórz szablon `kurs-online/materialy/templates/CLAUDE-agencja.md`
2. Uzupełnij CE, SC i CSI dla swojego projektu (lub użyj Double Digital jako przykładu)
3. W Claude Code uruchom `/csi-definition-helper` i porównaj wynik z tym co wpisałeś ręcznie
4. Wybierz 5 atrybutów swojej CE i sklasyfikuj je na UNIQUE / ROOT / RARE

---

**Następna lekcja:** L20 — Dlaczego zamieniamy wszystko na Markdown
