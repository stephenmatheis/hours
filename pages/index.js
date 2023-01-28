import Head from 'next/head';
import Projects from '@/components/projects/projects';

export default function Home() {

    return (
        <>
            <Head>
                <title>Hours</title>
                <meta name="description" content="Stephen Matheis' resume" />
            </Head>
            <div className='ctr'>
                <h1>
                    Hours
                </h1>
                <Projects />
            </div>
        </>
    )
}
