/*export const type = "SAVE_GET_PostulanteB";

const Action = text => {
  return {
    type
  };
};

export default Action;*/

export function saveGetPostulanteB(postulanteB) {
  return { type: "SAVE_GET_POSTULANTEB", postulanteB };
}
