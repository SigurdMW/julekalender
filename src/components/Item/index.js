import React from 'react'
import sneekGuard from '../../services/sneekGuard'
import FancyWord from '../FancyWord'
import YouSneek from './YouSneek'
import { data } from '../../data'
import "./style.css"

const Item = ({ match }) => {
  const dayData = data.filter(item => item.day === Number(match.params.day))[0];

  if(sneekGuard(match.params.day)){
    return (
      <div className="single-day-container">
        {dayData.compliment &&
          <h2><FancyWord word={dayData.compliment}></FancyWord></h2>
        }

        {dayData.text &&
          <div className="text">
            <p>{dayData.text}</p>
          </div>
        }
      </div>
    );
  }
  return <YouSneek />;
}

export default Item
