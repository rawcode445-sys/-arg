# rawcode-arg — The Raw Virus (Configured)

Starter configuré :
- **Code Gate 1** : `rawvirus` (SHA-256 = `d27c5f206433fbc1c292ddd88a5825f937cbf3b2e33403c711b816cbcd04f0b1` déjà injecté).
- **Playlist** : placeholder Spotify `https://open.spotify.com/playlist/37i9dQZF1DX3YSRoSdA634` → remplace par la tienne.

Déploiement :
1) Repo public `rawcode-arg` → Settings › Pages → Deploy from a branch (main/root).
2) Uploade le contenu à la racine.
3) URL: `https://<user>.github.io/rawcode-arg/`

URLs utiles :
- Gate 1 : `/infected/init/` (déverrouillage d'urgence : `?k=rawvirus`)
- Gate 2 : `/infected/2nd_gate/`
- Gate 3 : `/infected/3rd_layer/`

Custom :
- Change le code → recalculer SHA-256 et remplace `GATE1_HASH` dans `/assets/js/guards.js`.
- Remplace les liens de formulaires (Gate 2/3).
