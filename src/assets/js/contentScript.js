function PrintDB() {
    console.log("start");
    if (!('indexedDB' in window)) {
        console.log("This browser doesn't support IndexedDB");
    } else {

        let indexdb = window.indexedDB.open('localforage', 2);
        indexdb.onsuccess = (event) => {
            let db = event.target.result;

            let transaction = db.transaction('keyvaluepairs', 'readonly');

            let storage = transaction.objectStore('keyvaluepairs');

            console.log(storage.getAll());

        };
        indexdb.onupgradeneeded = () => {
            const db = event.target.result;

            // Create an objectStore for this database
            const objectStore = db.createObjectStore("name", { keyPath: "myKey" });
            console.log("onupgradeneeded");
        };
        indexdb.onerror = () => {
            console.log(indexdb.error);
        };
    };
}
