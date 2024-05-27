
export function normalize (x) {
    if (typeof x !== 'string') {
        return null;
    }
    return x.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export function capitalize (string, lowerRestOfString = true) {
    if (!string) return string;
    return string[0].toUpperCase() + (lowerRestOfString ? string.slice(1).toLowerCase() : string.slice(1));
}

export function sleep (t, toReject = false) {
    return new Promise((resolve, reject) => {
        setTimeout(toReject ? reject : resolve, t);
    });
}

export function groupBy (array, key) {
    return array.reduce((rv, x) => {
        (rv[typeof key === 'function' ? key(x) : x[key]] = rv[typeof key === 'function' ? key(x) : x[key]] || []).push(x);
        return rv;
    }, {});
}

export function flattenObj (obj, parent, res = {}) {
    for (const key in obj) {
        const propName = parent ? parent + '_' + key : key;
        if (Array.isArray(obj[key])) {
            res[propName] = obj[key].length ? (obj[key]).join() : null;
        }
        else if (typeof obj[key] === 'object') {
            flattenObj(obj[key], propName, res);
        } else {
            res[propName] = obj[key];
        }
    }
    return res;
}

export function promiseAny (iterable) {
    return reverse(Promise.all([...iterable].map(reverse)));
}

function reverse (promise) {
    return new Promise((resolve, reject) => Promise.resolve(promise).then(reject, resolve));
}

export function promisifyStream (writableStream) {
    return new Promise((resolve, reject) => {
        writableStream.on('close', resolve).on('error', reject);
    });
}

export function isStream (stream) {
    return stream !== null && typeof stream === 'object' && typeof stream.pipe === 'function';
}

export function streamToBuffer (stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => {
            resolve(Buffer.concat(chunks));
        });
    });
}

export function streamToString (stream, searchEncoding = false) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => {
            const encoding = searchEncoding && chunks.length ? (/UTF/i.test(chunks[0].toString().slice(0, 100)) ? 'utf8' : 'latin1') : 'utf8';
            resolve(Buffer.concat(chunks).toString(encoding));
        });
    });
}

export function removeAccents (x) {
    if (!x || typeof x !== 'string') {
        return null;
    }

    return x.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function streamJsonToObject (stream) {
    const chunks = [];
    return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('error', reject);
        stream.on('end', () => {
            try {
                resolve(JSON.parse(chunks.join()));
            } catch (e) {
                reject(e);
            }
        });
    });
}

export function randomBetweenNumber (min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    );
}

export function recursiveReplace (text, pattern, replace) {
    const newText = text.replace(pattern, replace);
    if (newText === text) {
        return newText;
    }

    return recursiveReplace(newText, pattern, replace);
}

export function removeDuplicates (x) {
    return [...new Set(x)];
}

export function promiseAllAsObject (obj) {
    return Promise.all(
        Object.entries(obj).map(async ([k, v]) => [k, await v])
    ).then(Object.fromEntries);
}