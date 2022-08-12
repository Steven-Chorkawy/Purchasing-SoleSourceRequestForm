import * as React from 'react';
import { ISoleSourceRequestFormProps } from './ISoleSourceRequestFormProps';
import { Button, MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';
import {
  Field,
  FieldWrapper,
  Form,
  FormElement,
  FormRenderProps,
  FormSubmitClickEvent,
} from "@progress/kendo-react-form";
import { Label } from '@progress/kendo-react-labels';

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
        <div className='row'>
          <div className='col-lg-1'>1</div>
          <div className='col-lg-1'>2</div>
          <div className='col-lg-1'>3</div>
          <div className='col-lg-1'>4</div>
          <div className='col-lg-1'>5</div>
          <div className='col-lg-1'>6</div>
          <div className='col-lg-1'>7</div>
          <div className='col-lg-1'>8</div>
          <div className='col-lg-1'>9</div>
          <div className='col-lg-1'>10</div>
          <div className='col-lg-1'>11</div>
          <div className='col-lg-1'>12</div>
        </div>
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
            <FormElement horizontal={true}>
              <legend className={"k-form-legend"}>Department Information</legend>

              <div>
                <div className="row">
                  <div className="col-lg-6">
                    lg 6 1
                  </div>
                  <div className="col-lg-6">
                    lg 6 2
                  </div>
                </div>

                <div className="row">
                  <div className="col-sm-6">
                    sm 6 1
                  </div>
                  <div className="col-sm-6">
                    sm 6 2
                  </div>
                </div>
              </div>

              <FieldWrapper>
                <Label editorId={'Department'} >
                  {'Department'}
                </Label>
                <div className={"k-form-field-wrap"}>
                  <TextField id={'Department'} name={'Department'} />
                </div>
              </FieldWrapper>

              <FieldWrapper>
                <Label editorId={'Department2'} >
                  {'Department2'}
                </Label>
                <div className={"k-form-field-wrap"}>
                  <TextField id={'Department2'} name={'Department2'} />
                </div>
              </FieldWrapper>

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
