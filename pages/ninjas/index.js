import Link from 'next/link'

// Styles
import styles from '../../styles/Ninjas.module.css';

/* 
    This function only runs at build time.
    We will add a fetch request for any component
    that we need. This does not run in the browser.
    async
*/
export const getStaticProps = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    return {
        // Return object for data for our components
        props: { ninjas: data }
    }
}

const Ninjas = ({ ninjas }) => {
    return (
        <div>
            <h1>All Ninjas</h1>
            {/* 
                We are returning a template within the parenthesis.
                A key is required when returning an array. This helps
                react identify the unique identity of each key. It's
                important not to auto generate keys(rnd) or use indexes as
                keys as it may lead to un-intentional behaviour such as
                performance drops.
            */}
            {ninjas.map(ninja => (
                <Link href={`/ninjas/${ninja.id}`} key={ninja.id}>
                <a className={styles.single}>
                    <h3>{ ninja.name }</h3>
                </a>
                </Link>
            ))}
        </div>
    );
}

export default Ninjas;