import SQLite from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const db = SQLite.openDatabase(
    { name: 'cartracking.db', location: 'default' },
    () => console.log('SQLite DB opened'),
    error => console.log('SQLite error', error)
);
