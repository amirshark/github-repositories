import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from "react";
import Api from './api'

export default function Home() {
    const [repos, setRepos] = useState([]);
    const [query, setQuery] = useState();

    useEffect(() => {
        getRepo();
    }, [])

    const getRepo = async () => {
        try {
            const res = await Api.getRepo();
            setRepos(res);
        } catch (ex) {
            console.log(ex.message);
        }
    }

    const onSearch = async () => {
        try {
            console.log('test', query)
            const res = await Api.search({ query: query });
            if (res)
                setRepos(res.items);
        } catch (ex) {
            console.log(ex.message);
        }
    }

    const onChangeHandler = (event) => {
        let val = event.target.value;
        setQuery(val);
    }

    console.log(repos)

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
                        {repos.length > 0 ?
                            repos.map((item, index) => (
                                <div className='col-12 mb-2' key={index}>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col-12 col-md-6'>
                                                    <h5 className='fw-bold'>{item.name || 'Repository Name'}</h5>
                                                    <p className='mb-0'>{item.description || 'Repository Description'}</p>
                                                </div>
                                                <div className='col-12 col-md-6 text-end'>
                                                    <p className='fs-6 mb-2'><span className='mdi mdi-star text-warning'></span>&nbsp;{item.stargazers_count || 0}&nbsp;&nbsp;<span className='mdi mdi-source-fork text-success'></span>&nbsp;{item.forks_count || 0}&nbsp;&nbsp;<span className='mdi mdi-eye text-info'></span>&nbsp;{item.watchers_count || '0'}</p>
                                                    <p className='mb-0'>Javascript</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            :
                            <div className='col-12 text-center'>
                                No public repositories available
                            </div>
                        }
                    </div>
                </div>
            </main>

            <footer className={styles.footer}>
                <a
                    href="https://recruitopia.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Developed for{' '}
                    <span className="">
                        <img className='img-fluid ms-2' src="/images/logo.png" alt="Recruitopia Logo" width={100} />
                    </span>
                </a>
            </footer>
        </div>
    )
}
