# Semantic-OS

Kolekcja skilli Claude AI do semantycznego SEO i optymalizacji pod AI Search (RAG, ChatGPT, Perplexity, Google AI Overviews).

## Skille

### Analiza semantyczna
| Skill | Opis |
|-------|------|
| `csi-definition-helper` | Definiuje Central Entity, Source Context i Central Search Intent |
| `eav-extractor` | Ekstrahuje strukturę Entity-Attribute-Value z tekstu |
| `attribute-classifier` | Klasyfikuje atrybuty encji na Unique, Root i Rare |
| `semantic-role-labels-parser` | Analizuje role semantyczne: Agent, Predicate, Patient, Beneficiary |
| `frame-semantics` | Generuje ramki semantyczne z mapowaniem na sub-queries |

### Optymalizacja contentu
| Skill | Opis |
|-------|------|
| `bluf-generator` | Konwertuje tekst na format BLUF (Bottom Line Up Front) |
| `chunk-optimizer` | Optymalizuje strukturę artykułu pod systemy RAG |
| `cost-of-retrieval-optimizer` | Redukuje koszt przetwarzania strony przez wyszukiwarki |
| `information-density-checker` | Audytuje stosunek faktów do "puchu" |
| `tfidf-analyzer` | Identyfikuje terminologię specjalistyczną vs generyczną |
| `content-auditor` | Kompleksowy audyt contentu przez pryzmat 8 kryteriów |

### Zrozumienie zapytań
| Skill | Opis |
|-------|------|
| `query-expansion` | Rozszerza keyword na powiązane frazy i warianty |
| `query-fanout` | Symuluje dekompozycję zapytań przez AI Search |
| `lexical-expander` | Generuje drzewo relacji leksykalnych (synonimy, hiponimy, antonimy) |

### Narzędzia deweloperskie
| Skill | Opis |
|-------|------|
| `skill-creator` | Tworzy nowe skille Claude - szablony, walidacja, pakowanie |

## Użycie

Skille działają w Claude Code. Wywołaj je przez slash command:

```
/query-expansion "kredyt hipoteczny"
/bluf-generator [wklej tekst do optymalizacji]
/content-auditor [wklej artykuł w markdown]
```

## Struktura repozytorium

```
├── .claude/skills/      # Definicje skilli Claude
├── audyt/               # Dokumentacja procesu audytu AI Search
├── ai-semantic-seo-full.md  # Materiały kursowe
└── CLAUDE.md            # Instrukcje dla Claude Code
```

## Kluczowe koncepcje

- **Entity-Attribute-Value (EAV)** - struktura danych fundamentalna dla Knowledge Graphs
- **Query Fanout** - dekompozycja pytania użytkownika na 5-10 sub-zapytań przez AI
- **Information Density** - stosunek faktów do słów (wyższy = lepsze cytowanie przez AI)
- **BLUF Format** - odpowiedź na początku, kontekst potem - optymalny dla AI
- **CSI (Central Search Intent)** - główna intencja wyszukiwania którą content realizuje

## Licencja

MIT
