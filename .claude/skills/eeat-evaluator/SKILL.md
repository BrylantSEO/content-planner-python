---
name: eeat-evaluator
description: >
  Ocenia 4 wymiary E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness),
  każdy 0-10. Identyfikuje obecne i brakujące sygnały z konkretnymi sugestiami wzmocnienia.
  Zupełnie nowy wymiar audytu — nie pokrywany przez inne skille.
  Użyj podając tekst artykułu (i opcjonalnie URL/kontekst strony).
  Triggery: oceń E-E-A-T, experience expertise authority trust, sygnały EEAT,
  wiarygodność treści, bio autora, cytowania źródeł, quality raters.
---

# E-E-A-T Evaluator

Oceń 4 wymiary E-E-A-T z konkretnymi sygnałami i sugestiami wzmocnienia.

## Experience (0-10)

Dowody bezpośredniego doświadczenia:

| Sygnał | Waga |
|--------|------|
| Personal story ("W mojej praktyce...") | +3 |
| Case study ("Pacjent X z objawami Y...") | +3 |
| Zdjęcia/screenshoty (odwołania do mediów) | +2 |
| Firsthand testing ("Przetestowałem 5 metod...") | +2 |

## Expertise (0-10)

Dowody wiedzy eksperckiej:

| Sygnał | Waga |
|--------|------|
| Cytaty z badań ("Według badań Mayo Clinic...") | +3 |
| Dane liczbowe ze źródłem ("67%, Smith 2023") | +2 |
| Terminologia branżowa | +2 |
| Wyjaśnienia mechanizmów ("CE aktywuje receptor GR, który...") | +2 |
| Bibliografia / lista źródeł | +1 |

## Authority (0-10)

Sygnały autorytetu:

| Sygnał | Waga |
|--------|------|
| Bio autora z kwalifikacjami | +3 |
| Afiliacja instytucjonalna | +2 |
| Publikacje autora | +2 |
| Cytowania zewnętrzne | +2 |
| Nagrody/wyróżnienia | +1 |

## Trust (0-10)

Sygnały zaufania:

| Sygnał | Waga |
|--------|------|
| Disclaimer ("Artykuł nie zastępuje porady lekarza") | +2 |
| Data aktualizacji | +2 |
| Kontakt do autora (email, profil) | +2 |
| Polityka redakcyjna / proces weryfikacji | +2 |
| Czysta strona (HTTPS, brak reklam inwazyjnych) | +2 |

## Format odpowiedzi

```markdown
# E-E-A-T Evaluation: [tytuł]

## Podsumowanie

| Wymiar | Score | Obecne sygnały | Brakujące |
|--------|-------|---------------|-----------|
| Experience | X/10 | [lista] | [lista] |
| Expertise | X/10 | [lista] | [lista] |
| Authority | X/10 | [lista] | [lista] |
| Trust | X/10 | [lista] | [lista] |

**E-E-A-T Average: X/10**

## Sugestie wzmocnienia

### Experience
[Konkretna sugestia co dodać, np. "Dodaj case study: ścieżkę diagnostyczną pacjenta"]

### Expertise
[np. "Dodaj 3 cytowania badań z PubMed"]

### Authority
[np. "Dodaj bio: Dr [imię], [specjalizacja], [afiliacja]"]

### Trust
[np. "Dodaj disclaimer medyczny + datę aktualizacji"]
```
