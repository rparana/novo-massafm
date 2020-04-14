export default {
    track() {

        return {
            title: document.querySelector('#title').getAttribute("value"),
            artist: document.querySelector('#artist').getAttribute("value"),
            cover: document.querySelector('#img').getAttribute("value"),
            file: document.querySelector('#url').getAttribute("value"),
            live: (document.querySelector('#live').getAttribute("value") === 'true'),
            autoplay: document.querySelector('#autoplay').getAttribute("value")
        };
    }
};