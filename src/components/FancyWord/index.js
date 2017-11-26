import React, { Component } from 'react'
import './style.css'

class FancyWord extends Component {
  render() {
    const letters = this.props.word.split("");
    return (
        <span className="fancy-letters">
          {
            letters
              .map((letter, key) =>
                <span
                  key={key}
                  className={`fancy-letter fancy-letter--${key}`}
                  style={{animationDelay: `${key * 0.1}s`}}
                >
                    {letter}
                </span>)
          }
        </span>
    )
  }
}

export default FancyWord
