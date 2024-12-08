class Item {
    constructor(nome, descricao) {
      this._nome = nome;
      this._descricao = descricao;
    }
  
    get nome() { return this._nome; }
    get descricao() { return this._descricao; }
  }
  
  class Ferramenta extends Item {
    constructor(nome, descricao, uso) {
      super(nome, descricao);
      this._uso = uso;
    }
  
    usar() {
      console.log(this._uso);
      return true;
    }
  }
  
  class Objeto extends Item {
    constructor(nome, descricao) {
      super(nome, descricao);
    }
  }
  
  module.exports = { Item, Ferramenta, Objeto };