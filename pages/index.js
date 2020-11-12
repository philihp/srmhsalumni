import React from 'react'
import Head from 'next/head'
import Header from '../components/header'

export default function Home() {
  return (
    <main className="relative font-serif antialiased text-gray-900 max-w-screen-xl mx-auto">
      <Head>
        <title>SRMHS Alumni</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="Article px-4 lg:px-0 prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto">
        <p>
          Cupcake ipsum dolor sit amet danish chocolate sweet roll. Lollipop
          sweet roll cookie jelly-o jelly beans oat cake tart lollipop. Pie
          marshmallow candy canes candy canes biscuit lemon drops brownie cake
          liquorice. Jujubes sweet roll bonbon candy. Cheesecake gummi bears
          cake bonbon tootsie roll pudding gingerbread croissant. Powder
          chocolate cake danish biscuit brownie ice cream. Tootsie roll
          liquorice pastry jelly beans jelly beans danish gummi bears. Tart
          biscuit danish candy canes.
        </p>
        <p>
          Chocolate danish oat cake halvah donut marshmallow ice cream chocolate
          cake. Tootsie roll pudding sugar plum chupa chups. Wafer marshmallow
          chupa chups donut jelly-o gingerbread brownie gingerbread. Icing
          lollipop jelly. Chocolate bar oat cake dragée sweet roll carrot cake.
          Cheesecake bonbon gingerbread macaroon muffin cotton candy. Ice cream
          pastry sugar plum carrot cake.
        </p>
        <p>
          Halvah cake liquorice donut sugar plum. Toffee brownie ice cream pie
          cake jujubes caramels. Wafer marzipan brownie fruitcake. Cupcake
          soufflé carrot cake. Jelly beans chocolate cake candy canes lollipop
          powder fruitcake sesame snaps jelly beans. Sugar plum cupcake
          croissant chocolate bar powder wafer cotton candy jelly-o tart.
          Gingerbread macaroon powder gummi bears biscuit.
        </p>
      </div>
      <style jsx>
        {`
          .Article {
          }
        `}
      </style>
    </main>
  )
}
