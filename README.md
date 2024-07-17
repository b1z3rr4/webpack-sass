### Aula Avançada de Sass com Webpack

#### Objetivos:
- Entender o uso de funções, operadores, loops, condicionais e mapas no Sass.
- Configurar um projeto com Webpack para buildar arquivos Sass.

#### Estrutura do Projeto:
- `src/`
  - `styles/`
    - `main.scss`
    - `_variables.scss`
    - `_functions.scss`
    - `_mixins.scss`
  - `index.js`
  - `index.html`
- `webpack.config.js`
- `package.json`

### Passo a Passo

#### 1. Inicialização do Projeto

Primeiro, vamos inicializar um projeto npm:

```bash
npm init -y
```

Em seguida, instale as dependências necessárias:

```bash
npm install webpack webpack-cli webpack-dev-server html-webpack-plugin mini-css-extract-plugin @babel/core babel-loader @babel/preset-env css-loader style-loader sass-loader sass --save-dev
```

#### 2. Estrutura dos Arquivos Sass

Vamos começar criando os arquivos Sass dentro do diretório `src/styles/`.

##### `_variables.scss`

```scss
$primary-color: #3498db;
$secondary-color: #2ecc71;
$font-stack: Helvetica, sans-serif;
```

##### `_functions.scss`

```scss
@function multiply($value1, $value2) {
  @return $value1 * $value2;
}
```

##### `_mixins.scss`

```scss
@mixin flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

@mixin responsive($breakpoint) {
  @if $breakpoint == mobile {
    @media (max-width: 600px) { @content; }
  } @else if $breakpoint == tablet {
    @media (max-width: 768px) { @content; }
  } @else if $breakpoint == desktop {
    @media (min-width: 1024px) { @content; }
  }
}
```

##### `main.scss`

```scss
@import 'variables';
@import 'functions';
@import 'mixins';

// Operadores
body {
  font-family: $font-stack;
  color: $primary-color;
  padding: multiply(10px, 2);
}

// Loops
@for $i from 1 through 3 {
  .column-#{$i} {
    width: 100% / $i;
  }
}

// Condicionais
$theme: light;

body {
  @if $theme == light {
    background: #fff;
    color: #333;
  } @else {
    background: #333;
    color: #fff;
  }
}

// Mapas
$themes: (
  light: #fff,
  dark: #333
);

@each $theme-name, $theme-color in $themes {
  .theme-#{$theme-name} {
    background: $theme-color;
  }
}

// Mixins
.container {
  @include flex-center;
  @include responsive(mobile) {
    background: $secondary-color;
  }
}
```

#### 3. Arquivos Webpack e JS

##### `index.js`

```javascript
import './styles/main.scss';

console.log('Webpack and Sass setup complete!');
```

##### `index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Advanced Sass with Webpack</title>
</head>
<body>
  <div class="container">
    <p class="theme-light">This is a light theme.</p>
    <p class="theme-dark">This is a dark theme.</p>
    <div class="column-1">Column 1</div>
    <div class="column-2">Column 2</div>
    <div class="column-3">Column 3</div>
  </div>
  <script src="bundle.js"></script>
</body>
</html>
```

##### `webpack.config.js`

```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css"
        })
    ],
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/i,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    }
}
```

#### 4. Configuração do `package.json`

Adicione um script para construir o projeto:

```json
"scripts": {
  "build": "webpack",
  "start": "webpack-dev-server"
}
```

#### 5. Build do Projeto

Para buildar o projeto, execute:

```bash
npm run build
```

#### 6. Estrutura Final

```plaintext
.
├── dist
│   └── main.js
    └── index.html
    └── styles.css
├── src
│   ├── index.html
│   ├── index.js
│   └── styles
│       ├── _functions.scss
│       ├── _mixins.scss
│       ├── _variables.scss
│       └── main.scss
├── package.json
└── webpack.config.js
```

#### 7. Executando o Projeto

Para executar o projeto, execute:

```bash
npm run start
```

### Links de apoio
Claro! Vou fornecer alguns links úteis para entender o Webpack, o SASS e a utilização do `@content` em mixins do SASS.

#### Webpack
1. **Documentação Oficial**: [Webpack Documentation](https://webpack.js.org/concepts/)
2. **Tutorial do MDN**: [MDN Web Docs - Introduction to Webpack](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
3. **Artigo no FreeCodeCamp**: [A Practical Guide to Webpack](https://www.freecodecamp.org/news/a-practical-guide-to-webpack/)
4. **Curso no YouTube**: [Webpack 5 Tutorial for Beginners](https://www.youtube.com/watch?v=MpGLUVbqoYQ)

#### SASS
1. **Documentação Oficial**: [SASS Documentation](https://sass-lang.com/documentation)
2. **Guia no CSS-Tricks**: [A Complete Guide to Sass](https://css-tricks.com/sass-guide/)
3. **Tutorial no FreeCodeCamp**: [Learn Sass in 20 Minutes](https://www.freecodecamp.org/news/learn-sass-in-20-minutes/)
4. **Curso no YouTube**: [Sass Crash Course](https://www.youtube.com/watch?v=Zz6eOVaaelI)

#### `@content` em Mixins no SASS
1. **Documentação Oficial sobre Mixins**: [Mixins - SASS Documentation](https://sass-lang.com/documentation/at-rules/mixin)
2. **Artigo Explicativo**: [Understanding @content in Sass](https://css-tricks.com/understanding-the-sass-content-directive/)
3. **Guia no DigitalOcean**: [Sass: Using @content in Mixins](https://www.digitalocean.com/community/tutorials/using-content-in-mixins-sass)
4. **Curso no YouTube**: [SASS Mixins Tutorial](https://www.youtube.com/watch?v=wz52HG48Lbo)
