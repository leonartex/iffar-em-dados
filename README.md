![logo](/docs/img/logo.svg "IFFar em Dados")

# IFFar em Dados

Este repositório faz parte do projeto IFFar em Dados e representa o seu frontend, contando ainda com um [outro repositório, que contém sua API de backend](https://github.com/leonartex/iffar-em-dados-api). Ele foi o tema da minha monografia no bacharelado em Sistemas de Informação, que buscou realizar o processamento de dados abertos ofertados pela instituição, além de outras instituições, para a disponibilização de informações sobre os cursos ofertados e os estudantes que formam a instituição. Apesar de, atualmente, focar as informações nesse aspecto, também existem planos de se cobrir outras áreas posteriormente, que necessita de mais pesquisa, principalmente considerando a complexidade de informar certos temas, como cobrir informações de aspecto financeiro, por exemplo.

## Monografia

A monografia "IFFar em Dados: proposta de portal para transparência institucional" tratou sobre os aspectos da transparência, que afeta a comunicação, e a oferta de informações da instituição. O ponto central do trabalho foi em demonstrar que informações pertinentes sobre o IFFar podem ser ofertadas de maneiras mais práticas apenas com os dados que a própria instituição já deve oferecer por lei, porém, o mesmo também vale para qualquer outra instituição de ensino pública. Para a quem interessar, a monografia está em `docs/monografia.pdf`, contudo, [também poderá ser consultada em meu GitHub Pages pessoal](http://leonartex.fsdfsfsfs/iffar-em-dados/monografia).

## As informações do IFFar em Dados

![Parte da página inicial do IFFar em Dados, apresentando o logo, o nome "IFFar em Dados" e alguns dados sobre a instituição](/docs/img/iffar-home.png "Página inicial do IFFar em Dados")

O objetivo prático do IFFar em Dados é processar dados existentes sobre o IFFar, disponibilizando-os como informação. Nesse aspecto, são utilizados, majoritariamente, [dados oferecidos pelo próprio IFFar](https://dados.iffarroupilha.edu.br/), [microdados da Plataforma Nilo Peçanha](http://dadosabertos.mec.gov.br/pnp), com dados de toda a Rede Federal, e dados fornecidos pela [API Nominatim](https://nominatim.openstreetmap.org/), para determinadas informações geográficas. Processando e relacionando esses dados, um conjunto de elementos contendo diferentes informações pôde ser apresentado.

Por exemplo, utilizando os dados da API do IFFar e a API Nominatim, um mapa interativo pôde ser construído através da biblioteca D3.js para a navegação do usuário:
![Mapa interativo do IFFar em Dados, onde apresenta a animação de um ponteiro alternando entre diferentes cidades com unidades de ensino do IFFar](/docs/img/mapa.gif "Mapa interativo do IFFar em Dados")


