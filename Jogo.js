const Sala = require('./Sala');
const Jogador = require('./Jogador');
const { Objeto, Ferramenta } = require('./Item');

class Jogo {
  constructor() {
    this._jogador = new Jogador();
    this._salas = new Map();
    this._tempoRestante = 600; // 10 minutos em segundos
    this._intervalId = null;
  }

  iniciar() {
    this._configurarSalas();
    this._jogador.salaAtual = this._salas.get("Entrada da Mansão");
    console.log("Bem-vindo ao Jogo de Escape da Mansão!");
    console.log("Você tem 10 minutos para escapar. Boa sorte!");
    console.log(this._jogador.salaAtual.descricao);
    this._iniciarContagem();
  }

  _configurarSalas() {
    // Entrada da Mansão
    const entrada = new Sala("Entrada da Mansão", "Você está na entrada da mansão. Há um relógio antigo na parede e um bilhete na mesa.");
    entrada.adicionarItem(new Objeto("relógio antigo", "Um relógio antigo que parece ter um mecanismo especial."));
    entrada.adicionarItem(new Objeto("bilhete", "Um bilhete com dicas sobre encontrar uma chave para a porta principal."));
    this._salas.set("Entrada da Mansão", entrada);

    // Sala de Estar
    const salaEstar = new Sala("Sala de Estar", "Uma sala de estar luxuosa, mas com um clima misterioso. Há um sofá, uma mesa de café e um espelho.");
    salaEstar.adicionarItem(new Ferramenta("chave pequena", "Uma pequena chave dourada.", "Você usa a chave pequena."));
    this._salas.set("Sala de Estar", salaEstar);

    // Escritório
    const escritorio = new Sala("Escritório", "Um escritório com uma gaveta trancada, uma mesa e vários livros.");
    escritorio.adicionarItem(new Ferramenta("pé de cabra", "Um pé de cabra resistente.", "Você usa o pé de cabra para forçar algo."));
    this._salas.set("Escritório", escritorio);

    // Cozinha
    const cozinha = new Sala("Cozinha", "Uma cozinha bem equipada com geladeira, forno e facas.");
    cozinha.adicionarItem(new Ferramenta("facas", "Um conjunto de facas afiadas.", "Você usa as facas para cortar algo."));
    this._salas.set("Cozinha", cozinha);

    // Sala de Jantar
    const salaJantar = new Sala("Sala de Jantar", "Uma sala elegante com uma mesa de jantar e cortinas pesadas bloqueando a janela.");
    this._salas.set("Sala de Jantar", salaJantar);

    // Sala de Escapamento
    const salaEscapamento = new Sala("Sala de Escapamento", "A última sala com uma janela trancada e um painel de controle misterioso.");
    this._salas.set("Sala de Escapamento", salaEscapamento);

    // Configurar conexões
    entrada.adicionarConexao("sala de estar", salaEstar);
    salaEstar.adicionarConexao("entrada", entrada);
    salaEstar.adicionarConexao("escritório", escritorio);
    escritorio.adicionarConexao("sala de estar", salaEstar);
    escritorio.adicionarConexao("cozinha", cozinha);
    cozinha.adicionarConexao("escritório", escritorio);
    cozinha.adicionarConexao("sala de jantar", salaJantar);
    salaJantar.adicionarConexao("cozinha", cozinha);
    salaJantar.adicionarConexao("sala de escapamento", salaEscapamento);
    salaEscapamento.adicionarConexao("sala de jantar", salaJantar);
  }

  _iniciarContagem() {
    this._intervalId = setInterval(() => {
      this._tempoRestante--;
      if (this._tempoRestante <= 0) {
        this._fimDeJogo(false);
      }
    }, 1000);
  }

  _fimDeJogo(vitoria) {
    clearInterval(this._intervalId);
    if (vitoria) {
      console.log("Parabéns! Você escapou da mansão!");
    } else {
      console.log("O tempo acabou! Você ficou preso na mansão para sempre.");
    }
    console.log("Itens na mochila:", this._jogador.verificarMochila());
  }

  processarComando(comando, argumento) {
    switch (comando) {
      case "pega":
        return this._jogador.pegarItem(argumento);
      case "usa":
        return this._jogador.usarItem(argumento);
      case "sai":
        return this._jogador.moverPara(argumento);
      case "ajustar":
      case "ajustar relógio":
        if (this._jogador.salaAtual.nome === "Sala de Escapamento") {
          if (this._jogador.temItem("relógio antigo") && this._jogador.temItem("pé de cabra")) {
            console.log("Você ajusta o relógio antigo no painel de controle e usa o pé de cabra para abrir a janela.");
            this._fimDeJogo(true);
            return true;
          } else {
            console.log("Você não tem todos os itens necessários para escapar.");
          }
        } else {
          console.log("Você não pode ajustar o relógio aqui.");
        }
        return false;
      case "olhar":
        console.log(this._jogador.salaAtual.descricao);
        console.log("Itens na sala:", this._jogador.salaAtual.listarItens());
        console.log("Saídas:", this._jogador.salaAtual.listarConexoes());
        return true;
      case "inventário":
        console.log("Itens na mochila:", this._jogador.verificarMochila());
        return true;
      default:
        console.log("Comando não reconhecido. Comandos disponíveis: pega, usa, sai, ajustar relógio, olhar, inventário");
        return false;
    }
  }
}

function jogar() {
  const jogo = new Jogo();
  jogo.iniciar();

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  function promptComando() {
    readline.question('Digite seu comando: ', (entrada) => {
      const [comando, ...args] = entrada.toLowerCase().split(' ');
      const argumento = args.join(' ');

      if (comando === 'sair') {
        console.log('Jogo encerrado.');
        readline.close();
        return;
      }

      jogo.processarComando(comando, argumento);
      promptComando();
    });
  }

  promptComando();
}

module.exports = { Jogo, jogar };