export const productValidation = (product, res) => {
    if (name.length < 1 || description.length < 1) {
        return res.status(400).send(ERROR_NAME_DESCRIPTION_LENGTH);
    }
    if (description.length > 500) {
        return res.status(400).send(ERROR_DESCRIPTION_TOO_LONG);
    }
    if (name.length > 25) {
        return res.status(400).send(ERROR_NAME_TOO_LONG);
    }
    if (!quantity) {
        return res.status(400).send(ERROR_MISSING_QUANTITY);
    }
    if (!pictures) {
        return res.status(400).send(ERROR_MISSING_PICTURES);
    }
    if (!price) {
        return res.status(400).send(ERROR_MISSING_PRICE);
    }
    if (!category) {
        return res.status(400).send(ERROR_MISSING_CATEGORY);
    }
    if (!mainPicture) {
        return res.status(400).send(ERROR_MISSING_MAIN_PICTURE);
    }
    if (!req.userId) {
        return res.status(401).send(ERROR_NOT_AUTHENTICATED);
    }
};
//# sourceMappingURL=productValidation.js.map