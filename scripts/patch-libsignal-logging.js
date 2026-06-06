const fs = require('fs');
const path = require('path');

const targetFile = path.join(__dirname, '..', 'node_modules', 'libsignal', 'src', 'session_record.js');

function patchFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[patch-libsignal-logging] Arquivo nao encontrado: ${filePath}`);
    return;
  }

  const original = fs.readFileSync(filePath, 'utf8');

  const patched = original
    .replace(/console\.warn\("Session already closed",\s*session\);/g, '// patched: muted noisy libsignal warning')
    .replace(/console\.info\("Closing session:",\s*session\);/g, '// patched: muted noisy libsignal info')
    .replace(/console\.warn\("Session already open"\);/g, '// patched: muted noisy libsignal warning');

  if (patched === original) {
    console.log('[patch-libsignal-logging] Nenhuma alteracao necessaria.');
    return;
  }

  fs.writeFileSync(filePath, patched, 'utf8');
  console.log('[patch-libsignal-logging] Patch aplicado em libsignal/session_record.js');
}

patchFile(targetFile);
