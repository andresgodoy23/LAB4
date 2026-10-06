import { useState } from 'react';
import CryptoJS from 'crypto-js';
import './Cipher.css';

function Cipher() {

  const [msg, setMsg] = useState('');
  const [encriptado, setEncriptado] = useState('');
  const [original, setOriginal] = useState('');
  const [error, setError] = useState('');

  const pepper = import.meta.env.VITE_APP_PEPPER;
  console.log(pepper);

  const cifrar = (e) => {
    e.preventDefault();
    setError('');
    if (!msg.trim()) {
      setError('Escribe un texto para cifrar.');
      return;
    }
    console.log(msg);
    const newMsg = pepper + msg;
    console.log(newMsg);

    const textoCifrado = CryptoJS.AES.encrypt(newMsg, '123456');
    console.log(textoCifrado.toString());

    setEncriptado(textoCifrado.toString());
    setOriginal('');
  }

  const descifrar = () => {
    const bytes = CryptoJS.AES.decrypt(encriptado, '123456');
    const textoDescifrado = bytes.toString(CryptoJS.enc.Utf8);
    console.log(textoDescifrado);

    // quitar la pimienta para mostrar el texto original
    setOriginal(textoDescifrado.replace(pepper, ''));
  }

  return (
    <div className="card">
      <div className="header">
        <span className="badge">TC3005B · LAB 4</span>
        <h1>Cipher &amp; Decipher</h1>
        <p>Cifrado simétrico AES con sal y pimienta</p>
      </div>

      <form onSubmit={cifrar}>
        <label className="label" htmlFor="texto">Texto plano</label>
        <input
          id="texto"
          className="input"
          type="text"
          placeholder="Escribe un texto..."
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit" className="btn btn-cifrar">🔒 Cifrar</button>

        <label className="label">Texto cifrado</label>
        <div className={encriptado ? 'output' : 'output empty'}>
          {encriptado || 'Aquí aparecerá el texto cifrado'}
        </div>

        <button
          type="button"
          className="btn btn-descifrar"
          onClick={descifrar}
          disabled={!encriptado}
        >
          🔓 Descifrar
        </button>

        <label className="label">Texto original</label>
        <div className={original ? 'output success' : 'output empty'}>
          {original || 'Aquí aparecerá el texto original'}
        </div>

        {error && <p className="error">{error}</p>}
      </form>

      <p className="footer">Tecnológico de Monterrey</p>
    </div>
  );
}

export default Cipher;