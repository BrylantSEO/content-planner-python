# Senuto REST API Reference (reverse-engineered from senuto-mcp)

Base URL: `https://api.senuto.com`
Auth: `Authorization: Bearer <JWT_TOKEN>`
Content-Type: `application/json`

## Visibility Analysis

### GET /api/visibility_analysis/reports/dashboard/getDomainStatistics
Query params: `domain`, `fetch_mode`, `country_id`, `days_compare_mode?`, `isDataReadyToLoad?`

### GET /api/visibility_analysis/reports/domain_positions/getPositionsHistoryChartData
Query params: `domain`, `fetch_mode`, `country_id`, `date_min`, `date_max`, `date_interval`

### POST /api/visibility_analysis/reports/positions/getData
Body: `{ domain, fetch_mode, country_id, page?, limit? }`

### POST /api/visibility_analysis/reports/competitors/getData
Body: `{ domain, fetch_mode, country_id, days_compare_mode?, page?, limit?, offset? }`

### POST /api/visibility_analysis/reports/cannibalization/getKeywords
Body: `{ domain, fetch_mode, country_id, days_compare_mode?, competitors? }`

### POST /api/visibility_analysis/reports/keywords/getCharacteristicsTable
Body: `{ domain, fetch_mode, country_id, characteristics, days_compare_mode? }`
characteristics: `words_count | trends | searches | difficulty | keyword_params | serp_params`

### POST /api/visibility_analysis/reports/sections/getUrls
Body: `{ domain, fetch_mode, country_id, page?, limit?, offset? }`

### POST /api/visibility_analysis/reports/sections/getSubdomains
Body: `{ domain, fetch_mode, country_id, page?, limit?, offset? }`

### POST /api/visibility_analysis/reports/positions/getKeywordHistory
Body: `{ domain, fetch_mode, country_id, keyword_id, kid }`

### GET /api/visibility_analysis/app/getCountriesList
No params.

### GET /api/visibility_analysis/domains_suggester/suggest
Query params: `value`, `country_id`

## Keywords Analysis

### POST /api/keywords_analysis/reports/keyword_details/getQuestions
Body: `{ country_id, keyword, limit?, page?, offset? }`
country_id: `1|50|53|82|134|153|160|164` (NOT 200!)

### POST /api/keywords_analysis/reports/keyword_details/getGroups
Body: `{ keyword, country_id, limit?, page?, offset? }`
country_id: `1|50|53|82|134|153|160|164` (NOT 200!)

### POST /api/keywords_analysis/reports/keywords/getKeywords
Body: `{ country_id, parameters: [{ data_fetch_mode, value[] }], match_mode, limit?, page?, offset? }`

## Response format
All endpoints return: `{ data: ..., success: boolean, pagination?: { count, ... } }`
