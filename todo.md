zrób skill do obslugi https://serpdata.io/

przykladowy request to 

curl --request GET \
	--url 'https://api.serpdata.io/v1/search?keyword=co+to+jest+kortyzol&hl=pl&gl=pl' \
	--header 'Authorization: Bearer serpdata_f47588d84dc79e09244f26727465123d-4917FNQ73jA'

format odpowiedzi to 

{
  "data": {
    "search_engine": "google",
    "location": "pl",
    "language": "pl",
    "timestamp": "2026-01-06T23:19:38.749535",
    "search_url": null,
    "total_results_count": null,
    "results": {
      "query": "co to jest kortyzol",
      "snippets_found": [
        "people_also_ask",
        "related_searches",
        "ai_overview",
        "videos_pack"
      ],
      "organic_results": [
        {
          "domain": "www.medistore.com.pl",
          "rank_absolute": 2,
          "rank_inner": 1,
          "thumbnail_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAgCAMAAADUt/MJAAAAeFBMVEVHcEwZmN0amN0amN4bl90amN4bmN4cl90bmN0tjtUbl94bmN0amN0amN0amN4amN4cl9wbmN0bmN0Zlt4bl9wbmN0amN3aBlrVBmTWBmPUBmMbmN3WBmTXBWMZmN7VBmTVBmQQm+BbbLjXBmLTBGR1W6nXBWLVBmRJyxflAAAAKHRSTlMAHk2NvuHtDf8GY/pVpJp91nB2EhiwQjVh9ySA/+PLUHX/7IQO/8qj8X4HSAAAATpJREFUeAFVkgeWAyEMQz3d03tv6bn/DdeYJYx/uvUkQAQMjuv5QRj4nuuAJPICNARefJUSFKSZlbx/Q17kgRZLIxVIVLVOihuWy0tg3oKh65Vz4K9KquFKSZPQLJaDRDkTOhfFVxH9HkertXqYIWJDP6d5Xqy48ooqUknbtu2xNfIeDsQD4Jw34maNFNpDivfHvm/b/KQ3WvJ1eyoedwwA8f5mj4r9AHw35n3HUGmPz+czAY+fJyUoHkoLEX14vYBY5m3et3kaiUptI+d9ashEVm6Vpiu36RrxQwd5mY4H7uWIQPP67Ccfr9LDQhejWRZTNtcfh1yswSRWv29pDZYy5TbtX+IYWt2ke4gLrVBZj6Kpm7xKUVxo5KOkAEtXCak3lyWdMlA6pUs6zVqS9hAuSexLl3T2WFxdf9uAGwH59Fo3AAAAAElFTkSuQmCC",
          "title": "Kortyzol - norma, objawy i badanie poziomu hormonu stresu",
          "type": "with_thumbnail",
          "url": "https://www.medistore.com.pl/a/kortyzol-norma-objawy-podwyszonego-i-obnionego-kortyzolu"
        },
        {
          "domain": "www.synevo.pl",
          "rank_absolute": 4,
          "rank_inner": 2,
          "title": "Kortyzol - czym jest i jak działa hormon stresu?",
          "type": "standard",
          "url": "https://www.synevo.pl/akademia-zdrowia/kortyzol-co-to-jest-i-jak-dziala-hormon-stresu/"
        },
        {
          "domain": "almamed.pl",
          "rank_absolute": 5,
          "rank_inner": 3,
          "thumbnail_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAe1BMVEVHcEwXi4AAm4sAm4sAm4sAm4sEmIhARks9UlQBm4sAm4sAm4sAm4sAm4tHUlc7QEMoeW8Am4sAm4sBm4sAm4sAm4s8QEM7QUQ8PkFCW14Emoo7P0M9REdESE0Cm4sAm4tFWl4Am4tIVVsAm4tCVFgAm4tKVVtBRUoeh3qGsKKmAAAAKHRSTlMAEF17hjwILT2X9v/ir6Lp9C1I7MZPYcNUUBfWtR69a2whwqTk09GBN2Jx+gAAAS9JREFUeAG10EWWwzAQRdFvEpUhZuYo7v2vsGM5nHHuTOeJ8XOW7bi2x/CNcSGVUuQH9mfmYRSdSMZxIlPKcrwqorKqKbAAsMZRFLyuawvATZP7CZKUhxvRtT2YP1i4y1M1MuymsOt6xORi1zQAEGfK2Wsd9sU1jio3W7quWTIHZu3SY4+rP5uYZRZMHVIPOANVyaE1jGFgMDxfM1z22wqkGTA7o6316EjTHUqwTWDdBgqA3KeDOWH2JfrFwlaCVgCNl2udxw128TVi2iCi3kSA3c8EcykB+rBGuakBb7dlowoYABHyIko1jCRhxzo1zMDxD+2fnvEUDxTcx/VSnNIcB3McuQx3/HKm9VbilWjf8slaTsqN4zhxNaVDjg/ToEgR+YPr4VtjO65jexZ+7h8QqxSzUv92CQAAAABJRU5ErkJggg==",
          "title": "Kortyzol – co to jest, objawy, badania i jak go obniżyć",
          "type": "with_thumbnail",
          "url": "https://almamed.pl/kortyzol-objawy-badania-jak-obnizyc/"
        },
        {
          "domain": "www.aptekarosa.pl",
          "rank_absolute": 6,
          "rank_inner": 4,
          "thumbnail_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAtFBMVEVHcEzXFj/GB0XMBUbtLTjsLjXnssHdGz7aGTzkGD7ZGz/qKjraGz3AAUDdHjzGBkTGCUXwMzfcGDzyKDPwMjXGBkTaHj7lKD3sMDbgIj3vMTbWFj7/+fnrKDLNATrPFUDWAzz93ufsJjv/8+3NB0XikZ7urLn3ydDjFjjroqz85eHYAjHKKE/62dr96e/aVGrtlp7ff5PTZH/ecYLjAibsWme+AD32ucDwhpPbN1TxcHjtRlNdn/ozAAAAFXRSTlMA07fypOP+ECAx6r2t2WhGdF497MrgS+CCAAAB60lEQVQokWWS2ZqiMBCFI6Li1toLREzMQghh3xG13/+9JlHHb7rnXOSQ+isVoAqAv1q821+z2Zf9vgC/tVwfX1ovf6CFfTwYmdVg+5/TzuxogietZ8bMebHP4AAPp2C43QZoEuDh8Pmki9kJwhOsUywETutjcAqCAM4elW1o2CiS7zgYEiGKC4Sa2vf3hAEM4loMfXxRKroVQoyezocfGq61BzBN+jhJZROlI+/EJfZ9uNY3+trjb9H1V971w3DB3BuVhr7vgDdjPkxlX4kiStUVj1kR9Sb4BjZ69Tw0cr9Km7orElzdRBV7nu9vwMQziq9lIQvUX0ssK5Gge3ACVg+YXbDARSGw1Jfm8T24AiuEECUsq8q2kVLhVCUqRxlCHlqBiWa5VLzEVZbFSrXZgLmqr5pOwEazgieNLLvMU1HOslrpr+U5ohvwRiktkowxFWWJooxVXJdIOEV0DxxKSYc7wjpc84rQhktCWtwwhHRjJpSRBNf5WQpcclG057zGkcvoRP/bD5cytykx57hM04c3bkjdnWmLFYYuyVsp2zyah3cnOmQ9mj0NXS1GGInmjBFCzH76HKPlg7ruOZq7z8fpawKdqdmHBpLfTFe2DAzNybusn4O92z7Lam13/828s7e20Xxr7V8jC/4AylhMpQV4L0YAAAAASUVORK5CYII=",
          "title": "Co to jest kortyzol i jak obniżyć hormon stresu? Sprawdź!",
          "type": "with_thumbnail",
          "url": "https://www.aptekarosa.pl/blog/article/1484-co-to-jest-kortyzol-norma-hormonu-stresu-objawy-podwyzszonego-poziomu-i-jego-rola-w-organizmie.html"
        },
        {
          "domain": "www.mp.pl",
          "rank_absolute": 8,
          "rank_inner": 5,
          "thumbnail_url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAVFBMVEVHcEz////////////////////U1NX5+fny8vLMzM3q6uvi4uPb29zBwcEBAQFYWFg9PDuPj48jIiF8fHytraxubm6w4OXf8vVNwMv///////////8rTmL9AAAAHHRSTlMAR7X1/7//////////////////////////T8rJgpXSWgAAALhJREFUeAG10zWiAyEAAFFk0EXjcv9zfqWJQJdp3woqfpJK85RWUvxleJsZNlXJNCkUzF/VTNOCRR9A6+boAwMjwbkAERvB4WFLA3OppdXSKW1XYgw2WGwc2Ct1TzuEAsWmjRjIbuAuUywl9j0/Hhxp84F/jMWnQi60ciwHF6wNpDTw56lo2ZIr6WBxzkfw7mmeuQCczm8XoXeAyxN+YOHXm708JpJp18XRvC0O7l38Jc3rdTDXH/gG7mwPjVrs+oIAAAAASUVORK5CYII=",
          "title": "Kortyzol - co to, badanie, norma, przyczyny ...",
          "type": "with_thumbnail",
          "url": "https://www.mp.pl/pacjent/badania_zabiegi/99731,kortyzol-co-to-badanie-norma-przyczyny-podwyzszonego-i-obnizonego-stezenia"
        },
        {
          "domain": "mentalpath.pl",
          "rank_absolute": 9,
          "rank_inner": 6,
          "title": "Kortyzol - co to jest hormon stresu i jaka jest jego rola w ...",
          "type": "standard",
          "url": "https://mentalpath.pl/centrum-synteza-krakow/kortyzol-co-to-jest-hormon-stresu-i-jego-rola-w-organizmie/"
        },
        {
          "domain": "pl.wikipedia.org",
          "rank_absolute": 10,
          "rank_inner": 7,
          "title": "Kortyzol – Wikipedia, wolna encyklopedia",
          "type": "standard",
          "url": "https://pl.wikipedia.org/wiki/Kortyzol"
        },
        {
          "domain": "www.cefarm24.pl",
          "rank_absolute": 11,
          "rank_inner": 8,
          "title": "Kortyzol - hormon stresu. Jakie są normy i objawy ...",
          "type": "standard",
          "url": "https://www.cefarm24.pl/czytelnia/zdrowie/kortyzol-hormon-stresu-jakie-sa-normy-i-objawy-podwyzszonego-i-obnizonego-kortyzolu/"
        },
        {
          "domain": "www.alab.pl",
          "rank_absolute": 12,
          "rank_inner": 9,
          "title": "Podwyższony poziom kortyzolu – objawy, przyczyny, ...",
          "type": "standard",
          "url": "https://www.alab.pl/centrum-wiedzy/podwyzszony-poziom-kortyzolu-objawy-przyczyny-diagnostyka-mozliwosci-obnizenia/?srsltid=AfmBOorjBo39JjG4tEL1nMjUzEY4zv-P3I-L6Br61qDOaPH8TWbfOJ0A"
        }
      ],
      "snippets_data": {
        "ads": [],
        "ai_overview": {
          "content_links": [],
          "content_text": "Przegląd od AI nie jest dostępny w przypadku tego wyszukiwaniaNie można teraz wygenerować przeglądu od AI. Spróbuj jeszcze raz później.Przegląd od AI",
          "element_id_count": 0,
          "has_listen_button": false,
          "main_aio_id": null,
          "pattern": 3,
          "rank_absolute": 1,
          "referenced_element_ids": [],
          "source_counts": {},
          "sources": [],
          "sources_paa": {},
          "status": "error",
          "unique_element_ids": []
        },
        "answer_box": [],
        "people_also_ask": {
          "questions": [
            {
              "expanded": false,
              "rank_inner": 1,
              "text": "Jakie są objawy wysokiego kortyzolu?"
            },
            {
              "expanded": false,
              "rank_inner": 2,
              "text": "Co to jest kortyzol i za co odpowiada?"
            },
            {
              "expanded": false,
              "rank_inner": 3,
              "text": "Jakie są objawy braku kortyzolu?"
            },
            {
              "expanded": false,
              "rank_inner": 4,
              "text": "Co podnosi poziom kortyzolu?"
            }
          ],
          "rank_absolute": 3
        },
        "perspectives": [],
        "related_searches": {
          "queries": [
            "Co to jest kortyzol jak go obniżyć",
            "Domowy test na kortyzol",
            "Kortyzol badanie",
            "Za wysoki kortyzol -- objawy",
            "Kortyzol -- norma",
            "Kortyzol badanie cena",
            "Co to jest kortyzol w organizmie",
            "Kortyzol jak leczyć"
          ],
          "rank_absolute": 13
        },
        "videos_pack": [
          {
            "rank_absolute": 7,
            "title": "Videos",
            "videos": [
              {
                "channel": "Dr Bartek Kulczyński",
                "duration": "16:13",
                "published": "3 gru 2023",
                "rank_inner": 1,
                "source": "YouTube",
                "title": "Po tych objawach poznasz, że masz wysoki kortyzol. Jak go ...",
                "url": "https://www.youtube.com/watch?v=BPdZhlG_t9U"
              },
              {
                "channel": "dr Angelika Kargulewicz",
                "duration": "17:49",
                "published": "29 sty 2024",
                "rank_inner": 2,
                "source": "YouTube",
                "title": "Wysoki kortyzol szkodzi. Co jeść, by go obniżyć?",
                "url": "https://www.youtube.com/watch?v=dEBldEHwK5k"
              },
              {
                "channel": "Marek Skoczylas",
                "duration": "14:36",
                "published": "1 lut 2024",
                "rank_inner": 3,
                "source": "YouTube",
                "title": "15 Signs Your Cortisol Is Raging!",
                "url": "https://www.youtube.com/watch?v=nbVuz0GxKQ8"
              }
            ]
          }
        ]
      },
      "request": {
        "url": "https://www.google.com/search?ie=utf-8&oe=utf-8&gws_rd=cr&ip=0.0.0.0&source_ip=0.0.0.0&pws=0&safe=disabled&q=co to jest kortyzol&gl=pl&hl=pl&uule=w+CAIQICIGUG9sYW5k&num=10&nfpr=1",
        "final_url": "https://www.google.com/search?ie=utf-8&oe=utf-8&gws_rd=cr&ip=0.0.0.0&source_ip=0.0.0.0&pws=0&safe=disabled&q=co to jest kortyzol&gl=pl&hl=pl&uule=w+CAIQICIGUG9sYW5k&num=10&nfpr=1",
        "device": "desktop",
        "crawl_datetime": "2026-01-07T00:19:38",
        "http_code": 200
      },
      "status": "success"
    },
    "success": true
  },
  "totalResponseTime": 4177
}

Opis jak budowac skille to:

https://github.com/anthropics/skills

W wyniki pracy skilla chce otrzymać top10 wyników wyszukiwania z  "organic_results": 

