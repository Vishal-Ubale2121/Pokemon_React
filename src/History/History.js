import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Header, Segment, Image } from 'semantic-ui-react';
import Spinner from '../Spinner/Spinner'

import * as actionCreators from '../store/actions';

class History extends Component {

    handleHeadlinerChange = (event) => {
        const inputValue = event.currentTarget.textContent;
        this.props.pokemonHistoryRecall(inputValue);
    }

    render() {
        let result = null
        if (this.props.pkmSearches.id) {
            result = (
                <Segment
                    textAlign="center"
                    font = "Arial Black"
                    style={{ width: '600px', margin: '20px auto', minHeight: '300px' }}
                >
                    <Header style={{ margin: '20px auto', fontSize: '1.6rem' }}>{this.props.pkmSearches.name.toUpperCase()}</Header>
                    
                    <Image src={this.props.pkmSearches.sprites.front_default} size='small' floated='center' style={{ marginLeft: '200px' }} />
                </Segment>
            )
        } else if (!this.props.pkmSearches.id && this.props.errors) {
            result = (
                <Header style={{ width: '600px', margin: '100px auto' }}>{this.props.errors}</Header>
            )
        }
        const history = this.props.historySearches.map((search => (
            <Table.Row key={search.name}>
                <Table.Cell>{search.id}</Table.Cell>
                <Table.Cell><p onClick={this.handleHeadlinerChange} style={{ cursor: 'pointer' }}>{search.name}</p></Table.Cell>
                <Table.Cell>{
                    search.types.map((type => <Table.Cell key={type} style={{ borderTop: 'none' }}>{type.type.name}</Table.Cell>))
                }</Table.Cell>
                <Table.Cell>{search.height * 10} cm / {search.weight / 10} kg</Table.Cell>
            </Table.Row>

        )))
        return (
            <>
                <Segment
                    textAlign="center"
                    style={{ minHeight: '50vh', width: '900px', margin: '100px auto 0 auto' }}
                    vertical
                >

                    {this.props.fetching ? <Spinner /> : result}

                
                    <Table celled>
                        <Table.Header style={{ textAlign: 'center' }}>
                            <Table.Row>
                                <Table.HeaderCell>Id</Table.HeaderCell>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Type</Table.HeaderCell>
                                <Table.HeaderCell>Height/ Weight</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {history}
                        </Table.Body>
                    </Table>
                </Segment>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        pkmSearches: state.searchResults,
        historySearches: state.historySearches,
        errors: state.errors,
        fetching: state.fetching
    };
};

const mapDispatchToProps = dispatch => {
    return {
        pokemonHistoryRecall: (inputValue) => dispatch(actionCreators.historyRecall(inputValue)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(History)
