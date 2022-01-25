const proxy = [
  {
    context: '/profissao',
    target: 'http://localhost:8080',
    pathRewrite: { '^/profissao': '' }
  }
];
module.exports = proxy;