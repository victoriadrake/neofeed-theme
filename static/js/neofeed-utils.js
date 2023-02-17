function calcDateDiff(unixTimestamp) {
    const diff = Math.floor((Date.now() / 1000 - unixTimestamp) / 86400);
    if (diff == 0) {
        return "earlier today";
    } else if (diff == -1) {
        return "a day from now";
    } else if (diff < 0) {
        return `${diff * -1} days in the future`;
    } else if (diff == 1) {
        return "a day ago";
    } else {
        return `${diff} days ago`;
    }
}
