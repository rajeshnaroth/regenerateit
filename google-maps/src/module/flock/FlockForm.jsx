import React from 'react';
import { Textfield, Grid, Cell } from 'react-mdl';

const FlockForm = () => (
  <div>
    <Grid>
      <Cell col={12}>
        <Textfield
          onChange={() => {}}
          label="Flock Name..."
          floatingLabel
          style={{ width: '400px' }}
        />
      </Cell>
      <Cell col={12}>
        <Textfield
          onChange={() => {}}
          label="Flock Description..."
          floatingLabel
          rows={3}
          style={{ width: '400px' }}
        />
      </Cell>
    </Grid>
  </div>
);

export default FlockForm;
