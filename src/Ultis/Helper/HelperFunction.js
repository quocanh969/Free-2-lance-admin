export const prettierNumber = (number) => {
    let formetedNumber = Number(number)
        .toFixed(2)
        .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    let splitArray = formetedNumber.split(".");
    if (splitArray.length > 1) {
        formetedNumber = splitArray[0];
    }
    return formetedNumber;
};

export const prettierDate = (date) => {
    let newDate = new Date(date);
    let month = newDate.getMonth() + 1;
    return newDate.getDate() + "/" + month + "/" + newDate.getFullYear();
};

export const prettierDateAgo = (date) => {
    let postDate = new Date(date);
    let today = new Date();
    const diffTime = Math.abs(today - postDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays <= 30) return diffDays + " ngày trước";
    else if (diffDays < 365)
        return Math.ceil(diffDays / 30.4375) - 1 + " tháng trước";
    else return Math.ceil(diffDays / 365.25) - 1 + " năm trước";
};

export const getBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
}

export const getImageSrc = (data, imagePlaceholder) => {
    let img = imagePlaceholder;
    if (data !== null) {
        img = "data:image/png;base64," + data;
    }
    return img;
};
