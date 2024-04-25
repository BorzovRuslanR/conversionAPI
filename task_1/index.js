import {encoded, translations} from './data.js'

function decodeTranslate(encoded, translations) {
    const excludedFields = ["groupId", "service", "formatSize", "ca"];

    let decoded;
    if (Array.isArray(encoded[0])) {
        decoded = encoded.map((item) => {
            const decodedItem = {};
            for (let i = 0; i < item.length; i++) {
                const key = Object.keys(translations)[i]; 
                const value = item[i];
                if (key.endsWith("Id")) { 
                    const field = key.slice(0, -2);
                    if (!excludedFields.includes(field)) { 
                        if (translations[field]) {
                            decodedItem[field] = translations[field][value] || value;
                        } else {
                            decodedItem[field] = value;
                        }
                    }
                } else {
                    decodedItem[key] = value;
                }
            }
            return decodedItem;
        });
    } else if (Array.isArray(encoded)) {
        decoded = encoded;
    } else {
        throw new Error("Некорректный формат данных");
    }

    return decoded;
}


const result = decodeTranslate(encoded, translations);
console.log(result.decoded);
console.log(result.uniqueIds);