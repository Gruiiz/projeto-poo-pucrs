class Sala {
    constructor(nome, descricao) {
      this._nome = nome;
      this._descricao = descricao;
      this._itens = new Map();
      this._conexoes = new Map();
    }
  
    get nome() { return this._nome; }
    get descricao() { return this._descricao; }
  
    adicionarItem(item) {
      this._itens.set(item.nome, item);
    }
  
    removerItem(nomeItem) {
      return this._itens.delete(nomeItem);
    }
  
    getItem(nomeItem) {
      return this._itens.get(nomeItem);
    }
  
    adicionarConexao(direcao, sala) {
      this._conexoes.set(direcao, sala);
    }
  
    getConexao(direcao) {
      return this._conexoes.get(direcao);
    }
  
    listarItens() {
      return Array.from(this._itens.keys());
    }
  
    listarConexoes() {
      return Array.from(this._conexoes.keys());
    }
  }
  
  module.exports = Sala;