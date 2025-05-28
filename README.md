# trello-api-test-automation-with-cypress
Projeto de automação de API utilizando cypress

***

### Notas:

* Campos alfanuméricos (como "Cliente de destino") devem ser testados para injeção de SQL/XSS em cenários de segurança separados.

* Testes de performance (ex: transferências simultâneas) e concorrência devem ser considerados em fases posteriores.

***

### Observações Gerais

**Critérios de Aceitação**:

* Todos os campos obrigatórios devem ser validados
* Mensagens de erro devem ser claras e específicas
* Interface deve permanecer responsiva durante o processamento
* Logs de auditoria devem ser gerados para todas as tentativas de transferência
* Dados sensíveis não devem ser expostos em logs ou mensagens de erro

**Dados de Teste Sugeridos**:

* Contas válidas para teste: 12345678901, 98765432109, 11122233344
* Contas inválidas: 99999999999, 00000000000
* Valores de teste: R$ 0,01 (mínimo), R$ 10.000,00 (máximo padrão)
* Datas: Hoje, amanhã, ontem, datas inválidas

## Casos de testes

1. Transferência bem-sucedida com saldo suficiente 

    Relevância: Crítica 🥇

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas
    Cenário: Realizar transferência com sucesso para um cliente válido com saldo suficiente
        Dado que o cliente origem possui saldo de R$ 1000,00 em sua conta
        E o cliente destino "João Silva CPF 123.456.789-00" é um cliente válido
        Quando o cliente origem informa o cliente destino "João Silva CPF 123.456.789-00"
        E informa o valor da transferência de R$ 200,00
        E informa a data da efetivação como a data atual
        E clica no botão "Transferir"
        Então o saldo da conta do cliente origem deve ser atualizado para R$ 800,00
        E uma mensagem de "Transferência realizada com sucesso" deve ser exibida
        E o cliente destino "João Silva CPF 123.456.789-00" deve receber R$ 200,00 em sua conta
~~~

2. Tentativa de transferência com saldo insuficiente
 
    Relevância: Crítica 🥇

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas
    Cenário: Tentar realizar transferência com saldo insuficiente
        Dado que o cliente origem possui saldo de R$ 100,00 em sua conta
        E o cliente destino "Maria Santos CPF 987.654.321-00" é um cliente válido
        Quando o cliente origem informa o cliente destino "Maria Santos CPF 987.654.321-00"
        E informa o valor da transferência de R$ 200,00
        E informa a data da efetivação como a data atual
        E clica no botão "Transferir"
        Então o saldo da conta do cliente origem deve permanecer R$ 100,00
        E uma mensagem de "Saldo insuficiente para realizar a transferência" deve ser exibida
~~~

3. Tentativa de transferência com valor zerado
 
    Relevância: Crítica 🥇

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas
    Cenário: Tentar realizar transferência com valor zerado
        Dado que o cliente origem possui saldo de R$ 500,00 em sua conta
        E o cliente destino "Carlos Pereira CPF 666.654.543-00" é um cliente válido
        Quando o cliente origem informa o cliente destino "Carlos Pereira CPF 666.654.543-00"
        E informa o valor da transferência de R$ 0,00
        E informa a data da efetivação como a data atual
        E clica no botão "Transferir"
        Então o saldo da conta do cliente origem deve permanecer R$ 500,00
        E uma mensagem de "O valor da transferência deve ser maior que zero" deve ser exibida
        E o botão "Transferir" deve estar desabilitado ou a transferência não deve ser processada
~~~

4. Tentativa de transferência com valor negativo
 
    Relevância: Alta 🥈

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas
    Cenário: Tentar realizar transferência com valor negativo
        Dado que o cliente origem possui saldo de R$ 500,00 em sua conta
        E o cliente destino "Ana Costa CPF 111.222.333-44" é um cliente válido
        Quando o cliente origem informa o cliente destino "Ana Costa CPF 111.222.333-44"
        E informa o valor da transferência de R$ -50,00
        E informa a data da efetivação como a data atual
        E clica no botão "Transferir"
        Então o saldo da conta do cliente origem deve permanecer R$ 500,00
        E uma mensagem de "O valor da transferência deve ser um número positivo" deve ser exibida
        E o botão "Transferir" deve estar desabilitado ou a transferência não deve ser processada
~~~

5. Tentativa de transferência para cliente de destino inválido/inexistente


    Relevância: Alta 🥈

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas
    Cenário: Tentar realizar transferência para um cliente de destino inválido
        Dado que o cliente origem possui saldo de R$ 300,00 em sua conta
        Quando o cliente origem informa o cliente destino "Cliente Inexistente XYZ"
        E informa o valor da transferência de R$ 100,00
        E informa a data da efetivação como a data atual
        E clica no botão "Transferir"
        Então o saldo da conta do cliente origem deve permanecer R$ 300,00
        E uma mensagem de "Cliente de destino inválido ou não encontrado" deve ser exibida
~~~

6. Cancelar uma operação de transferência

    Relevância: Média 🥉

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas
    Cenário: Cancelar a operação de transferência antes de confirmar
        Dado que o cliente origem possui saldo de R$ 700,00 em sua conta
        E o cliente destino "Fernanda Lima CPF 123.555.444.66" é um cliente válido
        Quando o cliente origem informa o cliente destino "Fernanda Lima CPF 123.555.444.66"
        E informa o valor da transferência de R$ 150,00
        E informa a data da efetivação como a data atual
        E clica no botão "Cancelar"
        Então os campos de cliente destino, valor da transferência e data da efetivação devem ser limpos ou redefinidos para o valor padrão
        E o saldo da conta do cliente origem deve permanecer R$ 700,00
        E nenhuma transferência deve ser realizada
~~~

7. Transferência com data de efetivação futura

    Relevância: Média 🥉

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas
    Cenário: Agendar uma transferência para uma data futura
        Dado que o cliente origem possui saldo de R$ 1200,00 em sua conta
        E o cliente destino "Ricardo Alves CPF 444.555.666-77" é um cliente válido
        Quando o cliente origem informa o cliente destino "Ricardo Alves CPF 444.555.666-77"
        E informa o valor da transferência de R$ 300,00
        E informa a data da efetivação como uma data futura válida (ex: D+5)
        E clica no botão "Transferir"
        Então o saldo da conta do cliente origem pode ou não ser debitado imediatamente, dependendo da regra de negócio (verificar especificação)
        E uma mensagem de "Transferência agendada com sucesso para [data futura]" deve ser exibida
        E a transferência deve ser processada na data de efetivação especificada
~~~

8. Tentativa de transferência com campo "Cliente de destino" vazio

    Relevância: Média 🥉

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas
    Cenário: Tentar realizar transferência sem informar o cliente de destino
        Dado que o cliente origem possui saldo de R$ 400,00 em sua conta
        Quando o cliente origem não informa o cliente destino
        E informa o valor da transferência de R$ 50,00
        E informa a data da efetivação como a data atual
        E tenta clicar no botão "Transferir"
        Então uma mensagem de "O campo Cliente de Destino é obrigatório" deve ser exibida
        E o botão "Transferir" deve estar desabilitado ou a transferência não deve ser processada

~~~

9. Tentativa de transferência com campo "Valor da transferencia" vazio

    Relevância: Média 🥉

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas
    Cenário: Tentar realizar transferência sem informar o valor
        Dado que o cliente origem possui saldo de R$ 600,00 em sua conta
        E o cliente destino "Lucas Mendes CPF 777.888.999-00" é um cliente válido
        Quando o cliente origem informa o cliente destino "Lucas Mendes CPF 777.888.999-00"
        E não informa o valor da transferência
        E informa a data da efetivação como a data atual
        E tenta clicar no botão "Transferir"
        Então uma mensagem de "O campo Valor da Transferência é obrigatório" deve ser exibida
        E o botão "Transferir" deve estar desabilitado ou a transferência não deve ser processada

~~~

10. Tentativa de transferência com data de efetivação inválida (passada)

    Relevância: Baixa 🏅

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas
    Cenário: Tentar realizar transferência com data de efetivação no passado
        Dado que o cliente origem possui saldo de R$ 800,00 em sua conta
        E o cliente destino "Beatriz Oliveira CPF 777.345.999-00" é um cliente válido
        Quando o cliente origem informa o cliente destino "Beatriz Oliveira CPF 777.345.999-00"
        E informa o valor da transferência de R$ 100,00
        E informa a data da efetivação como uma data passada (ex: D-1)
        E clica no botão "Transferir"
        Então uma mensagem de "A data de efetivação não pode ser uma data passada" deve ser exibida
        E o saldo da conta do cliente origem deve permanecer R$ 800,00
        E a transferência não deve ser processada

~~~