import { serverAdress } from '../../globalVariables';
import { useEffect } from 'react';
import axios from 'axios';

import styles from "./Categories.module.css"
const Categories = () => {
    const getItems = async () => {
        const {data} = await axios.get(`${serverAdress}/items/`)
        return data;
    };

    useEffect(() => {
        (async () => console.log(await getItems()))();
    }, [])

    return (<main className={styles.main}>
        <div id="categoriesWrapper">
            <h3 className={styles.h3}>Categories</h3>

        </div>

        <div id="itemsWrapper">

        </div>
    </main>
    )
}
export default Categories;