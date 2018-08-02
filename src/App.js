import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Item from './Item'

import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import update from 'immutability-helper'

class App extends Component {

  constructor (props) {
    super(props)

    this.state = {
      cards: [
        { id: 1, text: 'React' },
        { id: 2, text: 'Vue' },
        { id: 3, text: 'Angular' },
        { id: 4, text: 'Node.js' },
        { id: 5, text: 'python' },
        { id: 6, text: 'django' },
      ]
    }

    this.moveCard = this.moveCard.bind(this)
  }

  render() {
    const { connectDropTarget } = this.props

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <section className="App-intro">
          { this.state.cards.map((item, index) => (
            <Item
              key={item.id}
              item={item}
              index={index}
              moveCard={this.moveCard}
            />
          ))}
        </section>
      </div>
    );
  }

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state
    const dragCard = cards[dragIndex]

    console.log(dragIndex)
    console.log(hoverIndex)

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }))

  }
}

export default DragDropContext(HTML5Backend)(App)

// export default DragDropContext(HTML5Backend)(
//   DropTarget(ItemTypes.CARD, cardTarget, connect => ({
//     connectDropTarget: connect.dropTarget()
//   })
// )(App))