# trello-api-test-automation-with-cypress
Projeto de automação de API utilizando cypress

***

## Table of Contents
 1. [aaa adsada a d](#aaa-adsada-a-d)
 2. 
 3. [Subheading 3](#sub-heading-3)

## Critérios de Aceitação:

* Todos os campos obrigatórios devem ser validados
* Mensagens de erro devem ser claras e específicas
* Interface deve permanecer responsiva durante o processamento
* Logs de auditoria devem ser gerados para todas as tentativas de transferência
* Dados sensíveis não devem ser expostos em logs ou mensagens de erro

***

### Dados de Teste Sugeridos:

* Contas válidas para teste: 12345678901, 98765432109, 11122233344
* Contas inválidas: 99999999999, 00000000000
* Valores de teste: R$ 0,01 (mínimo), R$ 10.000,00 (máximo padrão)
* Datas: Hoje, amanhã, ontem, datas inválidas

***

## Testes nao funcionais:

* Campos alfanuméricos (como "Cliente de destino") devem ser testados para injeção de SQL/XSS em cenários de segurança separados.

* Testes de performance (ex: transferências simultâneas) e concorrência devem ser considerados em fases posteriores.

***

## Cenários de Teste: Transferência de Valores

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

## Cenários de Teste: Transferência de Valores - Condições de Rede

1. Tentativa de iniciar transferência sem conexão com a internet

    Relevância: Crítica 🥇

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas - Sem Conexão
    Cenário: Tentar iniciar uma nova transferência quando o dispositivo está offline
        Dado que o cliente está com o aplicativo bancário aberto
        E o dispositivo móvel está sem conexão com a internet
        Quando o cliente navega para a tela de transferência de valores
        E tenta preencher os campos (cliente destino, valor, data)
        E tenta clicar no botão "Transferir"
        Então uma mensagem clara de "Sem conexão com a internet. Verifique sua rede e tente novamente." deve ser exibida
        E a operação de transferência não deve ser iniciada ou enfileirada (a menos que haja funcionalidade de agendamento offline explícita)
        E os dados inseridos podem ser mantidos ou limpos, dependendo da experiência de usuário definida, mas nenhuma transação deve ser processada.
~~~

2. Perda de conexão durante o preenchimento dos dados da transferência

    Relevância: Alta 🥈

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas - Sem Conexão
    Cenário: Perder a conexão com a internet enquanto preenche os dados da transferência, antes de clicar em "Transferir"
        Dado que o cliente está com o aplicativo bancário aberto e conectado à internet
        E está na tela de transferência de valores preenchendo os dados
        E o cliente origem possui saldo de R$ 500,00
        Quando o cliente preenche o cliente destino "Juliana Alves CPF 555.666.777-88"
        E preenche o valor da transferência de R$ 100,00
        E o dispositivo perde a conexão com a internet
        E o cliente clica no botão "Transferir"
        Então uma mensagem clara de "Sem conexão com a internet. A transferência não pôde ser concluída." deve ser exibida
        E o saldo da conta do cliente origem deve permanecer R$ 500,00
        E os dados preenchidos podem ser mantidos na tela para tentativa posterior ou uma opção para "Tentar Novamente" deve ser oferecida.
~~~

3. Perda de conexão no momento exato de clicar em "Transferir"

    Relevância: Crítica 🥇

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas - Sem Conexão
    Cenário: Perder a conexão com a internet no exato momento em que o botão "Transferir" é pressionado
        Dado que o cliente está com o aplicativo bancário aberto e conectado à internet
        E o cliente origem possui saldo de R$ 1000,00
        E o cliente preencheu todos os dados válidos para a transferência (destino "Pedro Costa", valor R$ 200,00, data atual)
        Quando o cliente clica no botão "Transferir"
        E a conexão com a internet é perdida imediatamente antes da confirmação do servidor
        Então o aplicativo deve exibir uma mensagem indicando a falha na comunicação ou um estado de "Processando..." que eventualmente falha com timeout
        E o cliente deve ser orientado a verificar o status da transferência e o extrato assim que a conexão for restabelecida
        E o sistema deve garantir que a transação não seja duplicada (ou seja, se a transação chegou ao servidor antes da queda, não deve ser reenviada automaticamente de forma a duplicar)
        E o saldo do cliente origem deve refletir o estado real (não debitado se a transação não foi confirmada pelo servidor).
~~~

4. Restauração da conexão após uma tentativa de transferência falha por falta de rede

    Relevância: Alta 🥈

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas - Sem Conexão
    Cenário: Restaurar a conexão com a internet após uma tentativa de transferência falhar devido à falta de rede
        Dado que o cliente tentou realizar uma transferência, mas falhou devido à falta de conexão
        E uma mensagem de erro de conexão foi exibida
        Quando a conexão com a internet é restabelecida
        E o cliente tenta realizar a mesma transferência novamente (ou o aplicativo oferece uma opção de "Tentar Novamente")
        Então a transferência deve ser processada normalmente, assumindo que os dados são válidos e há saldo suficiente
        E uma mensagem de sucesso deve ser exibida
        E o saldo deve ser atualizado corretamente.
~~~

5. Comportamento do botão "Cancelar" sem conexão

    Relevância: Média 🥉

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas - Sem Conexão
    Cenário: Clicar no botão "Cancelar" durante o preenchimento, com o dispositivo offline
        Dado que o cliente está com o aplicativo bancário aberto
        E o dispositivo móvel está sem conexão com a internet
        E o cliente está na tela de transferência e preencheu alguns dados
        Quando o cliente clica no botão "Cancelar"
        Então os campos preenchidos devem ser limpos
        E o cliente deve ser redirecionado para a tela anterior ou o estado inicial da tela de transferência
        E nenhuma mensagem de erro de conexão é necessária, pois a ação é local.
~~~

6. Verificação de saldo sem conexão (se aplicável antes de transferir)

    Relevância: Média 🥉

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas - Sem Conexão
    Cenário: Tentar verificar o saldo na tela de transferência quando offline (se o saldo é exibido dinamicamente)
        Dado que o cliente está na tela de transferência de valores
        E o dispositivo móvel está sem conexão com a internet
        E o saldo da conta é normalmente exibido e atualizado nesta tela
        Quando o aplicativo tenta buscar/atualizar o saldo
        Então o último saldo conhecido (se houver cache) pode ser exibido com um aviso de que está desatualizado
        Ou uma mensagem de "Não foi possível carregar o saldo. Verifique sua conexão." deve ser exibida.
        E a tentativa de transferência pode ser bloqueada até que o saldo possa ser verificado online.
~~~

7. Transferência agendada e perda de conexão antes da data de efetivação

    Relevância: Baixa 🏅 (Depende de como o agendamento é tratado)

~~~javascript
Funcionalidade: Transferência de Valores Entre Correntistas - Sem Conexão
    Cenário: Agendar uma transferência e depois o dispositivo ficar offline antes da data de efetivação
        Dado que o cliente agendou uma transferência para uma data futura com sucesso enquanto estava online
        E o dispositivo fica offline antes da data de efetivação da transferência
        Quando chega a data de efetivação da transferência
        Então a transferência deve ser processada pelo servidor na data correta, independentemente do estado de conexão do dispositivo móvel do cliente (pois o agendamento já foi confirmado pelo servidor).
        E quando o cliente ficar online novamente, o status da transferência agendada (e o saldo) deve ser atualizado corretamente.
~~~

***

## Considerações Adicionais para Testes Offline:

* Feedback ao Usuário: É crucial que o aplicativo forneça feedback claro e imediato sobre o estado da conexão e o impacto nas operações.
* Retentativas: Definir a política de retentativas automáticas ou manuais. Evitar retentativas automáticas que possam levar a transações duplicadas.
* Consistência de Dados: Garantir que, ao restabelecer a conexão, o estado da conta e das transações seja consistente entre o dispositivo e o servidor.
* Cache: Se o aplicativo usa cache para dados como saldo, é importante testar como ele se comporta offline e como é atualizado ao ficar online.
* Modo Avião: Testar especificamente com o Modo Avião ativado e desativado.

***

 ## aaa adsada a d