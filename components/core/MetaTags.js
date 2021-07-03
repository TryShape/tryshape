// head
import Head from "next/head";

const MetaTags = () => {
  return (
    <Head>
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />
      <meta name="theme-color" content="#645AD3" />

      <title>TryShap - Create, Export, Share, and Use any Shapes of your choice.</title>
      <meta
        name="description"
        content="TryShape is an opensource platform to create shapes of your choice using a simple, easy-to-use interface. You can create banners, circles, polygonal shapes, export them as SVG, PNG, and even as CSS."
      />
      <meta
        name="keywords"
        content="tryshape, tryshape tapas, tyshape github, css, css clip path, shapes, css shapes, github shapes, clippy, clip path shapes, types of shapes, css clip path shape, shape tool, generate css shapes, tyshape easy"
      />
      <link rel="canonical" href="https://tryshape.now.sh/" />
      <link rel="apple-touch-icon" href="/favicon.ico" />
      <link rel="icon" href="/favicon.ico" />

      {/* Primary Meta Tags */}
      <meta
        name="title"
        content="TryShap - Create, Export, Share, and Use any Shapes of your choice."
      />
      <meta
        name="description"
        content="TryShape is an opensource platform to create shapes of your choice using a simple, easy-to-use interface. You can create banners, circles, polygonal shapes, export them as SVG, PNG, and even as CSS."
      />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://tryshape.now.sh/" />
      <meta
        property="og:title"
        content="TryShap - Create, Export, Share, and Use any Shapes of your choice."
      />
      <meta
        property="og:description"
        content="TryShape is an opensource platform to create shapes of your choice using a simple, easy-to-use interface. You can create banners, circles, polygonal shapes, export them as SVG, PNG, and even as CSS."
      />
      <meta
        property="og:image"
        content="https://tryshape.vercel.app/readme/landing.png"
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://tryshape.now.sh/" />
      <meta
        property="twitter:title"
        content="TryShap - Create, Export, Share, and Use any Shapes of your choice."
      />
      <meta
        property="twitter:description"
        content="TryShape is an opensource platform to create shapes of your choice using a simple, easy-to-use interface. You can create banners, circles, polygonal shapes, export them as SVG, PNG, and even as CSS."
      />
      <meta
        property="twitter:image"
        content="https://tryshape.vercel.app/readme/landing.png"
      />
    </Head>
  );
};

export default MetaTags;
