import { Field, reduxForm } from "redux-form";

function validacionPB() {
  <form>
    <Field name="perfil" component={renderPerfil} />
    <Field name="nombre" component={renderNombre} />
    <Field name="apellido1" component={renderApellido1} />
    <Field name="apellido2" component={renderApellido2} />
    <Field name="correo" component={renderCorreo} />
    <Field name="telefono" component={renderTelefono} />
    <Field name="celular" component={renderCelular} />
    <Field name="estatuspostulante" component={renderEstatuspostulante} />
    <Button callToAction="agregar" type="submit" />
  </form>;
}

function renderNombre(field) {
  return (
    <div>
      <input {...field.input} />
    </div>
  );
}

export default reduxForm({
  form: "vacio"
})(validacionPB);
