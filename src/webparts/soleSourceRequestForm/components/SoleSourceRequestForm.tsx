import * as React from 'react';
import styles from './SoleSourceRequestForm.module.scss';
import { ISoleSourceRequestFormProps } from './ISoleSourceRequestFormProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SoleSourceRequestForm extends React.Component<ISoleSourceRequestFormProps, {}> {
  public render(): React.ReactElement<ISoleSourceRequestFormProps> {
    const {
      description,
    } = this.props;

    return (
      <div>
        <h2>hello world.</h2>
      </div>
    );
  }
}
