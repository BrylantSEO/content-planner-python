# L48 — Customizacja skills i tworzenie własnych

**Moduł:** 4 — Trzy pipeline'y: teoria i praktyka
**Czas:** ~40 min
**Format:** Demo modyfikacji + tworzenie nowego skilla

---

## Cel lekcji

Modyfikujesz istniejący skill dopasowując go do własnej branży. Tworzysz nowy skill przez `/skill-creator`.

---

## Anatomia pliku SKILL.md

Każdy skill to plik SKILL.md w `.claude/skills/<nazwa>/`. Przykład struktury:

```markdown
# bluf-generator

## Trigger Keywords
- przepisz na BLUF
- zoptymalizuj pod AI
- odpowiedź na górze
- zagęść tekst

## Description
Przekształca tekst na format BLUF (Bottom Line Up Front)...

## Input
Tekst do przepisania (akapity, sekcje H2, lub cały artykuł)

## Processing
1. Zidentyfikuj główną tezę/odpowiedź
2. Umieść ją w zdaniu 1–2
3. Przenieś uzasadnienie za odpowiedź
4. Zamień ogólniki na konkretne liczby gdzie możliwe
5. Sprawdź: czy zdanie 1 może być zacytowane bez reszty?

## Output
Przepisane zdania z BLUF. Format:
BEFORE: [oryginalne zdania]
AFTER: [przepisane zdania]

## Examples
...
```

---

## Modyfikacja: bluf-generator pod branżę medyczną

Przykładowe dostosowanie skilla do treści medycznych:

```bash
# Skopiuj skill i zmodyfikuj
cp -r .claude/skills/bluf-generator .claude/skills/bluf-generator-medyczny
```

Edytuj `.claude/skills/bluf-generator-medyczny/SKILL.md`:

**Zmień trigger keywords:**
```markdown
## Trigger Keywords
- bluf medyczny
- przepisz po medycznemu
- zoptymalizuj artykuł zdrowotny
- odpowiedź medyczna na górze
```

**Dodaj sekcję Processing dla specyfiki medycznej:**
```markdown
## Processing
1. Zidentyfikuj główną odpowiedź medyczną (diagnoza, leczenie, rokowanie)
2. Umieść w zdaniu 1: "[Schorzenie] powoduje [objawy]. Leczenie to [interwencja]."
3. UWAGA: Nie używaj zbyt kategorycznych stwierdzeń — dodaj "w większości przypadków"
4. Zawsze dodaj: "Skonsultuj z lekarzem przed..."
5. Terminologia: używaj zarówno terminów łacińskich jak i potocznych
6. Cytuj badania gdy dostępne: "(WHO 2024)", "(Cochrane Review)"
```

---

## Tworzenie nowego skilla: local-seo-checker

Demo przez `/skill-creator`:

```
> /skill-creator
```

Claude poprowadzi przez pytania:

```
Jak ma się nazywać nowy skill?
> local-seo-checker

Co ma robić? (jednozdaniowy opis)
> Sprawdza czy artykuł/strona ma podstawowe sygnały lokalnego SEO

Jakie input przyjmuje?
> Tekst artykułu lub URL strony + lokalizacja (miasto)

Co ma zwracać?
> Checklist 10 elementów z ocenami OK/BRAKUJE/DO POPRAWY i konkretnymi sugestiami

Jakie są trigger keywords?
> sprawdź lokalne SEO, local seo check, sygnały lokalności, seo lokalne
```

Claude generuje `SKILL.md`:

```markdown
# local-seo-checker

## Trigger Keywords
- sprawdź lokalne SEO
- local seo check
- sygnały lokalności
- seo lokalne
- lokalne seo audyt

## Description
Sprawdza czy treść zawiera podstawowe sygnały lokalnego SEO dla wskazanej lokalizacji.

## Input
Tekst artykułu / URL strony + lokalizacja (miasto lub dzielnica)

## Processing
1. Sprawdź H1: czy zawiera słowo kluczowe + miasto?
2. Sprawdź META title: miasto + usługa?
3. Sprawdź NAP (Nazwa, Adres, Telefon): czy są, czy są identyczne jak GMF?
4. Sprawdź wzmianki lokalne: dzielnice, zabytki, okolice
5. Sprawdź Schema LocalBusiness markup (jeśli URL)
6. Sprawdź Google Moja Firma link / osadzenie mapy
7. Sprawdź Reviews / opinie: liczba i aktualność
8. Sprawdź "near me" warianty fraz
9. Sprawdź content sezonowy: eventy lokalne
10. Sprawdź linki do stron lokalnych (urząd, portal lokalny)

## Output
Tabela:
| Element | Status | Rekomendacja |
|---------|--------|-------------|
| H1 z miastem | OK/BRAKUJE | [konkret] |
...

## Examples
User: sprawdź lokalne SEO [wklej tekst + lokalizacja: Kraków]
Assistant: [tabela z 10 elementami]
```

---

## Kiedy tworzyć nowy skill vs modyfikować istniejący

| Sytuacja | Akcja |
|---------|-------|
| Chcesz inny trigger keyword | Edytuj sekcję `## Trigger Keywords` w istniejącym |
| Chcesz inny format output | Edytuj sekcję `## Output` |
| Chcesz dodać branżowy kontekst | Dodaj do `## Processing` kroce specyficzne dla branży |
| Kompletnie nowe zadanie | Stwórz nowy skill przez `/skill-creator` |
| Skill działa ale chcesz zapamiętać wariant | Skopiuj do nowego katalogu + zmień trigger |

---

## Ćwiczenie: modyfikuj bluf-generator

1. Otwórz `.claude/skills/bluf-generator/SKILL.md`
2. Dodaj trigger keyword specyficzny dla Twojej branży (np. "bluf dla e-commerce", "bluf dla SaaS")
3. Dodaj do sekcji Processing 2–3 kroków specyficznych dla Twojej branży
4. Zapisz i przetestuj: wpisz nowy trigger keyword w Claude Code i wklej tekst

---

**Następna lekcja:** L50 — Claude Code jako centrum operacyjne
