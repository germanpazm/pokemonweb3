import http from "./http-axios";

class servicioDatosPokemon {
  getAll() {
    return http.get(`/pokemon`);
  }

  get(id) {
    return http.get(`/pokemon/${id}`);
  }
}

export default new servicioDatosPokemon();
