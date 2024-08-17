import { useEffect, useState } from "react";
import './index.css';

export default function Pagination() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const fetchedData = async () => {
        const getData = await fetch('https://dummyjson.com/products?limit=100');
        const data = await getData.json();
        if (data && data.products) {
            setProducts(data.products)
        }
        console.log(data.products)
    }

    const selectedPageHandler = (selectedPage) => {
        if (selectedPage >= 1 && selectedPage <= products.length / 10 && selectedPage != page)
            setPage(selectedPage);
    }
    useEffect(() => {
        fetchedData();
    }, [])
    return (
        <div>
            {
                products.length > 0 && (
                    <div className="products">
                        {
                            products.slice(page * 10 - 10, page * 10).map((prod) => {
                                return (
                                    <span className="products__single" key={prod.id}>
                                        <img src={prod.thumbnail} alt={prod.title} />
                                        <span>{prod.title}</span>
                                        <span>${prod.price}</span>
                                    </span>
                                )
                            })}
                    </div>
                )}
            {
                products.length > 0 && <div className="pagintaion">
                    <span 
                     className={page >1 ? '' : 'pagination_disable'}
                    onClick={() => selectedPageHandler(page - 1)}>◀</span>
                    {
                        [...Array(products.length / 10)].map((_, i) => {
                            return <span
                                className={page === i + 1 ? 'pagintaion__selected' : ''}
                                onClick={() => selectedPageHandler(i + 1)}
                                key={i}>{i + 1}</span>
                        })
                    }
                    <span
                        className={page < products.length / 10 ? '' : 'pagination_disable'}
                        onClick={() => selectedPageHandler(page + 1)}>👨🏿‍🤝‍👨🏽</span>
                </div>
            }

        </div>
    )
}
