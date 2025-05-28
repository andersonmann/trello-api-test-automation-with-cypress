# trello-api-test-automation-with-cypress
Projeto de automação de API utilizando cypress


### Observações Gerais
Critérios de Aceitação:

* Todos os campos obrigatórios devem ser validados
* Mensagens de erro devem ser claras e específicas
* Interface deve permanecer responsiva durante o processamento
* Logs de auditoria devem ser gerados para todas as tentativas de transferência
* Dados sensíveis não devem ser expostos em logs ou mensagens de erro

Dados de Teste Sugeridos:

* Contas válidas para teste: 12345678901, 98765432109, 11122233344
* Contas inválidas: 99999999999, 00000000000
* Valores de teste: R$ 0,01 (mínimo), R$ 10.000,00 (máximo padrão)
* Datas: Hoje, amanhã, ontem, datas inválidas