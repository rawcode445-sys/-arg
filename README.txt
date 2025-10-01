# Gate 3 — Reveal protocol (countdown + final key + RSVP)

Default final key: "rawcode9" (SHA-256 = 4480588274bd83ac4f3a29a9289b8b7aaedb3c867fd535799028cbf76d6aff0a)

What to edit in `infected/3rd_layer/index.html`:
- Countdown target datetime: change `targetISO` (UTC) near the bottom.
- Date/location text inside the COORDINATES block.
- RSVP link: replace the Tally placeholder with your form URL.
- Final key (optional): if you change the word, update `FINAL_HASH` with the SHA-256 of your new key.

Auto-unlock tip:
- You can append `?k=rawcode9` to the URL to auto-unlock for testing.

URL once uploaded:
https://<user>.github.io/<repo> /infected/3rd_layer/
