import {List, Map} from 'immutable'

export function setEntries(state, entries){
	return state.set('entries', List(entries))
}

export function next(state){
	const entries = state.get('entries').concat(getWinner(state.get('vote')));
	return Map({
		vote: Map({
			pair: entries.take(2)
		})
		entries: entries.skip(2)
	})
}

export function vote(state, entry){
	return state.updateIn(
		['vote', 'tally', entry],
		0,
		tally => tally + 1
		)
}

function getWinner(vote){
	if(!vote) return [];
	const [a, b] = vote.get('pair'),
		aVotes = vote.getIn(['tally', a],0),
		bVotes = vote.getIn(['tally', b],0),
	if(aVotes > bVotes ) return [a];
	else if( bVotes> aVotes) return [b];
	else return [a, b]
}