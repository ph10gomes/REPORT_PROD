function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`VariÃ¡vel de ambiente obrigatÃ³ria ausente: ${name}`);
  }
  return value;
}

function sanitizeTableName(table) {
  if (typeof table !== "string") throw new Error("MYSQL_TABLE invÃ¡lida.");
  const trimmed = table.trim();
  if (!/^[A-Za-z0-9_]+$/.test(trimmed)) {
    throw new Error("MYSQL_TABLE invÃ¡lida. Use apenas letras, nÃºmeros e underscore.");
  }
  return trimmed;
}

function sanitizeTableNameUnicode(table) {
  if (typeof table !== "string") throw new Error("MYSQL_TABLE invÃƒÂ¡lida.");
  const trimmed = table.trim();
  if (!/^[A-Za-z0-9_À-ÖØ-öø-ÿ]+$/.test(trimmed)) {
    throw new Error("MYSQL_TABLE invÃƒÂ¡lida. Use apenas letras, nÃƒÂºmeros e underscore.");
  }
  return trimmed;
}

module.exports = { requireEnv, sanitizeTableName, sanitizeTableNameUnicode };
