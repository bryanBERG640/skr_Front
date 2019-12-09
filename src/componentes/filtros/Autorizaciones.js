function Autorizacion(allowed, rol) {
  var autorizado;
  let i;
  if (allowed.length === 0) autorizado = true;
  else {
    for (i = 0; i < allowed.length; i++) {
      if (allowed[i] === rol) {
        i = allowed.length;
        autorizado = true;
      } else autorizado = false;
    }
  }

  return autorizado;
}

export { Autorizacion };
