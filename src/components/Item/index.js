import React from 'react'
import sneekGuard from '../../services/sneekGuard'
import YouSneek from './YouSneek'

const Item = ({ match }) => {
  if(sneekGuard(match.params.day)){
    return (
      <div> 
        {match.params.day}
      </div>
    );
  }
  return <YouSneek />;
}

export default Item
