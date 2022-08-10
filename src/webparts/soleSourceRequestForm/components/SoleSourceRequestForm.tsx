import * as React from 'react';
import { ISoleSourceRequestFormProps } from './ISoleSourceRequestFormProps';
import { Button, MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';
import {
  Field,
  Form,
  FormElement,
  FormRenderProps,
  FormSubmitClickEvent,
} from "@progress/kendo-react-form";

interface ISoleSourceRequestFormState {
}

export default class SoleSourceRequestForm extends React.Component<ISoleSourceRequestFormProps, ISoleSourceRequestFormState> {

  constructor(props) {
    super(props);
  }


  private handleSubmit = (values) => {
    console.log('handleSubmit');
    console.log(values);
  }

  public render(): React.ReactElement<ISoleSourceRequestFormProps> {
    const {
      description,
    } = this.props;


    return (
      <div>
        <h1>Sole Source Request Form</h1>
        <MessageBar messageBarType={MessageBarType.warning}>
          <b>* Client must ensure that the form is reviewed by the Purchasing Division prior to receiving any departmental approval.</b>
        </MessageBar>
        <MessageBar messageBarType={MessageBarType.warning}>
          <b>* Proper approvals must be obtained for sole source purchases prior to the commitment for the purchase of the goods or services.</b>
        </MessageBar>
        <Form
          onSubmit={this.handleSubmit}
          render={(formRenderProps: FormRenderProps) => (
            <FormElement style={{ maxWidth: 650 }}>
              <legend className={"k-form-legend"}>Department Information</legend>
              <Field
                name={"Department"}
                component={TextField}
                label={"Department"}
              // validator={emailValidator}
              />
              <div className="k-form-buttons">
                <PrimaryButton text="Submit" type='submit' allowDisabledFocus disabled={!formRenderProps.allowSubmit} />
              </div>
            </FormElement>
          )}
        />
      </div >
    );
  }
}
