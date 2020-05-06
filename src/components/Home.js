import React from 'react';
import UrlController from "../controllers/UrlController";
import StatsController from "../controllers/StatsController";

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            copy: null,
            buttonText: "Screenshot",
            error: null,
            clicks: null,
            imgVisible: false,
            imgUrl: null
        };

        // StatsController.mostClicked().then((response) => {
        //     this.setState({ clicks: response.data });
        // });
    }

    render() {
        return (
            <div className="Home container">
                <h1 className="topic">Get a web page screenshot in just few seconds!</h1>

                <div className="col-sm-12 col-md-8 offset-md-2">
                    <div id="url">
                        <div id="url-input">
                            <input type="url" name="url" value={this.state.url} onChange={(e) => {
                                this.inputValueChange(e.target.value)
                            }} placeholder="Paste a page URL" required />
                            <p className="error">{this.state.error}</p>
                        </div>
                        <button id={this.state.copy} onClick={() => {
                            this.shrink()
                        }} className="buttonmain">{this.state.buttonText}</button>
                        {this.state.copy &&
                            <button onClick={() => {
                                this.reset()
                            }} className="buttonmain">Reset</button>
                        }
                    </div>
                </div>

                {/* <h2>• Mostly clicked shorted links</h2> */}
                {console.log(this.state.imgVisible)}
                {this.state.imgVisible ?
                    <div className="result-image-div">
                        <img className="result-image" src={this.state.imgUrl}></img>
                    </div> : null}
            </div>
        );
    }

    static copyURL = (url) => {
        let input = document.createElement('input');
        input.setAttribute('value', "https://devro.club/" + url);
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
    };

    inputValueChange = (value) => {
        this.setState({ url: value });
        this.setState({ error: '' });
    };

    shrink = () => {
        if (this.state.copy) {
            let input = document.createElement('input');
            input.setAttribute('value', this.state.url);
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);

            this.setState({ buttonText: "Copied!" });
            setTimeout(
                function () {
                    this.setState({ buttonText: "Copy to Clipboard" });
                }.bind(this),
                1000
            );
        } else {
            if (this.state.url === '') {
                this.setState({ error: "URL field is required." });
            } else if (!this.validURL(this.state.url)) {
                this.setState({ error: "URL entered is invalid." });
            } else {
                UrlController.shortener(this.state.url).then((response) => {
                    console.log(response.data)
                    this.setState({ url: response.data.snapshot_url });
                    this.setState({ imgVisible: true });
                    this.setState({ imgUrl: response.data.snapshot_url });
                    this.setState({ copy: "copy" });
                    this.setState({ buttonText: "Copy to Clipboard" });
                });
            }
        }
    };

    reset = () => {
        this.setState({ copy: null });
        this.setState({ url: '' });
        this.setState({ buttonText: "Screenshot" });
        this.setState({ imgVisible: false });
    };

    validURL = (str) => {
        let pattern = new RegExp('^(ftp|http|https):\/\/[^ "]+$');
        return !!pattern.test(str);
    }
}