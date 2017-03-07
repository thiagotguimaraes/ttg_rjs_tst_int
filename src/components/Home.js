import React from 'react';
import Pager from 'react-pager';
import List from "./List";
import axios from 'axios';

class Home extends React.Component {

    constructor(props) {
        super(props);

        this.handlePageChanged = this.handlePageChanged.bind(this);

        this.state = {
            current: 0,
            results: [],
            total: 0,
            previous: null,
            next: null,
            visiblePage: 5,
        };
    }

    // manageString(string) {
    //     string = string.split('\/');
    //     string = string.join("/");
    //     return string;
    // }

    getData(base, param) {
        // url = this.manageString(url);
        return new Promise(resolve => {
            let url = base + param;
            resolve(axios.get(url));
        });
    }

    componentDidMount() {
        this.getData(`http://pokeapi.co/api/v2/pokemon/`, "").then(res => {

            this.changeData(res.data);

        }, err => { console.log("ERRO") });
    }

    changeData(newData) {
        this.setState({
            results: newData.results,
            total: newData.count / 20,
            previous: newData.previous,
            next: newData.next
        })
    }

    handlePageChanged(newPage) {
        let param = "?offset=" + (newPage * 20);
        console.log(newPage)
        this.getData(`http://pokeapi.co/api/v2/pokemon/`, param).then(res => { this.changeData(res.data) }, err => { console.log("ERRO") });
        this.setState({ current: newPage });
    }



    render() {
        return (
            <div>
                <div className="center">
                    <List data={this.state.results} />

                    <Pager
                        total={this.state.total}
                        current={this.state.current}
                        visiblePages={this.state.visiblePage}
                        titles={{ first: '<', last: '>' }}
                        className="pagination-sm "
                        onPageChanged={this.handlePageChanged}
                    />
                </div>
            </div>
        );
    }
}


export default Home;