import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardTitle, CardSubtitle, CardText, CardBlock } from 'reactstrap';

const FlockCard = (props) => (
  <Card block>
    <CardBlock>
      <CardTitle>{props.flock.flockName}</CardTitle>
      <CardSubtitle>{props.flock.flockVertical} (Size: {props.flock.flockSize})</CardSubtitle>
      <CardText> {props.flock.flockDescription} </CardText>
    </CardBlock>
  </Card>
);

FlockCard.propTypes = {
  flock: PropTypes.object.isRequired,
};

export default FlockCard;
