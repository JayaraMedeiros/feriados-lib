"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * tabela de anos e fatores para utilização na fórmula de Gauss
 */
var ANOS = [{ inicial: 1582, final: 1599, fatorX: 22, fatorY: 2 }, { inicial: 1600, final: 1699, fatorX: 22, fatorY: 2 }, { inicial: 1700, final: 1799, fatorX: 23, fatorY: 3 }, { inicial: 1800, final: 1899, fatorX: 24, fatorY: 4 }, { inicial: 1900, final: 1999, fatorX: 24, fatorY: 5 }, { inicial: 2000, final: 2099, fatorX: 24, fatorY: 5 }, { inicial: 2100, final: 2199, fatorX: 24, fatorY: 6 }, { inicial: 2200, final: 2299, fatorX: 25, fatorY: 7 }];

/**
 * Função que calcula os feriados móveis baseada no cálculo da páscoa usando a fórmula de Gauss
 */

var CalculoFeriados = function () {
  function CalculoFeriados(ano) {
    _classCallCheck(this, CalculoFeriados);

    this.ano = ano;
    this._pascoa = this.calcularPascoa();
  }

  _createClass(CalculoFeriados, [{
    key: "calcularPascoa",
    value: function calcularPascoa() {
      var _this = this;

      var faixa = ANOS.find(function (item) {
        return item.inicial <= _this.ano && item.final >= _this.ano;
      });
      var fator1 = (19 * (this.ano % 19) + faixa.fatorX) % 30;
      var fator2 = (6 * fator1 + 4 * (this.ano % 7) + 2 * (this.ano % 4) + faixa.fatorY) % 7;

      // Primeira excessão do século
      if (22 + fator1 + fator2 === 57) return new Date(this.ano, 3, 19);

      // Segunda excessão do século
      if (22 + fator1 + fator2 === 56 && fator1 === 28 && this.ano % 19 > 10) return new Date(this.ano, 3, 18);

      // Cálculo padrão, sem excessão
      return new Date(this.ano, 2, 22 + fator1 + fator2);
    }
  }, {
    key: "getPascoa",
    value: function getPascoa() {
      return this._pascoa;
    }
  }, {
    key: "getSextaSanta",
    value: function getSextaSanta() {
      var pascoa = this.getPascoa();
      return new Date(pascoa.getFullYear(), pascoa.getMonth(), pascoa.getDate() - 2);
    }
  }, {
    key: "getCarnaval",
    value: function getCarnaval() {
      var pascoa = this.getPascoa();
      return new Date(pascoa.getFullYear(), pascoa.getMonth(), pascoa.getDate() - 47);
    }
  }, {
    key: "getQuartaCinzas",
    value: function getQuartaCinzas() {
      var pascoa = this.getPascoa();
      return new Date(pascoa.getFullYear(), pascoa.getMonth(), pascoa.getDate() - 46);
    }
  }, {
    key: "getCorpusChristi",
    value: function getCorpusChristi() {
      var pascoa = this.getPascoa();
      return new Date(pascoa.getFullYear(), pascoa.getMonth(), pascoa.getDate() + 60);
    }
  }, {
    key: "getFullYear",
    value: function getFullYear() {
      return {
        carnaval: this.getCarnaval(),
        quartaCinzas: this.getQuartaCinzas(),
        sextaSanta: this.getSextaSanta(),
        pascoa: this.getPascoa(),
        corpusChristi: this.getCorpusChristi()
      };
    }
  }]);

  return CalculoFeriados;
}();

exports.default = CalculoFeriados;
