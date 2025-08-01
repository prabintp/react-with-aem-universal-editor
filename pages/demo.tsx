import ImageWithCTA from "@/components/image-with-cta-pro";
import Header from '@/components/header';
import Footer from '@/components/footer';
import Head from "next/head";

import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa6";

const footerSections = [
  {
    title: "Hospitality",
    links: [
      { label: "Offices", href: "#" },
      { label: "Retails", href: "#" },
      { label: "Hotels", href: "#" },
      { label: "Residence", href: "#" }
    ],
  },
  {
    title: "Diriyah",
    links: [
      { label: "News", href: "#" },
      { label: "Media", href: "#" },
      { label: "Events", href: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#" },
      { label: "Jobs", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of service", href: "#" },
      { label: "Privacy policy", href: "#" },
      { label: "License", href: "#" },
    ],
  },
];

const socialIcons = [
  { icon: FaFacebookF, href: "#" },
  { icon: FaInstagram, href: "#" },
  { icon: FaXTwitter, href: "#" },
  { icon: FaGithub, href: "#" },
  { icon: FaYoutube, href: "#" },
];


interface HomeProps {
  readonly content: {
    pageTitle?: string;
    _path?: string
    pageDescription?: { plaintext: string };
    componentFragmentReference?: any[];
  } | null;
}

export default function Home({ content }: HomeProps) {

const { pageTitle, pageDescription, componentFragmentReference } = content || {};

console.log("content : ", JSON.stringify(content));
  return (
    <>
      <Head>
            <script src="https://universal-editor-service.adobe.io/cors.js" async></script>
            <meta name="urn:adobe:aue:system:aemconnection" content={`aem65:${process.env.NEXT_PUBLIC_AEM_ON_PREM_HOST_AUTHOR}`}></meta>
             <meta
          name="urn:adobe:aue:config:service"
          content="https://author-diriyah-dev1.adobecqms.net/universal-editor"
        />
            
            
              </Head>
    
    <div>
       <Header />
    <div
      className={`items-center justify-items-center mx-auto`}
    >
      <main className=" w-full flex flex-col gap-[32px] row-start-2 items-center sm:items-start" 
      data-aue-type="page"
      data-aue-resource={`urn:aemconnection:${content?._path}/jcr:content/data/master`}

      >
    
      {componentFragmentReference && componentFragmentReference.map((component, index) => (
        <ImageWithCTA
          key={component.id || index}
          title={component.title}
          description1={component.description1?.plaintext ?? ''}
          imageUrl= {`${process.env.NEXT_PUBLIC_AEM_ON_PREM_HOST}${component.componentImage.image._path}`}
          imageAlt={component.componentImage?.imageAltText ?? ''}
          variation={index === 0 ? "background" : index % 2 === 0 ? 'left' : 'right'}
          cfPath={component._path}
        />
      ))}


<div className="container mx-auto flex flex-col items-center gap-3.5 justify-center pb-12" data-aue-type="page"
      data-aue-resource={`urn:aemconnection:${content?._path}/jcr:content/data/master`}>
<h1
        data-aue-prop="pageTitle"
        data-aue-type="text"  
        data-cf-field="title"
        className="text-4xl font-bold text-gray-900"

        >{pageTitle}</h1>
      <p className="text-2xl" data-aue-prop="pageDescription" data-aue-type="text" data-aue-label="pageDescription"> 
        {pageDescription?.plaintext}
      </p>
        

</div>
   
       
      </main>
     
     
     
    </div>
    <Footer
      logo={<span className="text-indigo-600 text-3xl font-bold">〰</span>}
      sections={footerSections}
      socialLinks={socialIcons}
      copyright="© 2024 Diriyah, Inc. All rights reserved."
    />
    </div>
    </>
  );
}

export async function getServerSideProps() {
    console.log("host : " , process.env.NEXT_PUBLIC_AEM_ON_PREM_HOST);
    console.log("endpoint : " , process.env.NEXT_PUBLIC_AEM_ON_PREM_GRAPHQL_ENDPOINT);
    console.log("auth : " , process.env.NEXT_PUBLIC_AEM_ON_PREM_AUTH);

    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  const res = await fetch(`${process.env.NEXT_PUBLIC_AEM_ON_PREM_HOST}${process.env.NEXT_PUBLIC_AEM_ON_PREM_GRAPHQL_ENDPOINT}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(process.env.NEXT_PUBLIC_AEM_ON_PREM_AUTH && { Authorization: process.env.NEXT_PUBLIC_AEM_ON_PREM_AUTH }), // Include Authorization only if defined
    }
  });

  const json = await res.json();
  console.log("response : " , json.data);
  if (!res.ok) {
    console.error("Error fetching data from AEM:", json);
    console.error("Error fetching data from AEM:", json);
    return {
      notFound: true,
    };
  }

  const content = json?.data.diriyahPageContentFragmentModelByPath?.item || null;

  return {
    props: { content },
  };
}
