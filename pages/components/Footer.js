
import styles from '../../styles/Home.module.css';
export default function Footer() {

    return (
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
    )
}