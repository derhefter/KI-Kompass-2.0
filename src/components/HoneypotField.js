// Versteckter Honeypot. Bots füllen ALLE Felder aus, Menschen sehen es nicht.
//
// Backend-Gegenstück: `isHoneypotTriggered(body)` aus src/lib/sanitize.js
// liest das Feld `hp_field_xy` und verwirft Submits stumm, wenn befüllt.
//
// Verwendung (controlled, damit der Wert im React-State landet):
//
//   const [hp, setHp] = useState('')
//   ...
//   <HoneypotField value={hp} onChange={setHp} />
//   ...
//   body: JSON.stringify({ ...payload, hp_field_xy: hp })

export default function HoneypotField({ value = '', onChange }) {
  return (
    <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', top: 'auto', width: 1, height: 1, overflow: 'hidden' }}>
      <label>
        Bitte dieses Feld leer lassen
        <input
          type="text"
          name="hp_field_xy"
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
        />
      </label>
    </div>
  )
}
