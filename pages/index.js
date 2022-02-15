import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from "react";
import Api from './api';
import InfiniteScroll from "react-infinite-scroll-component";
import RepoCard from './components/RepoCard';
import Footer from './components/Footer';
import Loader from './components/Loader';

export default function Home() {
    const [repos, setRepos] = useState([]);
    const [query, setQuery] = useState();
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        getRepo();
    }, [])

    //fetch repo list from api
    const getRepo = async () => {
        try {
            const res = await Api.getRepo({ per_page: 5 });
            if (res) {
                setRepos(res.data);
            }
        } catch (ex) {
            console.log(ex.message);
        }
    }

    //fetch search result from api
    const onSearch = async () => {
        try {
            const res = await Api.search({ query: query, per_page: 5 });
            if (res) {
                setRepos(res.data.items);
                if (res.data.total_count > res.data.items.length)
                    setHasMore(true)
                else
                    setHasMore(false)
            }
        } catch (ex) {
            console.log(ex.message);
        }
    }

    //fetch search result from api
    const getMorePost = async () => {
        let total = repos.length + 5;
        console.log(total)
        if (query) {

            try {
                const res = await Api.search({ query: query, per_page: total });
                if (res) {
                    setRepos(res.data.items);
                    if (res.data.total_count > res.data.items.length)
                        setHasMore(true)
                    else
                        setHasMore(false)
                }
            } catch (ex) {
                console.log(ex.message);
            }
        } else {
            try {
                const res = await Api.getRepo({ per_page: total });
                if (res) {
                    if (res.data.length > repos.length) {
                        setHasMore(true)
                    }
                    else {
                        setHasMore(false)
                    }
                    setRepos(res.data);
                }
            } catch (ex) {
                console.log(ex.message);
            }
        }
    }

    //change handler for search input
    const onChangeHandler = (event) => {
        let val = event.target.value;
        setQuery(val);
        onSearch();
    }

    // console.log(repos)

    return (
        <div className={styles.container}>
            <Head>
                <title>Home | Github Public Repo</title>
                <meta name="description" content="Build for Recruitopia Test" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    <a className='text-primary' href="https://github.com">Github</a> Public Repositories
                </h1>

                <p className={styles.description}>
                    You can start by searching for public repositories own by <a className='text-primary' href="https://github.com/react-native-community">React Native Community</a>
                </p>

                <div className={styles.grid}>
                    <div className='row my-6'>
                        <div className='col-12 d-flex align-items-center mb-4'>
                            <input type="text" name="search" className='form-control me-2' placeholder='Search any public repository' onChange={(e) => onChangeHandler(e)} />
                            <button className='btn btn-primary text-nowrap' onClick={() => onSearch()}><span className='d-none d-md-inline'>Search</span> <span className='mdi mdi-file-search-outline'></span></button>
                        </div>

                        <InfiniteScroll
                            dataLength={repos.length}
                            next={getMorePost}
                            hasMore={hasMore}
                            loader={<Loader />}
                            endMessage={repos.length > 0 && <p className='text-center my-3'>End of Repositories</p>}
                        >
                            {repos.length > 0 ?
                                repos.map((item, index) => (
                                    <div className='col-12 mb-2' key={index}>
                                        <RepoCard data={item} />
                                    </div>
                                ))
                                :
                                <div className='col-12 text-center'>
                                    No public repositories available
                                </div>
                            }
                        </InfiniteScroll>
                    </div>
                </div>
            </main>

            {/* footer */}
            <Footer />

        </div>
    )
}
