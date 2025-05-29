/*

Esse arquivo contém:
Criação de tabelas com chaves primárias e estrangeiras.
Inserções de dados de exemplo.
Todas as consultas SQL solicitadas.

Como usar:
Execute o script de criação de tabelas primeiro.
Em seguida, execute este script de inserção de dados.
Agora, você pode testar as consultas SQL
*/

-- ========== CRIAÇÃO DAS TABELAS ==========

-- Tabela de Professores
CREATE TABLE PROFESSOR (
    codp SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    fone VARCHAR(20)
);

-- Tabela de Disciplinas
CREATE TABLE DISCIPLINA (
    codd SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULLscrip
);

-- Tabela de Alunos
CREATE TABLE ALUNO (
    coda SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL
);

-- Tabela de Relacionamento: LECIONA (Professor ↔ Disciplina)
CREATE TABLE LECIONA (
    codp INT NOT NULL,
    codd INT NOT NULL,
    PRIMARY KEY (codp, codd),
    FOREIGN KEY (codp) REFERENCES PROFESSOR(codp),
    FOREIGN KEY (codd) REFERENCES DISCIPLINA(codd)
);

-- Tabela de Relacionamento: CURSA (Aluno ↔ Disciplina)
CREATE TABLE CURSA (
    coda INT NOT NULL,
    codd INT NOT NULL,
    ano INT NOT NULL,
    PRIMARY KEY (coda, codd),
    FOREIGN KEY (coda) REFERENCES ALUNO(coda),
    FOREIGN KEY (codd) REFERENCES DISCIPLINA(codd)
);

-- ========== INSERÇÃO DE DADOS DE EXEMPLO ==========

-- Inserção de Professores
INSERT INTO PROFESSOR (nome, fone) VALUES 
('João', '11999990000'),
('Maria', '11888881111'),
('Carlos', '11777772222');

-- Inserção de Disciplinas
INSERT INTO DISCIPLINA (nome) VALUES 
('Cálculo'),
('Algoritmos'),
('Estrutura de Dados');

-- Inserção de Alunos
INSERT INTO ALUNO (nome) VALUES 
('Ana'),
('Bruno'),
('Clara'),
('Diego'),
('Eduarda');

-- Relacionamento: LECIONA (Professor ↔ Disciplina)
INSERT INTO LECIONA (codp, codd) VALUES 
(1, 1),  -- João leciona Cálculo
(1, 2),  -- João leciona Algoritmos
(2, 1),  -- Maria leciona Cálculo
(3, 3);  -- Carlos leciona Estrutura de Dados

-- Relacionamento: CURSA (Aluno ↔ Disciplina, ano)
INSERT INTO CURSA (coda, codd, ano) VALUES 
(1, 1, 2019),  -- Ana cursou Cálculo em 2019
(2, 1, 2020),  -- Bruno cursou Cálculo em 2020
(3, 2, 2021),  -- Clara cursou Algoritmos em 2021
(4, 3, 2018),  -- Diego cursou Estrutura de Dados em 2018
(5, 1, 1999);  -- Eduarda cursou Cálculo em 1999 (fora do filtro 2000-2020)

-- ========== CONSULTAS SQL ==========

-- a) Alunos matriculados em Cálculo do professor João
SELECT DISTINCT a.nome AS aluno
FROM ALUNO a
JOIN CURSA c ON a.coda = c.coda
JOIN DISCIPLINA d ON c.codd = d.codd
JOIN LECIONA l ON d.codd = l.codd
JOIN PROFESSOR p ON l.codp = p.codp
WHERE d.nome = 'Cálculo'
  AND p.nome = 'João';

-- b) Quantidade de alunos por disciplina
SELECT d.nome AS disciplina, COUNT(c.coda) AS quantidade_alunos
FROM DISCIPLINA d
JOIN CURSA c ON d.codd = c.codd
GROUP BY d.nome;

-- c) Disciplinas que todos os professores lecionam
SELECT d.nome AS disciplina
FROM DISCIPLINA d
JOIN LECIONA l ON d.codd = l.codd
GROUP BY d.codd, d.nome
HAVING COUNT(DISTINCT l.codp) = (SELECT COUNT(*) FROM PROFESSOR);

-- d) Total de professores
SELECT COUNT(*) AS total_professores
FROM PROFESSOR;

-- e) Alunos que cursaram disciplinas entre 2000 e 2020
SELECT DISTINCT a.nome AS aluno
FROM ALUNO a
JOIN CURSA c ON a.coda = c.coda
WHERE c.ano BETWEEN 2000 AND 2020;