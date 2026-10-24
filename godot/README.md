# Plushie Merge

Um jogo aconchegante de combinação em uma máquina de garra. Solte pelúcias, junte duas iguais para criar uma maior e mantenha a pilha abaixo da linha de segurança.

## Como jogar

Na partida solo, você começa com três minutos. Cada objetivo concluído acrescenta um minuto. A rodada termina quando o tempo acaba, não há mais pelúcias para soltar ou a pilha ultrapassa a linha de segurança. Perto do limite, você recebe uma Bomba Fofinha de resgate por partida.

| Ação | Teclado | Mouse | Controle |
|---|---|---|---|
| Mirar | A/D ou ←/→ | Mover | Analógico esquerdo ou direcional |
| Soltar uma pelúcia | Espaço | Clique dentro da máquina | A |
| Pausar | Esc | — | Start |

Na tela inicial, abra **Como jogar** para ver as regras completas. Em dispositivos móveis, arraste dentro da máquina para mirar e solte para lançar.

## Multijogador local

Duas pessoas podem jogar no mesmo computador, cada uma com sua própria máquina, em uma rodada de três minutos. O Jogador 1 usa **A/D** para mirar e **Espaço** para soltar; o Jogador 2 usa **J/L** e **K**. As partidas são locais: não há matchmaking nem placar online.

## Progresso e configurações

Preferências, nome e recordes ficam salvos no dispositivo. Não é necessário criar uma conta. O idioma pode ser escolhido entre English, 简体中文 e Português (Brasil); no primeiro acesso, o jogo acompanha o idioma compatível do dispositivo.

## Executar o projeto

Requer Godot **4.7.2**. Abra `project.godot` no editor do Godot ou execute o jogo diretamente:

```bash
godot --path .
```

## Exportar para a Web

Instale os templates de exportação correspondentes ao Godot 4.7.2 e execute:

```bash
mkdir -p web
godot --headless --path . --export-release Web web/index.html
python3 tools/prepare_web.py --directory web
```

Sirva a pasta `web/` por HTTP; abrir `index.html` diretamente como arquivo local não é compatível com o carregamento do jogo.

## Verificar o projeto

Com Godot 4.7.2, Python 3 e Node.js disponíveis:

```bash
python3 tools/verify.py
```

O verificador executa os testes de jogabilidade, interface, áudio, preferências, modos locais e exportação. Ele cria artefatos temporários nas pastas `build/` e `web/`.

## Créditos e licenças

Os créditos e as licenças dos recursos de código aberto estão disponíveis em **Licenças de código aberto**, na tela inicial. Os avisos de licença necessários também acompanham os arquivos de fonte e mídia incluídos no projeto.
