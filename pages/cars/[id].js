// allows us to access query params from url
import { useRouter } from "next/router";
import Head from 'next/head'

export default function Car({ car }) {
    const router = useRouter();
    const {id} = router.query;

    return (
    <>
    <Head>
        <title>{car.color} {car.id}</title>
    </Head>
    <h1>Hello {id}</h1>
    <img src={car.image} />
    </>
    )
}


// implement getStaticProps inside component file
// when you build site, next will auto call this function then send
// to component itself 

export async function getStaticProps({ params }) {
    const req = await fetch(`http://localhost:3000/${params.id}.json`);
    const data = await req.json();

    return {
        // use props in function component param
        props: {car: data},
    }
}

// next doesnt know how many pages associated to dynamic route,
// inorder to pre-render all car ids, next needs to know ids in advance.
// so we implement getstaticpaths()
// this function can also request data from api or database.
// returns paths object that contains array with every route for this url

export async function getStaticPaths() {
    const req = await fetch('http://localhost:3000/cars.json');
    const data = await req.json();

    const paths = data.map(car => {
        return { params: {id:car }}
    })

    return {
        paths,
        fallback: false
    }
}
