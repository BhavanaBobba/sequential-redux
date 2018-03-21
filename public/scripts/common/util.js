Array.prototype.any = function (predicate) {
    return !this.every(x=> !predicate(x));
};

export function punctuatedString(input) {
    switch (input.length) {
        case 0: {
            return input;
        }
        case 1: {
            return input[0];
        }
        case 2: {
            return `${input[0]} and ${input[1]}`;
        }
        default: {
            let returnString = input[0];
            for (let i = 1; i < input.length; i++) {
                if (i < input.length - 1) {
                    returnString += `, ${input[i]}`;
                } else {
                    returnString += ",";
                    returnString += ` and ${input[i]}`;
                }
            }
            return returnString;
        }
    }
}

export function convertCsvToNumberArray(input) {
    if (input) {
        return input.split(",").map(Number);
    }

    return [];
}

export function appendClass(class1, class2) {
    return class2 ? class1 + " " + class2 : class1;
}

export function anyValueMatches(values, filterValue) {

    return !filterValue
        || values.any(value => contains(value, filterValue));

}

export function contains(item, search) {
    return item && item.toUpperCase().includes(search.toUpperCase());
}

export function compareFields(fieldName, isDescending) {
    return (a, b)=> {
        const result = compare(a[fieldName], b[fieldName]);
        return isDescending ? -result : result;
    }
}

export function compare(a, b) {
    if (a < b)
        return -1;

    if (a > b)
        return 1;

    if (a == null && b != null) return -1;
    if (a != null && b == null) return 1;

    return 0;
}