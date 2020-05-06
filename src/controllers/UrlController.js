import axios from 'axios';

class UrlController {
    shortener = async (url) => {
        return await axios.post(
            'http://127.0.0.1:8000/api/snapshot',
            JSON.stringify({ url: url })
        );
    };
}

export default (new UrlController());