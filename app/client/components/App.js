/*
    Main component, Stateful
    @author: Bobby Joseph <bobbyj79@gmail.com>
*/

import React from 'react';

import {
    Search,
    Form,
    Button,
    ContentSwitcher,
    Switch,
    StructuredListWrapper,
    StructuredListHead,
    StructuredListBody,
    StructuredListRow,
    StructuredListCell,
    DataTable
} from 'carbon-components-react';

import ResultTile from './ResultTile';
import infotrackLogo from '../images/infotrack-logo.png';
import googleLogo from '../images/google-logo.jpg';

const { TableContainer, Table, TableHead, TableHeader, TableBody, TableRow, 
        TableCell, TableToolbar, TableToolbarSearch } = DataTable;

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputKeywords: 'infotrack', //defaults
            inputURL: 'infotrack.com', //defaults
            trend: [] //TODO: store and retrieve from NOSQL DB
        };

        this.tableHeaders = [
            { key: "date", header: "Date" },
            { key: "positions", header: "Positions" },
            { key: "url", header: "URL" },
            { key: "keywords", header: "Keywords" }
        ];

        this.tabCount = 2;
    }

    //2-way sync, controlled component
    handleInputChange_keywords(event) {
        this.setState({ inputKeywords: event.target.value });
    }

    //2-way sync, controlled component
    handleInputChange_url(event) {
        this.setState({ inputURL: event.target.value });
    }

    onTabChange(tab) {
        console.log("tab onClick called..:", tab);
        for (let i = 0; i < this.tabCount; i++) {
            document.getElementById('tab' + i).style.display = 'none';
        }
        document.getElementById('tab' + tab.index).style.display = 'block';
        //this.setState(tab);
    }

    onSubmit(event) {
        event.preventDefault();
        console.debug("submit called...");
        console.debug("input:", this.state.inputKeywords);
        console.debug("url:", this.state.inputURL);

        if (document.getElementById('nodata'))
            document.getElementById('nodata').innerHTML = "Searching...";

        //fetch config    
        var options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                keywords: this.state.inputKeywords,
                url: this.state.inputURL
            })
        };

        //call NodeJS API for web scraping    
        fetch('/api/scrape', options)
            .then(resp => resp.json())
            .then(data => {
                // code for handling the data from the API
                console.log("fetch succesful, data:", data);
                let trend = this.state.trend;
                let positions = "";
                if (data && data.length > 0) {
                    for (let i = 0; i < data.length; i++) {
                        if (i > 0) {
                            positions += ", " + data[i].position;
                        } else positions += data[i].position;
                    }
                }
                trend.push({
                    id: Date.now() + "", //rowId for table
                    date: new Date().toLocaleString(),
                    positions: positions,
                    url: this.state.inputURL,
                    keywords: this.state.inputKeywords
                })
                //console.debug("trend:",trend);
                this.setState({
                    results: data,
                    trend: trend
                })
            }).catch(function (err) {
                // if the server returns any errors
                console.error(err);
            });
    }

    generateTiles() {
        var resultTiles = [];
        if (this.state.results && this.state.results.length > 0) {
            let element;
            for (let i = 0; i < this.state.results.length; i++) {
                element = this.state.results[i];
                resultTiles.push(<ResultTile
                    key={i + ""}
                    position={element.position}
                    title={element.title}
                    url={element.url}
                    summary={element.summary}
                />)
            }
        } else 
            resultTiles = <div className="center nodata" id="nodata">No results found!</div>
        
        return (
            <StructuredListWrapper>
                <StructuredListHead>
                    <StructuredListRow head>
                        <StructuredListCell head>
                            Position
                        </StructuredListCell>
                        <StructuredListCell head>
                            Search Result
                        </StructuredListCell>
                    </StructuredListRow>
                </StructuredListHead>
                <StructuredListBody>
                    {resultTiles}
                </StructuredListBody>
            </StructuredListWrapper>
        );

    }

    render() {

        //passing array directly not working with DataTable?! Copy array!
        const tableData = this.state.trend.slice(); //quick shallow copy

        return (
            <div className="seo">
                <header className="header center">
                    <img src={infotrackLogo} className="infotrack-logo" alt="InfoTrack Logo" />
                    <h1 className="heading">SEO Analyser</h1>
                </header>

                <nav role="navigation">
                    <ContentSwitcher onChange={this.onTabChange.bind(this)} className="tabCenter">
                        <Switch name="tab1" text="Analyse" />
                        <Switch name="tab2" text="Trends" />
                    </ContentSwitcher>
                </nav>

                <main>
                    <div
                        className="tab0"
                        label="Analyse"
                        id='tab0'
                        role="tab"
                    >
                        <Form className="input center" onSubmit={this.onSubmit.bind(this)}>
                            <img src={googleLogo} className="google-logo" alt="Google Logo" />
                            <div className="inputs center">
                                <Search
                                    id="url"
                                    small
                                    className="search"
                                    placeHolderText="url to match: eg: infotrack.com"
                                    value={this.state.inputURL} onChange={this.handleInputChange_url.bind(this)}
                                />
                                <Search
                                    id="keywords"
                                    small
                                    className="search"
                                    placeHolderText="keywords eg: infotrack"
                                    value={this.state.inputKeywords} onChange={this.handleInputChange_keywords.bind(this)}
                                />
                                <Button onClick={this.onSubmit.bind(this)} className="button">
                                    Analyse
                                </Button>
                            </div>
                        </Form>
                        <div className="results">
                            {this.generateTiles()}
                        </div>
                    </div>
                    <div
                        className="tab1"
                        label="Trends"
                        id='tab1'
                        role="tab"
                    >
                        <div className="some-content">
                            <DataTable
                                rows={tableData}
                                headers={this.tableHeaders}
                                locale='en'
                                render={({ rows, headers, getHeaderProps, onInputChange }) => (
                                    <TableContainer>

                                        <TableToolbar>
                                            <TableToolbarSearch onChange={onInputChange} />
                                        </TableToolbar>

                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    {headers.map(header => (
                                                        <TableHeader {...getHeaderProps({ header })}>
                                                            {header.header}
                                                        </TableHeader>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map(row => (
                                                    <TableRow key={row.id}>
                                                        {row.cells.map(cell => (
                                                            <TableCell key={cell.id}>{cell.value}</TableCell>
                                                        ))}
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>

                                    </TableContainer>
                                )}
                            />
                        </div>
                    </div>
                </main>    

                <footer className="footer right">
                    <a href="http://www.linkedin.com/in/bobbyjoseph" target="_blank">&copy;Bobby</a>
                </footer>
            </div>
        );
    }
}

export default App;
