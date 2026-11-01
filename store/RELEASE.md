# Groundwork: kaip išleisti į App Store ir Google Play

Kodas paruoštas. Žemiau surašyti žingsniai, kuriuos gali atlikti tik tu (paskyros, mokėjimai, parašai), ir komandos, kurias vykdau aš.

## 0. Vieną kartą prieš viską

1. **Įmonės forma.** Nuspręsk, ar parduosi kaip fizinis asmuo (individuali veikla), ar per MB/UAB. Parduotuvėse rodomas pardavėjo vardas. Įmonei Apple reikia D-U-N-S numerio (nemokamas, gavimas trunka 1–2 savaites).
2. **El. paštas.** Įrašyk viešą kontaktą trijose vietose: `CONTACT` konstantoje `index.html`, `privacy.html` ir `terms.html` (vietoje `[EL. PAŠTAS]` / `[EMAIL]`).
3. **Programos ID.** Dabar jis yra `com.arniuxas.groundwork` (failas `app/capacitor.config.json`). Jei turėsi įmonės domeną, pakeisk jį iki pirmo įkėlimo. Vėliau jo pakeisti nebeleidžiama.

## 1. Įrankiai šiame Mac

1. **Xcode** iš Mac App Store (nemokamas, ~15 GB). Paleidus pirmą kartą, leisk jam įdiegti iOS komponentus.
2. Terminale: `sudo xcode-select -s /Applications/Xcode.app`
3. **Android Studio**: https://developer.android.com/studio. Pirmo paleidimo vedlys įdiegs Android SDK ir Java.

## 2. Paskyros

- **Apple Developer Program:** https://developer.apple.com/programs/ (99 $ per metus)
- **Google Play Console:** https://play.google.com/console (25 $ vieną kartą, reikia patvirtinti tapatybę)
- Abiejose užpildyk mokesčių ir banko duomenis (Apple: Agreements, Tax and Banking → Paid Apps). Be to pirkimai neveiks net testuojant.

## 3. Sukurti programėlę parduotuvėse

Tekstai, kaina ir duomenų formų atsakymai yra faile `store/listing.md`. Ekrano nuotraukos yra aplanke `store/screenshots/`.

**Apple (App Store Connect):**
1. Apps → „+“ → New App. Bundle ID `com.arniuxas.groundwork`, pagrindinė kalba lietuvių.
2. Monetization → In-App Purchases → „+“: Non-Consumable, Product ID `groundwork_full`, kaina 9,99 €.
3. App Privacy → „Data Not Collected“.

**Google (Play Console):**
1. Create app → Game (arba App → Education) → Free.
2. Monetize → Products → One-time products → `groundwork_full`, 9,99 €. Šį produktą galėsi sukurti tik įkėlęs pirmą versiją (2–3 žingsnis žemiau).
3. Data safety: nieko nerenkama. Content rating: anketa. Target audience: 18+.

## 4. Sukurti ir įkelti versiją

Kiekvieną kartą pakeitus žaidimą:
```
cd app
npm install        # tik pirmą kartą
npm run sync       # nukopijuoja žaidimą į iOS ir Android projektus
```

**iOS:** `npm run ios` atidaro Xcode.
1. Signing & Capabilities: pasirink savo Team ir pridėk „In-App Purchase“.
2. Product → Archive → Distribute App → App Store Connect.
3. TestFlight: pakviesk testuotojus el. paštu.

**Android:** `npm run android` atidaro Android Studio.
1. Build → Generate Signed Bundle → Android App Bundle. Sukurk naują raktą (keystore).
2. **Raktą ir slaptažodį saugok atskirai** (pvz. slaptažodžių tvarkyklėje). Jų nėra git saugykloje.
3. Play Console → Testing → Closed testing → įkelk `.aab` failą.

## 5. Privalomas Google testas

Naujai asmeninei Google paskyrai prieš paleidimą reikia **mažiausiai 12 testuotojų, kurie 14 dienų iš eilės** turi programėlę įsidiegę. Tik po to atsiranda mygtukas „Apply for production“. Šie žmonės gali būti tie patys vadovai, kurie testuoja žaidimą.

## 6. Pirkimo testas

- **iOS:** TestFlight versijoje pirkimai nemokami (smėlio dėžė). Patikrink „Atrakinti“ ir „Atkurti pirkimus“.
- **Android:** Play Console → Settings → License testing: įrašyk savo Gmail. Tavo pirkimai bus testiniai.
- Turi atsirakinti 3 savaitė, ir mygtukas „Atkurti pirkimus“ turi grąžinti pilną versiją, kai programėlė įdiegiama iš naujo.

## 7. Pateikimas peržiūrai

- Apple peržiūra trunka 1–3 dienas. Pastabose (Review Notes) parašyk: „Pirmos 2 savaitės nemokamos; pilną versiją atrakina pirkimas groundwork_full žaidimo nustatymuose arba karjeros žemėlapyje.“
- Google peržiūra trunka nuo kelių dienų iki savaitės.

## Internetinė versija

https://arniuxas.github.io/groundwork/ dabar yra demo: 2 savaitės nemokamai. Kad naršyklėje atsirakintų visas žaidimas, atidaryk vieną kartą testuotojo nuorodą:

https://arniuxas.github.io/groundwork/#tester-ft2026

Privatumo politika ir sąlygos taip pat pasiekiamos per šį svetainės adresą, todėl svetainės neištrink.
