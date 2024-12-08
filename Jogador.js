const { Ferramenta } = require('./Item');

class Jogador {
  constructor() {
    this._mochila = new Map();
    this._salaAtual = null;
  }

  get salaAtual() { return this._salaAtual; }
  set salaAtual(sala) { this._salaAtual = sala; }

  pegarItem(nomeItem) {
    const item = this._salaAtual.getItem(nomeItem);
    if (item) {
      this._mochila.set(nomeItem, item);
      this._salaAtual.removerItem(nomeItem);
      console.log(`Você pegou ${nomeItem}.`);
      return true;
    }
    console.log(`Não há ${nomeItem} nesta sala.`);
    return false;
  }

  usarItem(nomeItem) {
    const item = this._mochila.get(nomeItem);
    if (item instanceof Ferramenta) {
      return item.usar();
    }
    console.log(`Você não pode usar ${nomeItem}.`);
    return false;
  }

  moverPara(direcao) {
    const novaSala = this._salaAtual.getConexao(direcao);
    if (novaSala) {
      this._salaAtual = novaSala;
      console.log(`Você entrou na ${novaSala.nome}.`);
      console.log(novaSala.descricao);
      return true;
    }
    console.log("Você não pode ir nessa direção.");
    return false;
  }

  verificarMochila() {
    return Array.from(this._mochila.keys());
  }

  temItem(nomeItem) {
    return this._mochila.has(nomeItem);
  }
}

module.exports = Jogador;