/* 
    [] will allow nextjs to know this is a
    dynamically changing route. 
*/

/* 
    This function runs at build time and will return
    all possible ids and this will help our program
    know how to generate the correct routes for each
    id.

    Determines how many html pages need to be created
    based on data.
*/
export const getStaticPaths = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await res.json();

    // This will loop through all of the data returned for reference
    const paths = data.map(ninja => {
        return {
            params: { id: ninja.id.toString() }
        }
    })

    // Nextjs will see that data and return the appropriate amount of pages.
    return {
        paths,
        fallback: false
    }
}

/* 
    We get access to the properties we need
    via the context param.

    This function will loop through each of all
    the data objects that we get returned and 
    fetch each item that we need to later put
    into our component.
*/
export const getStaticProps = async (context) => {
    const id = context.params.id; // Search through our ninja params each time and return the ids
    const res = await fetch('https://jsonplaceholder.typicode.com/users/' + id);
    const data = await res.json();

    return {
        props: { ninja: data }
    }
}

// Our Details component that will render information for each user
const Details = ({ ninja }) => {
    console.log(ninja);
    return (
        <div>
            <h1>{ ninja.name }</h1>
            <p>{ ninja.email }</p>
            <p>{ ninja.website }</p>
            <p>{ ninja.address.city }</p>
        </div>
    )
}

export default Details;