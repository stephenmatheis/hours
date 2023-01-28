import { useState, useEffect } from 'react';
import styles from './projects.module.scss';

export default function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const request = window.indexedDB.open('Hours', 1);

        request.onsuccess = function (event) {
            // get database from event
            const db = event.target.result;

            // create transaction from database
            const transaction = db.transaction('testObjectStore', 'readwrite');

            // get store from transaction
            const dataStore = transaction.objectStore('testObjectStore');

            // if the first or last name fields have been stored, set them
            // as the state hook values
            dataStore.get('firstname').onsuccess = (event) => {
                const { result } = event.target;

                if (result && result.value) {
                    setNames(prevNames => ({ ...prevNames, firstname: result.value }));
                }
            }

            dataStore.get('lastname').onsuccess = (event) => {
                const { result } = event.target;

                if (result && result.value) {
                    setNames(prevNames => ({ ...prevNames, lastname: result.value }));
                }
            }
        }

        // log any errors
        request.onerror = (event) => {
            console.log('[onerror]', request.error);
        }

        // handle if an upgrade is needed
        request.onupgradeneeded = (event) => {
            const db = event.target.result;

            db.createObjectStore('testObjectStore', { autoIncrement: true });
        }
    }, [])

    return (
        <div className={styles['projects']}>
            <h2>Projects</h2>
            {/* Projects */}
            {/* Toolbar */}
            <div className={styles['toolbar']}>
                <button
                    className={styles['btn']}
                    onClick={() => {
                        console.log('clicked');
                    }}
                >
                    Add
                </button>
            </div>
        </div>
    )
}
