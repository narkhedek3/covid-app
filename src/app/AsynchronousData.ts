
import { Observable } from 'rxjs';

const arr = [1];

export const asyncData = new Observable((observer) => {
    observer.next(arr);
    setInterval(() => {
        arr.push(arr.length + 1);
        observer.next(arr);
    }, 1000);
});
