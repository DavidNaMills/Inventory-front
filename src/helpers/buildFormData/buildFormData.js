
const buildFormData = (data) => {
    const formData = new FormData();
    for (let k in data) {
        if (k === 'image' && data[k]) {
            formData.append('image', data.image[0]);
        } else if (Array.isArray(data[k])) {
            formData.append(k, JSON.stringify(data[k]));
        } else if (data[k]) {
            formData.append(k, data[k]);
        }
    }
    return formData;
}

export default buildFormData;