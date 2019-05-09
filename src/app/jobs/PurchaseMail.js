const Mail = require('../services/Mail')

class PurchaseMail {
  get key () {
    return 'PurchaseMail'
  }

  // job recebe os parametros a ser utilizado
  // done é a proxima funcao a ser chamada apos concluir
  async handle (job, done) {
    const { ad, user, content } = job.data

    await Mail.sendMail({
      from: '"Rafael Sobucki <sobucki@gmail.com>"',
      to: ad.author.email,
      subject: `Solicitação de compra: ${ad.title}`,
      template: 'purchase',
      context: { user, content, ad }
    })

    return done()
  }
}
module.exports = new PurchaseMail()
