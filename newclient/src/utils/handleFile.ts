const handleFile = async (e: any) => {
    if (e.target.files && !isFileImage(e.target.files[0])) {
        return 'Image must be of type .png or .jpg';
    } else if (e.target.files[0].size / 1024 / 1024 > 16) {
        console.log('FILE TOO LARGE');
        return 'File must be smaller than 16 MB';
    } else {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(e.target.files[0]);
            reader.onload = () => resolve(reader);
            reader.onerror = (error) => reject(error);
        });
    }
};

export const isFileImage = (file: any) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    return file && validTypes.includes(file.type);
};

export default handleFile;
