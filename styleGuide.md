---

## 🧱 3. Retícula i Mides

### Retícula

- **Desktop:** 12 columnes
- **Tablet:** 6 columnes
- **Mòbil:** 1 columna

### Mides Recomanades

| Element               | Amplada màxima | Altres |
|-----------------------|----------------|--------|
| Contenidor principal  | 1280px         | `padding: 0 5%` |
| Targetes activitat    | 300px          | Altura automàtica |
| Gràfics / 3D          | 400–600px      | Responsive |

### Espaiats

- **Seccions:** `margin: 48px`
- **Targetes:** `padding: 24px`
- **Gap elements interns:** `16–24px`

---

## 📷 4. Estètica 3D

### Estils Visuals

- **Glassmorphism / Claymorphism**
- **Ombra suau:** `box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1)`
- **Interacció:** `hover: scale(1.03) rotateY(3deg)`

### Formats

- Icons i UI: `SVG`
- Imatges: `WebP`
- Gràfics 3D: `Three.js` o `Spline`

---

## 🧩 5. Iconografia

### Llibreria Recomanada

- [Lucide Icons](https://lucide.dev)
- [Heroicons](https://heroicons.com)

### Estil

- **Traç lineal de 1.5–2px**
- Format `SVG`, estil coherent

### Icons més comuns

| Icona           | Ús                               |
|------------------|----------------------------------|
| `clock`          | Temps d’activitat                |
| `check-circle`   | Activitat completada             |
| `bar-chart-3`    | Gràfic de productivitat          |
| `calendar-days`  | Historial                        |
| `sparkles`       | Rècord personal / dia productiu  |

---

## 🧠 6. Components Clau

- **Navbar:** flotant, amb usuari i configuració
- **Gràfic 3D:** amb animacions segons hores treballades
- **Timeline d’activitats:** estil targeta amb scroll suau
- **Mòdul de focus:** cronòmetre visual estil *pomodoro*
- **Dashboard:** targetes comparatives dia/setmana/mes

---

## ♿ 7. Accessibilitat i Responsivitat

- Contrast mínim: **WCAG AA (4.5:1)**
- Botons: mínim `44x44px`
- Animacions amb suport per a `prefers-reduced-motion`
- Navegació amb teclat i `aria-label` per a lector de pantalla

---

## 🔧 Vols una versió Tailwind?

Puc generar un `tailwind.config.js` amb aquesta configuració de colors, tipografies i espaiats. Només digues-ho i t’ho preparo.