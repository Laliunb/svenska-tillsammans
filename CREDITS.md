# Credits & licensing

## Audio — native-speaker recordings

Spoken Swedish in this app comes from real recordings by native speakers, hosted
on [Wikimedia Commons](https://commons.wikimedia.org). **194 words** have one;
the rest fall back to the device's Swedish voice if one is installed, and stay
silent if not.

Two collections are used:

| Recordings | Collection |
| ---: | --- |
| 189 | **Shtooka** (`Sv-<word>.ogg`) — M. Kihlstedt & N. Vion, plus other Commons contributors |
| 5 | **[Lingua Libre](https://lingualibre.org)** (`LL-Q9027 (swe)-…`) — Moonhouse, Christoffre |

Licences, all requiring attribution except CC0:

| Recordings | Licence |
| ---: | --- |
| 159 | [CC BY 2.0 FR](https://creativecommons.org/licenses/by/2.0/fr/deed.en) |
| 25 | [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/) |
| 9 | [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) |
| 1 | [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/) |

Per-word attribution — contributor, licence and source collection for every
single file — is stored alongside each entry in
[`src/data/audio.json`](src/data/audio.json).

Audio streams from Wikimedia's servers rather than being re-hosted here, so each
file keeps its own Commons file page and licence metadata. The manifest is
rebuilt with `npm run audio`, which verifies that a file really is a recording
of the word it is filed under before accepting it.

## Learning content

The vocabulary, example sentences, grammar explanations and pronunciation notes
in `src/data/` are original A1-level material written for this app.

## Resources that informed the curriculum

- **[Swedish Kelly list](https://spraakbanken.gu.se/en/resources/kelly)** —
  Språkbanken Text, University of Gothenburg. CEFR-tagged frequency list used as
  guidance for which words to teach first.
- **[SVALex](https://spraakbanken.gu.se/sites/default/files/d7/SVALex_LREC_cameraReady.pdf)** —
  CEFR-graded lexical resource for Swedish; its core-vs-peripheral distinction
  informed unit ordering.
- **[Tatoeba](https://tatoeba.org)** — CC BY 2.0 FR sentence corpus. Not yet
  imported; if its sentences are added to the decks, attribution belongs here.

## Research

See [`docs/RESEARCH.md`](docs/RESEARCH.md) for the full evidence base and source
list behind the app's design decisions.

## Code

Application code is MIT licensed — see [`LICENSE`](LICENSE).
