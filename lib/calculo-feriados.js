/**
 * tabela de anos e fatores para utilização na fórmula de Gauss
 */
const ANOS = [
  { inicial: 1582, final: 1599, fatorX: 22, fatorY: 2 },
  { inicial: 1600, final: 1699, fatorX: 22, fatorY: 2 },
  { inicial: 1700, final: 1799, fatorX: 23, fatorY: 3 },
  { inicial: 1800, final: 1899, fatorX: 24, fatorY: 4 },
  { inicial: 1900, final: 1999, fatorX: 24, fatorY: 5 },
  { inicial: 2000, final: 2099, fatorX: 24, fatorY: 5 },
  { inicial: 2100, final: 2199, fatorX: 24, fatorY: 6 },
  { inicial: 2200, final: 2299, fatorX: 25, fatorY: 7 }]

/**
 * Função que calcula os feriados móveis baseada no cálculo da páscoa usando a fórmula de Gauss
 */
export default class CalculoFeriados {

  constructor(ano) {
    this.ano = ano
    this._pascoa = this.calcularPascoa()
  }

  calcularPascoa() {
    let faixa = ANOS.find(item => item.inicial <= this.ano && item.final >= this.ano)
    let fator1 = (19 * (this.ano % 19) + faixa.fatorX) % 30
    let fator2 = (6 * fator1 + 4 * (this.ano % 7) + 2 * (this.ano % 4) + faixa.fatorY) % 7

    // Primeira excessão do século
    if ((22 + fator1 + fator2) === 57)
      return new Date(this.ano, 3, 19)

    // Segunda excessão do século
    if ((22 + fator1 + fator2) === 56 && fator1 === 28 && (this.ano % 19) > 10)
      return new Date(this.ano, 3, 18)

    // Cálculo padrão, sem excessão
    return new Date(this.ano, 2, 22 + fator1 + fator2)
  }

  getPascoa() {
    return this._pascoa.toISOString().slice(0, 10)
  }

  getSextaSanta() {
    let pascoa = this._pascoa
    return new Date(pascoa.getFullYear(), pascoa.getMonth(), pascoa.getDate() - 2)
      .toISOString().slice(0,10)
  }

  getCarnaval() {
    let pascoa = this._pascoa
    return new Date(pascoa.getFullYear(), pascoa.getMonth(), pascoa.getDate() - 47)
      .toISOString().slice(0,10)
  }

  getQuartaCinzas() {
    let pascoa = this._pascoa
    return new Date(pascoa.getFullYear(), pascoa.getMonth(), pascoa.getDate() - 46)
      .toISOString().slice(0,10)
  }

  getCorpusChristi() {
    let pascoa = this._pascoa
    return new Date(pascoa.getFullYear(), pascoa.getMonth(), pascoa.getDate() + 60)
      .toISOString().slice(0,10)
  }

  getFullYear() {
    return {
      carnaval: this.getCarnaval(),
      quartaCinzas: this.getQuartaCinzas(),
      sextaSanta: this.getSextaSanta(),
      pascoa: this.getPascoa(),
      corpusChristi: this.getCorpusChristi()
    }
  }
}
