import React from 'react';
import { Button, Icon } from 'react-mdl';

const NoFlock = () => (
  <div>
    <p>You have not added any flocks yet.</p>
    <Button raised accent>
      <Icon name="add" />
      <span style={{ paddingLeft: 10 }}>Add A new Flock</span>
    </Button>
  </div>
);

export default NoFlock;
