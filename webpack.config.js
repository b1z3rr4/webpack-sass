const path = require('path');  // Importa o módulo 'path' do Node.js para manipulação de caminhos de arquivos
const HtmlWebpackPlugin = require('html-webpack-plugin');  // Plugin para gerar arquivos HTML
const MiniCssExtractPlugin = require('mini-css-extract-plugin');  // Plugin para extrair CSS em arquivos separados

module.exports = {
    entry: "./src/index.js",  // Ponto de entrada do webpack, onde começa a construção do bundle
    output: {
        filename: "main.js",  // Nome do arquivo JavaScript de saída
        path: path.resolve(__dirname, 'dist')  // Diretório de saída absoluto usando o módulo 'path'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",  // Nome do arquivo HTML de saída
            template: "./src/index.html"  // Arquivo HTML de template
        }),
        new MiniCssExtractPlugin({
            filename: "styles.css"  // Nome do arquivo CSS de saída
        })
    ],
    mode: 'development',  // Modo de construção do webpack ('development', 'production' ou 'none')
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,  // Expressão regular para arquivos CSS, SASS e SCSS
                use: [
                    MiniCssExtractPlugin.loader,  // Extrai o CSS para arquivos separados
                    'css-loader',  // Carrega arquivos CSS, resolve dependências e importações
                    'sass-loader'  // Compila SASS/SCSS para CSS
                ]
            },
            {
                test: /\.css$/i,  // Expressão regular para arquivos CSS simples
                use: [
                    'style-loader',  // Injeta CSS no DOM usando uma tag <style>
                    'css-loader'  // Carrega arquivos CSS, resolve dependências e importações
                ]
            },
            {
                test: /\.js$/,  // Expressão regular para arquivos JavaScript
                exclude: /node_modules/,  // Exclui o diretório 'node_modules' do processo de transpilação
                use: {
                    loader: 'babel-loader',  // Usa o Babel para transpilar código JavaScript
                    options: {
                        presets: ['@babel/preset-env']  // Conjunto de presets do Babel para compatibilidade com ambientes
                    }
                }
            },
        ]
    }
}
