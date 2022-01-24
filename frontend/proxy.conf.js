const proxy = [
  {
    context: '/profissoes',
    target: 'http://localhost:8080',
    pathRewrite: { '^/profissoes': '' }
  }
];
module.exports = proxy;