![logo](/docs/img/logo.svg "IFFar em Dados")

# IFFar em Dados

Este repositório faz parte do projeto IFFar em Dados e representa o seu frontend, contando ainda com um [outro repositório, que contém sua API de backend](https://github.com/leonartex/iffar-em-dados-api). Ele foi o tema da minha monografia no bacharelado em Sistemas de Informação, que buscou realizar o processamento de dados abertos ofertados pela instituição, além de outras instituições, para a disponibilização de informações sobre os cursos ofertados e os estudantes que formam a instituição. Apesar de, atualmente, focar as informações nesse aspecto, também existem planos de se cobrir outras áreas posteriormente, que necessita de mais pesquisa, principalmente considerando a complexidade de informar certos temas, como cobrir informações de aspecto financeiro, por exemplo.

## Monografia

A monografia "IFFar em Dados: proposta de portal para transparência institucional" tratou sobre os aspectos da transparência, que afeta a comunicação, e a oferta de informações da instituição. O ponto central do trabalho foi em demonstrar que informações pertinentes sobre o IFFar podem ser ofertadas de maneiras mais práticas apenas com os dados que a própria instituição já deve oferecer por lei, porém, o mesmo também vale para qualquer outra instituição de ensino pública. Para a quem interessar, a monografia está em `docs/monografia.pdf`, contudo, [também poderá ser consultada em meu GitHub Pages pessoal](http://leonartex.fsdfsfsfs/iffar-em-dados/monografia).

## As informações do IFFar em Dados

![Cabeçalho da página inicial do IFFar em Dados, apresentando o logo, o nome "IFFar em Dados" e alguns dados sobre a instituição](/docs/img/iffar-home.png "Página inicial do IFFar em Dados")

O objetivo prático do IFFar em Dados é processar dados existentes sobre o IFFar, disponibilizando-os como informação. Nesse aspecto, são utilizados, majoritariamente, [dados oferecidos pelo próprio IFFar](https://dados.iffarroupilha.edu.br/), [microdados da Plataforma Nilo Peçanha](http://dadosabertos.mec.gov.br/pnp), com dados de toda a Rede Federal, e dados fornecidos pela [API Nominatim](https://nominatim.openstreetmap.org/), para determinadas informações geográficas. Processando e relacionando esses dados, um conjunto de elementos contendo diferentes informações pôde ser apresentado.

Por exemplo, utilizando os dados da API do IFFar e a API Nominatim, um mapa interativo pôde ser construído através da biblioteca D3.js para a navegação do usuário:
![Mapa interativo do IFFar em Dados, onde apresenta a animação de um ponteiro alternando entre diferentes cidades com unidades de ensino do IFFar](/docs/img/mapa.gif "Mapa interativo do IFFar em Dados")
Todos os dados utilizados do Nominatim são em formato GEOJSON que, então, são transformados no D3.js, desde a construção do próprio mapa do estado e a localização das unidades de ensino.

O ponto mais importante, conforme as prioridades estabelecidas na pesquisa com os estudantes do Campus São Borja, é apresentar informações sobre os cursos ofertados. Tanto que são as primeiras informações visualizadas pelos usuários. Inicialmente, após a apresentação das unidades de ensino na página inicial, são apresentas informações dos cursos de forma geral, que depois seguem para informações específicas para cada nível de curso: técnico; graduação; e pós-graduação.
![Trecho apresentando informações de cursos do IFFar, apresentando, inicialmente, de forma agregada e depois específicas para um nível de curso, também mostrando os cursos ofertados.](/docs/img/iffar-tecnico.png "Apresentação de informações sobre cursos")

Um componente compartilhado e reutilizado em muitos elementos é a barra de anos. Ela serve para o usuário visualizar as informações de determinado componente em um ano específico, filtrando e permitindo visualizar a progressão do IFFar em determinado aspecto:
![Representação da barra de anos, listando todos os anos em que possuem informações para determinado componente e o ano sendo visualizado](/docs/img/barrra-anos.png "Componente da barra de anos")

E, navegando entre as páginas, os usuários podem visualizar as informações filtrandos para um nível cada vez mais específico. Primeiro, o usuário visualiza os dados do IFFar como um todo, depois, as informações específicas de uma unidade de ensino, seguindo para as informações específicas a um curso.
![Captura de tela da parte inicial da página do Campus São Borja, apresentando o cabeçalho e as informações de cursos](/docs/img/unidade.png "Início da página do Campus São Borja")
![Captura de tela da parte inicial da página do curso de Sistemas de Informação do Campus São Borja, apresentando o cabeçalho e dados do detalhamento do curso](/docs/img/curso.png "Início da página do curso de Sistemas de Informação do Campus São Borja")
Obs.: Nas informações do cabeçalho são utilizados os dados do ano mais atual presente, devendo representar a situação real sobre estudantes, por exemplo, apenas após o início do ano letivo.

Obviamente, o sistema também informa, de forma amigável para o usuário, quando tentar acessar um curso ou unidade de ensino não existente, ou até mesmo um erro de sistema:
![Apresentação da página de erro 404 do IFFar em Dados, mostrando a logo, o código de erro e a mensagem indicando que a unidade de ensino não foi identificada](/docs/img/404.png "Página de erro 404 do IFFar em Dados")

Utilizando os dados de outras instituições, como a Plataforma Nilo Peçanha, algumas outras informações muito pertinentes também podem ser apresentadas. São informações em que apenas os dados abertos do IFFar não permitiriam ser construídas, como é o caso das informações demográficas sobre os estudantes que formam a instituição, desde a instituição como um todo até o perfil demográfico em um curso específico:
![Informações da seção de perfil dos estudantes, apresentando a distribuição de estudantes por renda familiar, cor de pele ou raça, gênero e faixa etária](/docs/img/perfil.png "Seção de perfil dos estudantes")