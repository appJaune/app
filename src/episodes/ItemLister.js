import React from 'react'; // normalement j'ai pas besoin d'importer Component vu que j'importe React

class EpisodesItemLister extends React.Component {
    constructor() {
        super();
        this.state = {
            seriesName: '',
            seriesList: [],
            seriesEpisodesLists: []
        };
    }

    componentDidMount() {
        
    }

    // la en fait on feinte, en utilisant une fct flechee on conserve le bon 'this', celui de la classe :)
    handleChange = (event) => {
        this.setState({
            seriesName: event.target.value
        });
        fetch('http://localhost/app-serie-master2/app/queries.php?name='+event.target.value,
        {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(seriesList => {
            this.setState({seriesList: seriesList});
        })
        .catch(function (error) {
            console.log(error);
        })
    };

    render() {
        return (
            <div>

                <input type="text" name="title" placeholder="coucou" value={this.state.seriesName}
                       onChange={this.handleChange}/>
                <ul>
                    {this.state.seriesName.length && this.state.seriesList.length ?
                        this.state.seriesList.filter(item => item.seriesName.toLowerCase().indexOf(this.state.seriesName.toLowerCase()) !== -1)
                            .map(item => (
                                    <li key={item.id}>
                                        {this.state.seriesList.filter(b => b.id === item.id)
                                            .map(matchingEpisode => matchingEpisode.banner
                                                .filter(a => a.subkey === 'graphical')
                                                .filter(getEpisodeName => getEpisodeName.filename)

                                                .map(matchingSerieEpisodesLists => <img key={matchingSerieEpisodesLists.id} src={`https://www.thetvdb.com/banners/_cache/${matchingSerieEpisodesLists.filename}`}></img> )
                                            )
                                        }
                                        {item.seriesName}
                                        <ol>
                                            {this.state.seriesList.filter(b => b.id === item.id)
                                                .map(matchingEpisode => matchingEpisode.episodes
                                                    .filter(getEpisodeName => getEpisodeName.episodeName)
                                                    .map(matchingSerieEpisodesLists => <li key={matchingSerieEpisodesLists.id}>{matchingSerieEpisodesLists.episodeName}</li>)
                                                )
                                            }
                                        </ol>
                                    </li>
                                )
                            )
                        : <li>...</li>
                    }
                </ul>

            </div>
        )
    }
}

export default EpisodesItemLister;