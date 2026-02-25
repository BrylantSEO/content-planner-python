# L52 — Plan 90 dni — systematyczne wdrożenie

**Moduł:** 5 — Wdrożenie i systematyzacja
**Czas:** ~25 min
**Format:** Szablon planu + KPI

---

## Cel lekcji

Masz konkretny plan 90 dni dla własnego projektu z KPI do mierzenia postępów.

---

## Plan 90 dni — szablon

### Tydzień 1–2: Quick wins

**Cel:** Pierwsze wyniki, walidacja środowiska.

| Zadanie | Narzędzie | Output |
|---------|----------|--------|
| Audyt 3 najważniejszych artykułów | `/content-auditor-pipeline` | 3 raporty audit.md z CQS |
| Zidentyfikuj 3 zmiany KRYTYCZNE | Czytaj reports | Lista zmian do wdrożenia |
| Wdróż BLUF w tych artykułach | Edytuj ręcznie / z AFTER | Zaktualizowane artykuły |
| Wgraj 10 artykułów do Supabase | `upload_to_supabase.py` | Baza wiedzy gotowa |

**KPI tygodnia 1–2:**
- CQS przed → po dla 3 artykułów (cel: wzrost min. 15 punktów)
- Liczba artykułów w Supabase: 10+

---

### Miesiąc 1: Pierwsze briefa

**Cel:** Nowe artykuły pisane według procesu.

| Zadanie | Narzędzie | Output |
|---------|----------|--------|
| Klasteryzacja słów kluczowych | `/keyword-clustering-pipeline` | topical_map.md |
| Wybierz 2 P1 gaps | topical_map + content_gaps | Lista tematów |
| Stwórz 2 briefy | `/content-planner` | 2 × brief.md |
| Przekaż briefy copywriterowi | Email / Notion | — |
| Opublikuj artykuły | CMS | 2 nowe artykuły online |

**KPI miesiąca 1:**
- Topical map stworzona (CORE + OUTER z priorytetami)
- 2 artykuły P1 opublikowane z briefami
- CQS nowych artykułów > 60

---

### Miesiąc 2: Systematyzacja

**Cel:** Pipeline działa regularnie, nie tylko "od projektu do projektu".

| Zadanie | Narzędzie | Output |
|---------|----------|--------|
| Audyt 5 kolejnych artykułów | `/content-auditor-pipeline` | 5 raportów |
| Wdrożenie zmian z audytów | Edycja artykułów | 5 zaktualizowanych artykułów |
| 2 kolejne briefy + artykuły | `/content-planner` | 2 artykuły online |
| Aktualizacja Supabase (nowe artykuły) | `upload_to_supabase.py` | 25+ artykułów w bazie |
| Review topical map | — | Zaktualizowane priorytety |

**KPI miesiąca 2:**
- 25+ artykułów w Supabase
- 4 artykuły online z briefami (suma narastająca)
- Senuto: widoczność (pomiar) przed → po

---

### Miesiąc 3: Wzrost

**Cel:** Pierwsze mierzalne wyniki SEO.

| Zadanie | Narzędzie | Output |
|---------|----------|--------|
| Uzupełnianie P2 gaps | `/content-planner` | Kolejne briefy |
| Głęboki audyt 10 artykułów | `/content-auditor-pipeline` | Ranking artykułów po CQS |
| Priorytetyzacja na Q2 | topical_map + gaps | Plan na kolejny kwartał |
| Raport wyników | Senuto + GA4 | Porównanie widoczności |

**KPI miesiąca 3:**
- Senuto: wzrost widoczności (cel: +15%)
- Google: porównanie pozycji (frazy monitorowane w Senuto RT)
- CQS: średnia wszystkich audytowanych artykułów

---

## KPI do mierzenia

| KPI | Jak mierzyć | Cel 90 dni |
|----|------------|-----------|
| CQS (Content Quality Score) | audit-report-generator | Średnia 60+ |
| Widoczność Senuto | Senuto Dashboard | +10–20% |
| Artykuły z CQS > 60 | Lista audytów | 8+ artykułów |
| Artykuły online z briefami | Licznik | 6+ nowych |
| Supabase — liczba rekordów | SQL COUNT | 25+ artykułów |
| AI Citations | Google AI Overview | 2+ cytowania |

---

## Arkusz planowania (szablon)

Utwórz w Notion / Google Sheets:

```
| Artykuł | CQS przed | Zmiany KRYTYCZNE | CQS po | Data pub. | Pozycja |
|---------|----------|-----------------|--------|-----------|---------|
| artykul-1 | 35 | BLUF, liczby | 62 | 2025-03-01 | 8 |
| artykul-2 | 48 | CoR, EEAT | 71 | 2025-03-15 | 5 |
| ...
```

---

**Następna lekcja:** L53 — Najczęstsze problemy i jak je debugować
