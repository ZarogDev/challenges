import xss from "xss";
// nettoie les strings dans les objets, tableaux, etc.
function sanitizeData(data) {
    if (typeof data === "string") {
        return xss(data);
    }
    if (Array.isArray(data)) {
        return data.map((item) => sanitizeData(item));
    }
    if (data !== null && typeof data === "object") {
        const sanitizedObject = {};
        for (const [key, value] of Object.entries(data)) {
            sanitizedObject[key] = sanitizeData(value);
        }
        return sanitizedObject;
    }
    return data;
}
// middleware global pour nettoyer body, query et params
export function sanitizeXss(req, _res, next) {
    try {
        if (req.body) {
            req.body = sanitizeData(req.body);
        }
        next();
    }
    catch (error) {
        next(error);
    }
}
