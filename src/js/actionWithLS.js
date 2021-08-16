import { renderWatchedQueueFilms } from "./renderWatchedQueue";

export function initLocalStorage() {
    if (localStorage.getItem('watched') === "" || localStorage.getItem('watched') === null) {
        localStorage.setItem('watched', JSON.stringify([]));
    }

    if (localStorage.getItem('queue') === "" || localStorage.getItem('queue') === null) {
        localStorage.setItem('queue', JSON.stringify([]));
    }

    localStorage.setItem('isLibrary', JSON.stringify(false));
    localStorage.setItem('isWatchedLibrary', JSON.stringify(true));
}

export function refreshPage(key) {
    if (JSON.parse(localStorage.getItem('isLibrary')) === true) {
        if (JSON.parse(localStorage.getItem('isWatchedLibrary')) === true) {
            renderWatchedQueueFilms('watched');
        }
        else {
            renderWatchedQueueFilms('queue');
        }

    }
}

export function save(key, value) {
    if (key === 'queue' || key === 'watched') {
        try {
            let array = [];

            if (localStorage.getItem(key) === '') {
                array.push(value);
                localStorage.setItem(key, JSON.stringify(array));
            }
            else {
                let isExists = false;

                array = JSON.parse(localStorage.getItem(key));

                array.forEach(function (item) {
                    if (item.id === value.id) {
                        isExists = true;
                    }
                });

                if (!isExists) {
                    array.push(value);
                    localStorage.setItem(key, JSON.stringify(array));
                }
                else {
                    console.log("Value is exists");
                }
            }
        } catch (error) {
            console.error("Set state error: ", error.message);
        }
    }
    else {
        console.log('Key - is not exists');
    }
};

export function load(key) {
    if (key === 'queue' || key === 'watched') {
        try {
            const serializedState = localStorage.getItem(key);
            return serializedState === null ? undefined : JSON.parse(serializedState);
        } catch (error) {
            console.error("Get state error: ", error.message);
        }
    }
};

export function deleteObj(key, value) {
    try {
        let array = [];

        array = JSON.parse(localStorage.getItem(key));

        const resultFilms = array.filter((item) => item.id !== value);
        localStorage.setItem(key, JSON.stringify(resultFilms));
    }
    catch (error) {
        console.error("Remove state error: ", error.message);
    }
};

export function deleteArray(key) {
    try {
        localStorage.setItem(key, JSON.stringify([]));
    }
    catch (error) {
        console.error("Remove state error: ", error.message);
    }
};

export function clearLocalStorage() {
    try {
        localStorage.clear();
    }
    catch (error) {
        console.log("Remove state error: ", error.message);
    }
}