import { getSystemErrorMap } from 'util';

class CaixaDaLanchonete {

  constructor() {
    this.cardapio = {
        cafe: { descricao: 'Café', valor: 3.00 },
        chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
        suco: { descricao: 'Suco Natural', valor: 6.20 },
        sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
        queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
        salgado: { descricao: 'Salgado', valor: 7.25 },
        combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
        combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 }
      };
  
    this.metodoDePagamento = ['dinheiro', 'debito', 'credito'];
    }

  exibirCardapio() {
  
      console.log('==== Cardápio ====');

        for (const codigo in this.cardapio) {   
          const item = this.cardapio[codigo];
          console.log(`${codigo}: ${item.descricao} - R$ ${item.valor.toFixed(2)}`);
        }
          
        console.log('==================');
    }

receberPedido() {
  const readline = require('readline');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const itens = [];
  const self = this;

  function pedirItem() {
    self.exibirCardapio();
    rl.question('Digite o código do item (ou "confirmar" para finalizar o pedido): ', (codigo) => {
      if (codigo === 'confirmar') {
        rl.close();
        self.finalizarPedido(itens);
      }
      else if (self.cardapio[codigo]) {
        const item = self.cardapio[codigo];
        if (codigo === 'chantily') {
          const temCafe = itens.some(itemStr => itemStr.startsWith('cafe'));
          if (!temCafe) {
            console.log('Chantily só pode ser selecionado com o Café.');
            pedirItem();
            return;
          }
        } else if (codigo === 'queijo') {
          const temSanduiche = itens.some(itemStr => itemStr.startsWith('sanduiche'));
          if (!temSanduiche) {
            console.log('Queijo só pode ser selecionado com o Sanduíche.');
            pedirItem();
            return;
          }
        }
        else {
          rl.question(`Quantidade de ${self.cardapio[codigo].descricao}: `, (quantidade) => {
            itens.push(`${codigo},${quantidade}`);
            pedirItem();
          });
        }
      } else {
        console.log('Item inválido! Por favor, tente novamente.');
        pedirItem();
      }
    });
  }

  pedirItem();
}

  finalizarPedido(itens){
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
      });
      
    this.exibirCardapio();
    rl.question('Escolha o método de pagamento (dinheiro, debito, credito): ', (metodoDePagamento) => {
      const valorTotal = this.calcularValorDaCompra(metodoDePagamento, itens);
      console.log(`Valor total da compra: ${valorTotal}`);
      rl.close();
      });
    }

calcularValorDaCompra(metodoDePagamento, itens){
  if (!this.metodoDePagamento.includes(metodoDePagamento)) {
    return 'Forma de pagamento inválida!';
  }
    
  if (itens.length === 0) {
    return 'Não há itens no carrinho de compra!';
  }

  if (itens.length === 0 && metodoDePagamento){
    return 'Quantidade inválida!'
  }
    
  let valorTotal = 0;
  let hasPrincipal = false;
  let hasCombo = false; 

  for (const itensStr of itens) {
    const [codigo, quantidade] = itensStr.split(',');
    const item = this.cardapio[codigo];
      
    if (!item) {
      return 'Item inválido!';
    }

    if (codigo.startsWith('combo')) {
      hasCombo = true; 
    }
    else {
      valorTotal += item.valor * quantidade;
    }
  
    if (codigo !== 'chantily' && codigo !== 'queijo') {
      hasPrincipal = true;
      } 

    else if (!hasPrincipal) {
      return 'Item extra não pode ser pedido sem o principal';
    }

    if (!hasPrincipal && !hasCombo) {
      return 'Não há itens principais no carrinho de compra!';
    }

    if (metodoDePagamento === 'dinheiro') {
      valorTotal *= 0.95;
    }
    else if (metodoDePagamento === 'credito') {
      valorTotal *= 1.03;
    }
  }

  if (itens.length===0 && metodoDePagamento==='dinheiro'){
    return 'Quantidade inválida!'
  }

    return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;

        } 
  }

export { CaixaDaLanchonete };
